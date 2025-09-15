<?php
/**
 * Caption Generation API for Content Creator Tools
 *
 * @package ContentCreatorTools
 * @since 4.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class RWP_CCT_Caption_API
 *
 * Handles REST API endpoints for caption generation
 */
class RWP_CCT_Caption_API {

    /**
     * API namespace
     */
    const NAMESPACE = 'rwp-cct/v1';

    /**
     * JWT Handler instance
     *
     * @var RWP_CCT_JWT_Handler
     */
    private $jwt_handler;

    /**
     * OpenAI Service instance
     *
     * @var RWP_CCT_OpenAI_Service
     */
    private $openai_service;

    /**
     * Constructor
     */
    public function __construct() {
        $this->jwt_handler = new RWP_CCT_JWT_Handler();
        $this->openai_service = new RWP_CCT_OpenAI_Service();
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register API routes
     */
    public function register_routes() {
        register_rest_route(
            self::NAMESPACE,
            '/captions/generate',
            array(
                'methods' => 'POST',
                'callback' => array($this, 'generate_captions'),
                'permission_callback' => array($this, 'check_authentication'),
                'args' => array(
                    'description' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Content description for caption generation (optional if using image or URL)',
                        'validate_callback' => function($param) {
                            // Allow empty description if image or URL will be provided
                            if (empty(trim($param))) {
                                return true;
                            }
                            return strlen(trim($param)) >= 10;
                        },
                        'sanitize_callback' => 'sanitize_textarea_field'
                    ),
                    'platforms' => array(
                        'required' => true,
                        'type' => 'string', // JSON string
                        'description' => 'Selected platforms as JSON array',
                        'validate_callback' => array($this, 'validate_platforms'),
                        'sanitize_callback' => array($this, 'sanitize_platforms')
                    ),
                    'tone' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'Caption tone',
                        'validate_callback' => array($this, 'validate_tone'),
                        'sanitize_callback' => 'sanitize_text_field'
                    ),
                    'url' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Reference URL (optional)',
                        'validate_callback' => array($this, 'validate_url'),
                        'sanitize_callback' => 'esc_url_raw'
                    )
                )
            )
        );

        register_rest_route(
            self::NAMESPACE,
            '/captions/validate',
            array(
                'methods' => 'POST',
                'callback' => array($this, 'validate_caption'),
                'permission_callback' => array($this, 'check_authentication'),
                'args' => array(
                    'caption' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'Caption text to validate',
                        'sanitize_callback' => 'sanitize_textarea_field'
                    ),
                    'platforms' => array(
                        'required' => true,
                        'type' => 'string', // JSON string
                        'description' => 'Platforms to validate against',
                        'validate_callback' => array($this, 'validate_platforms'),
                        'sanitize_callback' => array($this, 'sanitize_platforms')
                    )
                )
            )
        );
    }

    /**
     * Check authentication using JWT or WordPress session
     *
     * @param WP_REST_Request $request Request object
     * @return bool|WP_Error True if authenticated, WP_Error if not
     */
    public function check_authentication($request) {
        // Check for JWT token first
        $token = $this->jwt_handler->get_token_from_header();

        if ($token) {
            // JWT token authentication
            $payload = $this->jwt_handler->validate_token($token);

            if (is_wp_error($payload)) {
                error_log('RWP CCT: JWT validation failed - ' . $payload->get_error_message());
                return new WP_Error('invalid_jwt', 'Invalid authentication token', array('status' => 401));
            }

            // Set current user context for JWT users
            if (isset($payload['user_id'])) {
                wp_set_current_user($payload['user_id']);
                error_log('RWP CCT: JWT auth successful for user ID: ' . $payload['user_id']);
            }

            return true;
        }

        // Check for WordPress nonce authentication
        $nonce = null;
        if (!empty($_SERVER['HTTP_X_WP_NONCE'])) {
            $nonce = $_SERVER['HTTP_X_WP_NONCE'];
        } elseif (!empty($request->get_header('X-WP-Nonce'))) {
            $nonce = $request->get_header('X-WP-Nonce');
        }

        if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {
            // Valid WordPress nonce - check if user is logged in
            if (is_user_logged_in()) {
                $current_user = wp_get_current_user();
                if ($current_user && $current_user->ID > 0) {
                    // All logged-in users with valid nonce are allowed
                    return true;
                }
            }
            return new WP_Error('not_logged_in', 'User must be logged in', array('status' => 401));
        }

        // Check if user is logged in via WordPress session (fallback)
        if (is_user_logged_in()) {
            $current_user = wp_get_current_user();
            if ($current_user && $current_user->ID > 0) {
                return true;
            }
        }

        error_log('RWP CCT: No valid authentication found - no JWT token, no valid nonce, user not logged in');
        return new WP_Error('authentication_required', 'Authentication required', array('status' => 401));
    }

    /**
     * Generate captions endpoint
     *
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response|WP_Error Response object
     */
    public function generate_captions($request) {
        try {
            // Get parameters (platforms already decoded by sanitize callback)
            $description = $request->get_param('description');
            $platforms = $request->get_param('platforms');
            $tone = $request->get_param('tone');
            $url = $request->get_param('url');

            // Handle file upload (image)
            $image = null;
            $files = $request->get_file_params();
            if (!empty($files['image'])) {
                $image = $this->handle_image_upload($files['image']);
                if (is_wp_error($image)) {
                    return $image;
                }
            }

            // Validate that at least one content source is provided (description OR image OR URL)
            $has_description = !empty($description !== null ? trim($description) : '');
            $has_image = !empty($image);
            $has_url = !empty($url !== null ? trim($url) : '');

            if (!$has_description && !$has_image && !$has_url) {
                return new WP_REST_Response(
                    array(
                        'success' => false,
                        'message' => 'At least one content source is required: description, image, or URL',
                        'code' => 'missing_content_source'
                    ),
                    400
                );
            }

            // Build parameters for OpenAI service
            $params = array(
                'description' => $description,
                'platforms' => $platforms,
                'tone' => $tone
            );

            if (!empty($url)) {
                $params['url'] = $url;
            }

            if (!empty($image)) {
                $params['image'] = $image;
            }

            // Generate captions
            $result = $this->openai_service->generate_captions($params);

            if (is_wp_error($result)) {
                return new WP_REST_Response(
                    array(
                        'success' => false,
                        'message' => $result->get_error_message(),
                        'code' => $result->get_error_code()
                    ),
                    $result->get_error_data()['status'] ?? 500
                );
            }

            // Add platform validation to each caption
            $platform_limits = $this->openai_service->get_platform_limits();
            foreach ($result['captions'] as &$caption) {
                $caption['platform_validation'] = array();
                foreach ($platforms as $platform) {
                    $validation = $this->openai_service->validate_caption_for_platform($caption['text'], $platform);
                    $caption['platform_validation'][$platform] = $validation;
                }
            }

            // Clean up temporary image file if uploaded
            if (!empty($image) && isset($image['file'])) {
                @unlink($image['file']);
            }

            return new WP_REST_Response($result, 200);

        } catch (Exception $e) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => 'An unexpected error occurred',
                    'code' => 'unexpected_error'
                ),
                500
            );
        }
    }

    /**
     * Validate caption endpoint
     *
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response object
     */
    public function validate_caption($request) {
        $caption = $request->get_param('caption');
        $platforms = $request->get_param('platforms'); // Already decoded by sanitize callback

        $validation_results = array();
        foreach ($platforms as $platform) {
            $validation_results[$platform] = $this->openai_service->validate_caption_for_platform($caption, $platform);
        }

        return new WP_REST_Response(
            array(
                'success' => true,
                'validations' => $validation_results
            ),
            200
        );
    }

    /**
     * Handle image upload
     *
     * @param array $file File data from $_FILES
     * @return array|WP_Error Processed image data or error
     */
    private function handle_image_upload($file) {
        // Check if upload is valid
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return new WP_Error('upload_error', 'File upload failed', array('status' => 400));
        }

        // Check file type
        $allowed_types = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp');
        if (!in_array($file['type'], $allowed_types)) {
            return new WP_Error('invalid_file_type', 'Only image files are allowed', array('status' => 400));
        }

        // Check file size (max 10MB)
        $max_size = 10 * 1024 * 1024; // 10MB
        if ($file['size'] > $max_size) {
            return new WP_Error('file_too_large', 'File size must be less than 10MB', array('status' => 400));
        }

        // Move uploaded file to temporary location
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/rwp-cct-temp/';

        if (!file_exists($temp_dir)) {
            wp_mkdir_p($temp_dir);
        }

        $temp_filename = uniqid('caption_') . '_' . basename($file['name']);
        $temp_path = $temp_dir . $temp_filename;

        if (!move_uploaded_file($file['tmp_name'], $temp_path)) {
            return new WP_Error('move_file_failed', 'Failed to process uploaded file', array('status' => 500));
        }

        return array(
            'file' => $temp_path,
            'name' => $file['name'],
            'type' => $file['type'],
            'size' => $file['size']
        );
    }

    /**
     * Validate platforms parameter
     *
     * @param string $platforms JSON string of platforms
     * @return bool True if valid
     */
    public function validate_platforms($platforms) {
        $decoded = json_decode($platforms, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }

        if (!is_array($decoded) || empty($decoded)) {
            return false;
        }

        $allowed_platforms = array_keys($this->openai_service->get_platform_limits());

        foreach ($decoded as $platform) {
            if (!is_string($platform) || !in_array($platform, $allowed_platforms)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Sanitize platforms parameter
     *
     * @param string $platforms JSON string of platforms
     * @return array Sanitized platforms array
     */
    public function sanitize_platforms($platforms) {
        $decoded = json_decode($platforms, true);

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded)) {
            return array();
        }

        $allowed_platforms = array_keys($this->openai_service->get_platform_limits());
        $sanitized = array();

        foreach ($decoded as $platform) {
            $platform = sanitize_text_field($platform);
            if (in_array($platform, $allowed_platforms)) {
                $sanitized[] = $platform;
            }
        }

        return array_unique($sanitized);
    }

    /**
     * Validate tone parameter
     *
     * @param string $tone Tone value
     * @return bool True if valid
     */
    public function validate_tone($tone) {
        $allowed_tones = array(
            'professional',
            'casual',
            'friendly',
            'authoritative',
            'playful',
            'inspirational',
            'educational',
            'promotional'
        );

        return in_array($tone, $allowed_tones);
    }

    /**
     * Validate URL parameter
     *
     * @param string $url URL value
     * @return bool True if valid
     */
    public function validate_url($url) {
        if (empty($url)) {
            return true; // URL is optional
        }

        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }

    /**
     * Get rate limit for current user
     *
     * @return int Requests per hour limit
     */
    private function get_user_rate_limit() {
        $current_user = wp_get_current_user();

        // Admin users get higher limits
        if (current_user_can('manage_options')) {
            return 100; // 100 requests per hour
        }

        // Premium users get higher limits
        if (in_array('premium_user', $current_user->roles) ||
            get_user_meta($current_user->ID, 'rwp_cct_premium_access', true)) {
            return 50; // 50 requests per hour
        }

        // Default limit for regular users
        return 20; // 20 requests per hour
    }

    /**
     * Check rate limit for current user
     *
     * @return bool True if under limit
     */
    private function check_rate_limit() {
        $current_user = wp_get_current_user();
        $user_id = $current_user->ID;

        $limit = $this->get_user_rate_limit();
        $key = "rwp_cct_caption_requests_{$user_id}";

        // Get current hour's request count
        $current_hour = date('Y-m-d-H');
        $stored_data = get_transient($key);

        if ($stored_data === false) {
            $stored_data = array();
        }

        // Clean old hours
        foreach ($stored_data as $hour => $count) {
            if ($hour !== $current_hour) {
                unset($stored_data[$hour]);
            }
        }

        $current_count = isset($stored_data[$current_hour]) ? $stored_data[$current_hour] : 0;

        if ($current_count >= $limit) {
            return false;
        }

        // Increment counter
        $stored_data[$current_hour] = $current_count + 1;
        set_transient($key, $stored_data, HOUR_IN_SECONDS * 2);

        return true;
    }
}