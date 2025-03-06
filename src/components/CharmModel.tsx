import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useStore } from '../store/useStore';
import { PlacedCharm } from '../types';

interface CharmModelProps {
    charm: PlacedCharm;
}

export const CharmModel: React.FC<CharmModelProps> = ({ charm }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { availableCharms } = useStore();

    // Find the charm data from available charms
    const charmData = availableCharms.find(c => c.id === charm.charmId);

    // Load the charm texture
    const texture = useLoader(TextureLoader, charmData?.imageUrl || '');

    useEffect(() => {
        if (meshRef.current) {
            // Update position
            meshRef.current.position.set(
                charm.position.x,
                charm.position.y,
                charm.position.z
            );

            // Update rotation
            meshRef.current.rotation.z = charm.rotation;

            // Update scale
            meshRef.current.scale.setScalar(charm.scale);
        }
    }, [charm]);

    if (!charmData) return null;

    return (
        <mesh
            ref={meshRef}
            castShadow
            receiveShadow
        >
            <planeGeometry 
                args={[charmData.dimensions.width, charmData.dimensions.height]} 
            />
            <meshStandardMaterial
                map={texture}
                transparent={true}
                metalness={0.2}
                roughness={0.8}
            />
        </mesh>
    );
}; 