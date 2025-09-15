<?php

if (!defined('ABSPATH')) {
    exit;
}

class RWP_CCT_Caption_Generator_Shortcode {

    public function __construct() {
        add_shortcode('rwp_cct_caption_generator', array($this, 'render_shortcode'));
    }

    public function render_shortcode($atts) {
        // Enqueue necessary scripts and styles
        wp_enqueue_script('rwp-cct-global-auth');
        wp_enqueue_style('rwp-cct-global-auth');
        wp_enqueue_script('rwp-cct-caption-generator');

        // Create unique container ID
        $container_id = 'rwp-cct-caption-generator-' . wp_generate_uuid4();

        // Add inline script to initialize the caption generator
        $inline_script = sprintf(
            'document.addEventListener("DOMContentLoaded", function() {
                if (window.RWP_CCT_CaptionGenerator) {
                    window.RWP_CCT_CaptionGenerator.init("%s");
                }
            });',
            esc_js($container_id)
        );

        wp_add_inline_script('rwp-cct-caption-generator', $inline_script);

        return sprintf(
            '<div id="%s" class="rwp-cct-caption-generator-container"></div>',
            esc_attr($container_id)
        );
    }
}

// Initialize the shortcode
new RWP_CCT_Caption_Generator_Shortcode();