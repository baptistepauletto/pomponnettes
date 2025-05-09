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
      { attachmentPointIndex: 0, charmId: 'medal-sun' },
      { attachmentPointIndex: 2, charmId: 'medal-wave' },
      { attachmentPointIndex: 4, charmId: 'medal-snake' },
      { attachmentPointIndex: 7, charmId: 'medal-sun-moon' },
      { attachmentPointIndex: 9, charmId: 'medal-snake' },
      { attachmentPointIndex: 11, charmId: 'medal-wave' },
      { attachmentPointIndex: 12, charmId: 'medal-sun' }
    ]
  },
  {
    id: 'preset-3',
    name: 'Minimalist',
    description: 'A simple, understated charm arrangement',
    configuration: [
      { attachmentPointIndex: 6, charmId: 'cute-knot' },
      { attachmentPointIndex: 7, charmId: 'cute-knot' }
    ]
  }
];

/**
 * Gets a random preset from the available presets
 */
export const getRandomPreset = (): PresetConfiguration => {
  const randomIndex = Math.floor(Math.random() * charmPresets.length);
  return charmPresets[randomIndex];
}; 