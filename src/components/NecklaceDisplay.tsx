import React, { useState, useRef } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDroppableAttachmentPoint, usePlacedCharm } from '../hooks/useDragAndDrop';
import '../styles/NecklaceDisplay.scss';
import { useTapToPlace, isTouchDevice, triggerHapticFeedback } from '../hooks/useTapToPlace';
import CharmDrawer from './CharmDrawer';
import { Position } from '../types';

// Component for a single attachment point
const AttachmentPointComponent: React.FC<{
  id: string;
  position: Position;
  isOccupied: boolean;
  showAttachmentPoints: boolean;
  showNames: boolean;
  onSelect: (id: string, position: Position) => void;
  isSelected: boolean;
  isDrawerOpen: boolean;
}> = ({ id, position, isOccupied, showAttachmentPoints, showNames, onSelect, isSelected, isDrawerOpen }) => {
  const { isOver, canDrop, drop } = useDroppableAttachmentPoint(id, isOccupied);
  const attachmentPointRef = useRef<HTMLDivElement>(null);
  const { selectedCharmId } = useTapToPlace();
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
      // If we have a charm selected (from the drawer), add it
      addCharm(selectedCharmId, id);
      
      // Don't clear the selected charm - we want to keep it selected
      // This allows multiple placements of the same charm
      
      // Provide haptic feedback for successful placement
      triggerHapticFeedback('medium');
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
        (isDrawerOpen && isMobile && selectedCharmId && !isOccupied) ? 'mobile-drop-target' : ''
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

  // Return only the rotation and translate to center the charm (translate(-50%, 0))
  // This makes the charm's top center align with the attachment point
  // The actual size adjustment will be handled in the PlacedCharm component
  return {
    transform: `translate(-50%, 0) rotate(${rotation}deg)`,
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
  
  // Base size for charms (in pixels)
  const baseCharmSize = 48;
  
  // Scale factor based on device
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;
  const deviceScaleFactor = isMobile ? 0.5 : isTablet ? 0.85 : 1;
  
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
      <img 
        src={charm.imagePath} 
        alt={charm.name} 
        style={{
          width: `${baseCharmSize * charm.sizeScale * deviceScaleFactor}px`,
          height: `${baseCharmSize * charm.sizeScale * deviceScaleFactor}px`,
          transformOrigin: 'center center'
        }}
      />
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { selectAttachmentPoint, isAttachmentPointSelected, selectedCharmId } = useTapToPlace();
  const isMobile = window.innerWidth <= 480;

  if (!selectedNecklace) {
    return <div className="necklace-display empty">Please select a necklace</div>;
  }

  // Handle selecting an attachment point
  const handleAttachmentPointSelect = (pointId: string) => {
    selectAttachmentPoint(pointId);
  };

  // Handle drawer open/close state
  const handleDrawerOpenChange = (open: boolean) => {
    setIsDrawerOpen(open);
    
    // When the drawer is closed, hide attachment points
    if (!open) {
      setShowAttachmentPoints(false);
    } else {
      // When the drawer is open, show attachment points
      setShowAttachmentPoints(true);
    }
  };

  return (
    <div className={`necklace-display ${isDrawerOpen ? 'placement-mode' : ''}`}>
      {/* Add instruction when in placement mode and a charm is selected */}
      {isDrawerOpen && selectedCharmId && (
        <div className="placement-instructions">
          Tap on a green attachment point to place/remove your charm
        </div>
      )}
      
      <div className={`necklace-container ${showGrid ? 'with-grid' : ''}`}>
        <img
          src={selectedNecklace.imagePath}
          alt={selectedNecklace.name}
          className="necklace-image"
        />

        {showGrid && <PositionGrid />}

        {/* Render attachment points */}
        {selectedNecklace.attachmentPoints.map((point) => (
          <AttachmentPointComponent
            key={point.id}
            id={point.id}
            position={point.position}
            isOccupied={point.isOccupied}
            showAttachmentPoints={showAttachmentPoints}
            showNames={showPointNames}
            onSelect={handleAttachmentPointSelect}
            isSelected={isAttachmentPointSelected(point.id)}
            isDrawerOpen={isDrawerOpen}
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
      </div>
      
      {/* Conditionally show controls for desktop only */}
      {!isMobile && (
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
      )}
      
      {showGrid && (
        <div className="position-info">
          <p>Use these coordinates to update the attachment points in src/data/necklaces.ts</p>
        </div>
      )}
      
      {/* Charm drawer for mobile */}
      {isMobile && (
        <CharmDrawer 
          isOpen={isDrawerOpen} 
          onOpenChange={handleDrawerOpenChange} 
        />
      )}
    </div>
  );
};

export default NecklaceDisplay;