import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/NecklaceControls.scss';

const NecklaceControls: React.FC = () => {
  const { charms, selectedNecklace, clearAllCharms, addCharm } = useCustomizer();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Generate a random necklace with charms
  const generateRandomNecklace = () => {
    // Prevent multiple clicks during generation
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    // First clear any existing charms
    clearAllCharms();
    
    // Wait a short moment for React to update the state after clearing charms
    setTimeout(() => {
      // Make sure we have a selected necklace
      if (selectedNecklace) {
        // For each attachment point, add a random charm
        selectedNecklace.attachmentPoints.forEach((point, index) => {
          // Pick a random charm
          const randomIndex = Math.floor(Math.random() * charms.length);
          const randomCharm = charms[randomIndex];
          
          // Add the charm to this attachment point with a slight delay between each
          // to prevent potential race conditions
          setTimeout(() => {
            addCharm(randomCharm.id, point.id);
            
            // If this is the last attachment point, allow generation again
            if (index === selectedNecklace.attachmentPoints.length - 1) {
              setIsGenerating(false);
            }
          }, index * 20); // Small delay between adding each charm
        });
      } else {
        setIsGenerating(false);
      }
    }, 50); // Short delay to let React update the state first
  };
  
  // Reset necklace by removing all charms
  const resetNecklace = () => {
    clearAllCharms();
  };

  return (
    <div className="necklace-controls">
      <button 
        className={`control-button generate ${isGenerating ? 'disabled' : ''}`}
        onClick={generateRandomNecklace}
        disabled={isGenerating}
      >
        <span className="button-icon">✨</span>
        <span className="button-text">{isGenerating ? 'Generating...' : 'Generate'}</span>
      </button>
      
      <button 
        className="control-button reset"
        onClick={resetNecklace}
        disabled={isGenerating}
      >
        <span className="button-icon">🔄</span>
        <span className="button-text">Reset</span>
      </button>
    </div>
  );
};

export default NecklaceControls; 