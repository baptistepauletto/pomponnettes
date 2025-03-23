import React from 'react';
import { CustomizerProvider } from '../context/CustomizerContext';
import NecklaceSelector from './NecklaceSelector';
import CharmSelector from './CharmSelector';
import NecklaceDisplay from './NecklaceDisplay';
import DndProvider from './DndProvider';
import { TapToPlaceProvider } from '../hooks/useTapToPlace';
import '../styles/CustomizerApp.scss';

const CustomizerApp: React.FC = () => {
  return (
    <DndProvider>
      <TapToPlaceProvider>
        <CustomizerProvider>
          <div className="customizer-app">
            <header className="customizer-header">
              <h1>Necklace Charm Customizer</h1>
              <p>Design your perfect necklace by dragging and dropping charms onto attachment points</p>
            </header>

            <main className="customizer-content">
              <div className="sidebar">
                <NecklaceSelector />
                <CharmSelector />
              </div>
              <div className="main-display">
                <NecklaceDisplay />
              </div>
            </main>

            <footer className="customizer-footer">
              <p>Click on a placed charm to remove it</p>
              <p className="mobile-instructions">On mobile: Tap a charm and then tap an attachment point to place it</p>
            </footer>
          </div>
        </CustomizerProvider>
      </TapToPlaceProvider>
    </DndProvider>
  );
};

export default CustomizerApp; 