<?php
/**
 * Admin Options Page
 *
 * @package ContentCreatorTools
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * RWP CCT Admin Options Class
 */
class RWP_CCT_Admin_Options {

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
        // Only load admin functionality in admin area
        if (is_admin()) {
            add_action('admin_menu', array($this, 'add_admin_menu'));
            add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        }
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        // Add main menu page
        add_menu_page(
            __('Content Creator Tools', 'rwp-cct'),           // Page title
            __('Content Creator Tools', 'rwp-cct'),           // Menu title
            'manage_options',                                  // Capability
            'rwp-cct-options',                                // Menu slug
            array($this, 'display_main_page'),                // Callback function
            'dashicons-edit',                                 // Icon
            76                                                // Position (after Tools)
        );

        // Add settings submenu (for proper highlighting)
        add_submenu_page(
            'rwp-cct-options',                                // Parent slug
            __('Dashboard', 'rwp-cct'),                       // Page title
            __('Dashboard', 'rwp-cct'),                       // Menu title
            'manage_options',                                  // Capability
            'rwp-cct-options',                                // Menu slug (same as parent)
            array($this, 'display_main_page')                 // Callback function
        );
    }

    /**
     * Enqueue admin scripts and styles
     *
     * @param string $hook_suffix Current admin page hook suffix
     */
    public function enqueue_admin_scripts($hook_suffix) {
        // Only load on our admin pages
        if (strpos($hook_suffix, 'rwp-cct') === false) {
            return;
        }

        // Enqueue WordPress admin styles for consistent UI
        wp_enqueue_style('wp-admin');

        // Add custom admin styles
        $custom_css = '
            .rwp-cct-admin-wrap {
                max-width: 1200px;
                margin: 20px 0;
            }
            .rwp-cct-dashboard-card {
                background: #fff;
                border: 1px solid #c3c4c7;
                box-shadow: 0 1px 1px rgba(0,0,0,.04);
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
            .rwp-cct-dashboard-card h3 {
                margin-top: 0;
                color: #1d2327;
            }
            .rwp-cct-feature-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            .rwp-cct-feature-item {
                padding: 15px;
                background: #f6f7f7;
                border-radius: 4px;
                border-left: 4px solid #2271b1;
            }
            .rwp-cct-feature-item h4 {
                margin-top: 0;
                color: #1d2327;
            }
            .rwp-cct-nav-links {
                margin: 20px 0;
            }
            .rwp-cct-nav-links .button {
                margin-right: 10px;
                margin-bottom: 10px;
            }
        ';
        wp_add_inline_style('wp-admin', $custom_css);
    }

    /**
     * Display main admin page
     */
    public function display_main_page() {
        // Check user permissions
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.', 'rwp-cct'));
        }

        ?>
        <div class="wrap rwp-cct-admin-wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <?php $this->display_dashboard_content(); ?>
        </div>
        <?php
    }

    /**
     * Display dashboard content
     */
    private function display_dashboard_content() {
        ?>
        <div class="rwp-cct-dashboard-card">
            <h3><?php _e('Welcome to Content Creator Tools', 'rwp-cct'); ?></h3>
            <p><?php _e('Advanced tools for content creators with workflow automation and AI-powered features.', 'rwp-cct'); ?></p>

            <div class="rwp-cct-nav-links">
                <a href="<?php echo esc_url(admin_url('admin.php?page=rwp-cct-openai-settings')); ?>" class="button button-primary">
                    <?php _e('OpenAI Settings', 'rwp-cct'); ?>
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=rwp-cct-options')); ?>" class="button">
                    <?php _e('General Settings', 'rwp-cct'); ?>
                </a>
            </div>
        </div>

        <div class="rwp-cct-dashboard-card">
            <h3><?php _e('Plugin Information', 'rwp-cct'); ?></h3>
            <div class="rwp-cct-feature-grid">
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Version', 'rwp-cct'); ?></h4>
                    <p><?php echo esc_html(RWP_CCT_VERSION); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Status', 'rwp-cct'); ?></h4>
                    <p><?php _e('Active and running', 'rwp-cct'); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('User Role System', 'rwp-cct'); ?></h4>
                    <p><?php _e('Custom premium roles configured', 'rwp-cct'); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Security Layer', 'rwp-cct'); ?></h4>
                    <p><?php _e('SPA user protection active', 'rwp-cct'); ?></p>
                </div>
            </div>
        </div>

        <div class="rwp-cct-dashboard-card">
            <h3><?php _e('Available Features', 'rwp-cct'); ?></h3>
            <div class="rwp-cct-feature-grid">
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('AI-Powered Content', 'rwp-cct'); ?></h4>
                    <p><?php _e('Generate captions and content using OpenAI models for both text and image analysis.', 'rwp-cct'); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('User Authentication', 'rwp-cct'); ?></h4>
                    <p><?php _e('JWT-based authentication system for SPA applications with custom role management.', 'rwp-cct'); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Protected Content', 'rwp-cct'); ?></h4>
                    <p><?php _e('Shortcodes for member-only content with flexible access control.', 'rwp-cct'); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Workflow Automation', 'rwp-cct'); ?></h4>
                    <p><?php _e('Streamlined content creation workflows with integrated AI assistance.', 'rwp-cct'); ?></p>
                </div>
            </div>
        </div>

        <?php $this->display_quick_stats(); ?>
        <?php
    }

    /**
     * Display quick stats
     */
    private function display_quick_stats() {
        // Get some basic stats
        $total_users = count_users();
        $premium_users = get_users(array('role' => 'rwp_cct_premium', 'fields' => 'ID'));
        $openai_configured = get_option('rwp_cct_openai_api_key') ? true : false;

        ?>
        <div class="rwp-cct-dashboard-card">
            <h3><?php _e('Quick Stats', 'rwp-cct'); ?></h3>
            <div class="rwp-cct-feature-grid">
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Total Users', 'rwp-cct'); ?></h4>
                    <p><?php echo esc_html($total_users['total_users']); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Premium Users', 'rwp-cct'); ?></h4>
                    <p><?php echo esc_html(count($premium_users)); ?></p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('OpenAI Configuration', 'rwp-cct'); ?></h4>
                    <p>
                        <?php if ($openai_configured): ?>
                            <span style="color: #00a32a;">✓ <?php _e('Configured', 'rwp-cct'); ?></span>
                        <?php else: ?>
                            <span style="color: #d63638;">✗ <?php _e('Not configured', 'rwp-cct'); ?></span>
                            <br>
                            <a href="<?php echo esc_url(admin_url('admin.php?page=rwp-cct-openai-settings')); ?>">
                                <?php _e('Configure now', 'rwp-cct'); ?>
                            </a>
                        <?php endif; ?>
                    </p>
                </div>
                <div class="rwp-cct-feature-item">
                    <h4><?php _e('Plugin Activated', 'rwp-cct'); ?></h4>
                    <p>
                        <?php
                        $activated_time = get_option('rwp_cct_activated_time');
                        if ($activated_time) {
                            echo esc_html(date_i18n(get_option('date_format'), $activated_time));
                        } else {
                            _e('Unknown', 'rwp-cct');
                        }
                        ?>
                    </p>
                </div>
            </div>
        </div>
        <?php
    }
}