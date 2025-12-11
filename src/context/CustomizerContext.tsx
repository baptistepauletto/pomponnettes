import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product, Charm, PlacedCharm, AttachmentPoint, HoleCount, isBandanaProduct } from '../types';
import { products } from '../data/products';
import { charms } from '../data/charms';

// Interface for the context state
interface CustomizerContextState {
  // Data
  products: Product[];
  charms: Charm[];
  
  // Current selections
  selectedProduct: Product | null;
  placedCharms: PlacedCharm[];
  selectedHoleCount: HoleCount;
  
  // Cart options
  giftWrap: boolean;
  charmOrderTrust: boolean;
  
  // Actions
  selectProduct: (productId: number) => void;
  addCharm: (charmId: string, attachmentPointId: string) => void;
  removeCharm: (placedCharmId: string) => void;
  moveCharm: (placedCharmId: string, newAttachmentPointId: string) => void;
  swapCharms: (placedCharmId: string, targetAttachmentPointId: string) => void;
  clearAllCharms: () => void;
  setGiftWrap: (enabled: boolean) => void;
  setCharmOrderTrust: (enabled: boolean) => void;
  setSelectedHoleCount: (count: HoleCount) => void;
  
  // Legacy aliases for backward compatibility
  /** @deprecated Use products instead */
  necklaces: Product[];
  /** @deprecated Use selectedProduct instead */
  selectedNecklace: Product | null;
  /** @deprecated Use selectProduct instead */
  selectNecklace: (productId: number) => void;
}

// Create context with initial empty state
const CustomizerContext = createContext<CustomizerContextState | undefined>(undefined);

// Props for the provider component
interface CustomizerProviderProps {
  children: ReactNode;
}

// Provider component
export const CustomizerProvider: React.FC<CustomizerProviderProps> = ({ children }) => {
  // State
  const [selectedProductId, setSelectedProductId] = useState<number>(products[0].id);
  const [placedCharms, setPlacedCharms] = useState<PlacedCharm[]>([]);
  const [giftWrap, setGiftWrap] = useState<boolean>(false);
  const [charmOrderTrust, setCharmOrderTrust] = useState<boolean>(false);
  const [selectedHoleCount, setSelectedHoleCountState] = useState<HoleCount>(5);

  // Helper to get bandana variant image path
  const getBandanaVariantImagePath = (basePath: string, count: HoleCount) => {
    // basePath like images/necklaces/bandana-beige.png or full resolved from imagePaths
    // Extract filename
    const parts = basePath.split('/');
    const file = parts[parts.length - 1];
    const withoutExt = file.replace(/\.png$/i, '');
    // Remove any existing -<n>-oeillet or -<n>-oeillets suffix
    const normalized = withoutExt.replace(/-(1|3|5|7)-oeillets?$/i, '');
    const variant = `${normalized}-${count}-oeillets.png`;
    // Replace last part
    parts[parts.length - 1] = variant;
    return parts.join('/');
  };

  // Helper to compute attachment points for a given hole count (bandana-specific)
  const computeAttachmentPointsForCount = (basePoints: AttachmentPoint[], count: HoleCount): AttachmentPoint[] => {
    // Always work with a left-to-right ordered copy
    const points = [...basePoints].sort((a, b) => a.position.x - b.position.x);

    // If we don't have at least 7 defined, fall back to centered subset of what's available
    const len = points.length;
    if (count >= len) {
      return points.slice(0, count).map(p => ({ ...p }));
    }

    if (count === 7) {
      return points.slice(0, Math.min(7, len)).map(p => ({ ...p }));
    }

    if (count === 5) {
      // Drop the two extremes
      if (len >= 7) return points.slice(1, 6).map(p => ({ ...p }));
      // Fallback center subset
      const start = Math.max(0, Math.floor(len / 2) - 2);
      return points.slice(start, start + 5).map(p => ({ ...p }));
    }

    if (count === 3) {
      if (len >= 7) return points.slice(2, 5).map(p => ({ ...p }));
      const start = Math.max(0, Math.floor(len / 2) - 1);
      return points.slice(start, start + 3).map(p => ({ ...p }));
    }

    // count === 1
    return [ { ...points[Math.floor(len / 2)] } ];
  };

  // Get the currently selected product with computed occupation status
  const baseProduct = products.find(p => p.id === selectedProductId) || null;
  
  // Derive bandana-specific fields using type guard
  const derivedImagePath = isBandanaProduct(baseProduct)
    ? getBandanaVariantImagePath(baseProduct.imagePath, selectedHoleCount)
    : baseProduct?.imagePath;

  const derivedAttachmentPoints = isBandanaProduct(baseProduct)
    ? computeAttachmentPointsForCount(baseProduct.attachmentPoints, selectedHoleCount)
    : baseProduct?.attachmentPoints || [];
  
  // Compute occupation status from placed charms without mutating original data
  const selectedProduct = baseProduct ? {
    ...baseProduct,
    imagePath: derivedImagePath || baseProduct.imagePath,
    attachmentPoints: derivedAttachmentPoints.map(point => ({
      ...point,
      isOccupied: placedCharms.some(charm => charm.attachmentPointId === point.id)
    }))
  } : null;

  // Action to select a product
  const selectProduct = useCallback((productId: number) => {
    // If it's the same product, don't do anything
    if (productId === selectedProductId) return;
    
    const currentProduct = products.find(p => p.id === selectedProductId);
    const newProduct = products.find(p => p.id === productId);
    
    if (!currentProduct || !newProduct) {
      setSelectedProductId(productId);
      return;
    }
    
    // Transfer charms from current product to new product based on attachment point indices
    const transferredCharms: PlacedCharm[] = [];
    
    // Create a map of current charms by their attachment point index
    const charmsByAttachmentIndex = new Map<number, {charmId: string, placedCharmId: string}>();
    
    placedCharms.forEach(charm => {
      const attachmentPoint = currentProduct.attachmentPoints.find(
        p => p.id === charm.attachmentPointId
      );
      
      if (attachmentPoint) {
        const index = currentProduct.attachmentPoints.indexOf(attachmentPoint);
        charmsByAttachmentIndex.set(index, {
          charmId: charm.charmId,
          placedCharmId: charm.id
        });
      }
    });
    
    // Apply charms to the new product based on index mapping
    charmsByAttachmentIndex.forEach((charmInfo, index) => {
      // Only transfer if the new product has enough attachment points
      if (index < newProduct.attachmentPoints.length) {
        const newAttachmentPoint = newProduct.attachmentPoints[index];
        
        // Create a new placed charm with the updated attachment point
        const newPlacedCharm: PlacedCharm = {
          id: `transferred-${charmInfo.placedCharmId}`,
          charmId: charmInfo.charmId,
          attachmentPointId: newAttachmentPoint.id,
          position: newAttachmentPoint.position
        };
        
        transferredCharms.push(newPlacedCharm);
      }
    });
    
    // Update the selected product and placed charms
    setSelectedProductId(productId);
    setPlacedCharms(transferredCharms);
  }, [selectedProductId, placedCharms]);

  // Action to add a charm to the product
  const addCharm = useCallback((charmId: string, attachmentPointId: string) => {
    if (!selectedProduct) return;

    // Find the attachment point
    const attachmentPoint = selectedProduct.attachmentPoints.find(
      p => p.id === attachmentPointId
    );

    // Extra protection: Check if point exists and is NOT already occupied
    if (!attachmentPoint) return;
    
    // Check if the attachment point is already occupied
    const isAlreadyOccupied = placedCharms.some(
      charm => charm.attachmentPointId === attachmentPointId
    );
    
    // If already occupied, don't add another charm
    if (attachmentPoint.isOccupied || isAlreadyOccupied) {
      console.log('Attachment point is already occupied');
      return;
    }

    // Create a unique ID for this placed charm
    const placedCharmId = `placed-charm-${Date.now()}`;

    // Add the new charm (occupation status will be computed automatically)
    setPlacedCharms(prev => [
      ...prev,
      {
        id: placedCharmId,
        charmId,
        attachmentPointId,
        position: attachmentPoint.position
      }
    ]);
    
  }, [selectedProduct, placedCharms]);

  // Action to remove a charm from the product
  const removeCharm = useCallback((placedCharmId: string) => {
    // Find the charm to remove
    const charmToRemove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToRemove || !selectedProduct) return;

    // Remove the charm (occupation status will be computed automatically)
    setPlacedCharms(prev => prev.filter(c => c.id !== placedCharmId));
    
  }, [placedCharms, selectedProduct]);

  // Action to move a charm to a different attachment point
  const moveCharm = useCallback((placedCharmId: string, newAttachmentPointId: string) => {
    if (!selectedProduct) return;

    // Find the charm to move
    const charmToMove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToMove) return;

    // Find the new attachment point
    const newAttachmentPoint = selectedProduct.attachmentPoints.find(
      p => p.id === newAttachmentPointId
    );
    if (!newAttachmentPoint) return;

    // Check if the new attachment point is already occupied
    const isNewPointOccupied = placedCharms.some(
      charm => charm.attachmentPointId === newAttachmentPointId
    );
    
    // Don't move if the new point is occupied (use swapCharms instead)
    if (isNewPointOccupied) return;

    // Update the charm's attachment point and position
    setPlacedCharms(prev => prev.map(charm => 
      charm.id === placedCharmId 
        ? { 
            ...charm, 
            attachmentPointId: newAttachmentPointId,
            position: newAttachmentPoint.position
          }
        : charm
    ));
    
  }, [placedCharms, selectedProduct]);

  // Action to swap two charms between attachment points
  const swapCharms = useCallback((placedCharmId: string, targetAttachmentPointId: string) => {
    if (!selectedProduct) return;

    // Find the charm to move
    const charmToMove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToMove) return;

    // Find the charm at the target attachment point
    const targetCharm = placedCharms.find(c => c.attachmentPointId === targetAttachmentPointId);
    if (!targetCharm) {
      // If no charm at target, just move instead of swap
      moveCharm(placedCharmId, targetAttachmentPointId);
      return;
    }

    // Find the attachment points
    const sourceAttachmentPoint = selectedProduct.attachmentPoints.find(
      p => p.id === charmToMove.attachmentPointId
    );
    const targetAttachmentPoint = selectedProduct.attachmentPoints.find(
      p => p.id === targetAttachmentPointId
    );

    if (!sourceAttachmentPoint || !targetAttachmentPoint) return;

    // Swap the charms' attachment points and positions
    setPlacedCharms(prev => prev.map(charm => {
      if (charm.id === placedCharmId) {
        return {
          ...charm,
          attachmentPointId: targetAttachmentPointId,
          position: targetAttachmentPoint.position
        };
      }
      if (charm.id === targetCharm.id) {
        return {
          ...charm,
          attachmentPointId: charmToMove.attachmentPointId,
          position: sourceAttachmentPoint.position
        };
      }
      return charm;
    }));
    
  }, [placedCharms, selectedProduct, moveCharm]);

  // Action to clear all charms from the product
  const clearAllCharms = useCallback(() => {
    if (!selectedProduct) return;
    
    // Clear all placed charms (occupation status will be computed automatically)
    setPlacedCharms([]);
    
  }, [selectedProduct]);

  // Update hole count with cleanup of placed charms that no longer have valid points (bandanas only)
  const setSelectedHoleCount = useCallback((count: HoleCount) => {
    setSelectedHoleCountState(count);
    const current = products.find(p => p.id === selectedProductId) || null;
    
    // Only apply hole count logic to bandanas
    if (!isBandanaProduct(current)) return;

    // Compute allowed points for new count
    const allowedPoints = computeAttachmentPointsForCount(current.attachmentPoints, count);
    const allowedIds = new Set(allowedPoints.map(p => p.id));
    // Filter placed charms to only those on allowed ids
    setPlacedCharms(prev => prev.filter(c => allowedIds.has(c.attachmentPointId)));
  }, [selectedProductId]);


  // Context value
  const value: CustomizerContextState = {
    // New naming
    products,
    charms,
    selectedProduct,
    placedCharms,
    selectedHoleCount,
    giftWrap,
    charmOrderTrust,
    selectProduct,
    addCharm,
    removeCharm,
    moveCharm,
    swapCharms,
    clearAllCharms,
    setGiftWrap,
    setCharmOrderTrust,
    setSelectedHoleCount,
    
    // Legacy aliases for backward compatibility
    necklaces: products,
    selectedNecklace: selectedProduct,
    selectNecklace: selectProduct,
  };

  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  );
};

// Custom hook to use the customizer context
export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (context === undefined) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
