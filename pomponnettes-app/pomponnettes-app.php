<?php
/*
Plugin Name: Les Pomponnettes Necklace Customizer
Description: Integration of Les Pomponnettes React app
Version: 1.0
Author: Baptiste Pauletto
*/

// Register scripts and styles
function pomponnettes_enqueue_scripts() {
    // Get the plugin directory URL
    $plugin_url = plugin_dir_url( __FILE__ );
    
    // Enqueue main CSS file
    wp_enqueue_style(
        'pomponnettes-css',
        $plugin_url . 'assets/index.css',
        array(),
        '1.0.0'
    );
    
    // Enqueue WordPress-specific overrides (load after main CSS)
    wp_enqueue_style(
        'pomponnettes-wp-css',
        $plugin_url . 'wordpress-styles.css',
        array('pomponnettes-css'),
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
    // Enqueue scripts and styles
    pomponnettes_enqueue_scripts();
    
    // Return the container div where React will mount
    return '<div id="root" class="pomponnettes-app-container"></div>';
}

// Add shortcode
add_shortcode('pomponnettes_app', 'pomponnettes_app_shortcode');

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
        // Store information that this item was added from the customizer
        $cart_item_data['added_from_customizer'] = true;
        
        // Extract charm data from the attributes
        $charm_data = array();
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'attribute_pa_charm-') === 0) {
                $position = str_replace('attribute_pa_charm-', '', $key);
                $charm_data[$position] = sanitize_text_field($value);
            }
        }
        
        // Store charm data for later use
        if (!empty($charm_data)) {
            $cart_item_data['charm_data'] = $charm_data;
        }
        
        return $cart_item_data;
    }
    add_filter('woocommerce_add_cart_item_data', 'pomponnettes_add_cart_item_data', 10, 3);
    
    /**
     * Display custom item data in the cart
     */
    function pomponnettes_get_item_data($item_data, $cart_item) {
        if (isset($cart_item['charm_data']) && is_array($cart_item['charm_data'])) {
            // Format charm data for display
            foreach ($cart_item['charm_data'] as $position => $value) {
                $display_value = str_replace('-', ' ', $value);
                $display_value = ucfirst($display_value);
                
                $item_data[] = array(
                    'key'   => sprintf(__('Charm %s', 'pomponnettes'), $position),
                    'value' => $display_value
                );
            }
        }
        
        return $item_data;
    }
    add_filter('woocommerce_get_item_data', 'pomponnettes_get_item_data', 10, 2);
    
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
    }
    add_action('woocommerce_checkout_create_order_line_item', 'pomponnettes_checkout_create_order_line_item', 10, 4);
    

    
} // End WooCommerce active check
