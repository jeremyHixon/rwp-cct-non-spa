<?php
/**
 * Shortcodes functionality
 *
 * @package ContentCreatorTools
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * RWP CCT Shortcodes class
 */
class RWP_CCT_Shortcodes {

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
        // Register shortcodes immediately when class is instantiated
        $this->rwp_cct_register_shortcodes();
        add_action('wp_enqueue_scripts', array($this, 'rwp_cct_enqueue_shortcode_assets'));
    }

    /**
     * Register shortcodes
     */
    public function rwp_cct_register_shortcodes() {
        add_shortcode('rwp_cct_auth_demo', array($this, 'rwp_cct_auth_demo_shortcode'));
        add_shortcode('rwp_cct_style_guide', array($this, 'rwp_cct_style_guide_shortcode'));

        // Debug: Log shortcode registration for troubleshooting
        if (WP_DEBUG) {
            error_log('RWP CCT: Shortcode rwp_cct_auth_demo registered');
            error_log('RWP CCT: Shortcode rwp_cct_style_guide registered');
        }
    }

    /**
     * Auth demo shortcode
     *
     * @param array $atts Shortcode attributes
     * @return string Shortcode output
     */
    public function rwp_cct_auth_demo_shortcode($atts) {
        // Parse shortcode attributes
        $atts = shortcode_atts(array(
            'theme' => 'dark',
            'default_form' => 'login'
        ), $atts, 'rwp_cct_auth_demo');

        // Enqueue assets for this shortcode
        $this->rwp_cct_enqueue_auth_demo_assets();

        // Generate unique ID for this instance
        $instance_id = 'rwp-cct-auth-demo-' . uniqid();

        // Start output buffering
        ob_start();
        ?>
        <div id="<?php echo esc_attr($instance_id); ?>"
             class="rwp-cct-auth-demo dark"
             data-theme="<?php echo esc_attr($atts['theme']); ?>"
             data-default-form="<?php echo esc_attr($atts['default_form']); ?>">
            <!-- React component will mount here -->
            <div class="rwp-cct-loading">
                <div class="flex items-center justify-center min-h-[400px]">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span class="ml-3 text-gray-600">Loading authentication demo...</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Style guide shortcode
     *
     * @param array $atts Shortcode attributes
     * @return string Shortcode output
     */
    public function rwp_cct_style_guide_shortcode($atts) {
        // Parse shortcode attributes
        $atts = shortcode_atts(array(
            'theme' => 'dark',
            'format' => 'full' // full, compact, reference
        ), $atts, 'rwp_cct_style_guide');

        // Enqueue assets for this shortcode
        $this->rwp_cct_enqueue_style_guide_assets();

        // Generate unique ID for this instance
        $instance_id = 'rwp-cct-style-guide-' . uniqid();

        // Start output buffering
        ob_start();
        ?>
        <div id="<?php echo esc_attr($instance_id); ?>"
             class="rwp-cct-style-guide dark bg-gray-900 text-white p-8 rounded-lg"
             data-theme="<?php echo esc_attr($atts['theme']); ?>"
             data-format="<?php echo esc_attr($atts['format']); ?>">

            <div class="max-w-6xl mx-auto">
                <header class="mb-12 text-center">
                    <h1 class="text-4xl font-bold mb-4 text-white">Content Creator Tools</h1>
                    <h2 class="text-2xl font-semibold mb-2 text-blue-400">Dark Theme Style Guide</h2>
                    <p class="text-gray-300">Comprehensive reference for matching Elementor styling</p>
                </header>

                <!-- Color Palette -->
                <section class="mb-12">
                    <h3 class="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-2">Color Palette</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Dark Theme Colors -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Background Colors</h4>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-gray-900 rounded mr-3 border border-gray-600"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">bg-gray-900</div>
                                        <div class="font-mono text-xs text-gray-400">#111827</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-gray-800 rounded mr-3 border border-gray-600"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">bg-gray-800</div>
                                        <div class="font-mono text-xs text-gray-400">#1F2937</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-gray-700 rounded mr-3 border border-gray-600"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">bg-gray-700</div>
                                        <div class="font-mono text-xs text-gray-400">#374151</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-gray-600 rounded mr-3 border border-gray-600"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">bg-gray-600</div>
                                        <div class="font-mono text-xs text-gray-400">#4B5563</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Primary Colors -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Primary Colors</h4>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-blue-400 rounded mr-3"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">blue-400</div>
                                        <div class="font-mono text-xs text-gray-400">#60A5FA</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-blue-500 rounded mr-3"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">blue-500</div>
                                        <div class="font-mono text-xs text-gray-400">#3B82F6</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-blue-600 rounded mr-3"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">blue-600</div>
                                        <div class="font-mono text-xs text-gray-400">#2563EB</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-blue-700 rounded mr-3"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">blue-700</div>
                                        <div class="font-mono text-xs text-gray-400">#1D4ED8</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Text Colors -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Text Colors</h4>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-white rounded mr-3 border border-gray-600"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">text-white</div>
                                        <div class="font-mono text-xs text-gray-400">#FFFFFF</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-gray-300 rounded mr-3 border border-gray-600"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">text-gray-300</div>
                                        <div class="font-mono text-xs text-gray-400">#D1D5DB</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-12 h-8 bg-gray-400 rounded mr-3 border border-gray-600"></div>
                                    <div>
                                        <div class="font-mono text-sm text-gray-300">text-gray-400</div>
                                        <div class="font-mono text-xs text-gray-400">#9CA3AF</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Typography -->
                <section class="mb-12">
                    <h3 class="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-2">Typography</h3>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Headings -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Headings</h4>
                            <div class="space-y-4">
                                <div>
                                    <h1 class="text-4xl font-bold text-white">Heading 1</h1>
                                    <div class="font-mono text-xs text-gray-400 mt-1">text-4xl font-bold (36px)</div>
                                </div>
                                <div>
                                    <h2 class="text-3xl font-bold text-white">Heading 2</h2>
                                    <div class="font-mono text-xs text-gray-400 mt-1">text-3xl font-bold (30px)</div>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-semibold text-blue-400">Heading 3</h3>
                                    <div class="font-mono text-xs text-gray-400 mt-1">text-2xl font-semibold (24px)</div>
                                </div>
                                <div>
                                    <h4 class="text-xl font-medium text-white">Heading 4</h4>
                                    <div class="font-mono text-xs text-gray-400 mt-1">text-xl font-medium (20px)</div>
                                </div>
                            </div>
                        </div>

                        <!-- Body Text -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Body Text</h4>
                            <div class="space-y-4">
                                <div>
                                    <p class="text-base text-gray-300">Regular body text paragraph with normal weight and spacing.</p>
                                    <div class="font-mono text-xs text-gray-400 mt-1">text-base text-gray-300 (16px)</div>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Small text for captions and helper text.</p>
                                    <div class="font-mono text-xs text-gray-400 mt-1">text-sm text-gray-400 (14px)</div>
                                </div>
                                <div>
                                    <p class="text-lg font-medium text-white">Large emphasized text for highlights.</p>
                                    <div class="font-mono text-xs text-gray-400 mt-1">text-lg font-medium (18px)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Components -->
                <section class="mb-12">
                    <h3 class="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-2">Component Examples</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Buttons -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Buttons</h4>
                            <div class="space-y-3">
                                <button class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    Primary Button
                                </button>
                                <div class="font-mono text-xs text-gray-400">bg-blue-600 hover:bg-blue-700</div>

                                <button class="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">
                                    Secondary Button
                                </button>
                                <div class="font-mono text-xs text-gray-400">bg-gray-700 hover:bg-gray-600</div>

                                <button class="w-full px-4 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-colors">
                                    Outline Button
                                </button>
                                <div class="font-mono text-xs text-gray-400">border-blue-500 text-blue-400</div>
                            </div>
                        </div>

                        <!-- Form Inputs -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Form Elements</h4>
                            <div class="space-y-3">
                                <input type="text" placeholder="Text Input"
                                       class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <div class="font-mono text-xs text-gray-400">bg-gray-700 border-gray-600 focus:ring-blue-500</div>

                                <textarea placeholder="Textarea"
                                          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"></textarea>

                                <select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Select Option</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                            </div>
                        </div>

                        <!-- Cards -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Cards</h4>
                            <div class="space-y-4">
                                <div class="bg-gray-700 p-4 rounded-lg border border-gray-600">
                                    <h5 class="font-semibold text-white mb-2">Card Title</h5>
                                    <p class="text-gray-300 text-sm">Card content with description text.</p>
                                </div>
                                <div class="font-mono text-xs text-gray-400">bg-gray-700 border-gray-600</div>

                                <div class="bg-gray-900 p-4 rounded-lg border border-blue-500/30">
                                    <h5 class="font-semibold text-blue-400 mb-2">Highlighted Card</h5>
                                    <p class="text-gray-300 text-sm">Featured card with accent border.</p>
                                </div>
                                <div class="font-mono text-xs text-gray-400">border-blue-500/30</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Spacing Reference -->
                <section class="mb-12">
                    <h3 class="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-2">Spacing & Layout</h3>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Padding/Margin -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Spacing Scale</h4>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">p-1</div>
                                    <div class="w-1 h-6 bg-blue-500 mr-3"></div>
                                    <div class="text-sm text-gray-400">4px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">p-2</div>
                                    <div class="w-2 h-6 bg-blue-500 mr-3"></div>
                                    <div class="text-sm text-gray-400">8px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">p-3</div>
                                    <div class="w-3 h-6 bg-blue-500 mr-3"></div>
                                    <div class="text-sm text-gray-400">12px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">p-4</div>
                                    <div class="w-4 h-6 bg-blue-500 mr-3"></div>
                                    <div class="text-sm text-gray-400">16px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">p-6</div>
                                    <div class="w-6 h-6 bg-blue-500 mr-3"></div>
                                    <div class="text-sm text-gray-400">24px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">p-8</div>
                                    <div class="w-8 h-6 bg-blue-500 mr-3"></div>
                                    <div class="text-sm text-gray-400">32px</div>
                                </div>
                            </div>
                        </div>

                        <!-- Border Radius -->
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h4 class="text-lg font-semibold mb-4 text-white">Border Radius</h4>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">rounded</div>
                                    <div class="w-12 h-8 bg-blue-500 rounded mr-3"></div>
                                    <div class="text-sm text-gray-400">4px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">rounded-md</div>
                                    <div class="w-12 h-8 bg-blue-500 rounded-md mr-3"></div>
                                    <div class="text-sm text-gray-400">6px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">rounded-lg</div>
                                    <div class="w-12 h-8 bg-blue-500 rounded-lg mr-3"></div>
                                    <div class="text-sm text-gray-400">8px</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-16 text-sm font-mono text-gray-300">rounded-xl</div>
                                    <div class="w-12 h-8 bg-blue-500 rounded-xl mr-3"></div>
                                    <div class="text-sm text-gray-400">12px</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Quick Reference -->
                <section class="mb-8">
                    <h3 class="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-2">Quick Reference for Elementor</h3>

                    <div class="bg-gray-800 p-6 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <h4 class="font-semibold text-white mb-3">Primary Brand Colors</h4>
                                <div class="font-mono text-sm space-y-1">
                                    <div class="text-blue-400">#60A5FA (blue-400)</div>
                                    <div class="text-blue-400">#3B82F6 (blue-500)</div>
                                    <div class="text-blue-400">#2563EB (blue-600)</div>
                                    <div class="text-blue-400">#1D4ED8 (blue-700)</div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-white mb-3">Dark Backgrounds</h4>
                                <div class="font-mono text-sm space-y-1">
                                    <div class="text-gray-300">#111827 (gray-900)</div>
                                    <div class="text-gray-300">#1F2937 (gray-800)</div>
                                    <div class="text-gray-300">#374151 (gray-700)</div>
                                    <div class="text-gray-300">#4B5563 (gray-600)</div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-white mb-3">Text Colors</h4>
                                <div class="font-mono text-sm space-y-1">
                                    <div class="text-white">#FFFFFF</div>
                                    <div class="text-gray-300">#D1D5DB</div>
                                    <div class="text-gray-400">#9CA3AF</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer class="text-center text-gray-400 text-sm">
                    <p>Content Creator Tools v4.0.0 - Dark Theme Style Guide</p>
                    <p class="mt-1">Use these values to match plugin styling in Elementor and other page builders</p>
                </footer>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Enqueue assets for shortcodes
     */
    public function rwp_cct_enqueue_shortcode_assets() {
        global $post;

        // Only enqueue if shortcodes are present
        if (is_a($post, 'WP_Post')) {
            if (has_shortcode($post->post_content, 'rwp_cct_auth_demo')) {
                $this->rwp_cct_enqueue_auth_demo_assets();
            }
            if (has_shortcode($post->post_content, 'rwp_cct_style_guide')) {
                $this->rwp_cct_enqueue_style_guide_assets();
            }
            if (has_shortcode($post->post_content, 'rwp_cct_caption_generator')) {
                $this->rwp_cct_enqueue_caption_generator_assets();
            }
        }
    }

    /**
     * Enqueue auth demo specific assets
     */
    private function rwp_cct_enqueue_auth_demo_assets() {
        // Check if already enqueued
        if (wp_script_is('rwp-cct-auth-demo', 'enqueued')) {
            return;
        }

        // Enqueue React and ReactDOM from WordPress
        wp_enqueue_script('react');
        wp_enqueue_script('react-dom');

        // Enqueue our compiled React app
        wp_enqueue_script(
            'rwp-cct-auth-demo',
            RWP_CCT_PLUGIN_URL . 'assets/dist/js/main.js',
            array('react', 'react-dom'),
            RWP_CCT_VERSION,
            true
        );

        // Enqueue compiled CSS
        wp_enqueue_style(
            'rwp-cct-auth-demo-styles',
            RWP_CCT_PLUGIN_URL . 'assets/dist/css/main.css',
            array(),
            RWP_CCT_VERSION
        );

        // Localize script with API data
        wp_localize_script('rwp-cct-auth-demo', 'rwpCctAuth', array(
            'apiUrl' => rest_url('rwp-cct/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'pluginUrl' => RWP_CCT_PLUGIN_URL,
            'isDemo' => true
        ));
    }

    /**
     * Enqueue style guide specific assets
     */
    private function rwp_cct_enqueue_style_guide_assets() {
        // Check if already enqueued
        if (wp_style_is('rwp-cct-style-guide', 'enqueued')) {
            return;
        }

        // Enqueue compiled CSS - force enqueue even if called late
        wp_enqueue_style(
            'rwp-cct-style-guide',
            RWP_CCT_PLUGIN_URL . 'assets/dist/css/main.css',
            array(),
            RWP_CCT_VERSION
        );

        // If we're past the normal enqueue point, output styles directly in footer
        if (did_action('wp_enqueue_scripts')) {
            add_action('wp_footer', function() {
                if (!wp_style_is('rwp-cct-style-guide', 'done')) {
                    echo '<link rel="stylesheet" id="rwp-cct-style-guide-css" href="' .
                         esc_url(RWP_CCT_PLUGIN_URL . 'assets/dist/css/main.css?ver=' . RWP_CCT_VERSION) .
                         '" type="text/css" media="all" />' . "\n";
                }
            });
        }
    }

    /**
     * Enqueue caption generator specific assets
     */
    private function rwp_cct_enqueue_caption_generator_assets() {
        // Check if already enqueued
        if (wp_script_is('rwp-cct-caption-generator', 'enqueued')) {
            return;
        }

        // Enqueue React and ReactDOM from WordPress
        wp_enqueue_script('react');
        wp_enqueue_script('react-dom');

        // Enqueue our compiled React app
        wp_enqueue_script(
            'rwp-cct-caption-generator',
            RWP_CCT_PLUGIN_URL . 'assets/dist/js/caption-generator.js',
            array('react', 'react-dom'),
            RWP_CCT_VERSION,
            true
        );

        // Enqueue compiled CSS
        wp_enqueue_style(
            'rwp-cct-caption-generator-styles',
            RWP_CCT_PLUGIN_URL . 'assets/dist/css/caption-generator.css',
            array(),
            RWP_CCT_VERSION
        );

        // Localize script with API data
        wp_localize_script('rwp-cct-caption-generator', 'rwpCctCaptionGenerator', array(
            'apiUrl' => rest_url('rwp-cct/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'pluginUrl' => RWP_CCT_PLUGIN_URL
        ));
    }
}