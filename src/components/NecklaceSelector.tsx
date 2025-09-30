import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/NecklaceSelector.scss';

const NecklaceSelector: React.FC = () => {
  const { necklaces, selectedNecklace, selectNecklace } = useCustomizer();

  return (
    <div className="necklace-selector">
      <h3>ÉTAPE 1: CHOISIS TA CHAÎNE</h3>
      <div className="carousel-container">
        <div className="necklace-options">
          {necklaces.map((necklace) => (
            <div
              key={necklace.id}
              className={`necklace-option ${selectedNecklace?.id === necklace.id ? 'selected' : ''}`}
              onClick={() => selectNecklace(necklace.id)}
            >
              <img src={necklace.imagePath} alt={necklace.name} />
              <div className="necklace-info">
                <p className="necklace-name">{necklace.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NecklaceSelector;