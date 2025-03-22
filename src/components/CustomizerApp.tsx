import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { CustomizerProvider } from '../context/CustomizerContext';
import NecklaceSelector from './NecklaceSelector';
import CharmSelector from './CharmSelector';
import NecklaceDisplay from './NecklaceDisplay';
import '../styles/CustomizerApp.scss';

// Custom backend for react-dnd based on the device
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const CustomizerApp: React.FC = () => {
  // Choose the appropriate backend based on device type
  const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backendForDND}>
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
          </footer>
        </div>
      </CustomizerProvider>
    </DndProvider>
  );
};

export default CustomizerApp; 