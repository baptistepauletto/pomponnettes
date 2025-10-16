import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Necklace, Charm, PlacedCharm } from '../types';
import { necklaces } from '../data/necklaces';
import { charms } from '../data/charms';

// Interface for the context state
interface CustomizerContextState {
  // Data
  necklaces: Necklace[];
  charms: Charm[];
  
  // Current selections
  selectedNecklace: Necklace | null;
  placedCharms: PlacedCharm[];
  
  // Actions
  selectNecklace: (necklaceId: number) => void;
  addCharm: (charmId: string, attachmentPointId: string) => void;
  removeCharm: (placedCharmId: string) => void;
  moveCharm: (placedCharmId: string, newAttachmentPointId: string) => void;
  swapCharms: (placedCharmId: string, targetAttachmentPointId: string) => void;
  clearAllCharms: () => void;
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
  const [selectedNecklaceId, setSelectedNecklaceId] = useState<number>(necklaces[0].id);
  const [placedCharms, setPlacedCharms] = useState<PlacedCharm[]>([]);

  // Get the currently selected necklace with computed occupation status
  const baseNecklace = necklaces.find(n => n.id === selectedNecklaceId) || null;
  
  // Compute occupation status from placed charms without mutating original data
  const selectedNecklace = baseNecklace ? {
    ...baseNecklace,
    attachmentPoints: baseNecklace.attachmentPoints.map(point => ({
      ...point,
      isOccupied: placedCharms.some(charm => charm.attachmentPointId === point.id)
    }))
  } : null;

  // Action to select a necklace
  const selectNecklace = useCallback((necklaceId: number) => {
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
    
    // Apply charms to the new necklace based on index mapping
    charmsByAttachmentIndex.forEach((charmInfo, index) => {
      // Only transfer if the new necklace has enough attachment points
      if (index < newNecklace.attachmentPoints.length) {
        const newAttachmentPoint = newNecklace.attachmentPoints[index];
        
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
    
    // Update the selected necklace and placed charms
    setSelectedNecklaceId(necklaceId);
    setPlacedCharms(transferredCharms);
  }, [selectedNecklaceId, placedCharms]);

  // Action to add a charm to the necklace
  const addCharm = useCallback((charmId: string, attachmentPointId: string) => {
    if (!selectedNecklace) return;

    // Find the attachment point
    const attachmentPoint = selectedNecklace.attachmentPoints.find(
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
    
  }, [selectedNecklace, placedCharms]);

  // Action to remove a charm from the necklace
  const removeCharm = useCallback((placedCharmId: string) => {
    // Find the charm to remove
    const charmToRemove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToRemove || !selectedNecklace) return;

    // Remove the charm (occupation status will be computed automatically)
    setPlacedCharms(prev => prev.filter(c => c.id !== placedCharmId));
    
  }, [placedCharms, selectedNecklace]);

  // Action to move a charm to a different attachment point
  const moveCharm = useCallback((placedCharmId: string, newAttachmentPointId: string) => {
    if (!selectedNecklace) return;

    // Find the charm to move
    const charmToMove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToMove) return;

    // Find the new attachment point
    const newAttachmentPoint = selectedNecklace.attachmentPoints.find(
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
    
  }, [placedCharms, selectedNecklace]);

  // Action to swap two charms between attachment points
  const swapCharms = useCallback((placedCharmId: string, targetAttachmentPointId: string) => {
    if (!selectedNecklace) return;

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
    const sourceAttachmentPoint = selectedNecklace.attachmentPoints.find(
      p => p.id === charmToMove.attachmentPointId
    );
    const targetAttachmentPoint = selectedNecklace.attachmentPoints.find(
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
    
  }, [placedCharms, selectedNecklace, moveCharm]);

  // Action to clear all charms from the necklace
  const clearAllCharms = useCallback(() => {
    if (!selectedNecklace) return;
    
    // Clear all placed charms (occupation status will be computed automatically)
    setPlacedCharms([]);
    
  }, [selectedNecklace]);


  // Context value
  const value: CustomizerContextState = {
    necklaces,
    charms,
    selectedNecklace,
    placedCharms,
    selectNecklace,
    addCharm,
    removeCharm,
    moveCharm,
    swapCharms,
    clearAllCharms
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