// src/components/Footer.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            component="footer"
            sx={{
                backgroundColor: '#333',
                color: 'white',
                textAlign: 'center',
                padding: '1rem 0',
                width: '100%',
                zIndex: 1000,
                position: 'relative',
                bottom: 0,
                left: 0,
            }}
        >
            <Typography variant="body2">
                &copy; 2024 ManoShakthi. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;