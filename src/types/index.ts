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
  sizeMark?: 'S' | 'M' | 'L' | 'XL'; // Size category based on charm size
  // Optional offset for attachment point (in percentage from center)
  // Default is {x: 0, y: 0} which means the attachment is at center top
  attachmentOffset?: Position;
}

// Necklace type
export interface Necklace {
  id: number;
  name: string;
  imagePath: string;
  attachmentPoints: AttachmentPoint[];
  variationId: number; // WooCommerce variation ID
  basePrice: number; // Base price in euros
}

// Placed charm type for a charm that has been positioned on the necklace
export interface PlacedCharm {
  id: string;
  charmId: string;
  attachmentPointId: string;
  position: Position;
}

// Preset charm configuration type
export interface PresetCharmPlacement {
  attachmentPointIndex: number;
  charmId: string;
}

// Preset configuration for predefined charm arrangements
export interface PresetConfiguration {
  id: string;
  name: string;
  description: string;
  configuration: PresetCharmPlacement[];
}