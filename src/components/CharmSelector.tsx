import React, { useRef } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDraggableCharm } from '../hooks/useDragAndDrop';
import { useTapToPlace, isTouchDevice } from '../hooks/useTapToPlace';
import '../styles/CharmSelector.scss';

const CharmOption: React.FC<{ id: string; name: string; imagePath: string }> = ({
  id,
  name,
  imagePath,
}) => {
  const { isDragging, drag } = useDraggableCharm(id);
  const { selectCharm, isCharmSelected } = useTapToPlace();
  const isSelected = isCharmSelected(id);
  const isMobile = isTouchDevice();
  const ref = useRef<HTMLDivElement>(null);

  // Apply the drag ref to the element
  drag(ref);

  // Handle tap on mobile
  const handleTap = () => {
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
      <p>{name}</p>
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