import { NecklaceProduct } from '../types';
// import { getImagePath } from '../utils/imagePaths'; // Uncomment when enabling necklaces

/**
 * Necklace (collier) product data
 * Currently disabled - uncomment entries to enable
 */
export const necklaces: NecklaceProduct[] = [
  // Uncomment these to enable necklaces in the app
  /*
  {
    type: 'necklace',
    id: 1,
    woocommerceId: 8187,
    name: 'Collier Grigri',
    imagePath: getImagePath('images/necklaces/grigri.png'),
    variationId: 12764,
    basePrice: 39.00,
    displayScale: 1.0, 
    sizeDescription: 'Longueur du collier : 42 cm + 5 cm réglable.',
    attachmentPoints: [
      { id: 'gg-point1', position: { x: 14.5, y: 49}, isOccupied: false },
      { id: 'gg-point2', position: { x: 15, y: 59 }, isOccupied: false },
      { id: 'gg-point3', position: { x: 16.75, y: 69 }, isOccupied: false },
      { id: 'gg-point4', position: { x: 22, y: 78 }, isOccupied: false },
      { id: 'gg-point5', position: { x: 29.5, y: 85 }, isOccupied: false },
      { id: 'gg-point6', position: { x: 38.5, y: 89.75 }, isOccupied: false },
      { id: 'gg-point7', position: { x: 48.5, y: 92 }, isOccupied: false },
      { id: 'gg-point8', position: { x: 58.5, y: 90.2 }, isOccupied: false },
      { id: 'gg-point9', position: { x: 68.25, y: 86.75 }, isOccupied: false },
      { id: 'gg-point10', position: { x: 77, y: 80 }, isOccupied: false },
      { id: 'gg-point11', position: { x: 82, y: 71.25 }, isOccupied: false },
      { id: 'gg-point12', position: { x: 84.5, y: 61.5 }, isOccupied: false },
      { id: 'gg-point13', position: { x: 85.5, y: 51 }, isOccupied: false },
    ]
  },
  {
    type: 'necklace',
    id: 2,
    woocommerceId: 10465,
    name: 'Collier Gypso',
    imagePath: getImagePath('images/necklaces/chaine-gypso-or.png'),
    variationId: 12760,
    basePrice: 22.00,
    displayScale: 1.0,
    sizeDescription: 'Longueur du collier : 44 cm + 5 cm réglable.', 
    attachmentPoints: [
      { id: 'cg-point1', position: { x: 16.25, y: 68.25 }, isOccupied: false },
      { id: 'cg-point2', position: { x: 21.5, y: 78 }, isOccupied: false },
      { id: 'cg-point3', position: { x: 29.15, y: 85.25 }, isOccupied: false },
      { id: 'cg-point4', position: { x: 39, y: 90}, isOccupied: false },
      { id: 'cg-point5', position: { x: 49.5, y: 92 }, isOccupied: false },
      { id: 'cg-point6', position: { x: 60, y: 90.25 }, isOccupied: false },
      { id: 'cg-point7', position: { x: 69.15, y: 84.75 }, isOccupied: false },
      { id: 'cg-point8', position: { x: 76.65, y: 76.65 }, isOccupied: false },
      { id: 'cg-point9', position: { x: 82, y: 67 }, isOccupied: false },
    ]
  },
  {
    type: 'necklace',
    id: 3,
    woocommerceId: 9645,
    name: 'Collier Grigri Argent',
    imagePath: getImagePath('images/necklaces/grigri_argent.png'),
    variationId: 12812,
    basePrice: 39.00,
    displayScale: 1.0,
    sizeDescription: 'Longueur du collier : 42 cm + 5 cm réglable.',
    attachmentPoints: [
      { id: 'gg-point1', position: { x: 14.5, y: 49}, isOccupied: false },
      { id: 'gg-point2', position: { x: 15, y: 59 }, isOccupied: false },
      { id: 'gg-point3', position: { x: 16.75, y: 69 }, isOccupied: false },
      { id: 'gg-point4', position: { x: 22, y: 78 }, isOccupied: false },
      { id: 'gg-point5', position: { x: 29.5, y: 85 }, isOccupied: false },
      { id: 'gg-point6', position: { x: 38.5, y: 89.75 }, isOccupied: false },
      { id: 'gg-point7', position: { x: 48.5, y: 92 }, isOccupied: false },
      { id: 'gg-point8', position: { x: 58.5, y: 90.2 }, isOccupied: false },
      { id: 'gg-point9', position: { x: 68.25, y: 86.75 }, isOccupied: false },
      { id: 'gg-point10', position: { x: 77, y: 80 }, isOccupied: false },
      { id: 'gg-point11', position: { x: 82, y: 71.25 }, isOccupied: false },
      { id: 'gg-point12', position: { x: 84.5, y: 61.5 }, isOccupied: false },
      { id: 'gg-point13', position: { x: 85.5, y: 51 }, isOccupied: false },
    ]
  },
  {
    type: 'necklace',
    id: 4,
    woocommerceId: 10561,
    name: 'Collier Gypso Argent',
    imagePath: getImagePath('images/necklaces/chaine-gypso-argent.png'),
    variationId: 22553,
    basePrice: 22.00,
    displayScale: 1.0,
    sizeDescription: 'Longueur du collier : 44 cm + 5 cm réglable.', 
    attachmentPoints: [
      { id: 'cg-point1', position: { x: 16.25, y: 68.25 }, isOccupied: false },
      { id: 'cg-point2', position: { x: 21.5, y: 78 }, isOccupied: false },
      { id: 'cg-point3', position: { x: 29.15, y: 85.25 }, isOccupied: false },
      { id: 'cg-point4', position: { x: 39, y: 90}, isOccupied: false },
      { id: 'cg-point5', position: { x: 49.5, y: 92 }, isOccupied: false },
      { id: 'cg-point6', position: { x: 60, y: 90.25 }, isOccupied: false },
      { id: 'cg-point7', position: { x: 69.15, y: 84.75 }, isOccupied: false },
      { id: 'cg-point8', position: { x: 76.65, y: 76.65 }, isOccupied: false },
      { id: 'cg-point9', position: { x: 82, y: 67 }, isOccupied: false },
    ]
  },
  */
];

