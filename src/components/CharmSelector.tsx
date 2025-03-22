import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDraggableCharm } from '../hooks/useDragAndDrop';
import '../styles/CharmSelector.scss';

const CharmOption: React.FC<{ id: string; name: string; imagePath: string }> = ({
  id,
  name,
  imagePath,
}) => {
  const { isDragging, drag } = useDraggableCharm(id);

  return (
    <div
      ref={drag}
      className={`charm-option ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <img src={imagePath} alt={name} />
      <p>{name}</p>
    </div>
  );
};

const CharmSelector: React.FC = () => {
  const { charms } = useCustomizer();

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
      <p className="instructions">Drag and drop charms onto the necklace</p>
    </div>
  );
};

export default CharmSelector; 