import { PresetConfiguration } from '../types';

/**
 * Collection of preset charm configurations for necklaces
 * Each preset defines which charms go on which attachment points
 */
export const charmPresets: PresetConfiguration[] = [
  {
    id: 'preset-1',
    name: 'Classic Elegance',
    description: 'A balanced arrangement of charms for an elegant look',
    configuration: [
      { attachmentPointIndex: 0, charmId: 'rose' },
      { attachmentPointIndex: 3, charmId: 'rose' },
      { attachmentPointIndex: 7, charmId: 'rose' },
      { attachmentPointIndex: 10, charmId: 'rose' },
      { attachmentPointIndex: 12, charmId: 'rose' }
    ]
  },
  {
    id: 'preset-2',
    name: 'Bold Statement',
    description: 'A striking combination of charms that makes a statement',
    configuration: [
      { attachmentPointIndex: 0, charmId: 'medaille-soleil' },
      { attachmentPointIndex: 2, charmId: 'medaille-vague' },
      { attachmentPointIndex: 4, charmId: 'medaille-serpent' },
      { attachmentPointIndex: 7, charmId: 'medaille-soleil-lune' },
      { attachmentPointIndex: 9, charmId: 'medaille-serpent' },
      { attachmentPointIndex: 11, charmId: 'medaille-vague' },
      { attachmentPointIndex: 12, charmId: 'medaille-soleil' }
    ]
  },
  {
    id: 'preset-3',
    name: 'Minimalist',
    description: 'A simple, understated charm arrangement',
    configuration: [
      { attachmentPointIndex: 6, charmId: 'noeud-fin' },
      { attachmentPointIndex: 7, charmId: 'noeud-fin' }
    ]
  }
];

/**
 * Gets a random preset from the available presets
 * Optionally excludes a preset by ID to prevent getting the same one twice
 */
export const getRandomPreset = (excludePresetId?: string | null): PresetConfiguration => {
  // Filter out the excluded preset if provided
  const availablePresets = excludePresetId 
    ? charmPresets.filter(preset => preset.id !== excludePresetId)
    : charmPresets;
  
  // If all presets are excluded (shouldn't happen with current data), fall back to all presets
  const presetsToChooseFrom = availablePresets.length > 0 ? availablePresets : charmPresets;
  
  const randomIndex = Math.floor(Math.random() * presetsToChooseFrom.length);
  return presetsToChooseFrom[randomIndex];
}; 