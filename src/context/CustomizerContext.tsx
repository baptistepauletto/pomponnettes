import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Necklace, Charm, PlacedCharm, AttachmentPoint } from '../types';
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
  selectNecklace: (necklaceId: string) => void;
  addCharm: (charmId: string, attachmentPointId: string) => void;
  removeCharm: (placedCharmId: string) => void;
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
  const [selectedNecklaceId, setSelectedNecklaceId] = useState<string>(necklaces[0].id);
  const [placedCharms, setPlacedCharms] = useState<PlacedCharm[]>([]);

  // Get the currently selected necklace
  const selectedNecklace = necklaces.find(n => n.id === selectedNecklaceId) || null;

  // Action to select a necklace
  const selectNecklace = useCallback((necklaceId: string) => {
    setSelectedNecklaceId(necklaceId);
    // Clear placed charms when changing necklace
    setPlacedCharms([]);
  }, []);

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

    // Add the new charm
    setPlacedCharms(prev => [
      ...prev,
      {
        id: placedCharmId,
        charmId,
        attachmentPointId,
        position: attachmentPoint.position
      }
    ]);

    // Mark the attachment point as occupied in the necklace data
    selectedNecklace.attachmentPoints = selectedNecklace.attachmentPoints.map(point => {
      if (point.id === attachmentPointId) {
        return { ...point, isOccupied: true };
      }
      return point;
    });
  }, [selectedNecklace, placedCharms]);

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
    clearAllCharms
  };

  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  );
};

// Custom hook to use the context
export const useCustomizer = (): CustomizerContextState => {
  const context = useContext(CustomizerContext);
  if (context === undefined) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
}; 