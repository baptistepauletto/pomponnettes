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

// Context to share selected charm across components
type TapToPlaceContextType = {
  selectedCharmId: string | null;
  selectCharm: (charmId: string) => void;
  clearSelectedCharm: () => void;
  isCharmSelected: (charmId: string) => boolean;
};

const TapToPlaceContext = createContext<TapToPlaceContextType | null>(null);

// Provider component
export const TapToPlaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCharmId, setSelectedCharmId] = useState<string | null>(null);

  const selectCharm = useCallback((charmId: string) => {
    setSelectedCharmId(charmId);
  }, []);

  const clearSelectedCharm = useCallback(() => {
    setSelectedCharmId(null);
  }, []);

  const isCharmSelected = useCallback(
    (charmId: string) => {
      return selectedCharmId === charmId;
    },
    [selectedCharmId]
  );

  const value = {
    selectedCharmId,
    selectCharm,
    clearSelectedCharm,
    isCharmSelected,
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