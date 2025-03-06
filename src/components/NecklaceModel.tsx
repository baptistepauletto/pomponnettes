import React, { useRef } from 'react';
import { Vector3 } from 'three';
import { NecklaceTemplate } from '../types';

interface NecklaceModelProps {
    template: NecklaceTemplate;
}

export const NecklaceModel: React.FC<NecklaceModelProps> = ({ template }) => {
    const meshRef = useRef<THREE.Group>(null);

    // Simplified chain parameters
    const numLinks = 15;        // Number of links for half circle
    const linkWidth = 0.5;      // Width of oval link
    const linkHeight = 0.3;     // Height of oval link
    const linkThickness = 0.06; // Thickness of the link material
    const radius = 4;          // Overall necklace radius

    // Create simple array of link positions
    const links = Array.from({ length: numLinks }, (_, i) => {
        const angle = (Math.PI * i) / (numLinks - 1); // Distribute over half circle
        const isEven = i % 2 === 0;

        // Basic position on the curve
        const x = radius * Math.sin(angle);
        const y = radius * Math.cos(angle) - radius + 1;
        
        // Offset alternate links for interlocking
        const z = isEven ? 0.05 : -0.05;

        return {
            position: [x, y, z],
            rotation: [
                isEven ? Math.PI / 2 : 0,    // Alternate link orientation
                0,
                angle                        // Follow the curve
            ],
            key: `link-${i}`
        };
    });

    return (
        <group ref={meshRef}>
            {links.map((link) => (
                <group 
                    key={link.key}
                    position={link.position}
                    rotation={link.rotation}
                >
                    {/* Single oval link */}
                    <mesh castShadow receiveShadow>
                        <torusGeometry 
                            args={[
                                linkHeight,        // Radius
                                linkThickness,     // Tube thickness
                                16,               // Radial segments
                                32,               // Tubular segments
                                Math.PI * 2       // Full circle
                            ]}
                            scale={[1.8, 1, 1]}   // Stretch to oval shape
                        />
                        <meshStandardMaterial
                            color="#FFD700"
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}; 