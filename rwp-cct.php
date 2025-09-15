<?php
/**
 * Plugin Name: RWP CCT
 * Description: Advanced tools for content creators. Workflow automation.
 * Version: 4.0.0
 * Author: Jeremy Hixon
 * Author URI: https://jeremyhixon.com
 * Text Domain: rwp-cct
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.3
 * Requires PHP: 7.4
 * Network: false
 *
 * @package ContentCreatorTools
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('RWP_CCT_VERSION', '4.0.0');
define('RWP_CCT_PLUGIN_FILE', __FILE__);
define('RWP_CCT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RWP_CCT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('RWP_CCT_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main plugin class
 */
class RWP_CCT_Plugin {

    /**
     * Plugin instance
     *
     * @var RWP_CCT_Plugin
     */
    private static $instance = null;

    /**
     * Get plugin instance
     *
     * @return RWP_CCT_Plugin
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->init();
    }

    /**
     * Initialize plugin
     */
    private function init() {
        // Hook into WordPress
        add_action('init', array($this, 'rwp_cct_init'));

        // Load plugin textdomain
        add_action('plugins_loaded', array($this, 'rwp_cct_load_textdomain'));

        // Register activation/deactivation hooks
        register_activation_hook(__FILE__, array($this, 'rwp_cct_activate'));
        register_deactivation_hook(__FILE__, array($this, 'rwp_cct_deactivate'));
    }

    /**
     * Plugin initialization
     */
    public function rwp_cct_init() {
        // Load includes
        $this->rwp_cct_load_includes();

        // Initialize plugin components
        do_action('rwp_cct_init');
    }

    /**
     * Load required files
     */
    private function rwp_cct_load_includes() {
        // Load shortcodes class
        require_once RWP_CCT_PLUGIN_DIR . 'includes/frontend/class-shortcodes.php';
        new RWP_CCT_Shortcodes();

        // Load global auth class
        require_once RWP_CCT_PLUGIN_DIR . 'includes/frontend/class-global-auth.php';
        new RWP_CCT_Global_Auth();

        // Load API classes
        require_once RWP_CCT_PLUGIN_DIR . 'includes/api/class-rwp-cct-jwt-handler.php';
        require_once RWP_CCT_PLUGIN_DIR . 'includes/api/class-rwp-cct-auth-api.php';
        new RWP_CCT_Auth_API();

        // Load security class
        require_once RWP_CCT_PLUGIN_DIR . 'includes/class-rwp-cct-security.php';
        new RWP_CCT_Security();

        // Load protected demo shortcode
        require_once RWP_CCT_PLUGIN_DIR . 'includes/shortcodes/class-rwp-cct-protected-demo.php';

        // Load caption generator shortcode
        require_once RWP_CCT_PLUGIN_DIR . 'includes/shortcodes/class-rwp-cct-caption-generator-shortcode.php';

        // Load admin classes (only in admin area)
        if (is_admin()) {
            require_once RWP_CCT_PLUGIN_DIR . 'includes/admin/class-rwp-cct-admin-options.php';
            require_once RWP_CCT_PLUGIN_DIR . 'includes/admin/class-rwp-cct-openai-settings.php';
            new RWP_CCT_Admin_Options();
            new RWP_CCT_OpenAI_Settings();
        }
    }

    /**
     * Load plugin textdomain
     */
    public function rwp_cct_load_textdomain() {
        load_plugin_textdomain(
            'rwp-cct',
            false,
            dirname(plugin_basename(__FILE__)) . '/languages'
        );
    }

    /**
     * Plugin activation
     */
    public function rwp_cct_activate() {
        // Flush rewrite rules
        flush_rewrite_rules();

        // Store activation time
        update_option('rwp_cct_activated_time', current_time('timestamp'));

        // Generate JWT secret key
        if (!get_option('rwp_cct_jwt_secret')) {
            require_once RWP_CCT_PLUGIN_DIR . 'includes/api/class-rwp-cct-jwt-handler.php';
            RWP_CCT_JWT_Handler::generate_jwt_secret();
        }

        // Create Premium role
        $this->rwp_cct_create_premium_role();

        do_action('rwp_cct_activated');
    }

    /**
     * Plugin deactivation
     */
    public function rwp_cct_deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();

        // Remove Premium role
        $this->rwp_cct_remove_premium_role();

        do_action('rwp_cct_deactivated');
    }

    /**
     * Create Premium role
     */
    private function rwp_cct_create_premium_role() {
        // Check if subscriber role exists
        $subscriber_role = get_role('subscriber');
        if (!$subscriber_role) {
            return;
        }

        // Get subscriber capabilities as base
        $subscriber_caps = $subscriber_role->capabilities;

        // Add premium-specific capabilities
        $premium_caps = array_merge($subscriber_caps, [
            'access_premium_features' => true,
            'rwp_cct_premium_access' => true
        ]);

        // Create the premium role if it doesn't exist
        if (!get_role('rwp_cct_premium')) {
            add_role('rwp_cct_premium', 'Premium', $premium_caps);
        }
    }

    /**
     * Remove Premium role
     */
    private function rwp_cct_remove_premium_role() {
        remove_role('rwp_cct_premium');
    }
}

// Initialize the plugin
RWP_CCT_Plugin::get_instance();