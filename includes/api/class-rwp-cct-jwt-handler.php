<?php
/**
 * JWT Token Handler for RWP Content Creator Tools
 *
 * @package ContentCreatorTools
 * @since 4.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class RWP_CCT_JWT_Handler
 *
 * Handles JWT token generation and validation using WordPress native functions
 */
class RWP_CCT_JWT_Handler {

    /**
     * JWT secret key option name
     */
    const SECRET_KEY_OPTION = 'rwp_cct_jwt_secret';

    /**
     * Token expiration time (24 hours in seconds)
     */
    const TOKEN_EXPIRATION = 86400;

    /**
     * Initialize JWT handler
     */
    public function __construct() {
        $this->ensure_secret_key();
    }

    /**
     * Ensure JWT secret key exists
     */
    private function ensure_secret_key() {
        if (!get_option(self::SECRET_KEY_OPTION)) {
            $secret = $this->generate_secret_key();
            update_option(self::SECRET_KEY_OPTION, $secret);
        }
    }

    /**
     * Generate a secure random secret key
     *
     * @return string
     */
    private function generate_secret_key() {
        return wp_generate_password(64, true, true);
    }

    /**
     * Get JWT secret key
     *
     * @return string
     */
    private function get_secret_key() {
        return get_option(self::SECRET_KEY_OPTION);
    }

    /**
     * Base64 URL encode
     *
     * @param string $data
     * @return string
     */
    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64 URL decode
     *
     * @param string $data
     * @return string
     */
    private function base64url_decode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }

    /**
     * Generate JWT token
     *
     * @param array $payload Token payload
     * @return string|WP_Error
     */
    public function generate_token($payload) {
        try {
            $header = array(
                'typ' => 'JWT',
                'alg' => 'HS256'
            );

            // Add standard claims
            $now = time();
            $payload['iat'] = $now; // Issued at
            $payload['exp'] = $now + self::TOKEN_EXPIRATION; // Expiration
            $payload['iss'] = get_site_url(); // Issuer

            $header_encoded = $this->base64url_encode(wp_json_encode($header));
            $payload_encoded = $this->base64url_encode(wp_json_encode($payload));

            $signature = hash_hmac('sha256', $header_encoded . '.' . $payload_encoded, $this->get_secret_key(), true);
            $signature_encoded = $this->base64url_encode($signature);

            return $header_encoded . '.' . $payload_encoded . '.' . $signature_encoded;

        } catch (Exception $e) {
            return new WP_Error('jwt_generation_failed', 'Failed to generate JWT token', array('status' => 500));
        }
    }

    /**
     * Validate and decode JWT token
     *
     * @param string $token JWT token
     * @return array|WP_Error
     */
    public function validate_token($token) {
        if (empty($token)) {
            return new WP_Error('jwt_empty_token', 'Token is required', array('status' => 401));
        }

        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return new WP_Error('jwt_invalid_format', 'Invalid token format', array('status' => 401));
        }

        list($header_encoded, $payload_encoded, $signature_encoded) = $parts;

        try {
            // Decode header and payload
            $header = json_decode($this->base64url_decode($header_encoded), true);
            $payload = json_decode($this->base64url_decode($payload_encoded), true);

            if (!$header || !$payload) {
                return new WP_Error('jwt_decode_failed', 'Failed to decode token', array('status' => 401));
            }

            // Verify algorithm
            if (!isset($header['alg']) || $header['alg'] !== 'HS256') {
                return new WP_Error('jwt_invalid_algorithm', 'Invalid token algorithm', array('status' => 401));
            }

            // Verify signature
            $expected_signature = hash_hmac('sha256', $header_encoded . '.' . $payload_encoded, $this->get_secret_key(), true);
            $provided_signature = $this->base64url_decode($signature_encoded);

            if (!hash_equals($expected_signature, $provided_signature)) {
                return new WP_Error('jwt_invalid_signature', 'Invalid token signature', array('status' => 401));
            }

            // Check expiration
            if (isset($payload['exp']) && $payload['exp'] < time()) {
                return new WP_Error('jwt_token_expired', 'Token has expired', array('status' => 401));
            }

            // Check issuer
            if (isset($payload['iss']) && $payload['iss'] !== get_site_url()) {
                return new WP_Error('jwt_invalid_issuer', 'Invalid token issuer', array('status' => 401));
            }

            return $payload;

        } catch (Exception $e) {
            return new WP_Error('jwt_validation_failed', 'Token validation failed', array('status' => 401));
        }
    }

    /**
     * Extract token from Authorization header
     *
     * @return string|null
     */
    public function get_token_from_header() {
        $headers = getallheaders();

        if (isset($headers['Authorization'])) {
            $auth_header = $headers['Authorization'];
        } elseif (isset($headers['authorization'])) {
            $auth_header = $headers['authorization'];
        } else {
            return null;
        }

        if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Create user payload for JWT
     *
     * @param WP_User $user
     * @return array
     */
    public function create_user_payload($user) {
        return array(
            'user_id' => $user->ID,
            'email' => $user->user_email,
            'role' => $user->roles[0] ?? 'subscriber'
        );
    }

    /**
     * Generate secret key for JWT (for activation hook)
     *
     * @return string
     */
    public static function generate_jwt_secret() {
        $secret = wp_generate_password(64, true, true);
        update_option(self::SECRET_KEY_OPTION, $secret);
        return $secret;
    }
}