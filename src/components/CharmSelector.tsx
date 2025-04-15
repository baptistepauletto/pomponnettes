import React, { useRef } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDraggableCharm } from '../hooks/useDragAndDrop';
import { useTapToPlace, isTouchDevice } from '../hooks/useTapToPlace';
import '../styles/CharmSelector.scss';

const CharmOption: React.FC<{ 
  id: string; 
  name: string; 
  imagePath: string;
  price: number;
}> = ({
  id,
  name,
  imagePath,
  price,
}) => {
  const { isDragging, drag } = useDraggableCharm(id);
  const { selectCharm, isCharmSelected, clearSelectedAttachmentPoint } = useTapToPlace();
  const isSelected = isCharmSelected(id);
  const isMobile = isTouchDevice();
  const ref = useRef<HTMLDivElement>(null);

  // Apply the drag ref to the element
  drag(ref);

  // Handle tap on mobile
  const handleTap = () => {
    // Clear any selected attachment point when choosing a charm
    clearSelectedAttachmentPoint();
    
    if (isMobile) {
      selectCharm(id);
    }
  };

  return (
    <div
      ref={ref}
      className={`charm-option ${isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      onClick={handleTap}
    >
      <img src={imagePath} alt={name} />
      <div className="charm-details">
        <p className="charm-name">{name}</p>
        <p className="charm-price">€{price.toFixed(2)}</p>
      </div>
    </div>
  );
};

const CharmSelector: React.FC = () => {
  const { charms } = useCustomizer();
  const { selectedCharmId } = useTapToPlace();
  const isMobile = isTouchDevice();

  return (
    <div className="charm-selector">
      <h3>Select a Charm</h3>
      <div className="charm-options">
        {charms.map((charm) => (
          <CharmOption
            key={charm.id}
            id={charm.id}
            name={charm.name}
            imagePath={charm.imagePath}
            price={charm.price}
          />
        ))}
      </div>
      <p className="instructions">
        {isMobile ? 
          (selectedCharmId ? 
            "Now tap an attachment point on the necklace" : 
            "Tap a charm to select it"
          ) : 
          "Drag and drop charms onto the necklace"
        }
      </p>
    </div>
  );
};

export default CharmSelector; 