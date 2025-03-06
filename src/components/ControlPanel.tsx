import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStore } from '../store/useStore';
import { Charm } from '../types';

const CharmItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    cursor: 'grab',
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
}));

const CharmImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxWidth: '80px',
});

export const ControlPanel = () => {
    const { 
        availableCharms, 
        setDragging, 
        setDraggedCharm,
        calculateTotalPrice 
    } = useStore();

    const handleDragStart = (charm: Charm) => {
        setDragging(true);
        setDraggedCharm(charm);
    };

    const handleDragEnd = () => {
        setDragging(false);
        setDraggedCharm(null);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                right: 20,
                top: 20,
                width: 300,
                bgcolor: 'background.paper',
                borderRadius: 1,
                p: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Available Charms
            </Typography>
            
            <Grid container spacing={2}>
                {availableCharms.map((charm) => (
                    <Grid item xs={4} key={charm.id}>
                        <CharmItem
                            draggable
                            onDragStart={() => handleDragStart(charm)}
                            onDragEnd={handleDragEnd}
                        >
                            <CharmImage
                                src={charm.imageUrl}
                                alt={charm.name}
                            />
                            <Typography variant="caption" display="block">
                                {charm.name}
                            </Typography>
                            <Typography variant="body2" color="primary">
                                ${charm.price}
                            </Typography>
                        </CharmItem>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6">
                    Total Price: ${calculateTotalPrice()}
                </Typography>
            </Box>
        </Box>
    );
}; 