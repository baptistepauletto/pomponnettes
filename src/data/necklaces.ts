import { Necklace } from '../types';
import { getImagePath } from '../utils/imagePaths';

// Sample necklace data
export const necklaces: Necklace[] = [
  {
    id: 'grigri',
    name: 'Collier Grigri',
    imagePath: getImagePath('images/necklaces/grigri.png'),
    attachmentPoints: [
      { id: 'point1', position: { x: 18, y: 44 }, isOccupied: false },
      { id: 'point2', position: { x: 18, y: 54 }, isOccupied: false },
      { id: 'point3', position: { x: 19, y: 65 }, isOccupied: false },
      { id: 'point4', position: { x: 22, y: 74 }, isOccupied: false },
      { id: 'point5', position: { x: 29, y: 82 }, isOccupied: false },
      { id: 'point6', position: { x: 38, y: 89 }, isOccupied: false },
      { id: 'point7', position: { x: 47, y: 92 }, isOccupied: false },
      { id: 'point8', position: { x: 56, y: 92 }, isOccupied: false },
      { id: 'point9', position: { x: 67, y: 89 }, isOccupied: false },
      { id: 'point10', position: { x: 76, y: 84 }, isOccupied: false },
      { id: 'point11', position: { x: 82, y: 76 }, isOccupied: false },
      { id: 'point12', position: { x: 86, y: 66 }, isOccupied: false },
      { id: 'point13', position: { x: 88, y: 57 }, isOccupied: false },
      { id: 'point14', position: { x: 88, y: 47 }, isOccupied: false },
    ]
  },
  {
    id: 'gold-chain',
    name: 'Gold Chain',
    imagePath: getImagePath('images/necklaces/gold-chain.png'),
    attachmentPoints: [
      // Left side attachment points (top to bottom)
      { id: 'point1', position: { x: 20, y: 30 }, isOccupied: false },
      { id: 'point2', position: { x: 20, y: 42 }, isOccupied: false },
      { id: 'point3', position: { x: 22, y: 53 }, isOccupied: false },
      { id: 'point4', position: { x: 24, y: 59 }, isOccupied: false },
      { id: 'point5', position: { x: 26, y: 64 }, isOccupied: false },
      
      // Bottom attachment points (left to right)
      { id: 'point6', position: { x: 32, y: 75 }, isOccupied: false },
      { id: 'point7', position: { x: 36, y: 79 }, isOccupied: false },
      { id: 'point8', position: { x: 41, y: 82 }, isOccupied: false },
      { id: 'point9', position: { x: 47, y: 83 }, isOccupied: false },
      { id: 'point10', position: { x: 53, y: 83 }, isOccupied: false },
      
      // Right side attachment points (bottom to top)
      { id: 'point11', position: { x: 60, y: 81 }, isOccupied: false },
      { id: 'point12', position: { x: 64, y: 77 }, isOccupied: false },
      { id: 'point13', position: { x: 71, y: 68 }, isOccupied: false },
      { id: 'point14', position: { x: 76, y: 57 }, isOccupied: false },
      { id: 'point15', position: { x: 78, y: 46 }, isOccupied: false },
      { id: 'point16', position: { x: 80, y: 30 }, isOccupied: false },
    ]
  },

]; 