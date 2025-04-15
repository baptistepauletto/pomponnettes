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
  // Optional offset for attachment point (in percentage from center)
  // Default is {x: 0, y: 0} which means the attachment is at center top
  attachmentOffset?: Position;
}

// Necklace type
export interface Necklace {
  id: string;
  name: string;
  imagePath: string;
  attachmentPoints: AttachmentPoint[];
}

// Placed charm type for a charm that has been positioned on the necklace
export interface PlacedCharm {
  id: string;
  charmId: string;
  attachmentPointId: string;
  position: Position;
} 