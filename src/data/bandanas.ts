import { BandanaProduct } from '../types';
import { getImagePath } from '../utils/imagePaths';

/**
 * Bandana product data
 * Each bandana has hole count variations with different WooCommerce IDs
 */
export const bandanas: BandanaProduct[] = [
  {
    type: 'bandana',
    id: 5,
    woocommerceId: 21290,
    name: 'Bandana Beige',
    imagePath: getImagePath('images/necklaces/bandana-beige-5-oeillets.png'),
    variationId: 24768,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25021, 3: 25046, 5: 24768, 7: 25076 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 6,
    woocommerceId: 21290,
    name: 'Bandana Noir',
    imagePath: getImagePath('images/necklaces/bandana-noir-5-oeillets.png'),
    variationId: 22562,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25011, 3: 25058, 5: 22562, 7: 25088 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 7,
    woocommerceId: 21290,
    name: 'Bandana Blanc',
    imagePath: getImagePath('images/necklaces/bandana-blanc-5-oeillets.png'),
    variationId: 24515,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25020, 3: 25054, 5: 24515, 7: 25084 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 8,
    woocommerceId: 21290,
    name: 'Bandana Bleu Électrique',
    imagePath: getImagePath('images/necklaces/bandana-bleu-electrique-5-oeillets.png'),
    variationId: 24698,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25003, 3: 25049, 5: 24698, 7: 25079 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 9,
    woocommerceId: 21290,
    name: 'Bandana Bleu Jean',
    imagePath: getImagePath('images/necklaces/bandana-bleu-jean-5-oeillets.png'),
    variationId: 22371,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25004, 3: 25051, 5: 22371, 7: 25081 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 10,
    woocommerceId: 21290,
    name: 'Bandana Bleu Marine',
    imagePath: getImagePath('images/necklaces/bandana-bleu-marine-5-oeillets.png'),
    variationId: 21314,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25005, 3: 25062, 5: 21314, 7: 25092 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 11,
    woocommerceId: 21290,
    name: 'Bandana Gris Clair',
    imagePath: getImagePath('images/necklaces/bandana-gris-clair-5-oeillets.png'),
    variationId: 24654,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25006, 3: 25053, 5: 24654, 7: 25083 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 12,
    woocommerceId: 21290,
    name: 'Bandana Gris Foncé',
    imagePath: getImagePath('images/necklaces/bandana-gris-fonce-5-oeillets.png'),
    variationId: 24516,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25007, 3: 25052, 5: 24516, 7: 25082 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 13,
    woocommerceId: 21290,
    name: 'Bandana Kaki (Motif Blanc)',
    imagePath: getImagePath('images/necklaces/bandana-kaki-motif-blanc-5-oeillets.png'),
    variationId: 24715,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25008, 3: 25048, 5: 24715, 7: 25078 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 14,
    woocommerceId: 21290,
    name: 'Bandana Kaki (Motif Noir)',
    imagePath: getImagePath('images/necklaces/bandana-kaki-motif-noir-5-oeillets.png'),
    variationId: 24766,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25009, 3: 25047, 5: 24766, 7: 25077 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 15,
    woocommerceId: 21290,
    name: 'Bandana Marron',
    imagePath: getImagePath('images/necklaces/bandana-marron-5-oeillets.png'),
    variationId: 24404,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25010, 3: 25050, 5: 24404, 7: 25080 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
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
    type: 'bandana',
    id: 16,
    woocommerceId: 21290,
    name: 'Bandana Prune (Motif Blanc)',
    imagePath: getImagePath('images/necklaces/bandana-prune-motif-blanc-5-oeillets.png'),
    variationId: 24504,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25012, 3: 25057, 5: 24504, 7: 25087 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
    attachmentPoints: [
      { id: 'bd-prune-motif-blanc-point0', position: { x: 26.4, y: 65.8 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point1', position: { x: 34.6, y: 73.1 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point2', position: { x: 43.9, y: 80.6}, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point3', position: { x: 53.05, y: 87.55 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point4', position: { x: 61.1, y: 80.1}, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point5', position: { x: 69.4, y: 72.1 }, isOccupied: false },
      { id: 'bd-prune-motif-blanc-point6', position: { x: 76.75, y: 65.7 }, isOccupied: false }
    ]
  },
  {
    type: 'bandana',
    id: 17,
    woocommerceId: 21290,
    name: 'Bandana Prune (Motif Noir)',
    imagePath: getImagePath('images/necklaces/bandana-prune-motif-noir-5-oeillets.png'),
    variationId: 24769,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25013, 3: 25056, 5: 24769, 7: 25086 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
    attachmentPoints: [
      { id: 'bd-prune-motif-noir-point0', position: { x: 27.5, y: 66.0 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point1', position: { x: 36, y: 73.3 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point2', position: { x: 44.8, y: 80.6}, isOccupied: false },
      { id: 'bd-prune-motif-noir-point3', position: { x: 53.7, y: 87.8 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point4', position: { x: 61.7, y: 80.4}, isOccupied: false },
      { id: 'bd-prune-motif-noir-point5', position: { x: 69.6, y: 73.4 }, isOccupied: false },
      { id: 'bd-prune-motif-noir-point6', position: { x: 77.2, y: 66.8 }, isOccupied: false }
    ]
  },
  {
    type: 'bandana',
    id: 18,
    woocommerceId: 21290,
    name: 'Bandana Rose Bonbon',
    imagePath: getImagePath('images/necklaces/bandana-rose-bonbon-5-oeillets.png'),
    variationId: 21316,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25014, 3: 25059, 5: 21316, 7: 25089 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
    attachmentPoints: [
      { id: 'bd-rose-bonbon-point0', position: { x: 21.8, y: 64.9 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point1', position: { x: 30.8, y: 72.2 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point2', position: { x: 39.9, y: 80.1}, isOccupied: false },
      { id: 'bd-rose-bonbon-point3', position: { x: 48.8, y: 87.2 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point4', position: { x: 58.2, y: 79.6}, isOccupied: false },
      { id: 'bd-rose-bonbon-point5', position: { x: 66.12, y: 72.9 }, isOccupied: false },
      { id: 'bd-rose-bonbon-point6', position: { x: 75.25, y: 65.6 }, isOccupied: false }
    ]
  },
  {
    type: 'bandana',
    id: 19,
    woocommerceId: 21290,
    name: 'Bandana Rose Fuchsia',
    imagePath: getImagePath('images/necklaces/bandana-rose-fushia-5-oeillets.png'),
    variationId: 24767,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25015, 3: 25060, 5: 24767, 7: 25090 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
    attachmentPoints: [
      { id: 'bd-rose-fuchsia-point0', position: { x: 25.6, y: 67.1 }, isOccupied: false },
      { id: 'bd-rose-fuchsia-point1', position: { x: 34.6, y: 73.8 }, isOccupied: false },
      { id: 'bd-rose-fuchsia-point2', position: { x: 43.4, y: 80.3}, isOccupied: false },
      { id: 'bd-rose-fuchsia-point3', position: { x: 52.9, y: 87.1 }, isOccupied: false },
      { id: 'bd-rose-fuchsia-point4', position: { x: 61.3, y: 80.}, isOccupied: false },
      { id: 'bd-rose-fuchsia-point5', position: { x: 68.9, y: 72.5 }, isOccupied: false },
      { id: 'bd-rose-fuchsia-point6', position: { x: 76.8, y: 65.6 }, isOccupied: false }
    ]
  },
  {
    type: 'bandana',
    id: 20,
    woocommerceId: 21290,
    name: 'Bandana Sauge',
    imagePath: getImagePath('images/necklaces/bandana-sauge-5-oeillets.png'),
    variationId: 24770,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25017, 3: 25064, 5: 24770, 7: 25094 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
    attachmentPoints: [
      { id: 'bd-sauge-point0', position: { x: 24.3, y: 65.1 }, isOccupied: false },
      { id: 'bd-sauge-point1', position: { x: 33.7, y: 72.8 }, isOccupied: false },
      { id: 'bd-sauge-point2', position: { x: 42.6, y: 80.3}, isOccupied: false },
      { id: 'bd-sauge-point3', position: { x: 51.25, y: 87.8 }, isOccupied: false },
      { id: 'bd-sauge-point4', position: { x: 60.2, y: 81.2}, isOccupied: false },
      { id: 'bd-sauge-point5', position: { x: 68.7, y: 74.1 }, isOccupied: false },
      { id: 'bd-sauge-point6', position: { x: 78.1, y: 66.3 }, isOccupied: false }
    ]
  },
  {
    type: 'bandana',
    id: 21,
    woocommerceId: 21290,
    name: 'Bandana Vieux Rouge',
    imagePath: getImagePath('images/necklaces/bandana-vieux-rouge-5-oeillets.png'),
    variationId: 24406,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25018, 3: 25055, 5: 24406, 7: 25085 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
    attachmentPoints: [
      { id: 'bd-vieux-rouge-point0', position: { x: 29.3, y: 67.9 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point1', position: { x: 38.2, y: 74.6 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point2', position: { x: 46.9, y: 80.7}, isOccupied: false },
      { id: 'bd-vieux-rouge-point3', position: { x: 56.6, y: 86.7 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point4', position: { x: 64.8, y: 79.1}, isOccupied: false },
      { id: 'bd-vieux-rouge-point5', position: { x: 72.4, y: 71.7 }, isOccupied: false },
      { id: 'bd-vieux-rouge-point6', position: { x: 80.7, y: 64.1 }, isOccupied: false }
    ]
  },
  {
    type: 'bandana',
    id: 22,
    woocommerceId: 21290,
    name: 'Bandana Violet',
    imagePath: getImagePath('images/necklaces/bandana-violet-5-oeillets.png'),
    variationId: 21319,
    woocommerceIdsByHoleCount: { 1: 24933, 3: 25045, 5: 21290, 7: 25075 },
    variationIdsByHoleCount: { 1: 25019, 3: 25063, 5: 21319, 7: 25093 },
    basePrice: 49.00,
    displayScale: .8,
    sizeDescription: 'Taille du bandana : 54 cm x 54 cm', 
    attachmentPoints: [
      { id: 'bd-violet-point0', position: { x: 22.6, y: 66.5 }, isOccupied: false },
      { id: 'bd-violet-point1', position: { x: 30.7, y: 73.3 }, isOccupied: false },
      { id: 'bd-violet-point2', position: { x: 39.1, y: 80.5}, isOccupied: false },
      { id: 'bd-violet-point3', position: { x: 47.6, y: 87.7 }, isOccupied: false },
      { id: 'bd-violet-point4', position: { x: 55.9, y: 80.9}, isOccupied: false },
      { id: 'bd-violet-point5', position: { x: 64.2, y: 73.1 }, isOccupied: false },
      { id: 'bd-violet-point6', position: { x: 72.5, y: 66.2 }, isOccupied: false }
    ]
  },
];

