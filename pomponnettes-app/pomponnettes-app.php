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
    
    // Enqueue main JS file and its dependencies
    wp_enqueue_script(
        'pomponnettes-js',
        $plugin_url . 'assets/index.js',
        array(),
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
