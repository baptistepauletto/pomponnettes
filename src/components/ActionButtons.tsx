import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/ActionButtons.scss';

const ActionButtons: React.FC = () => {
  const { clearAllCharms } = useCustomizer();

  const handleRandomize = () => {
    // For now, just clear all charms
    // In the future, this will apply a preset
    clearAllCharms();
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
    </div>
  );
};

export default ActionButtons; 