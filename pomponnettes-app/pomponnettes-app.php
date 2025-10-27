<?php
/*
Plugin Name: Les Pomponnettes Necklace Customizer
Description: Integration of Les Pomponnettes React app
Version: 1.0
Author: Baptiste Pauletto
*/

// Register scripts and styles
function pomponnettes_enqueue_scripts() {
    // Only load on pages containing the shortcode
    if (is_admin()) { return; }
    global $post;
    if (!$post || !isset($post->post_content) || !has_shortcode($post->post_content, 'pomponnettes_app')) {
        return;
    }
    // Get the plugin directory URL
    $plugin_url = plugin_dir_url( __FILE__ );
    
    // Enqueue Google Fonts used by the app
    wp_enqueue_style(
        'pomponnettes-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Jost:wght@300..700&display=swap',
        array(),
        null
    );
    
    // Enqueue WordPress-specific overrides (scoped, minimal)
    wp_enqueue_style(
        'pomponnettes-wp-css',
        $plugin_url . 'wordpress-styles.css',
        array('pomponnettes-fonts'),
        '1.0.0'
    );
    

    
    // Enqueue main JS file and its dependencies
    wp_enqueue_script(
        'pomponnettes-js',
        $plugin_url . 'assets/index.js',
        array('jquery'),
        '1.0.0',
        true
    );
    // Load as ES module so modern build (import.meta, dynamic imports) works
    if (function_exists('wp_script_add_data')) {
        wp_script_add_data('pomponnettes-js', 'type', 'module');
    }
    
    // Pass the plugin URL to JavaScript
    wp_localize_script(
        'pomponnettes-js',
        'pomponnettesData',
        array(
            'pluginUrl' => $plugin_url,
            'imagesPath' => $plugin_url . 'images/'
        )
    );
}

// Register shortcode
function pomponnettes_app_shortcode() {
    // Return the host element; the React app mounts into a Shadow DOM here
    return '<div id="root" class="pomponnettes-app-container"></div>';
}

// Add shortcode
add_shortcode('pomponnettes_app', 'pomponnettes_app_shortcode');

// Ensure assets load after the theme styles/scripts
add_action('wp_enqueue_scripts', 'pomponnettes_enqueue_scripts', 100);

// Force our JS to load as an ES module (needed for import.meta)
add_filter('script_loader_tag', function($tag, $handle, $src) {
    if ($handle === 'pomponnettes-js') {
        $id_attr = ' id="' . esc_attr($handle) . '-js"';
        return '<script type="module" src="' . esc_url($src) . '"' . $id_attr . '></script>';
    }
    return $tag;
}, 10, 3);

/**
 * =====================================================================
 * WooCommerce Integration for Pomponnettes Customizer
 * =====================================================================
 */

// Check if WooCommerce is active before adding integration
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    
    /**
     * Save custom configuration data to cart item meta
     */
    function pomponnettes_add_cart_item_data($cart_item_data, $product_id, $variation_id) {
        // Check if this request came from the Pomponnettes React app
        $from_pomponnettes_app = isset($_POST['pomponnettes_customizer_used']) && $_POST['pomponnettes_customizer_used'] === 'true';
        
        // Only proceed if the request came from our React app
        if (!$from_pomponnettes_app) {
            return $cart_item_data;
        }
        
        // Extract charm data from the attributes
        $charm_data = array();
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'attribute_pa_charm-') === 0) {
                $position = str_replace('attribute_pa_charm-', '', $key);
                $charm_data[$position] = sanitize_text_field($value);
            }
        }
        
        // Add customizer flags since we confirmed this came from our app
        $cart_item_data['added_from_customizer'] = true;
        
        // Store charm data if any was found
        if (!empty($charm_data)) {
            $cart_item_data['charm_data'] = $charm_data;
        }
        
        // Store cart options
        if (isset($_POST['emballage-cadeau'])) {
            $cart_item_data['gift_wrap'] = sanitize_text_field($_POST['emballage-cadeau']);
        }
        
        if (isset($_POST['confiance-charms'])) {
            $cart_item_data['charm_order_trust'] = sanitize_text_field($_POST['confiance-charms']);
        }
        
        return $cart_item_data;
    }
    add_filter('woocommerce_add_cart_item_data', 'pomponnettes_add_cart_item_data', 10, 3);
    
    /**
     * Save custom data to order item meta when checkout is completed
     */
    function pomponnettes_checkout_create_order_line_item($item, $cart_item_key, $values, $order) {
        if (isset($values['added_from_customizer'])) {
            $item->add_meta_data('_added_from_customizer', 'yes', true);
        }
        
        if (isset($values['charm_data'])) {
            $item->add_meta_data('_charm_data', $values['charm_data'], true);
        }
        
        if (isset($values['gift_wrap'])) {
            $item->add_meta_data('_gift_wrap', $values['gift_wrap'], true);
        }
        
        if (isset($values['charm_order_trust'])) {
            $item->add_meta_data('_charm_order_trust', $values['charm_order_trust'], true);
        }
    }
    add_action('woocommerce_checkout_create_order_line_item', 'pomponnettes_checkout_create_order_line_item', 10, 4);
    

    
} // End WooCommerce active check
