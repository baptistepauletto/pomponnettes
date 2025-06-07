import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Necklace, Charm, PlacedCharm, PresetConfiguration} from '../types';
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
  lastAppliedPresetId: string | null;
  
  // Actions
  selectNecklace: (necklaceId: number) => void;
  addCharm: (charmId: string, attachmentPointId: string) => void;
  removeCharm: (placedCharmId: string) => void;
  clearAllCharms: () => void;
  applyPreset: (presetConfiguration: PresetConfiguration) => void;
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
  const [lastAppliedPresetId, setLastAppliedPresetId] = useState<string | null>(null);

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
    
    // Clear last applied preset since charms were manually modified
    setLastAppliedPresetId(null);
  }, [selectedNecklace, placedCharms]);

  // Action to remove a charm from the necklace
  const removeCharm = useCallback((placedCharmId: string) => {
    // Find the charm to remove
    const charmToRemove = placedCharms.find(c => c.id === placedCharmId);
    if (!charmToRemove || !selectedNecklace) return;

    // Remove the charm (occupation status will be computed automatically)
    setPlacedCharms(prev => prev.filter(c => c.id !== placedCharmId));
    
    // Clear last applied preset since charms were manually modified
    setLastAppliedPresetId(null);
  }, [placedCharms, selectedNecklace]);

  // Action to clear all charms from the necklace
  const clearAllCharms = useCallback(() => {
    if (!selectedNecklace) return;
    
    // Clear all placed charms (occupation status will be computed automatically)
    setPlacedCharms([]);
    
    // Clear last applied preset since charms were cleared
    setLastAppliedPresetId(null);
  }, [selectedNecklace]);

  // Action to apply a preset configuration of charms
  const applyPreset = useCallback((preset: PresetConfiguration) => {
    if (!baseNecklace) return;
    
    // Apply the preset configuration without clearing first
    const newPlacedCharms: PlacedCharm[] = [];
    const occupiedAttachmentIds = new Set<string>(); // Track locally occupied points during preset application
    
    preset.configuration.forEach(placement => {
      // Check if the attachment point index is valid
      if (placement.attachmentPointIndex < baseNecklace.attachmentPoints.length) {
        const attachmentPoint = baseNecklace.attachmentPoints[placement.attachmentPointIndex];
        const charmExists = charms.some(c => c.id === placement.charmId);
        
        // Only add if the charm exists and the attachment point is not already used in this preset
        if (charmExists && !occupiedAttachmentIds.has(attachmentPoint.id)) {
          // Mark this attachment point as occupied for the rest of this preset application
          occupiedAttachmentIds.add(attachmentPoint.id);
          
          // Create a unique ID for this placed charm
          const placedCharmId = `preset-charm-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          
          // Add the charm to the placed charms
          newPlacedCharms.push({
            id: placedCharmId,
            charmId: placement.charmId,
            attachmentPointId: attachmentPoint.id,
            position: attachmentPoint.position
          });
        }
      }
    });
    
    // Replace all placed charms with the new preset configuration
    setPlacedCharms(newPlacedCharms);
    
    // Remember this preset ID as the last applied
    setLastAppliedPresetId(preset.id);
  }, [baseNecklace, charms, lastAppliedPresetId]);



  // Context value
  const value: CustomizerContextState = {
    necklaces,
    charms,
    selectedNecklace,
    placedCharms,
    lastAppliedPresetId,
    selectNecklace,
    addCharm,
    removeCharm,
    clearAllCharms,
    applyPreset
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