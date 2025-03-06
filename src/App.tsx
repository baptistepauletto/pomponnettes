import React, { useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { NecklaceScene } from './components/NecklaceScene';
import { ControlPanel } from './components/ControlPanel';
import { useStore } from './store/useStore';

// Create a theme instance
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

// Sample data - in a real app, this would come from your backend
const sampleTemplate = {
    id: 'default-necklace',
    name: 'Classic Chain',
    imageUrl: '/images/background-empty.png',
    length: 10,
    validAttachmentPoints: [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: -2, y: 0, z: 0 },
    ],
    price: 99.99,
    chainType: 'rope',
    material: 'gold',
};

const sampleCharms = [
    {
        id: 'main-signe-des-cornes',
        name: 'Main Signe des Cornes',
        imageUrl: '/images/charms/main-signe-des-cornes.png',
        price: 29.99,
        dimensions: { width: 1, height: 1 },
        defaultRotation: 0,
    },
    {
        id: 'tour-eiffel',
        name: 'Tour Eiffel',
        imageUrl: '/images/charms/tour-eiffel.png',
        price: 34.99,
        dimensions: { width: 1, height: 1.5 },
        defaultRotation: 0,
    },
    {
        id: 'croix',
        name: 'Croix',
        imageUrl: '/images/charms/croix.png',
        price: 24.99,
        dimensions: { width: 1, height: 1 },
        defaultRotation: 0,
    },
    {
        id: 'corse',
        name: 'Corse',
        imageUrl: '/images/charms/corse.png',
        price: 27.99,
        dimensions: { width: 0.8, height: 1.2 },
        defaultRotation: 0,
    },
    {
        id: 'aigle',
        name: 'Aigle',
        imageUrl: '/images/charms/aigle.png',
        price: 32.99,
        dimensions: { width: 1.5, height: 0.8 },
        defaultRotation: 0,
    },
    {
        id: 'abeille',
        name: 'Abeille',
        imageUrl: '/images/charms/abeille.png',
        price: 26.99,
        dimensions: { width: 1, height: 1 },
        defaultRotation: 0,
    },
    {
        id: 'escargot',
        name: 'Escargot',
        imageUrl: '/images/charms/escargot.png',
        price: 25.99,
        dimensions: { width: 1, height: 0.8 },
        defaultRotation: 0,
    },
    {
        id: 'coeur-diable',
        name: 'Coeur Diable',
        imageUrl: '/images/charms/coeur-diable.png',
        price: 28.99,
        dimensions: { width: 1, height: 1 },
        defaultRotation: 0,
    },
    {
        id: 'cactus',
        name: 'Cactus',
        imageUrl: '/images/charms/cactus.png',
        price: 23.99,
        dimensions: { width: 0.8, height: 1.2 },
        defaultRotation: 0,
    },
    {
        id: 'meduse',
        name: 'Méduse',
        imageUrl: '/images/charms/meduse.png',
        price: 31.99,
        dimensions: { width: 1, height: 1.3 },
        defaultRotation: 0,
    },
    {
        id: 'etoile-spirale',
        name: 'Étoile Spirale',
        imageUrl: '/images/charms/etoile-spirale.png',
        price: 27.99,
        dimensions: { width: 1, height: 1 },
        defaultRotation: 0,
    },
    {
        id: 'nounours',
        name: 'Nounours',
        imageUrl: '/images/charms/nounours.png',
        price: 29.99,
        dimensions: { width: 1, height: 1 },
        defaultRotation: 0,
    }
];

function App() {
    const { setSelectedTemplate, setAvailableCharms } = useStore();

    useEffect(() => {
        // Initialize the store with sample data
        setSelectedTemplate(sampleTemplate);
        setAvailableCharms(sampleCharms);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: '#f5f5f5',
                }}
            >
                {/* 3D Scene */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <NecklaceScene />
                </Box>

                {/* Control Panel */}
                <ControlPanel />
            </Box>
        </ThemeProvider>
    );
}

export default App; 