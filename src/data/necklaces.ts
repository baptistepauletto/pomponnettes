import { Necklace } from '../types';
import { getImagePath } from '../utils/imagePaths';

// Sample necklace data
export const necklaces: Necklace[] = [
  {
    id: 8187,
    name: 'Collier Grigri',
    imagePath: getImagePath('images/necklaces/grigri.png'),
    variationId: 12764,
    basePrice: 88.00,
    attachmentPoints: [
      { id: 'gg-point1', position: { x: 15, y: 44 }, isOccupied: false },
      { id: 'gg-point2', position: { x: 15, y: 54 }, isOccupied: false },
      { id: 'gg-point3', position: { x: 16, y: 65 }, isOccupied: false },
      { id: 'gg-point4', position: { x: 19, y: 74 }, isOccupied: false },
      { id: 'gg-point5', position: { x: 26, y: 82 }, isOccupied: false },
      { id: 'gg-point6', position: { x: 35, y: 89 }, isOccupied: false },
      { id: 'gg-point7', position: { x: 44, y: 92 }, isOccupied: false },
      { id: 'gg-point8', position: { x: 53, y: 92 }, isOccupied: false },
      { id: 'gg-point9', position: { x: 64, y: 89 }, isOccupied: false },
      { id: 'gg-point10', position: { x: 73, y: 84 }, isOccupied: false },
      { id: 'gg-point11', position: { x: 79.5, y: 76.25 }, isOccupied: false },
      { id: 'gg-point12', position: { x: 84, y: 66.5 }, isOccupied: false },
      { id: 'gg-point13', position: { x: 85.5, y: 56 }, isOccupied: false },
      //{ id: 'gg-point14', position: { x: 85.5, y: 46 }, isOccupied: false },
    ]
  },
  {
    id: 8608,
    name: 'Collier Chouchou',
    imagePath: getImagePath('images/necklaces/chaine-chouchou-or.png'),
    variationId: 12771,
    basePrice: 67.00,
    attachmentPoints: [
      { id: 'cc-point1', position: { x: 6, y: 65.5 }, isOccupied: false },
      { id: 'cc-point2', position: { x: 9.5, y: 74 }, isOccupied: false },
      { id: 'cc-point3', position: { x: 14.5, y: 81.5 }, isOccupied: false },
      { id: 'cc-point4', position: { x: 21.5, y: 88.5 }, isOccupied: false },
      { id: 'cc-point5', position: { x: 29, y: 93.5 }, isOccupied: false },
      { id: 'cc-point6', position: { x: 39, y: 97 }, isOccupied: false },
      { id: 'cc-point7', position: { x: 49, y: 98 }, isOccupied: false },
      { id: 'cc-point8', position: { x: 59, y: 97 }, isOccupied: false },
      { id: 'cc-point9', position: { x: 69, y: 93.5 }, isOccupied: false },
      { id: 'cc-point10', position: { x: 79, y: 88 }, isOccupied: false },
      { id: 'cc-point11', position: { x: 86, y: 81.5 }, isOccupied: false },
      { id: 'cc-point12', position: { x: 92, y: 74 }, isOccupied: false },
      { id: 'cc-point13', position: { x: 95.5, y: 65.5 }, isOccupied: false },
    ]
  },
  {
    id: 16807,
    name: 'Collier Crush',
    imagePath: getImagePath('images/necklaces/chaine-crush.png'),
    variationId: 16811,
    basePrice: 81.00,
    attachmentPoints: [
      { id: 'ccr-point1', position: { x: 5.4, y: 68.5 }, isOccupied: false },
      { id: 'ccr-point2', position: { x: 9.2, y: 75.5 }, isOccupied: false },
      { id: 'ccr-point3', position: { x: 14.5, y: 82 }, isOccupied: false },
      { id: 'ccr-point4', position: { x: 21, y: 88 }, isOccupied: false },
      { id: 'ccr-point5', position: { x: 28.7, y: 92.5 }, isOccupied: false },
      { id: 'ccr-point6', position: { x: 38, y: 94.9 }, isOccupied: false },
      { id: 'ccr-point7', position: { x: 47, y: 96.6 }, isOccupied: false },
      { id: 'ccr-point8', position: { x: 56.7, y: 96.2 }, isOccupied: false },
      { id: 'ccr-point9', position: { x: 65.5, y: 94.2 }, isOccupied: false },
      { id: 'ccr-point10', position: { x: 74.1, y: 91 }, isOccupied: false },
      { id: 'ccr-point11', position: { x: 81.2, y: 85.5 }, isOccupied: false },
      { id: 'ccr-point12', position: { x: 87.2, y: 79 }, isOccupied: false },
      { id: 'ccr-point13', position: { x: 91, y: 72 }, isOccupied: false },
    ]
  },
  {
    id:9740,
    name: 'Collier Lucky',
    imagePath: getImagePath('images/necklaces/chaine-lucky-or.png'),
    variationId: 18961,
    basePrice: 75.00,
    attachmentPoints: [
      { id: 'cl-point1', position: { x: 15, y: 44 }, isOccupied: false },
      { id: 'cl-point2', position: { x: 15, y: 54 }, isOccupied: false },
      { id: 'cl-point3', position: { x: 16, y: 65 }, isOccupied: false },
      { id: 'cl-point4', position: { x: 19, y: 74 }, isOccupied: false },
      { id: 'cl-point5', position: { x: 26, y: 82 }, isOccupied: false },
      { id: 'cl-point6', position: { x: 35, y: 89 }, isOccupied: false },
      { id: 'cl-point7', position: { x: 50.6, y: 96.2 }, isOccupied: false },
      { id: 'cl-point8', position: { x: 53, y: 92 }, isOccupied: false },
      { id: 'cl-point9', position: { x: 64, y: 89 }, isOccupied: false },
      { id: 'cl-point10', position: { x: 73, y: 84 }, isOccupied: false },
      { id: 'cl-point11', position: { x: 79.5, y: 76.25 }, isOccupied: false },
      { id: 'cl-point12', position: { x: 84, y: 66.5 }, isOccupied: false },
      { id: 'cl-point13', position: { x: 85.5, y: 56 }, isOccupied: false },
    ]
  },
  {
    id: 10465,
    name: 'Collier Gypso',
    imagePath: getImagePath('images/necklaces/chaine-gypso-or.png'),
    variationId: 12760,
    basePrice: 57.00,
    attachmentPoints: [
      { id: 'cg-point1', position: { x: 8, y: 74 }, isOccupied: false },
      { id: 'cg-point2', position: { x: 15, y: 84 }, isOccupied: false },
      { id: 'cg-point3', position: { x: 26, y: 91.2 }, isOccupied: false },
      { id: 'cg-point4', position: { x: 39, y: 95.8 }, isOccupied: false },
      { id: 'cg-point5', position: { x: 53, y: 97 }, isOccupied: false },
      { id: 'cg-point6', position: { x: 66, y: 94 }, isOccupied: false },
      { id: 'cg-point7', position: { x: 77.5, y: 87.5 }, isOccupied: false },
      { id: 'cg-point8', position: { x: 86.5, y: 78.5 }, isOccupied: false },
      { id: 'cg-point9', position: { x: 92, y: 68 }, isOccupied: false },

    ]
  },
  {
    id: 8188,
    name: 'Gold Chain',
    imagePath: getImagePath('images/necklaces/gold-chain.png'),
    variationId: 12765,
    basePrice: 65.00,
    attachmentPoints: [
      // Left side attachment points (top to bottom)
      { id: 'gc-point1', position: { x: 20, y: 30 }, isOccupied: false },
      { id: 'gc-point2', position: { x: 20, y: 42 }, isOccupied: false },
      { id: 'gc-point3', position: { x: 22, y: 53 }, isOccupied: false },
      { id: 'gc-point4', position: { x: 24, y: 59 }, isOccupied: false },
      { id: 'gc-point5', position: { x: 26, y: 64 }, isOccupied: false },
      
      // Bottom attachment points (left to right)
      { id: 'gc-point6', position: { x: 32, y: 75 }, isOccupied: false },
      { id: 'gc-point7', position: { x: 41, y: 82 }, isOccupied: false },
      { id: 'gc-point8', position: { x: 47, y: 83 }, isOccupied: false },
      { id: 'gc-point9', position: { x: 53, y: 83 }, isOccupied: false },
      
      // Right side attachment points (bottom to top)
      { id: 'gc-point10', position: { x: 64, y: 77 }, isOccupied: false },
      { id: 'gc-point11', position: { x: 71, y: 68 }, isOccupied: false },
      { id: 'gc-point12', position: { x: 76, y: 57 }, isOccupied: false },
      { id: 'gc-point13', position: { x: 78, y: 46 }, isOccupied: false },
      //{ id: 'gc-point14', position: { x: 80, y: 30 }, isOccupied: false },
    ]
  },

]; 