<?php
/**
 * Security Class - WordPress Login Blocking for SPA Users
 *
 * @package ContentCreatorTools
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * RWP CCT Security Class
 */
class RWP_CCT_Security {

    /**
     * Constructor
     */
    public function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize security hooks
     */
    private function init_hooks() {
        // Block wp-login.php access for SPA-only roles
        add_action('wp_login', array($this, 'block_spa_user_wp_login'), 10, 2);

        // Block wp-admin access for SPA-only roles
        add_action('admin_init', array($this, 'block_spa_user_admin_access'));

        // Display error messages
        add_action('wp_head', array($this, 'display_login_block_message'));
    }

    /**
     * Block wp-login.php access for SPA-only roles
     *
     * @param string $user_login Username
     * @param WP_User $user User object
     */
    public function block_spa_user_wp_login($user_login, $user) {
        // Get user roles
        $user_roles = $user->roles;

        // Define SPA-only roles that should not access wp-admin
        $spa_only_roles = ['subscriber', 'rwp_cct_premium'];

        // Check if user has any SPA-only role
        $has_spa_role = !empty(array_intersect($user_roles, $spa_only_roles));

        // If user has SPA-only role and no admin roles
        if ($has_spa_role && !array_intersect($user_roles, ['contributor', 'author', 'editor', 'administrator'])) {
            // Log them out immediately
            wp_logout();

            // Redirect to site homepage with error message
            wp_redirect(home_url('/?login_error=spa_user'));
            exit;
        }
    }

    /**
     * Block wp-admin access for SPA-only roles
     */
    public function block_spa_user_admin_access() {
        // Skip AJAX requests
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return;
        }

        $current_user = wp_get_current_user();

        // If user is logged in, check their roles
        if ($current_user->ID > 0) {
            $user_roles = $current_user->roles;
            $spa_only_roles = ['subscriber', 'rwp_cct_premium'];

            // Check if user has only SPA roles
            $has_spa_role = !empty(array_intersect($user_roles, $spa_only_roles));

            if ($has_spa_role && !array_intersect($user_roles, ['contributor', 'author', 'editor', 'administrator'])) {
                wp_logout();
                wp_redirect(home_url('/?admin_error=spa_user'));
                exit;
            }
        }
    }

    /**
     * Display error message on homepage for blocked login attempts
     */
    public function display_login_block_message() {
        if (isset($_GET['login_error']) && $_GET['login_error'] === 'spa_user') {
            echo '<script>
                document.addEventListener("DOMContentLoaded", function() {
                    alert("Please use the site\'s login system instead of WordPress admin login.");
                });
            </script>';
        }

        if (isset($_GET['admin_error']) && $_GET['admin_error'] === 'spa_user') {
            echo '<script>
                document.addEventListener("DOMContentLoaded", function() {
                    alert("Access to WordPress admin is restricted for your account type.");
                });
            </script>';
        }
    }
}