import React, { useState, useRef, useEffect } from 'react';
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
  isDrawerOpen: boolean;
}> = ({ id, position, isOccupied, showAttachmentPoints, showNames, isDrawerOpen }) => {
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
      
      // Provide haptic feedback for successful placement
      triggerHapticFeedback('medium');
    }
  };

  return (
    <div
      ref={attachmentPointRef}
      className={`attachment-point ${isOver ? 'over' : ''} ${canDrop ? 'can-drop' : ''} ${
        isOccupied ? 'occupied' : ''
      } ${showAttachmentPoints ? 'visible' : ''} ${
        (isDrawerOpen && isMobile && selectedCharmId && !isOccupied) ? 'mobile-drop-target' : ''
      }`}
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
  let horizontalOffset = 0;
  if (isMobile) {
    if (isLeftSide) {
      rotation = maxRotation * (distanceFromCenter / centerX) * (0.35 + distanceFromBottom);
      horizontalOffset = -25 * Math.abs(rotation) / maxRotation;
    } else if (isRightSide) {
      rotation = -maxRotation * (distanceFromCenter / centerX) * (0.35 + distanceFromBottom);
      horizontalOffset = 25 * Math.abs(rotation) / maxRotation;
    }
  } else {
    if (isLeftSide) {
      rotation = maxRotation * (distanceFromCenter / centerX) * distanceFromBottom;
      horizontalOffset = -50 * Math.abs(rotation) / maxRotation;
    } else if (isRightSide) {
      rotation = -maxRotation * (distanceFromCenter / centerX) * distanceFromBottom;
      horizontalOffset = 50 * Math.abs(rotation) / maxRotation;
    }
  }
  
  // Class for styling
  let positionClass = '';
  if (isLeftSide) positionClass = 'left-side';
  else if (isRightSide) positionClass = 'right-side';

  // Calculate horizontal offset based on rotation

  if (rotation !== 0) {
    if (isLeftSide) {
      // Move left side charms slightly to the left

    } else if (isRightSide) {

    }
  }

  // Return the rotation and translate to center the charm with horizontal offset
  // This makes the charm's top center align with the attachment point
  // The actual size adjustment will be handled in the PlacedCharm component
  return {
    transform: `translate(calc(-50% + ${horizontalOffset}%), 0) rotate(${rotation}deg)`,
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

  // Apply attachment offset if available
  const offsetX = charm.attachmentOffset?.x || 0;
  const offsetY = charm.attachmentOffset?.y || 0;
  
  return (
    <div
      className={`placed-charm ${positionClass}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: transform + ` translate(${offsetX}%, ${offsetY}%)`,
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
  const { selectedCharmId } = useTapToPlace();
  const isMobile = window.innerWidth <= 480;
  const [hasPlacedCharm, setHasPlacedCharm] = useState(false);
  const [showRemovalTip, setShowRemovalTip] = useState(false);
  const [hasShownRemovalTip, setHasShownRemovalTip] = useState(false);
  const [hasInteractedWithNecklace, setHasInteractedWithNecklace] = useState(false);

  // Effect to track if a charm has been placed
  useEffect(() => {
    if (placedCharms.length > 0 && !hasPlacedCharm) {
      setHasPlacedCharm(true);
    }

    if (placedCharms.length === 1 && !hasShownRemovalTip) {
      setShowRemovalTip(true);
      setHasShownRemovalTip(true);
    }

    if (placedCharms.length > 1) {
      setShowRemovalTip(false);
    }

    // Hide removal tip if all charms are removed
    if (placedCharms.length === 0) {
      setShowRemovalTip(false);
    }

  }, [placedCharms, hasPlacedCharm, hasShownRemovalTip]);

  // Effect to mark the user as interacted when drawer is opened
  useEffect(() => {
    if (isDrawerOpen && !hasInteractedWithNecklace) {
      setHasInteractedWithNecklace(true);
    }
  }, [isDrawerOpen, hasInteractedWithNecklace]);

  if (!selectedNecklace) {
    return <div className="necklace-display empty">Please select a necklace</div>;
  }

  // Handle drawer open/close state
  const handleDrawerOpenChange = (open: boolean) => {
    setIsDrawerOpen(open);
    
    // When the drawer is closed, hide attachment points
    if (!open) {
      setShowAttachmentPoints(false);
    } else {
      // When the drawer is open, show attachment points
      setShowAttachmentPoints(true);
      
      // Mark as interacted when drawer is opened
      if (!hasInteractedWithNecklace) {
        setHasInteractedWithNecklace(true);
      }
    }
  };

  // Handle necklace tap to open drawer on first interaction
  const handleNecklaceTap = () => {
    if (isMobile && !hasInteractedWithNecklace && !isDrawerOpen) {
      setHasInteractedWithNecklace(true);
      handleDrawerOpenChange(true);
      triggerHapticFeedback('light');
    }
  };

  return (
    <div className={`necklace-display ${isDrawerOpen ? 'placement-mode' : ''}`}>
      {/* Show removal tip when charms are placed and tip hasn't been shown yet */}
      {showRemovalTip && (
        <div className="removal-tip">
          💡 Tap any charm to remove it
        </div>
      )}
      
      {/* Add instruction when in placement mode and a charm is selected, but only if user hasn't placed a charm yet */}
      {isDrawerOpen && selectedCharmId && !hasPlacedCharm && (
        <div className="placement-instructions">
          Tap a pink attachment point to place your charm
        </div>
      )}
      
      <div className={`necklace-container ${showGrid ? 'with-grid' : ''}`}>
        <img
          src={selectedNecklace.imagePath}
          alt={selectedNecklace.name}
          className="necklace-image"
          onClick={handleNecklaceTap}
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
      
      {/* Show first-time interaction hint if never interacted with necklace */}
      {isMobile && !hasInteractedWithNecklace && !isDrawerOpen && (
        <div className="first-interaction-hint">
          👆 Tap the necklace to start customizing
        </div>
      )}
      
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