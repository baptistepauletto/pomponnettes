import React from 'react';
import { useDragLayer } from 'react-dnd';
import { useCustomizer } from '../context/CustomizerContext';
import { ItemTypes } from '../hooks/useDragAndDrop';
import '../styles/DragPreview.scss';

interface DragLayerCollectedProps {
  item: any;
  itemType: string | symbol | null;
  currentOffset: { x: number; y: number } | null;
  isDragging: boolean;
}

const DragPreview: React.FC = () => {
  const { charms } = useCustomizer();
  
  const { item, itemType, currentOffset, isDragging }: DragLayerCollectedProps = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  // Only show preview for charm items
  if (!isDragging || itemType !== ItemTypes.CHARM || !currentOffset || !item) {
    return null;
  }

  // Find the charm data
  const charm = charms.find(c => c.id === item.charmId);
  if (!charm) return null;

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

  return (
    <div className="drag-preview-layer">
      <div 
        className="drag-preview"
        style={{ 
          transform,
          pointerEvents: 'none',
        }}
      >
        <img 
          src={charm.imagePath} 
          alt={charm.name}
          className="drag-preview-image"
        />
      </div>
    </div>
  );
};

export default DragPreview; 