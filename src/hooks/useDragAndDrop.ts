import { useCallback, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor, ConnectDropTarget, ConnectDragSource } from 'react-dnd';
import { useCustomizer } from '../context/CustomizerContext';

// Item types for react-dnd
export const ItemTypes = {
  CHARM: 'charm',
};

// Define the drag item type
interface DragItem {
  charmId: string;
}

// Hook for making a charm draggable
export const useDraggableCharm = (charmId: string) => {
  const [{ isDragging }, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>(() => ({
    type: ItemTypes.CHARM,
    item: { charmId },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return { isDragging, drag };
};

// Hook for making an attachment point a drop target
export const useDroppableAttachmentPoint = (attachmentPointId: string, isOccupied: boolean) => {
  const { addCharm } = useCustomizer();

  const handleDrop = useCallback(
    (item: DragItem) => {
      if (isOccupied) return false;
      addCharm(item.charmId, attachmentPointId);
      return true;
    },
    [addCharm, attachmentPointId, isOccupied]
  );

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, unknown, { isOver: boolean; canDrop: boolean }>(() => ({
    accept: ItemTypes.CHARM,
    drop: handleDrop,
    canDrop: () => !isOccupied,
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [handleDrop, isOccupied]);

  return { isOver, canDrop, drop };
};

// Hook for making a placed charm both draggable and removable
export const usePlacedCharm = (placedCharmId: string, charmId: string) => {
  const { removeCharm } = useCustomizer();

  const handleRemove = useCallback(() => {
    removeCharm(placedCharmId);
  }, [removeCharm, placedCharmId]);

  return { handleRemove };
}; 