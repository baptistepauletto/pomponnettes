import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Necklace, Charm, PlacedCharm } from '../types';
import { necklaces } from '../data/necklaces';
import { charms } from '../data/charms';
import { addToCart as addToCartApi } from '../utils/woocommerce';

// Interface for the context state
interface CustomizerContextState {
  // Data
  necklaces: Necklace[];
  charms: Charm[];
  
  // Current selections
  selectedNecklace: Necklace | null;
  placedCharms: PlacedCharm[];
  
  // Actions
  selectNecklace: (necklaceId: string) => void;
  addCharm: (charmId: string, attachmentPointId: string) => void;
  removeCharm: (placedCharmId: string) => void;
  clearAllCharms: () => void;
  addToCart: () => Promise<{ success: boolean; message: string; data?: any }>;
  isAddingToCart: boolean;
}

// Create the context
const CustomizerContext = createContext<CustomizerContextState | null>(null);

// Props for the provider component
interface CustomizerProviderProps {
  children: ReactNode;
}

// Provider component
export const CustomizerProvider: React.FC<CustomizerProviderProps> = ({ children }) => {
  // State
  const [selectedNecklaceId, setSelectedNecklaceId] = useState<string>(necklaces[0].id);
  const [placedCharms, setPlacedCharms] = useState<PlacedCharm[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  // Get the currently selected necklace
  const selectedNecklace = necklaces.find(n => n.id === selectedNecklaceId) || null;

  // Action to select a necklace
  const selectNecklace = useCallback((necklaceId: string) => {
    // If it's the same necklace, don't do anything
    if (necklaceId === selectedNecklaceId) return;
    
    const currentNecklace = necklaces.find(n => n.id === selectedNecklaceId);
    const newNecklace = necklaces.find(n => n.id === necklaceId);
    
    if (!currentNecklace || !newNecklace) {
      setSelectedNecklaceId(necklaceId);
      return;
    }
    
    // Transfer charms from current necklace to new necklace based on attachment point indices
    const transferredCharms: PlacedCharm[] = [];
    
    // Create a map of current charms by their attachment point index
    const charmsByAttachmentIndex = new Map<number, {charmId: string, placedCharmId: string}>();
    
    placedCharms.forEach(charm => {
      const attachmentPoint = currentNecklace.attachmentPoints.find(
        p => p.id === charm.attachmentPointId
      );
      
      if (attachmentPoint) {
        const index = currentNecklace.attachmentPoints.indexOf(attachmentPoint);
        charmsByAttachmentIndex.set(index, {
          charmId: charm.charmId,
          placedCharmId: charm.id
        });
      }
    });
    
    // Then transfer to the new necklace
    charmsByAttachmentIndex.forEach((charmInfo, index) => {
      if (index < newNecklace.attachmentPoints.length) {
        const newAttachmentPoint = newNecklace.attachmentPoints[index];
        
        if (!newAttachmentPoint.isOccupied) {
          const charm = charms.find(c => c.id === charmInfo.charmId);
          
          if (charm) {
            // Calculate the unique ID for this placement
            const placedCharmId = `${charmInfo.charmId}-${newAttachmentPoint.id}-${Date.now()}`;
            
            // Add to the new charms array
            transferredCharms.push({
              id: placedCharmId,
              charmId: charmInfo.charmId,
              attachmentPointId: newAttachmentPoint.id,
              position: newAttachmentPoint.position
            });
            
            // Mark the attachment point as occupied
            newAttachmentPoint.isOccupied = true;
          }
        }
      }
    });
    
    // Update state
    setSelectedNecklaceId(necklaceId);
    setPlacedCharms(transferredCharms);
  }, [selectedNecklaceId, placedCharms]);

  // Action to add a charm to the necklace
  const addCharm = useCallback((charmId: string, attachmentPointId: string) => {
    // Find the necklace and attachment point
    if (!selectedNecklace) return;

    const attachmentPoint = selectedNecklace.attachmentPoints.find(
      point => point.id === attachmentPointId
    );

    // If the point is already occupied or not found, don't do anything
    if (!attachmentPoint || attachmentPoint.isOccupied) return;

    // Find the charm
    const charm = charms.find(c => c.id === charmId);
    if (!charm) return;

    // Calculate the unique ID for this placement
    const placedCharmId = `${charmId}-${attachmentPointId}-${Date.now()}`;

    // Add the charm to the necklace
    setPlacedCharms(prev => [
      ...prev,
      {
        id: placedCharmId,
        charmId,
        attachmentPointId,
        position: attachmentPoint.position
      }
    ]);

    // Mark the attachment point as occupied directly
    attachmentPoint.isOccupied = true;
  }, [selectedNecklace]);

  // Action to remove a charm from the necklace
  const removeCharm = useCallback((placedCharmId: string) => {
    // Find the charm to remove
    const charmToRemove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToRemove || !selectedNecklace) return;

    // Remove the charm
    setPlacedCharms(prev => prev.filter(c => c.id !== placedCharmId));

    // Mark the attachment point as unoccupied directly
    const pointToUpdate = selectedNecklace.attachmentPoints.find(
      point => point.id === charmToRemove.attachmentPointId
    );
    
    if (pointToUpdate) {
      pointToUpdate.isOccupied = false;
    }
  }, [placedCharms, selectedNecklace]);

  // Action to clear all charms from the necklace
  const clearAllCharms = useCallback(() => {
    if (!selectedNecklace) return;
    
    // Clear all placed charms
    setPlacedCharms([]);
    
    // Mark all attachment points as unoccupied directly
    selectedNecklace.attachmentPoints.forEach(point => {
      point.isOccupied = false;
    });
  }, [selectedNecklace]);
  
  // Action to add the customized necklace to the cart
  const addToCart = useCallback(async () => {
    if (!selectedNecklace || placedCharms.length === 0) {
      return { 
        success: false, 
        message: 'Please add at least one charm to your necklace before adding to cart' 
      };
    }
    
    try {
      setIsAddingToCart(true);
      
      // Create a map of charms by attachment point position
      const charmsByPosition = new Map<string, string>();
      
      // First, fill in the charms that are placed
      placedCharms.forEach(placedCharm => {
        const charm = charms.find(c => c.id === placedCharm.charmId);
        const attachmentPoint = selectedNecklace.attachmentPoints.find(
          p => p.id === placedCharm.attachmentPointId
        );
        
        if (charm && attachmentPoint) {
          // Extract position number from the attachment point ID
          // Assuming attachment point IDs are in format like "point-1", "point-2", etc.
          const positionMatch = attachmentPoint.id.match(/\d+$/);
          const position = positionMatch ? positionMatch[0] : "";
          
          // If we have a valid position, add it to the map
          if (position) {
            charmsByPosition.set(position, charm.id);
          }
        }
      });
      
      // Create data in the format required for WooCommerce
      const charmData = [];
      
      // Find the max position number in the necklace
      const maxPosition = selectedNecklace.attachmentPoints.reduce((max, point) => {
        const positionMatch = point.id.match(/\d+$/);
        const position = positionMatch ? parseInt(positionMatch[0], 10) : 0;
        return Math.max(max, position);
      }, 0);
      
      // For each possible position (1 to maxPosition), add an attribute
      for (let i = 1; i <= maxPosition; i++) {
        const charmId = charmsByPosition.get(i.toString()) || 'aucun-charm';
        
        charmData.push({
          name: `attribute_pa_charm-${i}`,
          value: charmId
        });
      }
      
      // For now, we'll use a placeholder ID for the necklace
      const necklaceId = 8187; // Actual WooCommerce product ID
      
      // Call the WooCommerce API
      const result = await addToCartApi(necklaceId, charmData);
      
      return result;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { 
        success: false, 
        message: 'Failed to add to cart. Please try again.' 
      };
    } finally {
      setIsAddingToCart(false);
    }
  }, [selectedNecklace, placedCharms, charms]);

  // Sync attachment point occupation status with placed charms
  useEffect(() => {
    if (!selectedNecklace) return;
    
    // First reset all attachment points to unoccupied
    selectedNecklace.attachmentPoints.forEach(point => {
      point.isOccupied = false;
    });
    
    // Then mark points as occupied based on placed charms
    placedCharms.forEach(charm => {
      const point = selectedNecklace.attachmentPoints.find(
        p => p.id === charm.attachmentPointId
      );
      if (point) {
        point.isOccupied = true;
      }
    });
  }, [selectedNecklace, placedCharms]);

  // Context value
  const value: CustomizerContextState = {
    necklaces,
    charms,
    selectedNecklace,
    placedCharms,
    selectNecklace,
    addCharm,
    removeCharm,
    clearAllCharms,
    addToCart,
    isAddingToCart
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
  if (context === null) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
}; 