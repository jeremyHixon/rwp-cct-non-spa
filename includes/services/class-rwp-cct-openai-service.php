<?php
/**
 * OpenAI Service for Content Creator Tools
 *
 * @package ContentCreatorTools
 * @since 4.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class RWP_CCT_OpenAI_Service
 *
 * Handles OpenAI API interactions for content generation
 */
class RWP_CCT_OpenAI_Service {

    /**
     * OpenAI API base URL
     */
    const API_BASE_URL = 'https://api.openai.com/v1/';

    /**
     * Platform character limits
     */
    const PLATFORM_LIMITS = array(
        'twitter' => 280,
        'facebook' => 2000,
        'instagram' => 2200,
        'linkedin' => 3000,
        'tiktok' => 150,
        'youtube' => 5000
    );

    /**
     * Constructor
     */
    public function __construct() {
        // No initialization needed - we'll access settings directly via WordPress options
    }

    /**
     * Get the most restrictive character limit from selected platforms
     *
     * @param array $platforms Selected platform names
     * @return int Most restrictive character limit
     */
    private function get_restrictive_character_limit($platforms) {
        if (empty($platforms)) {
            return 280; // Default to Twitter's limit
        }

        $limits = array();
        foreach ($platforms as $platform) {
            if (isset(self::PLATFORM_LIMITS[$platform])) {
                $limits[] = self::PLATFORM_LIMITS[$platform];
            }
        }

        return empty($limits) ? 280 : min($limits);
    }

    /**
     * Generate captions using OpenAI API
     *
     * @param array $params Generation parameters
     * @return array|WP_Error Generated captions or error
     */
    public function generate_captions($params) {
        // Validate content sources - require at least one (description OR image OR URL)
        $has_description = !empty($params['description']);
        $has_image = !empty($params['image']);
        $has_url = !empty($params['url']);

        if (!$has_description && !$has_image && !$has_url) {
            return new WP_Error('missing_content_source', 'At least one content source is required: description, image, or URL', array('status' => 400));
        }

        if (empty($params['platforms']) || !is_array($params['platforms'])) {
            return new WP_Error('missing_platforms', 'At least one platform must be selected', array('status' => 400));
        }

        if (empty($params['tone'])) {
            return new WP_Error('missing_tone', 'Tone is required', array('status' => 400));
        }

        // Get API key
        $api_key = $this->get_api_key();
        if (!$api_key) {
            return new WP_Error('missing_api_key', 'OpenAI API key not configured', array('status' => 500));
        }

        // Determine character limit
        $max_char_limit = $this->get_restrictive_character_limit($params['platforms']);

        // Build the prompt
        $prompt = $this->build_prompt($params, $max_char_limit);

        // Determine model based on whether image analysis is needed
        $has_image = !empty($params['image']);
        $model = $has_image ?
            get_option('rwp_cct_openai_image_model', 'gpt-4o') :
            get_option('rwp_cct_openai_text_model', 'gpt-3.5-turbo');

        // Make API request
        $result = $this->make_openai_request($api_key, $model, $prompt, $params);

        if (is_wp_error($result)) {
            return $result;
        }

        // Parse and return captions
        return $this->parse_captions($result);
    }

    /**
     * Build the generation prompt
     *
     * @param array $params Generation parameters
     * @param int $max_char_limit Maximum character limit
     * @return string Generated prompt
     */
    private function build_prompt($params, $max_char_limit) {
        $description = isset($params['description']) ? trim($params['description']) : '';
        $tone = $params['tone'];
        $url = isset($params['url']) ? trim($params['url']) : '';
        $has_image = !empty($params['image']);

        // Build base prompt based on content source
        if (!empty($description)) {
            $prompt = "Generate 4 social media caption variations in a {$tone} tone for the following content: {$description}";
        } else if ($has_image) {
            $prompt = "Generate 4 social media caption variations in a {$tone} tone based on the provided image content.";
        } else if (!empty($url)) {
            $prompt = "Generate 4 social media caption variations in a {$tone} tone for the content found at this URL: {$url}";
        } else {
            // Fallback (though this should be caught by validation)
            $prompt = "Generate 4 social media caption variations in a {$tone} tone.";
        }

        // Add URL context if provided and not already the primary content source
        if (!empty($url) && !empty($description)) {
            $url_context = $this->extract_url_context($url);
            if ($url_context) {
                $prompt .= "\n\nAdditional context from URL: {$url_context}";
            } else {
                $prompt .= "\n\nReference URL: {$url}";
            }
        }

        // Add guidelines
        $prompt .= "\n\nGuidelines:
- Keep captions under {$max_char_limit} characters
- Maintain {$tone} tone throughout
- Include relevant hashtags where appropriate
- Each caption should be complete and engaging
- Return only the caption text, numbered 1-4
- Each caption should be on a separate line starting with the number (e.g., '1. Caption text here')";

        return $prompt;
    }

    /**
     * Extract context from URL (premium feature)
     *
     * @param string $url URL to extract context from
     * @return string|null URL context or null
     */
    private function extract_url_context($url) {
        // Check if user has premium access
        if (!$this->has_premium_access()) {
            return null;
        }

        // Basic URL validation
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return null;
        }

        // For now, return null - URL context extraction would be implemented here
        // This would involve fetching the URL, parsing content, etc.
        return null;
    }

    /**
     * Check if user has premium access
     *
     * @return bool True if user has premium access
     */
    private function has_premium_access() {
        // Check user's subscription or role
        $current_user = wp_get_current_user();

        // For now, check if user is admin or has specific capability
        return current_user_can('manage_options') ||
               in_array('premium_user', $current_user->roles) ||
               get_user_meta($current_user->ID, 'rwp_cct_premium_access', true);
    }

    /**
     * Make OpenAI API request
     *
     * @param string $api_key OpenAI API key
     * @param string $model Model to use
     * @param string $prompt Text prompt
     * @param array $params Request parameters
     * @return array|WP_Error API response or error
     */
    private function make_openai_request($api_key, $model, $prompt, $params) {
        $url = self::API_BASE_URL . 'chat/completions';

        // Build messages array - handle Vision API format for images
        $has_image = !empty($params['image']) && $this->has_premium_access() && in_array($model, ['gpt-4o', 'gpt-4o-mini']);

        if ($has_image) {
            $image_data = $this->analyze_image($params['image']);
            if ($image_data) {
                // Use Vision API format with content array
                $messages = array(
                    array(
                        'role' => 'user',
                        'content' => array(
                            array(
                                'type' => 'text',
                                'text' => $prompt
                            ),
                            $image_data // This contains the properly formatted image data
                        )
                    )
                );
            } else {
                // Fallback to text-only if image processing failed
                $messages = array(
                    array(
                        'role' => 'user',
                        'content' => $prompt
                    )
                );
            }
        } else {
            // Text-only message format
            $messages = array(
                array(
                    'role' => 'user',
                    'content' => $prompt
                )
            );
        }

        $request_body = array(
            'model' => $model,
            'messages' => $messages,
            'max_tokens' => $has_image ? 1500 : 1000, // Vision API often needs more tokens
            'temperature' => 0.7,
            'n' => 1
        );

        $response = wp_remote_post($url, array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json',
            ),
            'body' => wp_json_encode($request_body),
            'timeout' => 30
        ));

        if (is_wp_error($response)) {
            return new WP_Error('api_request_failed', 'Failed to connect to OpenAI API: ' . $response->get_error_message(), array('status' => 500));
        }

        $status_code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if ($status_code !== 200) {
            $error_message = 'OpenAI API error';
            if (isset($data['error']['message'])) {
                $error_message = $data['error']['message'];
            }

            return new WP_Error('api_error', $error_message, array('status' => $status_code));
        }

        return $data;
    }

    /**
     * Analyze image using OpenAI Vision API (premium feature)
     *
     * @param mixed $image Image file data
     * @return string|null Image analysis or null
     */
    private function analyze_image($image) {
        // Check if user has premium access
        if (!$this->has_premium_access()) {
            return null;
        }

        // Validate image file exists
        if (!isset($image['file']) || !file_exists($image['file'])) {
            return null;
        }

        // Get image MIME type
        $mime_type = isset($image['type']) ? $image['type'] : mime_content_type($image['file']);

        // Validate supported image types for Vision API
        $supported_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($mime_type, $supported_types)) {
            return null;
        }

        // Check file size (Vision API has limits - recommended under 20MB)
        $file_size = filesize($image['file']);
        if ($file_size === false || $file_size > 20 * 1024 * 1024) {
            return null; // File too large or can't determine size
        }

        // Read and encode image to base64
        $image_data = file_get_contents($image['file']);
        if ($image_data === false) {
            return null;
        }

        $base64_image = base64_encode($image_data);

        // Additional size check for base64 data (Vision API limit is typically around 20MB)
        if (strlen($base64_image) > 30 * 1024 * 1024) { // ~20MB after base64 encoding
            return null;
        }

        return array(
            'type' => 'image_url',
            'image_url' => array(
                'url' => "data:{$mime_type};base64,{$base64_image}",
                'detail' => 'auto' // Can be 'low', 'high', or 'auto'
            )
        );
    }

    /**
     * Parse captions from OpenAI response
     *
     * @param array $response OpenAI API response
     * @return array Parsed captions
     */
    private function parse_captions($response) {
        if (!isset($response['choices'][0]['message']['content'])) {
            return new WP_Error('invalid_response', 'Invalid response from OpenAI API', array('status' => 500));
        }

        $content = trim($response['choices'][0]['message']['content']);
        $lines = explode("\n", $content);
        $captions = array();

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) {
                continue;
            }

            // Remove numbering (1., 2., etc.)
            $caption_text = preg_replace('/^\d+\.\s*/', '', $line);
            $caption_text = trim($caption_text);

            if (!empty($caption_text)) {
                $captions[] = array(
                    'text' => $caption_text,
                    'length' => mb_strlen($caption_text)
                );
            }
        }

        // Ensure we have exactly 4 captions
        while (count($captions) < 4) {
            $captions[] = array(
                'text' => 'Caption variation ' . (count($captions) + 1),
                'length' => mb_strlen('Caption variation ' . (count($captions) + 1))
            );
        }

        // Limit to 4 captions
        $captions = array_slice($captions, 0, 4);

        return array(
            'success' => true,
            'captions' => $captions,
            'usage' => isset($response['usage']) ? $response['usage'] : null
        );
    }

    /**
     * Get platform character limits
     *
     * @return array Platform limits
     */
    public function get_platform_limits() {
        return self::PLATFORM_LIMITS;
    }

    /**
     * Validate caption length for platform
     *
     * @param string $caption Caption text
     * @param string $platform Platform name
     * @return array Validation result
     */
    public function validate_caption_for_platform($caption, $platform) {
        $length = mb_strlen($caption);
        $limit = isset(self::PLATFORM_LIMITS[$platform]) ? self::PLATFORM_LIMITS[$platform] : 280;

        $ideal_limit = intval($limit * 0.8); // 80% of max is ideal

        if ($length <= $ideal_limit) {
            $status = 'good';
        } elseif ($length <= $limit) {
            $status = 'warning';
        } else {
            $status = 'error';
        }

        return array(
            'status' => $status,
            'length' => $length,
            'limit' => $limit,
            'ideal_limit' => $ideal_limit,
            'is_valid' => $length <= $limit
        );
    }

    /**
     * Get decrypted API key
     *
     * @return string|false Decrypted API key or false if not available
     */
    private function get_api_key() {
        $encrypted_key = get_option('rwp_cct_openai_api_key', '');
        if (empty($encrypted_key)) {
            return false;
        }

        return $this->decrypt_api_key($encrypted_key);
    }

    /**
     * Decrypt API key
     *
     * @param string $encrypted_key Encrypted API key
     * @return string|false Decrypted API key or false on failure
     */
    private function decrypt_api_key($encrypted_key) {
        $decoded = base64_decode($encrypted_key);
        if ($decoded === false) {
            return false;
        }

        $salt = wp_salt('auth');
        $salt_length = strlen($salt);

        if (strlen($decoded) <= $salt_length + 1) {
            return false;
        }

        $stored_salt = substr($decoded, 0, $salt_length);
        $separator = substr($decoded, $salt_length, 1);
        $api_key = substr($decoded, $salt_length + 1);

        if ($stored_salt !== $salt || $separator !== '|') {
            return false;
        }

        return $api_key;
    }
}