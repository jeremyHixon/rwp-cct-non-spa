<?php

if (!defined('ABSPATH')) {
    exit;
}

class RWP_CCT_Tools_Post_Type {

    const POST_TYPE = 'rwp_cct_tools';

    public function __construct() {
        // Register post type immediately if init has already fired, otherwise hook into it
        if (did_action('init')) {
            $this->register_post_type();
        } else {
            add_action('init', array($this, 'register_post_type'));
        }
        add_filter('manage_' . self::POST_TYPE . '_posts_columns', array($this, 'add_custom_columns'));
        add_action('manage_' . self::POST_TYPE . '_posts_custom_column', array($this, 'custom_column_content'), 10, 2);
        add_action('quick_edit_custom_box', array($this, 'quick_edit_custom_box'), 10, 2);
        add_action('save_post', array($this, 'save_quick_edit_fields'));
        add_action('admin_footer', array($this, 'quick_edit_javascript'));
    }

    public function register_post_type() {
        $labels = array(
            'name'               => _x('Tools', 'post type general name', 'rwp-cct'),
            'singular_name'      => _x('Tool', 'post type singular name', 'rwp-cct'),
            'menu_name'          => _x('Tools', 'admin menu', 'rwp-cct'),
            'name_admin_bar'     => _x('Tool', 'add new on admin bar', 'rwp-cct'),
            'add_new'            => _x('Add New', 'tool', 'rwp-cct'),
            'add_new_item'       => __('Add New Tool', 'rwp-cct'),
            'new_item'           => __('New Tool', 'rwp-cct'),
            'edit_item'          => __('Edit Tool', 'rwp-cct'),
            'view_item'          => __('View Tool', 'rwp-cct'),
            'all_items'          => __('All Tools', 'rwp-cct'),
            'search_items'       => __('Search Tools', 'rwp-cct'),
            'parent_item_colon'  => __('Parent Tools:', 'rwp-cct'),
            'not_found'          => __('No tools found.', 'rwp-cct'),
            'not_found_in_trash' => __('No tools found in Trash.', 'rwp-cct')
        );

        $args = array(
            'labels'             => $labels,
            'description'        => __('Content Creator Tools', 'rwp-cct'),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array('slug' => 'tools'),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 21,
            'menu_icon'          => 'dashicons-admin-tools',
            'supports'           => array('title', 'editor', 'excerpt', 'thumbnail')
        );

        register_post_type(self::POST_TYPE, $args);
    }


    public function add_custom_columns($columns) {
        $new_columns = array();
        foreach ($columns as $key => $value) {
            $new_columns[$key] = $value;
            if ($key === 'title') {
                $new_columns['status'] = __('Status', 'rwp-cct');
                $new_columns['premium'] = __('Premium', 'rwp-cct');
                $new_columns['shortcode'] = __('Shortcode', 'rwp-cct');
            }
        }
        return $new_columns;
    }

    public function custom_column_content($column, $post_id) {
        switch ($column) {
            case 'status':
                $status = get_post_meta($post_id, 'rwp_cct_tool_status', true);
                if (empty($status)) {
                    $status = 'active';
                }
                $status_class = ($status === 'active') ? 'status-active' : 'status-inactive';
                echo '<span class="' . esc_attr($status_class) . '">' . esc_html(ucfirst($status)) . '</span>';
                break;

            case 'premium':
                $premium = get_post_meta($post_id, 'rwp_cct_tool_premium', true);
                if ($premium === '1') {
                    echo '<span class="dashicons dashicons-star-filled" style="color: #f5c100;" title="' . __('Premium Required', 'rwp-cct') . '"></span>';
                } else {
                    echo '<span class="dashicons dashicons-star-empty" style="color: #ccc;" title="' . __('Free Tool', 'rwp-cct') . '"></span>';
                }
                break;

            case 'shortcode':
                $shortcode = get_post_meta($post_id, 'rwp_cct_tool_shortcode', true);
                if (!empty($shortcode)) {
                    echo '<code>' . esc_html($shortcode) . '</code>';
                } else {
                    echo '<em>' . __('No shortcode', 'rwp-cct') . '</em>';
                }
                break;
        }
    }

    public function quick_edit_custom_box($column_name, $screen) {
        if ($screen !== self::POST_TYPE) {
            return;
        }

        static $print_nonce = true;
        if ($print_nonce) {
            $print_nonce = false;
            wp_nonce_field('rwp_cct_tool_quick_edit', 'rwp_cct_tool_quick_edit_nonce');
        }

        ?>
        <fieldset class="inline-edit-col-right inline-edit-book">
            <div class="inline-edit-col column-<?php echo esc_attr($column_name); ?>">
                <label class="inline-edit-status alignleft">
                    <span class="title"><?php _e('Status', 'rwp-cct'); ?></span>
                    <select name="rwp_cct_tool_status">
                        <option value="active"><?php _e('Active', 'rwp-cct'); ?></option>
                        <option value="inactive"><?php _e('Inactive', 'rwp-cct'); ?></option>
                    </select>
                </label>

                <label class="inline-edit-premium alignleft">
                    <input type="checkbox" name="rwp_cct_tool_premium" value="1" />
                    <span class="checkbox-title"><?php _e('Premium Required', 'rwp-cct'); ?></span>
                </label>
            </div>
        </fieldset>
        <?php
    }

    public function save_quick_edit_fields($post_id) {
        if (!isset($_POST['rwp_cct_tool_quick_edit_nonce']) || !wp_verify_nonce($_POST['rwp_cct_tool_quick_edit_nonce'], 'rwp_cct_tool_quick_edit')) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (get_post_type($post_id) !== self::POST_TYPE) {
            return;
        }

        if (isset($_POST['rwp_cct_tool_status'])) {
            update_post_meta($post_id, 'rwp_cct_tool_status', sanitize_text_field($_POST['rwp_cct_tool_status']));
        }

        update_post_meta($post_id, 'rwp_cct_tool_premium', isset($_POST['rwp_cct_tool_premium']) ? '1' : '0');
    }

    public function quick_edit_javascript() {
        global $current_screen;

        if ($current_screen->post_type !== self::POST_TYPE) {
            return;
        }
        ?>
        <script type="text/javascript">
        jQuery(function($) {
            var $wp_inline_edit = inlineEditPost.edit;
            inlineEditPost.edit = function(id) {
                $wp_inline_edit.apply(this, arguments);

                var postId = 0;
                if (typeof(id) == 'object') {
                    postId = parseInt(this.getId(id));
                }

                if (postId > 0) {
                    var editRow = $('#edit-' + postId);
                    var postRow = $('#post-' + postId);

                    var status = $('.column-status', postRow).text().toLowerCase();
                    $('select[name="rwp_cct_tool_status"]', editRow).val(status);

                    var isPremium = $('.dashicons-star-filled', postRow).length > 0;
                    $('input[name="rwp_cct_tool_premium"]', editRow).prop('checked', isPremium);
                }
            };
        });
        </script>
        <style>
        .status-active { color: #46b450; font-weight: bold; }
        .status-inactive { color: #dc3232; font-weight: bold; }
        </style>
        <?php
    }
}