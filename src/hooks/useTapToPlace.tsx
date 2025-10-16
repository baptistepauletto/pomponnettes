import React, { useState, createContext, useContext, useCallback } from 'react';

// Utility function for haptic feedback
export const triggerHapticFeedback = (intensity: 'light' | 'medium' | 'heavy' = 'medium'): void => {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  
  // Different vibration patterns based on intensity
  switch (intensity) {
    case 'light':
      navigator.vibrate(10);
      break;
    case 'medium':
      navigator.vibrate(40);
      break;
    case 'heavy':
      navigator.vibrate([50, 30, 80]);
      break;
    default:
      navigator.vibrate(40);
  }
};

// Context to share selected charm and attachment point across components
type TapToPlaceContextType = {
  selectedCharmId: string | null;
  selectedAttachmentPointId: string | null;
  selectedPlacedCharmId: string | null; // For move mode
  selectCharm: (charmId: string) => void;
  selectAttachmentPoint: (pointId: string) => void;
  selectPlacedCharm: (placedCharmId: string) => void;
  clearSelectedCharm: () => void;
  clearSelectedAttachmentPoint: () => void;
  clearSelectedPlacedCharm: () => void;
  clearAllSelections: () => void;
  forceCleanupSelections: () => void;
  isCharmSelected: (charmId: string) => boolean;
  isAttachmentPointSelected: (pointId: string) => boolean;
  isPlacedCharmSelected: (placedCharmId: string) => boolean;
  keepSelectedCharm: boolean;
  setKeepSelectedCharm: (keep: boolean) => void;
};

const TapToPlaceContext = createContext<TapToPlaceContextType | null>(null);

// Provider component
export const TapToPlaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCharmId, setSelectedCharmId] = useState<string | null>(null);
  const [selectedAttachmentPointId, setSelectedAttachmentPointId] = useState<string | null>(null);
  const [selectedPlacedCharmId, setSelectedPlacedCharmId] = useState<string | null>(null);
  const [keepSelectedCharm, setKeepSelectedCharm] = useState<boolean>(true); // Default to true - keep charm selected

  const selectCharm = useCallback((charmId: string) => {
    setSelectedCharmId(charmId);
  }, []);

  const selectAttachmentPoint = useCallback((pointId: string) => {
    setSelectedAttachmentPointId(pointId);
  }, []);

  const selectPlacedCharm = useCallback((placedCharmId: string) => {
    // When selecting a placed charm for move mode, clear other selections
    setSelectedPlacedCharmId(placedCharmId);
    setSelectedCharmId(null); // Clear charm drawer selection
  }, []);

  const clearSelectedCharm = useCallback(() => {
    // Only clear if keepSelectedCharm is false
    if (!keepSelectedCharm) {
      setSelectedCharmId(null);
    }
  }, [keepSelectedCharm]);

  const clearSelectedAttachmentPoint = useCallback(() => {
    setSelectedAttachmentPointId(null);
  }, []);

  const clearSelectedPlacedCharm = useCallback(() => {
    setSelectedPlacedCharmId(null);
  }, []);

  const clearAllSelections = useCallback(() => {
    // Always clear attachment point and placed charm, only clear charm if keepSelectedCharm is false
    setSelectedAttachmentPointId(null);
    setSelectedPlacedCharmId(null);
    if (!keepSelectedCharm) {
      setSelectedCharmId(null);
    }
  }, [keepSelectedCharm]);

  // Force cleanup regardless of keepSelectedCharm flag
  const forceCleanupSelections = useCallback(() => {
    setSelectedAttachmentPointId(null);
    setSelectedCharmId(null);
    setSelectedPlacedCharmId(null);
  }, []);

  const isCharmSelected = useCallback(
    (charmId: string) => {
      return selectedCharmId === charmId;
    },
    [selectedCharmId]
  );

  const isAttachmentPointSelected = useCallback(
    (pointId: string) => {
      return selectedAttachmentPointId === pointId;
    },
    [selectedAttachmentPointId]
  );

  const isPlacedCharmSelected = useCallback(
    (placedCharmId: string) => {
      return selectedPlacedCharmId === placedCharmId;
    },
    [selectedPlacedCharmId]
  );

  const value = {
    selectedCharmId,
    selectedAttachmentPointId,
    selectedPlacedCharmId,
    selectCharm,
    selectAttachmentPoint,
    selectPlacedCharm,
    clearSelectedCharm,
    clearSelectedAttachmentPoint,
    clearSelectedPlacedCharm,
    clearAllSelections,
    forceCleanupSelections,
    isCharmSelected,
    isAttachmentPointSelected,
    isPlacedCharmSelected,
    keepSelectedCharm,
    setKeepSelectedCharm
  };

  return <TapToPlaceContext.Provider value={value}>{children}</TapToPlaceContext.Provider>;
};

// Hook to use the tap-to-place context
export const useTapToPlace = (): TapToPlaceContextType => {
  const context = useContext(TapToPlaceContext);
  if (!context) {
    throw new Error('useTapToPlace must be used within a TapToPlaceProvider');
  }
  return context;
};

// Detect if device is touch-enabled
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}; 