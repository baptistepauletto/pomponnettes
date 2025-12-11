// Position type for x, y coordinates
export interface Position {
  x: number;
  y: number;
}

// Attachment point representing where charms can be placed on a product
export interface AttachmentPoint {
  id: string;
  position: Position;
  isOccupied: boolean;
}

// Charm type
export interface Charm {
  id: string;
  name: string;
  imagePath: string;
  sizeScale: number;
  category?: string;
  sizeMark?: 'XS' | 'S' | 'M' | 'L' | 'XL'; // Size category based on charm size
  keywords?: string[]; // Optional aliases/synonyms to improve search
  // Optional offset for attachment point (in percentage from center)
  // Default is {x: 0, y: 0} which means the attachment is at center top
  attachmentOffset?: Position;
}

// Hole count type for bandanas
export type HoleCount = 1 | 3 | 5 | 7;

// ============================================
// Product Types - Discriminated Union Pattern
// ============================================

// Base product properties shared by all product types
interface BaseProduct {
  id: number;
  name: string;
  imagePath: string;
  attachmentPoints: AttachmentPoint[];
  basePrice: number;
  displayScale?: number;
  sizeDescription?: string;
}

// Necklace-specific product type
export interface NecklaceProduct extends BaseProduct {
  type: 'necklace';
  woocommerceId: number;
  variationId: number;
}

// Bandana-specific product type
export interface BandanaProduct extends BaseProduct {
  type: 'bandana';
  woocommerceId: number;
  variationId: number;
  woocommerceIdsByHoleCount: Record<HoleCount, number>;
  variationIdsByHoleCount: Record<HoleCount, number>;
}

// Discriminated union of all product types
export type Product = NecklaceProduct | BandanaProduct;

// ============================================
// Type Guards
// ============================================

/**
 * Type guard to check if a product is a bandana
 */
export function isBandanaProduct(product: Product | null): product is BandanaProduct {
  return product !== null && product.type === 'bandana';
}

/**
 * Type guard to check if a product is a necklace
 */
export function isNecklaceProduct(product: Product | null): product is NecklaceProduct {
  return product !== null && product.type === 'necklace';
}

/**
 * Get product type label for display
 */
export function getProductTypeLabel(product: Product | null): string {
  if (!product) return 'produit';
  switch (product.type) {
    case 'bandana':
      return 'bandana';
    case 'necklace':
      return 'collier';
    default:
      return 'produit';
  }
}

// ============================================
// Legacy Type Alias (for gradual migration)
// ============================================

/**
 * @deprecated Use Product type instead. This alias exists for backward compatibility.
 */
export type Necklace = Product;

// Placed charm type for a charm that has been positioned on the product
export interface PlacedCharm {
  id: string;
  charmId: string;
  attachmentPointId: string;
  position: Position;
}
