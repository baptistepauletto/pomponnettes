import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { useStore } from '../store/useStore';
import { NecklaceModel } from './NecklaceModel';
import { CharmModel } from './CharmModel';

export const NecklaceScene: React.FC = () => {
    const { selectedTemplate, placedCharms } = useStore();

    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ background: '#f5f5f5' }}
        >
            <Suspense fallback={null}>
                {/* Camera Setup */}
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={15}
                />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />

                {/* Environment */}
                <Environment preset="studio" />

                {/* Necklace Template */}
                {selectedTemplate && (
                    <NecklaceModel template={selectedTemplate} />
                )}

                {/* Placed Charms */}
                {placedCharms.map((charm) => (
                    <CharmModel
                        key={charm.charmId}
                        charm={charm}
                    />
                ))}
            </Suspense>
        </Canvas>
    );
}; 