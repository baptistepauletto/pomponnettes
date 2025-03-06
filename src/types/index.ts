export interface Point {
    x: number;
    y: number;
    z: number;
}

export interface Charm {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    dimensions: {
        width: number;
        height: number;
    };
    defaultRotation: number;
    allowedPositions?: Point[];
}

export interface NecklaceTemplate {
    id: string;
    name: string;
    imageUrl: string;
    length: number;
    validAttachmentPoints: Point[];
    price: number;
    chainType: string;
    material: string;
}

export interface PlacedCharm {
    charmId: string;
    position: Point;
    rotation: number;
    scale: number;
}

export interface CustomizedNecklace {
    templateId: string;
    charms: PlacedCharm[];
    totalPrice: number;
}

export interface LightingSetup {
    intensity: number;
    position: Point;
    color: string;
}

export interface MaterialProperties {
    metalness: number;
    roughness: number;
    envMapIntensity: number;
}

export interface SceneSettings {
    lighting: LightingSetup[];
    camera: {
        position: Point;
        fov: number;
        near: number;
        far: number;
    };
    shadows: boolean;
    background: string;
} 