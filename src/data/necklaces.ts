import { Necklace } from '../types';
import { getImagePath } from '../utils/imagePaths';

// Sample necklace data
export const necklaces: Necklace[] = [
  {
    id: 8187,
    name: 'Collier Grigri',
    imagePath: getImagePath('images/necklaces/grigri.png'),
    variationId: 12764,
    attachmentPoints: [
      { id: 'gg-point1', position: { x: 18, y: 44 }, isOccupied: false },
      { id: 'gg-point2', position: { x: 18, y: 54 }, isOccupied: false },
      { id: 'gg-point3', position: { x: 19, y: 65 }, isOccupied: false },
      { id: 'gg-point4', position: { x: 22, y: 74 }, isOccupied: false },
      { id: 'gg-point5', position: { x: 29, y: 82 }, isOccupied: false },
      { id: 'gg-point6', position: { x: 38, y: 89 }, isOccupied: false },
      { id: 'gg-point7', position: { x: 47, y: 92 }, isOccupied: false },
      { id: 'gg-point8', position: { x: 56, y: 92 }, isOccupied: false },
      { id: 'gg-point9', position: { x: 67, y: 89 }, isOccupied: false },
      { id: 'gg-point10', position: { x: 76, y: 84 }, isOccupied: false },
      { id: 'gg-point11', position: { x: 82.5, y: 76.25 }, isOccupied: false },
      { id: 'gg-point12', position: { x: 87, y: 66.5 }, isOccupied: false },
      { id: 'gg-point13', position: { x: 88.5, y: 56 }, isOccupied: false },
      { id: 'gg-point14', position: { x: 88.5, y: 46 }, isOccupied: false },
    ]
  },
  {
    id: 8188,
    name: 'Gold Chain',
    imagePath: getImagePath('images/necklaces/gold-chain.png'),
    variationId: 12765,
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
      { id: 'gc-point14', position: { x: 80, y: 30 }, isOccupied: false },
    ]
  },

]; 