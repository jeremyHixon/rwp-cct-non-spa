<?php

if (!defined('ABSPATH')) {
    exit;
}

class RWP_CCT_Protected_Demo_Shortcode {

    public function __construct() {
        add_shortcode('rwp_cct_protected_demo', array($this, 'render_shortcode'));
    }

    public function render_shortcode($atts) {
        // Enqueue necessary scripts and styles
        wp_enqueue_script('rwp-cct-global-auth');
        wp_enqueue_style('rwp-cct-global-auth');
        wp_enqueue_script('rwp-cct-protected-demo');

        // Create unique container ID
        $container_id = 'rwp-cct-protected-demo-' . wp_generate_uuid4();

        // Add inline script to initialize the demo
        $inline_script = sprintf(
            'document.addEventListener("DOMContentLoaded", function() {
                if (window.RWP_CCT_ProtectedDemo) {
                    window.RWP_CCT_ProtectedDemo.init("%s");
                }
            });',
            esc_js($container_id)
        );

        wp_add_inline_script('rwp-cct-protected-demo', $inline_script);

        return sprintf(
            '<div id="%s" class="rwp-cct-protected-demo-container"></div>',
            esc_attr($container_id)
        );
    }
}

// Initialize the shortcode
new RWP_CCT_Protected_Demo_Shortcode();