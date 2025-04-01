import { Charm } from '../types';
import { getImagePath } from '../utils/imagePaths';

// Sample charm data
export const charms: Charm[] = [
  {
    id: 'aquarius',
    name: 'Aquarius',
    imagePath: getImagePath('images/charms/aquarius.png'),
    width: 72,
    height: 72
  },
  {
    id: 'aries',
    name: 'Aries',
    imagePath: getImagePath('images/charms/aries.png'),
    width: 72,
    height: 72
  },
  {
    id: 'cancer',
    name: 'Cancer',
    imagePath: getImagePath('images/charms/cancer.png'),
    width: 72,
    height: 72
  },
  {
    id: 'gemini',
    name: 'Gemini',
    imagePath: getImagePath('images/charms/gemini.png'),
    width: 72,
    height: 72
  },
  {
    id: 'libra',
    name: 'Libra',
    imagePath: getImagePath('images/charms/libra.png'),
    width: 72,
    height: 72
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    imagePath: getImagePath('images/charms/scorpio.png'),
    width: 72,
    height: 72
  },
]; 