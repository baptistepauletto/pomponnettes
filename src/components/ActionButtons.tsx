import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { getRandomPreset } from '../data/presets';
import '../styles/ActionButtons.scss';

const ActionButtons: React.FC = () => {
  const { clearAllCharms, applyPreset, lastAppliedPresetId } = useCustomizer();

  const handleRandomize = () => {
    // Get a random preset, excluding the last applied one
    const preset = getRandomPreset(lastAppliedPresetId);
    
    // Apply the preset to the necklace
    applyPreset(preset);
  };

  const handleClear = () => {
    clearAllCharms();
  };

  return (
    <div className="action-buttons-container">
      <button 
        className="action-button randomize-button"
        onClick={handleRandomize}
      >
        <span className="button-icon">✨</span>
        <span>Nos favoris</span>
      </button>
      
      <button 
        className="action-button clear-button"
        onClick={handleClear}
      >
        <span className="button-icon">🗑️</span>
        <span>Retirer les charms</span>
      </button>
    </div>
  );
};

export default ActionButtons; 