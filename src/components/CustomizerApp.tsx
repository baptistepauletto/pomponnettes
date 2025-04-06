import React, { useEffect, useState } from 'react';
import { CustomizerProvider } from '../context/CustomizerContext';
import NecklaceSelector from './NecklaceSelector';
import CharmSelector from './CharmSelector';
import NecklaceDisplay from './NecklaceDisplay';
import DndProvider from './DndProvider';
import { TapToPlaceProvider } from '../hooks/useTapToPlace';
import '../styles/CustomizerApp.scss';

const CustomizerApp: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <DndProvider>
      <TapToPlaceProvider>
        <CustomizerProvider>
          <div className="customizer-app">
            <header className="customizer-header">
              <h1>Necklace Charm Customizer</h1>
              <p>Design your perfect necklace by {isMobile ? 'selecting charms and placing them on attachment points' : 'dragging and dropping charms onto attachment points'}</p>
            </header>

            <main className="customizer-content">
              <div className="sidebar">
                <NecklaceSelector />
                {/* Show CharmSelector only on desktop */}
                {!isMobile && <CharmSelector />}
              </div>
              <div className="main-display">
                <NecklaceDisplay />
              </div>
            </main>

            <footer className="customizer-footer">
              <p>Click on a placed charm to remove it</p>
              {isMobile ? (
                <p className="mobile-instructions">Swipe up to open the charm selector, then tap a charm and an attachment point to place it</p>
              ) : (
                <p className="mobile-instructions">On mobile: Tap a charm and then tap an attachment point to place it</p>
              )}
            </footer>
          </div>
        </CustomizerProvider>
      </TapToPlaceProvider>
    </DndProvider>
  );
};

export default CustomizerApp; 