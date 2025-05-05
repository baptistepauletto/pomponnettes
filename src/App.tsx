import React, { useState } from 'react';
import CustomizerApp from './components/CustomizerApp';
import WooCommerceTest from './components/WooCommerceTest';
import DndProvider from './components/DndProvider';
import './App.css';

const App: React.FC = () => {
  const [showWooCommerce, setShowWooCommerce] = useState(false);
  
  return (
    <div className="App">
      {/* Simple navigation */}
      <div className="app-nav">
        <button 
          onClick={() => setShowWooCommerce(false)}
          className={!showWooCommerce ? 'active' : ''}
        >
          Necklace Customizer
        </button>
        <button 
          onClick={() => setShowWooCommerce(true)}
          className={showWooCommerce ? 'active' : ''}
        >
          WooCommerce Test
        </button>
      </div>
      
      {showWooCommerce ? (
        <WooCommerceTest />
      ) : (
        <DndProvider>
          <CustomizerApp />
        </DndProvider>
      )}
    </div>
  );
};

export default App;
