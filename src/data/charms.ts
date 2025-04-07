import { Charm } from '../types';
import { getImagePath } from '../utils/imagePaths';

// Sample charm data
export const charms: Charm[] = [
  {
    id: 'knot',
    name: 'Knot',
    imagePath: getImagePath('images/charms/knot.png'),
    sizeScale: 2,
    category: 'Symbols'
  },
  {
    id: 'slim-heart',
    name: 'Slim Heart',
    imagePath: getImagePath('images/charms/slim-heart.png'),
    sizeScale: 2,
    category: 'Hearts'
  },
  {
    id: 'sunny-heart',
    name: 'Sunny Heart',
    imagePath: getImagePath('images/charms/sunny-heart.png'),
    sizeScale: 2,
    category: 'Hearts'
  },
  {
    id: 'slim-star',
    name: 'Slim Star',
    imagePath: getImagePath('images/charms/slim-star.png'),
    sizeScale: 2,
    category: 'Symbols'
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    imagePath: getImagePath('images/charms/aquarius.png'),
    sizeScale: 1,
    category: 'Zodiac'
  },
  {
    id: 'aries',
    name: 'Aries',
    imagePath: getImagePath('images/charms/aries.png'),
    sizeScale: 1,
    category: 'Zodiac'
  },
  {
    id: 'cancer',
    name: 'Cancer',
    imagePath: getImagePath('images/charms/cancer.png'),
    sizeScale: 1,
    category: 'Zodiac'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    imagePath: getImagePath('images/charms/gemini.png'),
    sizeScale: 1,
    category: 'Zodiac'
  },
  {
    id: 'libra',
    name: 'Libra',
    imagePath: getImagePath('images/charms/libra.png'),
    sizeScale: 1,
    category: 'Zodiac'
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    imagePath: getImagePath('images/charms/scorpio.png'),
    sizeScale: 1,
    category: 'Zodiac'
  }
]; 