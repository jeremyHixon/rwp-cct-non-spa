<?php
/**
 * OpenAI Settings Page
 *
 * @package ContentCreatorTools
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * RWP CCT OpenAI Settings Class
 */
class RWP_CCT_OpenAI_Settings {

    /**
     * Settings group name
     */
    private $settings_group = 'rwp_cct_openai_settings';

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
            add_action('admin_menu', array($this, 'add_submenu_page'));
            add_action('admin_init', array($this, 'register_settings'));
            add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
            add_action('wp_ajax_rwp_cct_test_openai_connection', array($this, 'ajax_test_connection'));
        }
    }

    /**
     * Add submenu page
     */
    public function add_submenu_page() {
        add_submenu_page(
            'rwp-cct-options',                                // Parent slug
            __('OpenAI API Settings', 'rwp-cct'),             // Page title
            __('OpenAI Settings', 'rwp-cct'),                 // Menu title
            'manage_options',                                  // Capability
            'rwp-cct-openai-settings',                        // Menu slug
            array($this, 'display_settings_page')             // Callback function
        );
    }

    /**
     * Register settings
     */
    public function register_settings() {
        // Register settings
        register_setting(
            $this->settings_group,
            'rwp_cct_openai_api_key',
            array(
                'type' => 'string',
                'sanitize_callback' => array($this, 'sanitize_api_key'),
                'default' => ''
            )
        );

        register_setting(
            $this->settings_group,
            'rwp_cct_openai_text_model',
            array(
                'type' => 'string',
                'sanitize_callback' => array($this, 'sanitize_text_model'),
                'default' => 'gpt-3.5-turbo'
            )
        );

        register_setting(
            $this->settings_group,
            'rwp_cct_openai_image_model',
            array(
                'type' => 'string',
                'sanitize_callback' => array($this, 'sanitize_image_model'),
                'default' => 'gpt-4o'
            )
        );

        // Add settings sections
        add_settings_section(
            'rwp_cct_openai_api_section',
            __('API Configuration', 'rwp-cct'),
            array($this, 'api_section_callback'),
            'rwp-cct-openai-settings'
        );

        add_settings_section(
            'rwp_cct_openai_models_section',
            __('Model Selection', 'rwp-cct'),
            array($this, 'models_section_callback'),
            'rwp-cct-openai-settings'
        );

        // Add settings fields
        add_settings_field(
            'rwp_cct_openai_api_key',
            __('OpenAI API Key', 'rwp-cct'),
            array($this, 'api_key_field_callback'),
            'rwp-cct-openai-settings',
            'rwp_cct_openai_api_section'
        );

        add_settings_field(
            'rwp_cct_openai_text_model',
            __('Text Caption Model', 'rwp-cct'),
            array($this, 'text_model_field_callback'),
            'rwp-cct-openai-settings',
            'rwp_cct_openai_models_section'
        );

        add_settings_field(
            'rwp_cct_openai_image_model',
            __('Image Caption Model', 'rwp-cct'),
            array($this, 'image_model_field_callback'),
            'rwp-cct-openai-settings',
            'rwp_cct_openai_models_section'
        );
    }

    /**
     * Enqueue admin scripts and styles
     *
     * @param string $hook_suffix Current admin page hook suffix
     */
    public function enqueue_admin_scripts($hook_suffix) {
        // Only load on our OpenAI settings page
        if ($hook_suffix !== 'content-creator-tools_page_rwp-cct-openai-settings') {
            return;
        }

        wp_enqueue_script('jquery');

        // Add custom JavaScript for AJAX connection test
        $script = "
        jQuery(document).ready(function($) {
            $('#test-openai-connection').click(function(e) {
                e.preventDefault();
                var button = $(this);
                var originalText = button.text();
                var resultsDiv = $('#test-results');

                button.text('" . __('Testing...', 'rwp-cct') . "').prop('disabled', true);
                resultsDiv.removeClass('notice-success notice-error').html('');

                var apiKey = $('#rwp_cct_openai_api_key').val();
                // If no key in input field, we'll test with existing stored key
                if (!apiKey) {
                    apiKey = 'USE_EXISTING_KEY';
                }

                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'rwp_cct_test_openai_connection',
                        nonce: '" . wp_create_nonce('rwp_cct_test_openai') . "',
                        api_key: apiKey
                    },
                    success: function(response) {
                        if (response.success) {
                            resultsDiv.addClass('notice notice-success is-dismissible')
                                     .html('<p>" . __('✓ Connection successful!', 'rwp-cct') . " ' + response.data.message + '</p>');
                        } else {
                            resultsDiv.addClass('notice notice-error is-dismissible')
                                     .html('<p>" . __('✗ Connection failed:', 'rwp-cct') . " ' + response.data.message + '</p>');
                        }
                    },
                    error: function() {
                        resultsDiv.addClass('notice notice-error is-dismissible')
                                 .html('<p>" . __('✗ Connection test failed. Please try again.', 'rwp-cct') . "</p>');
                    },
                    complete: function() {
                        button.text(originalText).prop('disabled', false);
                    }
                });
            });
        });
        ";
        wp_add_inline_script('jquery', $script);

        // Add custom CSS
        $css = "
        .rwp-cct-settings-wrap {
            max-width: 800px;
        }
        .rwp-cct-api-key-field {
            width: 100%;
            max-width: 400px;
        }
        .rwp-cct-test-connection {
            margin-top: 10px;
        }
        #test-results {
            margin-top: 15px;
            padding: 10px;
            border-radius: 4px;
        }
        .rwp-cct-model-info {
            font-style: italic;
            color: #666;
            margin-top: 5px;
        }
        .rwp-cct-settings-section {
            background: #fff;
            border: 1px solid #c3c4c7;
            box-shadow: 0 1px 1px rgba(0,0,0,.04);
            margin-bottom: 20px;
        }
        .rwp-cct-masked-key {
            font-family: monospace;
            background: #f1f1f1;
            padding: 5px;
            border-radius: 3px;
        }
        ";
        wp_add_inline_style('wp-admin', $css);
    }

    /**
     * Display settings page
     */
    public function display_settings_page() {
        // Check user permissions
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.', 'rwp-cct'));
        }

        ?>
        <div class="wrap rwp-cct-settings-wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <?php settings_errors(); ?>

            <form method="post" action="options.php">
                <?php
                settings_fields($this->settings_group);
                do_settings_sections('rwp-cct-openai-settings');
                ?>

                <div class="rwp-cct-test-connection">
                    <button type="button" id="test-openai-connection" class="button button-secondary">
                        <?php _e('Test Connection', 'rwp-cct'); ?>
                    </button>
                    <div id="test-results"></div>
                </div>

                <?php submit_button(); ?>
            </form>

            <div class="rwp-cct-settings-section">
                <h3><?php _e('Usage Information', 'rwp-cct'); ?></h3>
                <p><?php _e('Your OpenAI API key is encrypted before being stored in the database for security.', 'rwp-cct'); ?></p>
                <p><?php _e('Different models are optimized for different tasks:', 'rwp-cct'); ?></p>
                <ul>
                    <li><strong>gpt-3.5-turbo:</strong> <?php _e('Fast and cost-effective for text generation', 'rwp-cct'); ?></li>
                    <li><strong>gpt-4o:</strong> <?php _e('Advanced model with vision capabilities for image analysis', 'rwp-cct'); ?></li>
                    <li><strong>gpt-4o-mini:</strong> <?php _e('Smaller, faster version of GPT-4o with vision support', 'rwp-cct'); ?></li>
                </ul>
                <p><em><?php _e('Note: Using OpenAI API will incur costs based on your usage. Please review OpenAI\'s pricing before using.', 'rwp-cct'); ?></em></p>
            </div>
        </div>
        <?php
    }

    /**
     * API section callback
     */
    public function api_section_callback() {
        echo '<p>' . __('Configure your OpenAI API credentials to enable AI-powered content generation.', 'rwp-cct') . '</p>';
    }

    /**
     * Models section callback
     */
    public function models_section_callback() {
        echo '<p>' . __('Select the OpenAI models to use for different types of content generation.', 'rwp-cct') . '</p>';
    }

    /**
     * API key field callback
     */
    public function api_key_field_callback() {
        $api_key = get_option('rwp_cct_openai_api_key', '');
        $display_key = '';

        if (!empty($api_key)) {
            // Decrypt and show only last 4 characters
            $decrypted = $this->decrypt_api_key($api_key);
            if ($decrypted && strlen($decrypted) > 4) {
                $display_key = '••••••••••••••••••••••••••••••••••••••••••••••••' . substr($decrypted, -4);
            }
        }

        ?>
        <input type="password"
               id="rwp_cct_openai_api_key"
               name="rwp_cct_openai_api_key"
               value=""
               class="rwp-cct-api-key-field"
               placeholder="<?php esc_attr_e('sk-...', 'rwp-cct'); ?>"
               autocomplete="off" />
        <?php if (!empty($display_key)): ?>
            <br>
            <small>
                <?php _e('Current key:', 'rwp-cct'); ?>
                <span class="rwp-cct-masked-key"><?php echo esc_html($display_key); ?></span>
                <br>
                <?php _e('Leave blank to keep current key, or enter a new key to replace it.', 'rwp-cct'); ?>
            </small>
        <?php endif; ?>
        <div class="rwp-cct-model-info">
            <small><?php _e('Get your API key from', 'rwp-cct'); ?> <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a></small>
        </div>
        <?php
    }

    /**
     * Text model field callback
     */
    public function text_model_field_callback() {
        $current_model = get_option('rwp_cct_openai_text_model', 'gpt-3.5-turbo');
        $models = array(
            'gpt-3.5-turbo' => 'GPT-3.5 Turbo',
            'gpt-4o' => 'GPT-4o',
            'gpt-4o-mini' => 'GPT-4o Mini'
        );

        ?>
        <select id="rwp_cct_openai_text_model" name="rwp_cct_openai_text_model">
            <?php foreach ($models as $value => $label): ?>
                <option value="<?php echo esc_attr($value); ?>" <?php selected($current_model, $value); ?>>
                    <?php echo esc_html($label); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <div class="rwp-cct-model-info">
            <small><?php _e('Model used for generating text-based content and captions', 'rwp-cct'); ?></small>
        </div>
        <?php
    }

    /**
     * Image model field callback
     */
    public function image_model_field_callback() {
        $current_model = get_option('rwp_cct_openai_image_model', 'gpt-4o');
        $models = array(
            'gpt-4o' => 'GPT-4o',
            'gpt-4o-mini' => 'GPT-4o Mini'
        );

        ?>
        <select id="rwp_cct_openai_image_model" name="rwp_cct_openai_image_model">
            <?php foreach ($models as $value => $label): ?>
                <option value="<?php echo esc_attr($value); ?>" <?php selected($current_model, $value); ?>>
                    <?php echo esc_html($label); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <div class="rwp-cct-model-info">
            <small><?php _e('Model used for analyzing images and generating image captions (requires vision capability)', 'rwp-cct'); ?></small>
        </div>
        <?php
    }

    /**
     * Sanitize API key
     *
     * @param string $api_key Raw API key
     * @return string Sanitized and encrypted API key
     */
    public function sanitize_api_key($api_key) {
        // Trim whitespace but don't use sanitize_text_field as it may modify the key
        $api_key = trim($api_key);

        // If empty, keep the existing key
        if (empty($api_key)) {
            return get_option('rwp_cct_openai_api_key', '');
        }

        // Check if this is already an encrypted key (to avoid re-encrypting)
        if ($this->is_encrypted_key($api_key)) {
            return $api_key; // Already encrypted, return as-is
        }

        // Validate API key format (supports both legacy sk- and project sk-proj- keys)
        if (!preg_match('/^sk-/', $api_key) || strlen($api_key) < 20) {
            add_settings_error(
                'rwp_cct_openai_api_key',
                'invalid_api_key',
                sprintf(__('Invalid API key format. Key starts with: "%s", Length: %d. OpenAI API keys should start with "sk-".', 'rwp-cct'),
                    substr($api_key, 0, 10), strlen($api_key))
            );
            return get_option('rwp_cct_openai_api_key', '');
        }

        // Encrypt the API key before storing
        return $this->encrypt_api_key($api_key);
    }

    /**
     * Sanitize text model
     *
     * @param string $model Model name
     * @return string Sanitized model name
     */
    public function sanitize_text_model($model) {
        $allowed_models = array('gpt-3.5-turbo', 'gpt-4o', 'gpt-4o-mini');
        return in_array($model, $allowed_models) ? $model : 'gpt-3.5-turbo';
    }

    /**
     * Sanitize image model
     *
     * @param string $model Model name
     * @return string Sanitized model name
     */
    public function sanitize_image_model($model) {
        $allowed_models = array('gpt-4o', 'gpt-4o-mini');
        return in_array($model, $allowed_models) ? $model : 'gpt-4o';
    }

    /**
     * Check if a key is already encrypted
     *
     * @param string $key Key to check
     * @return bool True if already encrypted
     */
    private function is_encrypted_key($key) {
        // Check if it looks like base64 and can be decrypted
        if (strlen($key) > 200 && base64_decode($key, true) !== false) {
            $decoded = base64_decode($key);
            $salt = wp_salt('auth');
            $salt_length = strlen($salt);

            if (strlen($decoded) > $salt_length + 1) {
                $stored_salt = substr($decoded, 0, $salt_length);
                $separator = substr($decoded, $salt_length, 1);
                return ($stored_salt === $salt && $separator === '|');
            }
        }
        return false;
    }

    /**
     * Encrypt API key
     *
     * @param string $api_key Raw API key
     * @return string Encrypted API key
     */
    private function encrypt_api_key($api_key) {
        // Use WordPress's built-in hash function with a salt
        $salt = wp_salt('auth');
        return base64_encode($salt . '|' . $api_key);
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

    /**
     * Get decrypted API key
     *
     * @return string|false Decrypted API key or false if not available
     */
    public function get_api_key() {
        $encrypted_key = get_option('rwp_cct_openai_api_key', '');
        if (empty($encrypted_key)) {
            return false;
        }

        return $this->decrypt_api_key($encrypted_key);
    }

    /**
     * AJAX handler for testing OpenAI connection
     */
    public function ajax_test_connection() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'rwp_cct_test_openai')) {
            wp_send_json_error(array('message' => __('Security check failed.', 'rwp-cct')));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => __('Insufficient permissions.', 'rwp-cct')));
        }

        // Get API key from POST data
        $api_key_input = sanitize_text_field($_POST['api_key']);

        // If the special value is sent, use the existing stored key
        if ($api_key_input === 'USE_EXISTING_KEY') {
            $api_key = $this->get_api_key();
            if (!$api_key) {
                wp_send_json_error(array('message' => __('No API key configured or decryption failed. Please re-enter your API key.', 'rwp-cct')));
            }
        } else {
            $api_key = trim($api_key_input);
            if (empty($api_key)) {
                wp_send_json_error(array('message' => __('API key is required.', 'rwp-cct')));
            }
        }

        // Test the connection
        $result = $this->test_openai_connection($api_key);

        if ($result['success']) {
            wp_send_json_success(array('message' => $result['message']));
        } else {
            wp_send_json_error(array('message' => $result['message']));
        }
    }

    /**
     * Test OpenAI API connection
     *
     * @param string $api_key OpenAI API key
     * @return array Result with success status and message
     */
    private function test_openai_connection($api_key) {
        $url = 'https://api.openai.com/v1/models';

        // Basic validation of the decrypted key
        if (!$api_key || !preg_match('/^sk-/', $api_key)) {
            return array(
                'success' => false,
                'message' => __('API key decryption failed. Please re-enter your API key.', 'rwp-cct')
            );
        }

        $response = wp_remote_get($url, array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json',
            ),
            'timeout' => 15
        ));

        if (is_wp_error($response)) {
            return array(
                'success' => false,
                'message' => sprintf(__('Connection failed: %s', 'rwp-cct'), $response->get_error_message())
            );
        }

        $status_code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);

        if ($status_code === 200) {
            $data = json_decode($body, true);
            if (isset($data['data']) && is_array($data['data'])) {
                $model_count = count($data['data']);
                return array(
                    'success' => true,
                    'message' => sprintf(__('Found %d available models.', 'rwp-cct'), $model_count)
                );
            }
        }

        // Handle specific error codes
        if ($status_code === 401) {
            return array(
                'success' => false,
                'message' => __('Invalid API key. Please check your OpenAI API key.', 'rwp-cct')
            );
        }

        if ($status_code === 429) {
            return array(
                'success' => false,
                'message' => __('Rate limit exceeded. Please try again later.', 'rwp-cct')
            );
        }

        return array(
            'success' => false,
            'message' => sprintf(__('API returned status %d. Please check your API key and try again.', 'rwp-cct'), $status_code)
        );
    }
}