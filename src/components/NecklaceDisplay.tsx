import React, { useState, useRef } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDroppableAttachmentPoint, usePlacedCharm } from '../hooks/useDragAndDrop';
import { useTapToPlace, isTouchDevice } from '../hooks/useTapToPlace';
import CharmPopup from './CharmPopup';
import '../styles/NecklaceDisplay.scss';

// Component for a single attachment point
const AttachmentPoint: React.FC<{
  id: string;
  position: { x: number; y: number };
  isOccupied: boolean;
  showAttachmentPoints: boolean;
  showNames: boolean;
  onSelect: (id: string, position: { x: number; y: number }) => void;
  isSelected: boolean;
}> = ({ id, position, isOccupied, showAttachmentPoints, showNames, onSelect, isSelected }) => {
  const { isOver, canDrop, drop } = useDroppableAttachmentPoint(id, isOccupied);
  const attachmentPointRef = useRef<HTMLDivElement>(null);
  const { selectedCharmId, clearSelectedCharm } = useTapToPlace();
  const { addCharm } = useCustomizer();
  const isMobile = isTouchDevice();
  
  // Apply the drop ref to the element only if not occupied
  // This ensures drag-and-drop won't work on occupied points either
  if (!isOccupied) {
    drop(attachmentPointRef);
  }

  // Handle tap to place charm on mobile
  const handleTap = () => {
    // If occupied, do absolutely nothing
    if (isOccupied) {
      return;
    }
    
    // Only proceed if the point is not occupied
    if (isMobile && selectedCharmId) {
      // If we have a charm selected (from the CharmSelector), add it
      addCharm(selectedCharmId, id);
      clearSelectedCharm();
    } else {
      // Otherwise, select this attachment point to show the popup
      onSelect(id, position);
    }
  };

  return (
    <div
      ref={attachmentPointRef}
      className={`attachment-point ${isOver ? 'over' : ''} ${canDrop ? 'can-drop' : ''} ${
        isOccupied ? 'occupied' : ''
      } ${showAttachmentPoints ? 'visible' : ''} ${
        (isMobile && selectedCharmId && !isOccupied) ? 'mobile-drop-target' : ''
      } ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      onClick={isOccupied ? undefined : handleTap}
    >
      {showNames && <span className="point-name">{id}</span>}
    </div>
  );
};

// Determine charm rotation and position based on its location on the necklace
const getCharmTransformStyles = (position: { x: number; y: number }) => {
  const { x, y } = position;
  const centerX = 53; // Assuming center of the necklace is at 50%
  const bottomY = 85; // Approximate bottom position of the necklace
  
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 480;
  
  // Calculate how far the charm is from the center (horizontally)
  const distanceFromCenter = Math.abs(x - centerX);
  
  // Calculate how far the charm is from the bottom (vertically)
  // 0 = at bottom, 1 = at top
  const distanceFromBottom = 1 - Math.min(1, Math.max(0, y / bottomY));
  
  // Side determination (left or right)
  const isLeftSide = x < centerX;
  const isRightSide = x > centerX;
  
  // Calculate rotation based on position
  // For mobile: MORE rotation on the sides, especially away from the bottom
  // For desktop: Normal rotation
  const maxRotation = isMobile ? 40 : 55; // Max rotation degrees
  let rotation = 0;
  
  if (isMobile) {
    // For mobile, scale translateX based on position factors
    if (isLeftSide) {
      // Scale based on distance from center and bottom
      // This makes charms CLOSER to center have MORE translation
      // Left side: rotate outward (positive degrees for left side)
      // Enhanced mobile rotation that increases with height and distance from center
      rotation = maxRotation * (distanceFromCenter / centerX) * (0.35 + distanceFromBottom);
    } else if (isRightSide) {
      // Right side: rotate outward (negative degrees for right side)
      // Enhanced mobile rotation that increases with height and distance from center
      rotation = -maxRotation * (distanceFromCenter / centerX) * (0.35 + distanceFromBottom);
    }
  } else {
    // Desktop rotation calculation
    if (isLeftSide) {
      rotation = maxRotation * (distanceFromCenter / centerX) * distanceFromBottom;
    } else if (isRightSide) {
      rotation = -maxRotation * (distanceFromCenter / centerX) * distanceFromBottom;
    }
  }
  
  // Class for styling
  let positionClass = '';
  if (isLeftSide) positionClass = 'left-side';
  else if (isRightSide) positionClass = 'right-side';

  
  return {
    transform: `translate(-45%, -25%) rotate(${rotation}deg)`,
    positionClass
  };
};

// Component for a charm that has been placed on the necklace
const PlacedCharm: React.FC<{
  id: string;
  charmId: string;
  position: { x: number; y: number };
}> = ({ id, charmId, position }) => {
  const { charms } = useCustomizer();
  const { handleRemove } = usePlacedCharm(id);

  // Find the charm data
  const charm = charms.find((c) => c.id === charmId);
  if (!charm) return null;
  
  // Get transform styles based on position
  const { transform, positionClass } = getCharmTransformStyles(position);

  return (
    <div
      className={`placed-charm ${positionClass}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform,
      }}
      onClick={handleRemove}
    >
      <img src={charm.imagePath} alt={charm.name} />
    </div>
  );
};

// Grid component to show coordinates
const PositionGrid: React.FC = () => {
  const gridLines = [];
  
  // Generate vertical lines
  for (let x = 0; x <= 100; x += 10) {
    gridLines.push(
      <div 
        key={`v-${x}`} 
        className="grid-line vertical" 
        style={{ left: `${x}%` }}
      >
        <span className="grid-label">{x}%</span>
      </div>
    );
  }
  
  // Generate horizontal lines
  for (let y = 0; y <= 100; y += 10) {
    gridLines.push(
      <div 
        key={`h-${y}`} 
        className="grid-line horizontal" 
        style={{ top: `${y}%` }}
      >
        <span className="grid-label">{y}%</span>
      </div>
    );
  }
  
  return <div className="position-grid">{gridLines}</div>;
};

const NecklaceDisplay: React.FC = () => {
  const { selectedNecklace, placedCharms } = useCustomizer();
  const [showAttachmentPoints, setShowAttachmentPoints] = useState(false);
  const [showPointNames, setShowPointNames] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const {selectedAttachmentPointId, selectAttachmentPoint, clearSelectedAttachmentPoint, isAttachmentPointSelected } = useTapToPlace();
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const isMobile = window.innerWidth <= 480;

  if (!selectedNecklace) {
    return <div className="necklace-display empty">Please select a necklace</div>;
  }

  // Handle selecting an attachment point
  const handleAttachmentPointSelect = (pointId: string, position: { x: number; y: number }) => {
    selectAttachmentPoint(pointId);
    setPopupPosition(position);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    clearSelectedAttachmentPoint();
    setPopupPosition(null);
  };


  return (
    <div className="necklace-display">
      <div className={`necklace-container ${showGrid ? 'with-grid' : ''}`}>
        <img
          src={selectedNecklace.imagePath}
          alt={selectedNecklace.name}
          className="necklace-image"
        />

        {showGrid && <PositionGrid />}

        {/* Render attachment points */}
        {selectedNecklace.attachmentPoints.map((point) => (
          <AttachmentPoint
            key={point.id}
            id={point.id}
            position={point.position}
            isOccupied={point.isOccupied}
            showAttachmentPoints={showAttachmentPoints}
            showNames={showPointNames}
            onSelect={handleAttachmentPointSelect}
            isSelected={isAttachmentPointSelected(point.id)}
          />
        ))}

        {/* Render placed charms */}
        {placedCharms.map((charm) => (
          <PlacedCharm
            key={charm.id}
            id={charm.id}
            charmId={charm.charmId}
            position={charm.position}
          />
        ))}

        {/* Show popup based on device type */}
        {((!isMobile && selectedAttachmentPointId && popupPosition) || (isMobile)) && (
          <CharmPopup
            position={popupPosition}
            onClose={handleClosePopup}
          />
        )}
      </div>
      
      <div className="controls">
        <label>
          <input 
            type="checkbox" 
            checked={showAttachmentPoints} 
            onChange={() => setShowAttachmentPoints(!showAttachmentPoints)} 
          />
          Show attachment points
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={showPointNames} 
            onChange={() => setShowPointNames(!showPointNames)} 
          />
          Show point names
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={showGrid} 
            onChange={() => setShowGrid(!showGrid)} 
          />
          Show position grid
        </label>
      </div>
      
      {showGrid && (
        <div className="position-info">
          <p>Use these coordinates to update the attachment points in src/data/necklaces.ts</p>
        </div>
      )}
    </div>
  );
};

export default NecklaceDisplay; 