// Position type for x, y coordinates
export interface Position {
  x: number;
  y: number;
}

// Attachment point representing where charms can be placed on a necklace
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

// Necklace type
export interface Necklace {
  id: number;
  woocommerceId: number;
  name: string;
  imagePath: string;
  attachmentPoints: AttachmentPoint[];
  variationId: number; // WooCommerce variation ID
  basePrice: number; // Base price in euros
  displayScale?: number; // Optional scale factor for necklace image display (default: 1.0)
  sizeDescription?: string; // Description of the necklace size/length
  /**
   * Optional per-hole-count mappings for bandanas.
   * If provided, these take precedence over the single woocommerceId/variationId when adding to cart.
   */
  woocommerceIdsByHoleCount?: Partial<Record<1 | 3 | 5 | 7, number>>;
  variationIdsByHoleCount?: Partial<Record<1 | 3 | 5 | 7, number>>;
}

// Placed charm type for a charm that has been positioned on the necklace
export interface PlacedCharm {
  id: string;
  charmId: string;
  attachmentPointId: string;
  position: Position;
}
