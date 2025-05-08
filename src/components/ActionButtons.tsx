import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { getRandomPreset } from '../data/presets';
import '../styles/ActionButtons.scss';

const ActionButtons: React.FC = () => {
  const { clearAllCharms, applyPreset } = useCustomizer();
  const [lastAppliedPreset, setLastAppliedPreset] = useState<string | null>(null);

  const handleRandomize = () => {
    // Get a random preset
    const preset = getRandomPreset();
    
    // Apply the preset to the necklace
    applyPreset(preset);
    
    // Remember which preset we applied
    setLastAppliedPreset(preset.name);
    
    // Show a toast notification or feedback if desired (not implemented here)
  };

  const handleClear = () => {
    clearAllCharms();
    setLastAppliedPreset(null);
  };

  return (
    <div className="action-buttons-container">
      <button 
        className="action-button randomize-button"
        onClick={handleRandomize}
      >
        <span className="button-icon">🎲</span>
        <span>Randomize</span>
      </button>
      
      <button 
        className="action-button clear-button"
        onClick={handleClear}
      >
        <span className="button-icon">🗑️</span>
        <span>Clear</span>
      </button>
      
      {lastAppliedPreset && (
        <div className="preset-applied-message">
          ✨ Applied "{lastAppliedPreset}" preset
        </div>
      )}
    </div>
  );
};

export default ActionButtons; 