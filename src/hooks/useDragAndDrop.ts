import React, { useCallback } from 'react';
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor, } from 'react-dnd';
import { useCustomizer } from '../context/CustomizerContext';
import { AttachmentPoint } from '../types';

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
  const [{ isDragging }, drag, preview] = useDrag<DragItem, unknown, { isDragging: boolean }>(() => ({
    type: ItemTypes.CHARM,
    item: { charmId },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Hide the default drag preview since we're using a custom one
  React.useEffect(() => {
    // Create an empty/transparent image to completely hide the default preview
    const emptyImage = new Image();
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    preview(emptyImage, { captureDraggingState: true });
  }, [preview]);

  return { isDragging, drag };
};

// Hook for making an attachment point a drop target
export const useDroppableAttachmentPoint = (attachmentPointId: string, isOccupied: boolean) => {
  const { addCharm } = useCustomizer();

  const handleDrop = useCallback(
    (item: DragItem) => {
      if (isOccupied) return undefined;
      addCharm(item.charmId, attachmentPointId);
      return { dropped: true, attachmentPointId };
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

// Utility function to calculate distance between two points
const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Utility function to find the nearest attachment point to drop coordinates
const findNearestAttachmentPoint = (
  dropX: number, 
  dropY: number, 
  attachmentPoints: AttachmentPoint[], 
  maxDistance: number = 15
): AttachmentPoint | null => {
  let nearestPoint: AttachmentPoint | null = null;
  let minDistance = Infinity;

  attachmentPoints.forEach(point => {
    // Only consider unoccupied points
    if (!point.isOccupied) {
      const distance = calculateDistance(dropX, dropY, point.position.x, point.position.y);
      
      // Check if within snap distance and closer than current nearest
      if (distance <= maxDistance && distance < minDistance) {
        nearestPoint = point;
        minDistance = distance;
      }
    }
  });

  return nearestPoint;
};

// Hook for proximity-based dropping on the necklace container
export const useProximityDroppableNecklace = (
  attachmentPoints: AttachmentPoint[],
  onTargetedPointChange: (pointId: string | null) => void,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const { addCharm } = useCustomizer();

  const handleDrop = useCallback(
    (item: DragItem, monitor: DropTargetMonitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) return undefined; // Already handled by a more specific drop target

      // Get the drop coordinates relative to the container
      const clientOffset = monitor.getClientOffset();
      const containerElement = containerRef.current;
      
      if (!clientOffset || !containerElement) return undefined;

      // Get container bounds
      const containerRect = containerElement.getBoundingClientRect();
      
      // Calculate relative position as percentage
      const relativeX = ((clientOffset.x - containerRect.left) / containerRect.width) * 100;
      const relativeY = ((clientOffset.y - containerRect.top) / containerRect.height) * 100;

      // Find nearest attachment point
      const nearestPoint = findNearestAttachmentPoint(relativeX, relativeY, attachmentPoints, 15);
      
      if (nearestPoint) {
        addCharm(item.charmId, nearestPoint.id);
        onTargetedPointChange(null); // Clear targeting after successful drop
        return { dropped: true, attachmentPointId: nearestPoint.id };
      }

      return undefined;
    },
    [addCharm, attachmentPoints, containerRef, onTargetedPointChange]
  );

  const handleHover = useCallback(
    (_item: DragItem, monitor: DropTargetMonitor) => {
      const clientOffset = monitor.getClientOffset();
      const containerElement = containerRef.current;
      
      if (!clientOffset || !containerElement) {
        onTargetedPointChange(null);
        return;
      }

      // Get container bounds
      const containerRect = containerElement.getBoundingClientRect();
      
      // Calculate relative position as percentage
      const relativeX = ((clientOffset.x - containerRect.left) / containerRect.width) * 100;
      const relativeY = ((clientOffset.y - containerRect.top) / containerRect.height) * 100;

      // Find nearest attachment point for visual feedback
      const nearestPoint = findNearestAttachmentPoint(relativeX, relativeY, attachmentPoints, 15);
      
      onTargetedPointChange(nearestPoint ? nearestPoint.id : null);
    },
    [attachmentPoints, containerRef, onTargetedPointChange]
  );

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, unknown, { isOver: boolean; canDrop: boolean }>(() => ({
    accept: ItemTypes.CHARM,
    drop: handleDrop,
    hover: handleHover,
    canDrop: () => true, // Always allow dropping on necklace container
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver({ shallow: true }), // Only true when directly over this container
      canDrop: !!monitor.canDrop(),
    }),
  }), [handleDrop, handleHover]);

  return { 
    isOver, 
    canDrop, 
    drop
  };
};

// Hook for making a placed charm both draggable and removable
export const usePlacedCharm = (placedCharmId: string) => {
  const { removeCharm } = useCustomizer();

  const handleRemove = useCallback(() => {
    removeCharm(placedCharmId);
  }, [removeCharm, placedCharmId]);

  return { handleRemove };
}; 