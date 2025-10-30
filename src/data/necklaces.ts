import { Necklace } from '../types';
import { getImagePath } from '../utils/imagePaths';

// Sample necklace data
export const necklaces: Necklace[] = [
  /* {
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
  }, */
  {
    id: 5,
    woocommerceId: 21290,
    name: 'Bandana Beige',
    imagePath: getImagePath('images/necklaces/bandana-beige-5-oeillets.png'),
    variationId: 24768,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bb-point0', position: { x: 25, y: 65.45 }, isOccupied: false },
      { id: 'bb-point1', position: { x: 34, y: 73 }, isOccupied: false },
      { id: 'bb-point2', position: { x: 42.5, y: 80.6}, isOccupied: false },
      { id: 'bb-point3', position: { x: 52.25, y: 87.8 }, isOccupied: false },
      { id: 'bb-point4', position: { x: 60.15, y: 80.3}, isOccupied: false },
      { id: 'bb-point5', position: { x: 68.1, y: 72.9 }, isOccupied: false },
      { id: 'bb-point6', position: { x: 76.3, y: 65.9 }, isOccupied: false }
    ]
  },
  {
    id: 6,
    woocommerceId: 21290,
    name: 'Bandana Noir',
    imagePath: getImagePath('images/necklaces/bandana-noir-5-oeillets.png'),
    variationId: 22562,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bn-point0', position: { x: 24.3, y: 64.7 }, isOccupied: false },
      { id: 'bn-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bn-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bn-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bn-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bn-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bn-point6', position: { x: 76.2, y: 65.3 }, isOccupied: false }
    ]
  },
  {
    id: 7,
    woocommerceId: 21290,
    name: 'Bandana Blanc',
    imagePath: getImagePath('images/necklaces/bandana-blanc-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-blanc-point0', position: { x: 23.2, y: 67 }, isOccupied: false },
      { id: 'bd-blanc-point1', position: { x: 32.1, y: 73.8 }, isOccupied: false },
      { id: 'bd-blanc-point2', position: { x: 41, y: 81}, isOccupied: false },
      { id: 'bd-blanc-point3', position: { x: 50.9, y: 87.4 }, isOccupied: false },
      { id: 'bd-blanc-point4', position: { x: 59, y: 80.1}, isOccupied: false },
      { id: 'bd-blanc-point5', position: { x: 67, y: 72.7 }, isOccupied: false },
      { id: 'bd-blanc-point6', position: { x: 75, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 8,
    woocommerceId: 21290,
    name: 'Bandana Bleu Électrique',
    imagePath: getImagePath('images/necklaces/bandana-bleu-electrique-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-bleu-electrique-point0', position: { x: 21, y: 64.55 }, isOccupied: false },
      { id: 'bd-bleu-electrique-point1', position: { x: 31, y: 72.9 }, isOccupied: false },
      { id: 'bd-bleu-electrique-point2', position: { x: 40.5, y: 80.3}, isOccupied: false },
      { id: 'bd-bleu-electrique-point3', position: { x: 49.8, y: 87.6 }, isOccupied: false },
      { id: 'bd-bleu-electrique-point4', position: { x: 58.5, y: 80.4}, isOccupied: false },
      { id: 'bd-bleu-electrique-point5', position: { x: 67.1, y: 73.1 }, isOccupied: false },
      { id: 'bd-bleu-electrique-point6', position: { x: 76.5, y: 65 }, isOccupied: false }
    ]
  },
  {
    id: 9,
    woocommerceId: 21290,
    name: 'Bandana Bleu Jean',
    imagePath: getImagePath('images/necklaces/bandana-bleu-jean-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-bleu-jean-point0', position: { x: 23.7, y: 65.3 }, isOccupied: false },
      { id: 'bd-bleu-jean-point1', position: { x: 33.1, y: 73.2 }, isOccupied: false },
      { id: 'bd-bleu-jean-point2', position: { x: 41.85, y: 80.7}, isOccupied: false },
      { id: 'bd-bleu-jean-point3', position: { x: 50.6, y: 87.6 }, isOccupied: false },
      { id: 'bd-bleu-jean-point4', position: { x: 58.9, y: 79.8}, isOccupied: false },
      { id: 'bd-bleu-jean-point5', position: { x: 66.3, y: 72.6 }, isOccupied: false },
      { id: 'bd-bleu-jean-point6', position: { x: 74.35, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 10,
    woocommerceId: 21290,
    name: 'Bandana Bleu Marine',
    imagePath: getImagePath('images/necklaces/bandana-bleu-marine-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-bleu-marine-point0', position: { x: 23.5, y: 65.7 }, isOccupied: false },
      { id: 'bd-bleu-marine-point1', position: { x: 33.55, y: 73.4 }, isOccupied: false },
      { id: 'bd-bleu-marine-point2', position: { x: 42.6, y: 81.1}, isOccupied: false },
      { id: 'bd-bleu-marine-point3', position: { x: 51, y: 88.1 }, isOccupied: false },
      { id: 'bd-bleu-marine-point4', position: { x: 60.5, y: 80.7}, isOccupied: false },
      { id: 'bd-bleu-marine-point5', position: { x: 68.5, y: 73.3 }, isOccupied: false },
      { id: 'bd-bleu-marine-point6', position: { x: 78, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 11,
    woocommerceId: 21290,
    name: 'Bandana Gris Clair',
    imagePath: getImagePath('images/necklaces/bandana-gris-clair-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-gris-clair-point0', position: { x: 24.3, y: 64.6 }, isOccupied: false },
      { id: 'bd-gris-clair-point1', position: { x: 32.6, y: 72 }, isOccupied: false },
      { id: 'bd-gris-clair-point2', position: { x: 40.8, y: 79.8}, isOccupied: false },
      { id: 'bd-gris-clair-point3', position: { x: 48.8, y: 87.2 }, isOccupied: false },
      { id: 'bd-gris-clair-point4', position: { x: 57.5, y: 79.8}, isOccupied: false },
      { id: 'bd-gris-clair-point5', position: { x: 64.9, y: 72.2 }, isOccupied: false },
      { id: 'bd-gris-clair-point6', position: { x: 72.9, y: 64.7 }, isOccupied: false }
    ]
  },
  {
    id: 12,
    woocommerceId: 21290,
    name: 'Bandana Gris Foncé',
    imagePath: getImagePath('images/necklaces/bandana-gris-fonce-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-gris-fonce-point0', position: { x: 25.2, y: 66.15 }, isOccupied: false },
      { id: 'bd-gris-fonce-point1', position: { x: 33.65, y: 73.7 }, isOccupied: false },
      { id: 'bd-gris-fonce-point2', position: { x: 42.5, y: 81.1}, isOccupied: false },
      { id: 'bd-gris-fonce-point3', position: { x: 51.2, y: 88.3 }, isOccupied: false },
      { id: 'bd-gris-fonce-point4', position: { x: 60.4, y: 80.6}, isOccupied: false },
      { id: 'bd-gris-fonce-point5', position: { x: 68.1, y: 73.7 }, isOccupied: false },
      { id: 'bd-gris-fonce-point6', position: { x: 76.65, y: 66.6 }, isOccupied: false }
    ]
  },
  {
    id: 13,
    woocommerceId: 21290,
    name: 'Bandana Kaki (Motif Blanc)',
    imagePath: getImagePath('images/necklaces/bandana-kaki-motif-blanc-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-kaki-motif-blanc-point0', position: { x: 24.35, y: 66.1 }, isOccupied: false },
      { id: 'bd-kaki-motif-blanc-point1', position: { x: 33.25, y: 73.7 }, isOccupied: false },
      { id: 'bd-kaki-motif-blanc-point2', position: { x: 42.1, y: 81}, isOccupied: false },
      { id: 'bd-kaki-motif-blanc-point3', position: { x: 51.25, y: 87.7 }, isOccupied: false },
      { id: 'bd-kaki-motif-blanc-point4', position: { x: 60.2, y: 80.4}, isOccupied: false },
      { id: 'bd-kaki-motif-blanc-point5', position: { x: 68.3, y: 73.1 }, isOccupied: false },
      { id: 'bd-kaki-motif-blanc-point6', position: { x: 77.3, y: 66.3}, isOccupied: false }
    ]
  },
  {
    id: 14,
    woocommerceId: 21290,
    name: 'Bandana Kaki (Motif Noir)',
    imagePath: getImagePath('images/necklaces/bandana-kaki-motif-noir-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-kaki-motif-noir-point0', position: { x: 25.9, y: 64.9 }, isOccupied: false },
      { id: 'bd-kaki-motif-noir-point1', position: { x: 34.4, y: 72.8 }, isOccupied: false },
      { id: 'bd-kaki-motif-noir-point2', position: { x: 42.65, y: 80.6}, isOccupied: false },
      { id: 'bd-kaki-motif-noir-point3', position: { x: 51, y: 87.8 }, isOccupied: false },
      { id: 'bd-kaki-motif-noir-point4', position: { x: 59.9, y: 80.4}, isOccupied: false },
      { id: 'bd-kaki-motif-noir-point5', position: { x: 68, y: 73.6 }, isOccupied: false },
      { id: 'bd-kaki-motif-noir-point6', position: { x: 76.05, y: 66.75 }, isOccupied: false }
    ]
  },
  {
    id: 15,
    woocommerceId: 21290,
    name: 'Bandana Marron',
    imagePath: getImagePath('images/necklaces/bandana-marron-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-marron-point0', position: { x: 21.3, y: 65.6 }, isOccupied: false },
      { id: 'bd-marron-point1', position: { x: 30.2, y: 72.8 }, isOccupied: false },
      { id: 'bd-marron-point2', position: { x: 39.7, y: 80.7}, isOccupied: false },
      { id: 'bd-marron-point3', position: { x: 48.6, y: 87.8 }, isOccupied: false },
      { id: 'bd-marron-point4', position: { x: 57.7, y: 80.4}, isOccupied: false },
      { id: 'bd-marron-point5', position: { x: 65.7, y: 73.5 }, isOccupied: false },
      { id: 'bd-marron-point6', position: { x: 74.4, y: 65.8 }, isOccupied: false }
    ]
  },
  {
    id: 16,
    woocommerceId: 21290,
    name: 'Bandana Prune (Motif Blanc)',
    imagePath: getImagePath('images/necklaces/bandana-prune-motif-blanc-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-prune-motif-blanc-point0', position: { x: 24.3, y: 65.0 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point6', position: { x: 76.4, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 17,
    woocommerceId: 21290,
    name: 'Bandana Prune (Motif Noir)',
    imagePath: getImagePath('images/necklaces/bandana-prune-motif-noir-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-prune-motif-noir-point0', position: { x: 24.3, y: 65.0 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bd-prune-motif-noir-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bd-prune-motif-noir-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point6', position: { x: 76.4, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 18,
    woocommerceId: 21290,
    name: 'Bandana Rose Bonbon',
    imagePath: getImagePath('images/necklaces/bandana-rose-bonbon-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-rose-bonbon-point0', position: { x: 24.3, y: 65.0 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bd-rose-bonbon-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bd-rose-bonbon-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point6', position: { x: 76.4, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 19,
    woocommerceId: 21290,
    name: 'Bandana Rose Fushia',
    imagePath: getImagePath('images/necklaces/bandana-rose-fushia-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-rose-fushia-point0', position: { x: 24.3, y: 65.0 }, isOccupied: false },
      { id: 'bd-rose-fushia-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bd-rose-fushia-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bd-rose-fushia-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bd-rose-fushia-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bd-rose-fushia-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bd-rose-fushia-point6', position: { x: 76.4, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 20,
    woocommerceId: 21290,
    name: 'Bandana Sauge',
    imagePath: getImagePath('images/necklaces/bandana-sauge-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-sauge-point0', position: { x: 24.3, y: 65.0 }, isOccupied: false },
      { id: 'bd-sauge-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bd-sauge-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bd-sauge-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bd-sauge-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bd-sauge-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bd-sauge-point6', position: { x: 76.4, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 21,
    woocommerceId: 21290,
    name: 'Bandana Vieux Rouge',
    imagePath: getImagePath('images/necklaces/bandana-vieux-rouge-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-vieux-rouge-point0', position: { x: 24.3, y: 65.0 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bd-vieux-rouge-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bd-vieux-rouge-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point6', position: { x: 76.4, y: 65.5 }, isOccupied: false }
    ]
  },
  {
    id: 22,
    woocommerceId: 21290,
    name: 'Bandana Violet',
    imagePath: getImagePath('images/necklaces/bandana-violet-5-oeillets.png'),
    variationId: 0,
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 60 cm x 60 cm', 
    attachmentPoints: [
      { id: 'bd-violet-point0', position: { x: 24.3, y: 65.0 }, isOccupied: false },
      { id: 'bd-violet-point1', position: { x: 33.1, y: 72.8 }, isOccupied: false },
      { id: 'bd-violet-point2', position: { x: 41.9, y: 80.6}, isOccupied: false },
      { id: 'bd-violet-point3', position: { x: 51.2, y: 87.8 }, isOccupied: false },
      { id: 'bd-violet-point4', position: { x: 59.2, y: 80.7}, isOccupied: false },
      { id: 'bd-violet-point5', position: { x: 67.8, y: 73.1 }, isOccupied: false },
      { id: 'bd-violet-point6', position: { x: 76.4, y: 65.5 }, isOccupied: false }
    ]
  },
    // {
  //   id: 8608,
  //   name: 'Collier Chouchou',
  //   imagePath: getImagePath('images/necklaces/chaine-chouchou-or.png'),
  //   variationId: 12771,
  //   basePrice: 32.00,
  //   attachmentPoints: [
  //     { id: 'cc-point1', position: { x: 6, y: 65.5 }, isOccupied: false },
  //     { id: 'cc-point2', position: { x: 9.5, y: 74 }, isOccupied: false },
  //     { id: 'cc-point3', position: { x: 14.5, y: 81.5 }, isOccupied: false },
  //     { id: 'cc-point4', position: { x: 21.5, y: 88.5 }, isOccupied: false },
  //     { id: 'cc-point5', position: { x: 29, y: 93.5 }, isOccupied: false },
  //     { id: 'cc-point6', position: { x: 39, y: 97 }, isOccupied: false },
  //     { id: 'cc-point7', position: { x: 49, y: 98 }, isOccupied: false },
  //     { id: 'cc-point8', position: { x: 59, y: 97 }, isOccupied: false },
  //     { id: 'cc-point9', position: { x: 69, y: 93.5 }, isOccupied: false },
  //     { id: 'cc-point10', position: { x: 79, y: 88 }, isOccupied: false },
  //     { id: 'cc-point11', position: { x: 86, y: 81.5 }, isOccupied: false },
  //     { id: 'cc-point12', position: { x: 92, y: 74 }, isOccupied: false },
  //     { id: 'cc-point13', position: { x: 95.5, y: 65.5 }, isOccupied: false },
  //   ]
  // },
  // {
  //   id: 16807,
  //   name: 'Collier Crush',
  //   imagePath: getImagePath('images/necklaces/chaine-crush.png'),
  //   variationId: 16811,
  //   basePrice: 32.00,
  //   attachmentPoints: [
  //     { id: 'ccr-point1', position: { x: 5.4, y: 68.5 }, isOccupied: false },
  //     { id: 'ccr-point2', position: { x: 9.2, y: 75.5 }, isOccupied: false },
  //     { id: 'ccr-point3', position: { x: 14.5, y: 82 }, isOccupied: false },
  //     { id: 'ccr-point4', position: { x: 21, y: 88 }, isOccupied: false },
  //     { id: 'ccr-point5', position: { x: 28.7, y: 92.5 }, isOccupied: false },
  //     { id: 'ccr-point6', position: { x: 38, y: 94.9 }, isOccupied: false },
  //     { id: 'ccr-point7', position: { x: 47, y: 96.6 }, isOccupied: false },
  //     { id: 'ccr-point8', position: { x: 56.7, y: 96.2 }, isOccupied: false },
  //     { id: 'ccr-point9', position: { x: 65.5, y: 94.2 }, isOccupied: false },
  //     { id: 'ccr-point10', position: { x: 74.1, y: 91 }, isOccupied: false },
  //     { id: 'ccr-point11', position: { x: 81.2, y: 85.5 }, isOccupied: false },
  //     { id: 'ccr-point12', position: { x: 87.2, y: 79 }, isOccupied: false },
  //     { id: 'ccr-point13', position: { x: 91, y: 72 }, isOccupied: false },
  //   ]
  // },
  // {
  //   id:9740,
  //   name: 'Collier Lucky',
  //   imagePath: getImagePath('images/necklaces/chaine-lucky-or.png'),
  //   variationId: 18961,
  //   basePrice: 54.00,
  //   attachmentPoints: [
  //     { id: 'cl-point1', position: { x: 15, y: 44 }, isOccupied: false },
  //     { id: 'cl-point2', position: { x: 15, y: 54 }, isOccupied: false },
  //     { id: 'cl-point3', position: { x: 16, y: 65 }, isOccupied: false },
  //     { id: 'cl-point4', position: { x: 19, y: 74 }, isOccupied: false },
  //     { id: 'cl-point5', position: { x: 26, y: 82 }, isOccupied: false },
  //     { id: 'cl-point6', position: { x: 35, y: 89 }, isOccupied: false },
  //     { id: 'cl-point7', position: { x: 50.6, y: 96.2 }, isOccupied: false },
  //     { id: 'cl-point8', position: { x: 53, y: 92 }, isOccupied: false },
  //     { id: 'cl-point9', position: { x: 64, y: 89 }, isOccupied: false },
  //     { id: 'cl-point10', position: { x: 73, y: 84 }, isOccupied: false },
  //     { id: 'cl-point11', position: { x: 79.5, y: 76.25 }, isOccupied: false },
  //     { id: 'cl-point12', position: { x: 84, y: 66.5 }, isOccupied: false },
  //     { id: 'cl-point13', position: { x: 85.5, y: 56 }, isOccupied: false },
  //   ]
  // },
  // {
  //   id: 8188,
  //   name: 'Gold Chain',
  //   imagePath: getImagePath('images/necklaces/gold-chain.png'),
  //   variationId: 12765,
  //   basePrice: 65.00,
  //   attachmentPoints: [
  //     // Left side attachment points (top to bottom)
  //     { id: 'gc-point1', position: { x: 20, y: 30 }, isOccupied: false },
  //     { id: 'gc-point2', position: { x: 20, y: 42 }, isOccupied: false },
  //     { id: 'gc-point3', position: { x: 22, y: 53 }, isOccupied: false },
  //     { id: 'gc-point4', position: { x: 24, y: 59 }, isOccupied: false },
  //     { id: 'gc-point5', position: { x: 26, y: 64 }, isOccupied: false },
      
  //     // Bottom attachment points (left to right)
  //     { id: 'gc-point6', position: { x: 32, y: 75 }, isOccupied: false },
  //     { id: 'gc-point7', position: { x: 41, y: 82 }, isOccupied: false },
  //     { id: 'gc-point8', position: { x: 47, y: 83 }, isOccupied: false },
  //     { id: 'gc-point9', position: { x: 53, y: 83 }, isOccupied: false },
      
  //     // Right side attachment points (bottom to top)
  //     { id: 'gc-point10', position: { x: 64, y: 77 }, isOccupied: false },
  //     { id: 'gc-point11', position: { x: 71, y: 68 }, isOccupied: false },
  //     { id: 'gc-point12', position: { x: 76, y: 57 }, isOccupied: false },
  //     { id: 'gc-point13', position: { x: 78, y: 46 }, isOccupied: false },
  //     //{ id: 'gc-point14', position: { x: 80, y: 30 }, isOccupied: false },
  //   ]
  // },

]; 