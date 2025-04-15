import { Charm } from '../types';
import { getImagePath } from '../utils/imagePaths';


export const charms: Charm[] = [
  {
    id: 'large-knot',
    name: 'Large Knot',
    imagePath: getImagePath('images/charms/large-knot.png'),
    sizeScale: 2.5,
    category: 'Symbols',
    price: 15.99
  },
  {
    id: 'large-heart',
    name: 'Large Heart',
    imagePath: getImagePath('images/charms/large-heart.png'),
    sizeScale: 2.5,
    category: 'Hearts',
    price: 17.99
  },
  {
    id: 'large-holy-heart',
    name: 'Large Holy Heart',
    imagePath: getImagePath('images/charms/large-holy-heart.png'),
    sizeScale: 2.5,
    category: 'Hearts',
    price: 19.99
  },
  {
    id: 'large-sea-star',
    name: 'Large Sea Star',
    imagePath: getImagePath('images/charms/large-sea-star.png'),
    sizeScale: 2.5,
    category: 'Symbols',
    price: 16.50
  },
  {
    id: 'large-sun', 
    name: 'Large Sun',
    imagePath: getImagePath('images/charms/large-sun.png'),
    sizeScale: 2.5,
    category: 'Symbols',
    price: 18.50
  },
  {
    id: 'spiral-shell',
    name: 'Spiral Shell',
    imagePath: getImagePath('images/charms/spiral-shell.png'),
    sizeScale: 1.85,
    category: 'Symbols',
    price: 12.99
  },
  {
    id: 'spiral', 
    name: 'Spiral',
    imagePath: getImagePath('images/charms/spiral.png'),
    sizeScale: 1.4,
    category: 'Symbols',
    price: 9.99
  },
  {
    id:'spiral-star',
    name: 'Spiral Star',
    imagePath: getImagePath('images/charms/spiral-star.png'),
    sizeScale: 1.4,
    category: 'Symbols',
    price: 10.50
  },
  {
    id: 'medal-sun-moon',
    name: 'Medal Sun Moon',
    imagePath: getImagePath('images/charms/medal-sun-moon.png'),
    sizeScale: 1.85,
    category: 'Medals',
    price: 14.99
  },
  {
    id: 'medal-snake',
    name: 'Medal Snake',
    imagePath: getImagePath('images/charms/medal-snake.png'),
    sizeScale: 1.85,
    category: 'Medals',
    price: 13.75
  },
  {
    id: 'medal-sun',  
    name: 'Medal Sun',
    imagePath: getImagePath('images/charms/medal-sun.png'),
    sizeScale: 1.4,
    category: 'Medals',
    price: 11.25
  },
  {
    id: 'medal-wave',
    name: 'Medal Wave',
    imagePath: getImagePath('images/charms/medal-wave.png'),
    sizeScale: 1.4,
    category: 'Medals',
    price: 10.75
  },
  {
    id: 'jelly-fish',
    name: 'Jelly Fish',
    imagePath: getImagePath('images/charms/jelly-fish.png'),
    sizeScale: 1.4,
    category: 'Animals',
    price: 9.50
  },
  {
    id: 'elephant',
    name: 'Elephant',
    imagePath: getImagePath('images/charms/elephant.png'),
    sizeScale: 1.4,
    category: 'Animals',
    attachmentOffset: { x: 0, y: -10 },
    price: 11.99
  },
  {
    id: 'cattle',
    name: 'Cattle',
    imagePath: getImagePath('images/charms/cattle.png'),
    sizeScale: 1.4,
    category: 'Animals',
    attachmentOffset: { x: 0, y: -10 },
    price: 10.25
  },
  {
    id: 'crab',
    name: 'Crab',
    imagePath: getImagePath('images/charms/crab.png'),
    sizeScale: 1.4,
    category: 'Animals',
    price: 8.99
  },
  {
    id: 'turtle',
    name: 'Turtle',
    imagePath: getImagePath('images/charms/turtle.png'),
    sizeScale: 1.4,
    category: 'Animals',
    price: 9.25
  },
  {
    id: 'rose',
    name: 'Rose',
    imagePath: getImagePath('images/charms/rose.png'),
    sizeScale: 1.4,
    category: 'Symbols',
    price: 7.50
  },
  {
    id:'farfalle',
    name: 'Farfalle',
    imagePath: getImagePath('images/charms/farfalle.png'),
    sizeScale: 1.4,
    category: 'Symbols',
    price: 6.99
  },
  {
    id: 'cute-knot',
    name: 'Cute Knot',
    imagePath: getImagePath('images/charms/cute-knot.png'),
    sizeScale: 1.85,
    category: 'Symbols',
    attachmentOffset: { x: 0, y: -25 },
    price: 12.50
  },
  {
    id: 'teddy-bear',
    name: 'Teddy Bear',
    imagePath: getImagePath('images/charms/teddy-bear.png'),
    sizeScale: 1.85,
    category: 'Animals',
    price: 14.50
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    imagePath: getImagePath('images/charms/aquarius.png'),
    sizeScale: 1,
    category: 'Zodiac',
    price: 8.50
  },
  {
    id: 'aries',
    name: 'Aries',
    imagePath: getImagePath('images/charms/aries.png'),
    sizeScale: 1,
    category: 'Zodiac',
    price: 8.50
  },
  {
    id: 'cancer',
    name: 'Cancer',
    imagePath: getImagePath('images/charms/cancer.png'),
    sizeScale: 1,
    category: 'Zodiac',
    price: 8.50
  },
  {
    id: 'gemini',
    name: 'Gemini',
    imagePath: getImagePath('images/charms/gemini.png'),
    sizeScale: 1,
    category: 'Zodiac',
    price: 8.50
  },
  {
    id: 'libra',
    name: 'Libra',
    imagePath: getImagePath('images/charms/libra.png'),
    sizeScale: 1,
    category: 'Zodiac',
    price: 8.50
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    imagePath: getImagePath('images/charms/scorpio.png'),
    sizeScale: 1,
    category: 'Zodiac',
    price: 8.50
  }
]; 