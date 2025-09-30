import React, { useEffect, useState } from 'react';
import { CustomizerProvider } from '../context/CustomizerContext';
import NecklaceSelector from './NecklaceSelector';
import CharmSelector from './CharmSelector';
import NecklaceDisplay from './NecklaceDisplay';
import DndProvider from './DndProvider';
import { TapToPlaceProvider } from '../hooks/useTapToPlace';
import AddToCartButton from './AddToCartButton';
import ActionButtons from './ActionButtons';
import PriceCalculator from './PriceCalculator';
import DragPreview from './DragPreview';
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
              <h1>Personnalise<br className="mobile-break" /> ton <em>collier</em></h1>
            </header>

            <main className="customizer-content">
              {isMobile ? (
                // Mobile layout (unchanged)
                <>
                  <div className="sidebar">
                    <NecklaceSelector />
                    {/* Show CharmSelector only on desktop */}
                    {!isMobile && <CharmSelector />}
                  </div>
                  <div className="main-display">
                    <NecklaceDisplay />
                    <PriceCalculator />
                    <ActionButtons />
                    <AddToCartButton />
                  </div>
                </>
              ) : (
                // Desktop layout - Direct grid areas
                <>
                  {/* Top section - Necklace selector spanning all columns */}
                  <div className="necklace-selector-container">
                    <NecklaceSelector />
                  </div>
                  
                  {/* Left panel - Charm area */}
                  <div className="left-panel">
                    <ActionButtons />
                    <CharmSelector />
                  </div>
                  
                  {/* Center panel - Necklace display */}
                  <div className="center-panel">
                    <NecklaceDisplay />
                  </div>
                  
                  {/* Right panel - Price area */}
                  <div className="right-panel">
                    <PriceCalculator />
                    <AddToCartButton />
                  </div>
                </>
              )}
            </main>

            <footer className="customizer-footer">             
            </footer>
          </div>
          
          {/* Custom drag preview layer */}
          <DragPreview />
        </CustomizerProvider>
      </TapToPlaceProvider>
    </DndProvider>
  );
};

export default CustomizerApp; 