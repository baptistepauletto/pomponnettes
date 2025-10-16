import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/ActionButtons.scss';

const ActionButtons: React.FC = () => {
  const { clearAllCharms } = useCustomizer();

  const handleClear = () => {
    clearAllCharms();
  };

  return (
    <div className="action-buttons-container">
      <button 
        className="action-button clear-button"
        onClick={handleClear}
      >
        <span>RETIRER TOUS LES CHARMS</span>
      </button>
    </div>
  );
};

export default ActionButtons; 