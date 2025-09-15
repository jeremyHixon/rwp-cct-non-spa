<?php
/**
 * Global Authentication UI System
 *
 * @package ContentCreatorTools
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * RWP CCT Global Auth class
 */
class RWP_CCT_Global_Auth {

    /**
     * Constructor
     */
    public function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Register shortcodes
        add_shortcode('rwp_cct_user_header', array($this, 'rwp_cct_user_header_shortcode'));
        add_shortcode('rwp_cct_auth_modal', array($this, 'rwp_cct_auth_modal_shortcode'));

        // Auto-inject only the modal via WordPress hooks
        add_action('wp_footer', array($this, 'rwp_cct_inject_auth_modal'), 99);

        // Enqueue assets
        add_action('wp_enqueue_scripts', array($this, 'rwp_cct_enqueue_global_auth_assets'));

        // Add inline styles
        add_action('wp_head', array($this, 'rwp_cct_add_header_styles'));
    }

    /**
     * Header user element shortcode
     *
     * @param array $atts Shortcode attributes
     * @return string Shortcode output
     */
    public function rwp_cct_user_header_shortcode($atts) {
        // Parse shortcode attributes
        $atts = shortcode_atts(array(
            'theme' => 'dark',
            'style' => 'default'
        ), $atts, 'rwp_cct_user_header');

        // Generate unique ID for this instance
        $instance_id = 'rwp-cct-user-header-' . uniqid();

        // Start output buffering
        ob_start();
        ?>
        <div id="<?php echo esc_attr($instance_id); ?>"
             class="rwp-cct-user-header"
             data-theme="<?php echo esc_attr($atts['theme']); ?>"
             data-style="<?php echo esc_attr($atts['style']); ?>">
            <!-- React component will mount here -->
            <div class="rwp-cct-loading">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Authentication modal shortcode
     *
     * @param array $atts Shortcode attributes
     * @return string Shortcode output
     */
    public function rwp_cct_auth_modal_shortcode($atts) {
        // Parse shortcode attributes
        $atts = shortcode_atts(array(
            'theme' => 'dark',
            'default_form' => 'login'
        ), $atts, 'rwp_cct_auth_modal');

        // Generate unique ID for this instance
        $instance_id = 'rwp-cct-auth-modal-' . uniqid();

        // Start output buffering
        ob_start();
        ?>
        <div id="<?php echo esc_attr($instance_id); ?>"
             class="rwp-cct-auth-modal rwp-cct-modal-hidden"
             data-theme="<?php echo esc_attr($atts['theme']); ?>"
             data-default-form="<?php echo esc_attr($atts['default_form']); ?>">
            <!-- React component will mount here -->
            <div class="rwp-cct-loading">
                <div class="flex items-center justify-center min-h-[400px]">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span class="ml-3 text-gray-600">Loading...</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Auto-inject auth modal in wp_footer
     */
    public function rwp_cct_inject_auth_modal() {
        // Only inject on frontend pages
        if (is_admin()) {
            return;
        }

        // Always inject modal for global availability
        echo do_shortcode('[rwp_cct_auth_modal]');
    }

    /**
     * Enqueue global auth assets
     */
    public function rwp_cct_enqueue_global_auth_assets() {
        // Check if already enqueued
        if (wp_script_is('rwp-cct-global-auth', 'enqueued')) {
            return;
        }

        // Only enqueue on frontend
        if (is_admin()) {
            return;
        }

        // Enqueue React and ReactDOM from WordPress
        wp_enqueue_script('react');
        wp_enqueue_script('react-dom');

        // Enqueue our compiled React app
        wp_enqueue_script(
            'rwp-cct-global-auth',
            RWP_CCT_PLUGIN_URL . 'assets/dist/js/global-auth.js',
            array('react', 'react-dom'),
            RWP_CCT_VERSION,
            true
        );

        // Enqueue compiled CSS
        wp_enqueue_style(
            'rwp-cct-global-auth-styles',
            RWP_CCT_PLUGIN_URL . 'assets/dist/css/global-auth.css',
            array(),
            RWP_CCT_VERSION
        );

        // Localize script with API data
        wp_localize_script('rwp-cct-global-auth', 'rwpCctGlobalAuth', array(
            'apiUrl' => rest_url('rwp-cct/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'pluginUrl' => RWP_CCT_PLUGIN_URL,
            'currentUser' => $this->get_current_user_data(),
            'loginUrl' => wp_login_url(),
            'logoutUrl' => wp_logout_url(),
            'registerUrl' => wp_registration_url()
        ));
    }

    /**
     * Get current user data for JavaScript
     *
     * @return array|null
     */
    private function get_current_user_data() {
        if (is_user_logged_in()) {
            $user = wp_get_current_user();
            return array(
                'id' => $user->ID,
                'email' => $user->user_email,
                'displayName' => $user->display_name,
                'role' => $user->roles[0] ?? 'subscriber',
                'isLoggedIn' => true
            );
        }

        return array(
            'isLoggedIn' => false
        );
    }

    /**
     * Add inline styles for modal and header elements
     */
    public function rwp_cct_add_header_styles() {
        ?>
        <style>
        .rwp-cct-user-header {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .rwp-cct-auth-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.75);
        }

        .rwp-cct-modal-hidden {
            display: none !important;
        }

        .rwp-cct-modal-visible {
            display: flex !important;
        }

        .rwp-cct-auth-modal .modal-content {
            background: #1F2937;
            border-radius: 12px;
            padding: 72px 24px 24px;
            max-width: 450px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        .rwp-cct-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9CA3AF;
        }

        @media (max-width: 768px) {
            .rwp-cct-auth-modal .modal-content {
                padding: 20px;
            }
        }
        </style>
        <?php
    }
}