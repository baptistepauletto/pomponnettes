import React, { useState, useRef, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDroppableAttachmentPoint, usePlacedCharm, useDraggablePlacedCharm, useProximityDroppableNecklace } from '../hooks/useDragAndDrop';
import '../styles/NecklaceDisplay.scss';
import { useTapToPlace, isTouchDevice, triggerHapticFeedback } from '../hooks/useTapToPlace';
import CharmDrawer from './CharmDrawer';
import { Position, getProductTypeLabel, isBandanaProduct } from '../types';

// Component for a single attachment point
const AttachmentPointComponent: React.FC<{
  id: string;
  position: Position;
  isOccupied: boolean;
  showAttachmentPoints: boolean;
  showNames: boolean;
  isDrawerOpen: boolean;
  isTargeted: boolean;
}> = ({ id, position, isOccupied, showAttachmentPoints, showNames, isDrawerOpen, isTargeted }) => {
  const { isOver, canDrop, drop } = useDroppableAttachmentPoint(id, isOccupied);
  const attachmentPointRef = useRef<HTMLDivElement>(null);
  const { selectedCharmId, selectedPlacedCharmId, clearSelectedPlacedCharm } = useTapToPlace();
  const { addCharm, moveCharm, swapCharms, placedCharms } = useCustomizer();
  const isMobile = isTouchDevice();
  
  // Apply the drop ref to the element only if not occupied AND on mobile
  // For desktop, we use proximity dropping on the product container
  if (!isOccupied && isMobile) {
    drop(attachmentPointRef);
  }

  // Handle tap to place charm or move placed charm on mobile
  const handleTap = () => {
    if (!isMobile) return;
    
    // Handle placed charm movement (move mode)
    if (selectedPlacedCharmId) {
      const placedCharm = placedCharms.find(c => c.id === selectedPlacedCharmId);
      if (!placedCharm) return;
      
      // Don't allow moving to the same position
      if (placedCharm.attachmentPointId === id) {
        clearSelectedPlacedCharm(); // Exit move mode
        return;
      }
      
      if (isOccupied) {
        // Swap with existing charm
        swapCharms(selectedPlacedCharmId, id);
      } else {
        // Move to empty point
        moveCharm(selectedPlacedCharmId, id);
      }
      
      // Exit move mode after successful operation
      clearSelectedPlacedCharm();
      return;
    }
    
    // Handle new charm placement (from drawer)
    if (selectedCharmId && !isOccupied) {
      addCharm(selectedCharmId, id);
    }
  };

  return (
    <div
      ref={attachmentPointRef}
      className={`attachment-point ${isOver ? 'over' : ''} ${canDrop ? 'can-drop' : ''} ${
        isOccupied ? 'occupied' : ''
      } ${showAttachmentPoints ? 'visible' : ''} ${
        (isDrawerOpen && isMobile && selectedCharmId && !isOccupied) ? 'mobile-drop-target' : ''
      } ${isTargeted ? 'targeted' : ''} ${isTargeted && isOccupied ? 'occupied' : ''} ${
        (isMobile && selectedPlacedCharmId) ? 'move-mode-target' : ''
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      onClick={handleTap}
    >
      {showNames && <span className="point-name">{id}</span>}
    </div>
  );
};

// Determine charm rotation and position based on its location on the product
const getCharmTransformStyles = (position: { x: number; y: number }) => {
  const { x, y } = position;
  const centerX = 53; // Assuming center of the product is at 50%
  const bottomY = 85; // Approximate bottom position of the product
  
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
      horizontalOffset = -40 * Math.abs(rotation) / maxRotation;
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


  // Return the rotation and translate to center the charm with horizontal offset
  // This makes the charm's top center align with the attachment point
  // The actual size adjustment will be handled in the PlacedCharm component
  return {
    transform: `translate(calc(-50% + ${horizontalOffset}%), 0) rotate(${rotation}deg)`,
    positionClass
  };
};

// Component for a charm that has been placed on the product
import { toThumbWebpUrl } from '../utils/images';

const PlacedCharm: React.FC<{
  id: string;
  charmId: string;
  position: { x: number; y: number };
  attachmentPointId: string;
}> = ({ id, charmId, position, attachmentPointId }) => {
  const { charms, swapCharms } = useCustomizer();
  const { handleRemove } = usePlacedCharm(id);
  const { isDragging, drag, canDrag } = useDraggablePlacedCharm(id, charmId, attachmentPointId);
  const isMobileDevice = isTouchDevice();
  const charmRef = useRef<HTMLDivElement>(null);
  
  // Make placed charms drop targets for swapping
  const { isOver: isCharmOver, canDrop: canCharmDrop, drop: charmDrop } = useDroppableAttachmentPoint(attachmentPointId, true);
  
  // Mobile tap-to-place functionality
  const { selectPlacedCharm, isPlacedCharmSelected, clearSelectedPlacedCharm, selectedPlacedCharmId } = useTapToPlace();
  const isInMoveMode = isMobileDevice && isPlacedCharmSelected(id);
  
  // Double tap detection for mobile
  const lastTapTime = useRef<number>(0);
  const tapTimeout = useRef<number | null>(null);

  // Find the charm data
  const charm = charms.find((c) => c.id === charmId);
  if (!charm) return null;

  // Always apply drag ref (the hook handles desktop/mobile logic internally)
  drag(charmRef);
  
  // Apply drop ref for swapping (only on desktop)
  if (canDrag) {
    charmDrop(charmRef);
  }
  
  // Base size for charms (in pixels)
  const baseCharmSize = 48;
  
  // Scale factor based on device
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;
  const deviceScaleFactor = isMobileDevice ? 0.5 : isTablet ? 0.85 : 1;
  
  // Get transform styles based on position
  const { transform, positionClass } = getCharmTransformStyles(position);

  // Apply attachment offset if available
  const offsetX = charm.attachmentOffset?.x || 0;
  const offsetY = charm.attachmentOffset?.y || 0;

  // Handle mobile tap interactions (single tap = move mode, double tap = remove)
  const handleMobileTap = () => {
    if (!isMobileDevice) return;
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTapTime.current;
    
    // Clear any existing timeout
    if (tapTimeout.current) {
      window.clearTimeout(tapTimeout.current);
      tapTimeout.current = null;
    }
    
    // If another charm is in move mode and we tap this charm, swap them
    if (selectedPlacedCharmId && selectedPlacedCharmId !== id) {
      swapCharms(selectedPlacedCharmId, attachmentPointId);
      clearSelectedPlacedCharm();
      return;
    }
    
    // Double tap detection (within 300ms)
    if (timeDiff < 300) {
      // Double tap - remove charm
      handleRemove();
      clearSelectedPlacedCharm(); // Clear move mode
      lastTapTime.current = 0;
    } else {
      // Single tap - enter/exit move mode
      tapTimeout.current = window.setTimeout(() => {
        if (isInMoveMode) {
          // Already in move mode, exit it
          clearSelectedPlacedCharm();
        } else {
          // Enter move mode
          selectPlacedCharm(id);
        }
        tapTimeout.current = null;
      }, 300);
      lastTapTime.current = currentTime;
    }
  };

  // Handle desktop click (remove only)
  const handleDesktopClick = () => {
    // On desktop, only allow removal if not in the middle of a drag operation
    if (!isDragging) {
      handleRemove();
    }
  };

  const handleClick = isMobileDevice ? handleMobileTap : handleDesktopClick;
  
  return (
    <div
      ref={charmRef}
      className={`placed-charm ${positionClass} ${isDragging ? 'dragging' : ''} ${canDrag ? 'desktop-draggable' : ''} ${isCharmOver && canCharmDrop ? 'swap-target' : ''} ${isInMoveMode ? 'move-mode' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: transform + ` translate(${offsetX}%, ${offsetY}%)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
      }}
      onClick={handleClick}
    >
      <img 
        src={toThumbWebpUrl(charm.imagePath)} 
        alt={charm.name} 
        style={{
          width: `${baseCharmSize * charm.sizeScale * deviceScaleFactor}px`,
          height: `${baseCharmSize * charm.sizeScale * deviceScaleFactor}px`,
          transformOrigin: 'center center',
        }}
        onError={(e) => { e.currentTarget.src = charm.imagePath; }}
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
  const { selectedProduct, placedCharms } = useCustomizer();
  const [showAttachmentPoints, setShowAttachmentPoints] = useState(false);
  const [showPointNames, setShowPointNames] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { selectedCharmId, selectedPlacedCharmId } = useTapToPlace();
  const isMobile = window.innerWidth <= 480;
  const [hasPlacedCharm, setHasPlacedCharm] = useState(false);
  const [showRemovalTip, setShowRemovalTip] = useState(false);
  const [hasShownRemovalTip, setHasShownRemovalTip] = useState(false);
  const [hasInteractedWithProduct, setHasInteractedWithProduct] = useState(false);
  const productContainerRef = useRef<HTMLDivElement>(null!);
  const [targetedPointId, setTargetedPointId] = useState<string | null>(null);
  const inStockVariationIds = (window.pomponnettesData?.stock?.inStockVariationIds || []) as number[];
  
  // Use proximity dropping only for desktop (non-touch devices)
  const attachmentPoints = selectedProduct?.attachmentPoints || [];
  const proximityDrop = useProximityDroppableNecklace(
    attachmentPoints,
    setTargetedPointId,
    productContainerRef
  );

  // Apply drop functionality to product container for desktop
  if (!isMobile) {
    proximityDrop.drop(productContainerRef);
  }

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
    if (isDrawerOpen && !hasInteractedWithProduct) {
      setHasInteractedWithProduct(true);
    }
  }, [isDrawerOpen, hasInteractedWithProduct]);

  if (!selectedProduct) {
    return <div className="necklace-display empty">Sélectionne un produit</div>;
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
      if (!hasInteractedWithProduct) {
        setHasInteractedWithProduct(true);
      }
    }
  };

  // Handle product tap to open drawer
  const handleProductTap = () => {
    if (isMobile && !isDrawerOpen) {
      setHasInteractedWithProduct(true);
      handleDrawerOpenChange(true);
      triggerHapticFeedback('light');
    }
  };

// Get product type label for dynamic text
  const productTypeLabel = getProductTypeLabel(selectedProduct).toUpperCase();

  // Wide availability for the currently selected bandana (ignoring hole count)
  const isBandana = isBandanaProduct(selectedProduct);
  const candidateVariationIds: number[] = isBandana
    ? Object.values(selectedProduct.variationIdsByHoleCount).filter((v): v is number => typeof v === 'number')
    : [selectedProduct.variationId];
  const wideAvailable = !isBandana || candidateVariationIds.some(id => inStockVariationIds.includes(id));

  return (
    <div className={`necklace-display ${isDrawerOpen ? 'placement-mode' : ''}`}>
      {/* Show removal tip when charms are placed and tip hasn't been shown yet */}
      {showRemovalTip && (
        <div className="removal-tip">
          {isTouchDevice() ? 'TAP 2X UN CHARM POUR LE RETIRER' : 'CLIQUE SUR UN CHARM POUR LE RETIRER'}
        </div>
      )}
      
      {/* Add instruction when in placement mode and a charm is selected, but only if user hasn't placed a charm yet */}
      {isDrawerOpen && selectedCharmId && !hasPlacedCharm && (
        <div className="placement-instructions">
          TAP UN POINT POUR PLACER TON CHARM
        </div>
      )}
      
      <div 
        ref={productContainerRef}
        className={`necklace-container ${showGrid ? 'with-grid' : ''}`}
      >
        {!wideAvailable && (
          <div className="oos-overlay-badge">Rupture de stock</div>
        )}
        <picture>
          <source 
            type="image/webp" 
            srcSet={selectedProduct.imagePath.replace(/\.(png|jpe?g|webp)$/i, '.webp')} 
          />
          <img
            src={selectedProduct.imagePath}
            alt={selectedProduct.name}
            className="necklace-image"
            style={{
              transform: selectedProduct.displayScale 
                ? `scale(${selectedProduct.displayScale})` 
                : undefined
            }}
            onClick={handleProductTap}
          />
        </picture>

        {showGrid && <PositionGrid />}

        {/* Render attachment points */}
        {selectedProduct.attachmentPoints.map((point) => {
          // Calculate occupation status considering move mode
          let isOccupied = point.isOccupied;
          
          // If we're in move mode, the selected charm should be treated as not occupying its current position
          if (selectedPlacedCharmId && isMobile) {
            const selectedCharm = placedCharms.find(c => c.id === selectedPlacedCharmId);
            if (selectedCharm && selectedCharm.attachmentPointId === point.id) {
              // This point is occupied by the charm being moved, so treat it as empty
              isOccupied = false;
            }
          }
          
          return (
            <AttachmentPointComponent
              key={point.id}
              id={point.id}
              position={point.position}
              isOccupied={isOccupied}
              showAttachmentPoints={showAttachmentPoints}
              showNames={showPointNames}
              isDrawerOpen={isDrawerOpen}
              isTargeted={targetedPointId === point.id}
            />
          );
        })}

        {/* Render placed charms */}
        {placedCharms.map((charm) => (
          <PlacedCharm
            key={charm.id}
            id={charm.id}
            charmId={charm.charmId}
            position={charm.position}
            attachmentPointId={charm.attachmentPointId}
          />
        ))}
      </div>
      
      {/* Show first-time interaction hint if never interacted with product */}
      {isMobile && !hasInteractedWithProduct && !isDrawerOpen && (
        <div className="first-interaction-hint">
          TAP LE {productTypeLabel} POUR COMMENCER
        </div>
      )}
      
      {/* Conditionally show controls for desktop only and in development */}
      {!isMobile && window.location.hostname === 'localhost' && (
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
      
      {showGrid && window.location.hostname === 'localhost' && (
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
