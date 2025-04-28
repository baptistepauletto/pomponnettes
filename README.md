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

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Deploy to GitHub Pages
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
