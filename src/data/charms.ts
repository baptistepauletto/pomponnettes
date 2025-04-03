import { Charm } from '../types';
import { getImagePath } from '../utils/imagePaths';

// Sample charm data
export const charms: Charm[] = [
  {
    id: 'aquarius',
    name: 'Aquarius',
    imagePath: getImagePath('images/charms/aquarius.png'),
    width: 48,
    height: 48
  },
  {
    id: 'aries',
    name: 'Aries',
    imagePath: getImagePath('images/charms/aries.png'),
    width: 48,
    height: 48
  },
  {
    id: 'cancer',
    name: 'Cancer',
    imagePath: getImagePath('images/charms/cancer.png'),
    width: 48,
    height: 48
  },
  {
    id: 'gemini',
    name: 'Gemini',
    imagePath: getImagePath('images/charms/gemini.png'),
    width: 48,
    height: 48
  },
  {
    id: 'libra',
    name: 'Libra',
    imagePath: getImagePath('images/charms/libra.png'),
    width: 48,
    height: 48
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    imagePath: getImagePath('images/charms/scorpio.png'),
    width: 48,
    height: 48
  },
  {
    id: 'knot',
    name: 'Knot',
    imagePath: getImagePath('images/charms/knot.png'),
    width: 128,
    height: 128
  },
  {
    id: 'slim-heart',
    name: 'Slim Heart',
    imagePath: getImagePath('images/charms/slim-heart.png'),
    width: 128,
    height: 128
  },
  {
    id: 'sunny-heart',
    name: 'Sunny Heart',
    imagePath: getImagePath('images/charms/sunny-heart.png'),
    width: 128,
    height: 128
  },
  {
    id: 'slim-star',
    name: 'Slim Star',
    imagePath: getImagePath('images/charms/slim-star.png'),
    width: 128,
    height: 128
  }
]; 