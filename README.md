# Les Pomponnettes - Necklace Charm Customizer

A responsive web application that allows users to customize necklaces by placing charms onto predefined positions on different necklaces. The application is built to provide a seamless customization experience on both desktop and mobile devices.

## Features Implemented

### Core Functionality
- **Necklace Selection**: Users can browse and select from various necklace designs using a horizontal carousel
- **Charm Placement**: Intuitive tap-to-place functionality for placing charms on necklaces
- **Attachment Points**: Dynamic attachment points that adapt to the selected necklace
- **Charm Categories**: Charms organized into categories for easy navigation
- **Recently Used Charms**: A dedicated category for recently used charms for quick access
- **Price Calculation**: Real-time price updates based on the selected necklace and added charms

### User Experience Enhancements
- **Horizontal Scrolling Charm Drawer**: Compact drawer with horizontal scrolling on mobile devices
- **Responsive Design**: Fully responsive interface that adapts to different screen sizes
- **Visual Feedback**: Interactive elements provide visual feedback for user actions
- **Animation Effects**: Smooth transitions and animations for a polished feel
- **Random Necklace Generation**: One-click generation of necklaces with random charm placements
- **Reset Functionality**: Easy way to clear all charms and start fresh

### Technical Improvements
- **Optimized Mobile Experience**: Special considerations for touch interactions and mobile layout
- **Streamlined Interface**: Removed unnecessary selection popups for a more direct interaction model
- **Fade-out Animations**: Instructions fade out after user interaction for a cleaner interface
- **Custom Favicon**: Responsive SVG favicon that adapts to dark mode
- **WooCommerce Integration**: Connection to WordPress WooCommerce for product data and cart functionality

## How to Use

1. **Select a Necklace**: Browse through available necklace designs in the top carousel
2. **Add Charms**: Tap on the necklace to open the charm drawer, then select a charm category
3. **Place Charms**: Tap on an attachment point to place the selected charm
4. **Remove Charms**: Tap on any placed charm to remove it
5. **Generate Random Design**: Use the "Generate a necklace" button to automatically place random charms
6. **Reset Design**: Use the "Reset necklace" button to remove all charms

## Development

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/pomponnettes.git
cd pomponnettes
```

2. Install dependencies
```bash
npm install
```

3. Set up WooCommerce API credentials
Create a `.env.local` file in the root directory with the following content:
```
VITE_WC_CONSUMER_KEY=your_woocommerce_consumer_key
VITE_WC_CONSUMER_SECRET=your_woocommerce_consumer_secret
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

6. Deploy to GitHub Pages
```bash
npm run deploy
```

### Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/context`: Context providers
  - `/data`: Static data files for necklaces and charms
  - `/hooks`: Custom React hooks
  - `/styles`: SCSS stylesheets
  - `/types`: TypeScript type definitions
  - `/utils`: Utility functions

## WordPress Integration

### WooCommerce API Connection

The application connects to the Les Pomponnettes WooCommerce store using the WooCommerce REST API. This enables:

1. **Product Fetching**: Retrieve real-time product data from the WordPress store
2. **Cart Integration**: Add customized necklaces to the WooCommerce cart
3. **Price Synchronization**: Keep prices in sync with the WordPress store

To set up the WooCommerce integration:

1. Create REST API keys in the WordPress admin:
   - Go to WooCommerce → Settings → Advanced → REST API
   - Add a new key with Read/Write permissions
   - Note the Consumer Key and Consumer Secret

2. Add these credentials to your environment variables:
   ```
   VITE_WC_CONSUMER_KEY=your_woocommerce_consumer_key
   VITE_WC_CONSUMER_SECRET=your_woocommerce_consumer_secret
   ```

3. Use the WooCommerce utility functions to interact with the store:
   ```typescript
   import { getProducts, addToCart } from '../utils/woocommerce';
   
   // Fetch products
   const products = await getProducts({ category: 'colliers' });
   
   // Add to cart
   await addToCart(productId, quantity);
   ```

### WordPress Plugin Development

For deeper integration, a WordPress plugin can be developed that:

1. **Embeds the React App**: Provides a shortcode or block to embed the customizer
2. **Handles Custom Data**: Manages charm and necklace data in WordPress
3. **Processes Orders**: Handles the custom product creation in WooCommerce

The plugin development will involve:

- PHP for the WordPress backend
- JavaScript for frontend integration
- WordPress hooks for WooCommerce integration
- Custom post types for storing necklace and charm data

### Integration Options

There are several ways to integrate this React application with a WordPress website:

1. **iFrame Embed (Simplest)**
   - Add an iframe to a WordPress page that points to the deployed React application
   - **Pros**: Simple implementation, independent updates
   - **Cons**: Limited interaction with WordPress, potential responsiveness challenges

2. **WordPress Block or Shortcode**
   - Create a custom block or shortcode that loads the app's assets
   - **Pros**: Better integration, maintains most React code
   - **Cons**: Requires WordPress-specific coding

3. **WordPress Plugin**
   - Package the React app as a plugin
   - **Pros**: Professional integration, access to WordPress data
   - **Cons**: More development work, requires WordPress knowledge

4. **React as a WordPress Theme**
   - Build a custom theme that incorporates the React app
   - **Pros**: Deep integration, consistent styling
   - **Cons**: Most complex approach, requires theme development

### Recommended Approach: Custom WordPress Plugin

For the Les Pomponnettes integration, a custom WordPress plugin offers the best balance of user experience and development efficiency:

1. Create a WordPress plugin with the following components:
   - Admin interface for managing necklaces and charms
   - Shortcode for embedding the customizer on any page
   - WooCommerce integration for custom product handling

2. Build the plugin with these files:
   ```
   les-pomponnettes-customizer/
   ├── admin/
   │   ├── admin.php         # Admin interface
   │   └── settings.php      # Plugin settings
   ├── public/
   │   ├── js/               # Compiled React app
   │   ├── css/              # Compiled styles
   │   └── assets/           # Images and other assets
   ├── includes/
   │   ├── api.php           # Custom REST API endpoints
   │   ├── shortcodes.php    # Shortcode definition
   │   └── woocommerce.php   # WooCommerce integration
   ├── les-pomponnettes-customizer.php  # Main plugin file
   └── README.md             # Plugin documentation
   ```

3. Use the shortcode to embed the customizer:
   ```
   [pomponnettes_customizer]
   ```

## Next Steps

1. **Complete WooCommerce Integration**: 
   - Set up cart integration with custom product creation
   - Add product variation support for different necklace types

2. **WordPress Plugin Development**:
   - Create the basic plugin structure
   - Develop the shortcode for embedding
   - Build admin interfaces for content management

3. **User Account Features**: 
   - Allow users to save and load their designs
   - Connect with WooCommerce customer accounts

4. **Performance Optimization**: 
   - Further optimize images and code for faster loading
   - Implement lazy loading for product data

5. **Advanced Animation**: 
   - Add more sophisticated animations for charm placement

6. **Social Sharing**: 
   - Enable sharing designs on social media
