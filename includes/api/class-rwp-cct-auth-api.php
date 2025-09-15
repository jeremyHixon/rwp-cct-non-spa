<?php
/**
 * Authentication API for RWP Content Creator Tools
 *
 * @package ContentCreatorTools
 * @since 4.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class RWP_CCT_Auth_API
 *
 * Handles authentication endpoints for the plugin
 */
class RWP_CCT_Auth_API {

    /**
     * JWT handler instance
     *
     * @var RWP_CCT_JWT_Handler
     */
    private $jwt_handler;

    /**
     * Rate limiting cache group
     */
    const RATE_LIMIT_GROUP = 'rwp_cct_auth_rate_limit';

    /**
     * Maximum login attempts per IP per hour
     */
    const MAX_ATTEMPTS_PER_HOUR = 10;

    /**
     * Initialize authentication API
     */
    public function __construct() {
        $this->jwt_handler = new RWP_CCT_JWT_Handler();
        $this->register_routes();
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        add_action('rest_api_init', array($this, 'rwp_cct_register_auth_routes'));
    }

    /**
     * Register authentication routes
     */
    public function rwp_cct_register_auth_routes() {
        // Register endpoint
        register_rest_route('rwp-cct/v1', '/auth/register', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_register'),
            'permission_callback' => '__return_true',
            'args' => array(
                'email' => array(
                    'required' => true,
                    'validate_callback' => array($this, 'validate_email'),
                    'sanitize_callback' => 'sanitize_email'
                ),
                'password' => array(
                    'required' => true,
                    'validate_callback' => array($this, 'validate_password')
                )
            )
        ));

        // Login endpoint
        register_rest_route('rwp-cct/v1', '/auth/login', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_login'),
            'permission_callback' => '__return_true',
            'args' => array(
                'email' => array(
                    'required' => true,
                    'validate_callback' => array($this, 'validate_email'),
                    'sanitize_callback' => 'sanitize_email'
                ),
                'password' => array(
                    'required' => true
                )
            )
        ));

        // Verify endpoint
        register_rest_route('rwp-cct/v1', '/auth/verify', array(
            'methods' => 'GET',
            'callback' => array($this, 'handle_verify'),
            'permission_callback' => '__return_true'
        ));
    }

    /**
     * Handle user registration
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function handle_register($request) {
        try {
            // Check rate limiting
            if (!$this->check_rate_limit()) {
                return new WP_Error('rate_limit_exceeded', 'Too many attempts. Please try again later.', array('status' => 429));
            }

            $email = $request->get_param('email');
            $password = $request->get_param('password');

            // Check if user already exists
            if (email_exists($email)) {
                return new WP_Error('email_exists', 'An account with this email already exists.', array('status' => 400));
            }

            // Generate username from email
            $username = $this->generate_username($email);

            // Create user
            $user_id = wp_create_user($username, $password, $email);

            if (is_wp_error($user_id)) {
                return new WP_Error('user_creation_failed', 'Failed to create user account.', array('status' => 500));
            }

            // Set user role to subscriber
            $user = new WP_User($user_id);
            $user->set_role('subscriber');

            // Generate JWT token
            $payload = $this->jwt_handler->create_user_payload($user);
            $token = $this->jwt_handler->generate_token($payload);

            if (is_wp_error($token)) {
                return $token;
            }

            // Log successful registration
            error_log("RWP CCT: User registered successfully - ID: {$user_id}, Email: {$email}");

            return new WP_REST_Response(array(
                'success' => true,
                'token' => $token,
                'user' => array(
                    'id' => $user->ID,
                    'email' => $user->user_email,
                    'role' => $user->roles[0] ?? 'subscriber'
                )
            ), 201);

        } catch (Exception $e) {
            error_log("RWP CCT Registration Error: " . $e->getMessage());
            return new WP_Error('registration_failed', 'Registration failed. Please try again.', array('status' => 500));
        }
    }

    /**
     * Handle user login
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function handle_login($request) {
        try {
            // Check rate limiting
            if (!$this->check_rate_limit()) {
                return new WP_Error('rate_limit_exceeded', 'Too many attempts. Please try again later.', array('status' => 429));
            }

            $email = $request->get_param('email');
            $password = $request->get_param('password');

            // Find user by email
            $user = get_user_by('email', $email);

            if (!$user) {
                $this->record_failed_attempt();
                return new WP_Error('invalid_credentials', 'Invalid email or password.', array('status' => 401));
            }

            // Verify password
            if (!wp_check_password($password, $user->user_pass, $user->ID)) {
                $this->record_failed_attempt();
                return new WP_Error('invalid_credentials', 'Invalid email or password.', array('status' => 401));
            }

            // Generate JWT token
            $payload = $this->jwt_handler->create_user_payload($user);
            $token = $this->jwt_handler->generate_token($payload);

            if (is_wp_error($token)) {
                return $token;
            }

            // Log successful login
            error_log("RWP CCT: User logged in successfully - ID: {$user->ID}, Email: {$email}");

            return new WP_REST_Response(array(
                'success' => true,
                'token' => $token,
                'user' => array(
                    'id' => $user->ID,
                    'email' => $user->user_email,
                    'role' => $user->roles[0] ?? 'subscriber'
                )
            ), 200);

        } catch (Exception $e) {
            error_log("RWP CCT Login Error: " . $e->getMessage());
            return new WP_Error('login_failed', 'Login failed. Please try again.', array('status' => 500));
        }
    }

    /**
     * Handle token verification
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function handle_verify($request) {
        try {
            // Get token from Authorization header
            $token = $this->jwt_handler->get_token_from_header();

            if (!$token) {
                return new WP_Error('missing_token', 'Authorization token is required.', array('status' => 401));
            }

            // Validate token
            $payload = $this->jwt_handler->validate_token($token);

            if (is_wp_error($payload)) {
                return $payload;
            }

            // Verify user still exists
            $user = get_user_by('ID', $payload['user_id']);

            if (!$user) {
                return new WP_Error('user_not_found', 'User account no longer exists.', array('status' => 401));
            }

            return new WP_REST_Response(array(
                'valid' => true,
                'user' => array(
                    'id' => $user->ID,
                    'email' => $user->user_email,
                    'role' => $user->roles[0] ?? 'subscriber'
                )
            ), 200);

        } catch (Exception $e) {
            error_log("RWP CCT Token Verification Error: " . $e->getMessage());
            return new WP_Error('verification_failed', 'Token verification failed.', array('status' => 401));
        }
    }

    /**
     * Generate unique username from email
     *
     * @param string $email
     * @return string
     */
    private function generate_username($email) {
        $base_username = 'user_' . substr(md5($email), 0, 6);
        $username = $base_username;
        $counter = 1;

        // Handle username collisions
        while (username_exists($username)) {
            $username = $base_username . '_' . $counter;
            $counter++;
        }

        return $username;
    }

    /**
     * Validate email parameter
     *
     * @param string $email
     * @return bool
     */
    public function validate_email($email) {
        return is_email($email);
    }

    /**
     * Validate password parameter
     *
     * @param string $password
     * @return bool
     */
    public function validate_password($password) {
        // Minimum 8 characters
        if (strlen($password) < 8) {
            return false;
        }

        // Basic strength check - at least one letter and one number
        if (!preg_match('/[A-Za-z]/', $password) || !preg_match('/[0-9]/', $password)) {
            return false;
        }

        return true;
    }

    /**
     * Check rate limiting
     *
     * @return bool
     */
    private function check_rate_limit() {
        $ip = $this->get_client_ip();
        $cache_key = 'auth_attempts_' . md5($ip);

        $attempts = wp_cache_get($cache_key, self::RATE_LIMIT_GROUP);

        if ($attempts === false) {
            $attempts = 0;
        }

        return $attempts < self::MAX_ATTEMPTS_PER_HOUR;
    }

    /**
     * Record failed authentication attempt
     */
    private function record_failed_attempt() {
        $ip = $this->get_client_ip();
        $cache_key = 'auth_attempts_' . md5($ip);

        $attempts = wp_cache_get($cache_key, self::RATE_LIMIT_GROUP);

        if ($attempts === false) {
            $attempts = 0;
        }

        $attempts++;
        wp_cache_set($cache_key, $attempts, self::RATE_LIMIT_GROUP, 3600); // 1 hour
    }

    /**
     * Get client IP address
     *
     * @return string
     */
    private function get_client_ip() {
        $ip_keys = array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR');

        foreach ($ip_keys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (array_map('trim', explode(',', $_SERVER[$key])) as $ip) {
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                        return $ip;
                    }
                }
            }
        }

        return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    }

    /**
     * Get password strength indicator
     *
     * @param string $password
     * @return array
     */
    public function get_password_strength($password) {
        $strength = 0;
        $feedback = array();

        if (strlen($password) >= 8) {
            $strength++;
        } else {
            $feedback[] = 'Use at least 8 characters';
        }

        if (preg_match('/[a-z]/', $password)) {
            $strength++;
        } else {
            $feedback[] = 'Include lowercase letters';
        }

        if (preg_match('/[A-Z]/', $password)) {
            $strength++;
        } else {
            $feedback[] = 'Include uppercase letters';
        }

        if (preg_match('/[0-9]/', $password)) {
            $strength++;
        } else {
            $feedback[] = 'Include numbers';
        }

        if (preg_match('/[^A-Za-z0-9]/', $password)) {
            $strength++;
        } else {
            $feedback[] = 'Include special characters';
        }

        $levels = array('Very Weak', 'Weak', 'Fair', 'Good', 'Strong');
        $level = $levels[min($strength, 4)];

        return array(
            'score' => $strength,
            'level' => $level,
            'feedback' => $feedback
        );
    }
}