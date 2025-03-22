import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
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

    if (!attachmentPoint || attachmentPoint.isOccupied) return;

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

    // Mark the attachment point as occupied
    const updatedNecklaces = necklaces.map(necklace => {
      if (necklace.id === selectedNecklaceId) {
        return {
          ...necklace,
          attachmentPoints: necklace.attachmentPoints.map(point => {
            if (point.id === attachmentPointId) {
              return { ...point, isOccupied: true };
            }
            return point;
          })
        };
      }
      return necklace;
    });

    // Note: In a real app, you'd want to use a more robust state management solution
    // This is a simplification for this example
  }, [selectedNecklace, selectedNecklaceId]);

  // Action to remove a charm from the necklace
  const removeCharm = useCallback((placedCharmId: string) => {
    // Find the charm to remove
    const charmToRemove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToRemove) return;

    // Remove the charm
    setPlacedCharms(prev => prev.filter(c => c.id !== placedCharmId));

    // Mark the attachment point as unoccupied
    const updatedNecklaces = necklaces.map(necklace => {
      if (necklace.id === selectedNecklaceId) {
        return {
          ...necklace,
          attachmentPoints: necklace.attachmentPoints.map(point => {
            if (point.id === charmToRemove.attachmentPointId) {
              return { ...point, isOccupied: false };
            }
            return point;
          })
        };
      }
      return necklace;
    });

    // Same note as above about state management
  }, [placedCharms, selectedNecklaceId]);

  // Action to clear all charms from the necklace
  const clearAllCharms = useCallback(() => {
    setPlacedCharms([]);
    
    // Mark all attachment points as unoccupied
    const updatedNecklaces = necklaces.map(necklace => {
      if (necklace.id === selectedNecklaceId) {
        return {
          ...necklace,
          attachmentPoints: necklace.attachmentPoints.map(point => ({
            ...point,
            isOccupied: false
          }))
        };
      }
      return necklace;
    });

    // Same note as above about state management
  }, [selectedNecklaceId]);

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