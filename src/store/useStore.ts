import { create } from 'zustand';
import { CustomizedNecklace, NecklaceTemplate, Charm, PlacedCharm, Point } from '../types';

interface NecklaceStore {
    // Current state
    selectedTemplate: NecklaceTemplate | null;
    availableCharms: Charm[];
    placedCharms: PlacedCharm[];
    isDragging: boolean;
    draggedCharm: Charm | null;
    
    // Actions
    setSelectedTemplate: (template: NecklaceTemplate) => void;
    setAvailableCharms: (charms: Charm[]) => void;
    addCharm: (charm: Charm, position: Point) => void;
    removeCharm: (charmId: string) => void;
    updateCharmPosition: (charmId: string, position: Point) => void;
    updateCharmRotation: (charmId: string, rotation: number) => void;
    setDragging: (isDragging: boolean) => void;
    setDraggedCharm: (charm: Charm | null) => void;
    calculateTotalPrice: () => number;
}

export const useStore = create<NecklaceStore>((set, get) => ({
    selectedTemplate: null,
    availableCharms: [],
    placedCharms: [],
    isDragging: false,
    draggedCharm: null,

    setSelectedTemplate: (template) => set({ selectedTemplate: template }),
    
    setAvailableCharms: (charms) => set({ availableCharms: charms }),
    
    addCharm: (charm, position) => set((state) => ({
        placedCharms: [...state.placedCharms, {
            charmId: charm.id,
            position,
            rotation: charm.defaultRotation,
            scale: 1
        }]
    })),
    
    removeCharm: (charmId) => set((state) => ({
        placedCharms: state.placedCharms.filter(charm => charm.charmId !== charmId)
    })),
    
    updateCharmPosition: (charmId, position) => set((state) => ({
        placedCharms: state.placedCharms.map(charm => 
            charm.charmId === charmId ? { ...charm, position } : charm
        )
    })),
    
    updateCharmRotation: (charmId, rotation) => set((state) => ({
        placedCharms: state.placedCharms.map(charm =>
            charm.charmId === charmId ? { ...charm, rotation } : charm
        )
    })),
    
    setDragging: (isDragging) => set({ isDragging }),
    
    setDraggedCharm: (charm) => set({ draggedCharm: charm }),
    
    calculateTotalPrice: () => {
        const state = get();
        const templatePrice = state.selectedTemplate?.price || 0;
        const charmsPrice = state.placedCharms.reduce((total, placedCharm) => {
            const charm = state.availableCharms.find(c => c.id === placedCharm.charmId);
            return total + (charm?.price || 0);
        }, 0);
        return templatePrice + charmsPrice;
    }
})); 