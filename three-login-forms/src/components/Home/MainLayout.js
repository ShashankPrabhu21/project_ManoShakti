// src/components/MainLayout.js

import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar'; // Adjust this import according to your folder structure
import Footer from './Footer'; // Adjust this import according to your folder structure

const MainLayout = ({ children, authenticated, onLogout }) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Make the layout at least the full height of the viewport
            }}
        >
            <Navbar authenticated={authenticated} onLogout={onLogout} /> {/* Pass props to Navbar */}
            <Box 
                component="main" 
                sx={{ flex: 1 }} // This allows the main content to grow and push the footer down
            >
                {children} {/* This will render your main content */}
            </Box>
            <Footer /> {/* Footer component */}
        </Box>
    );
}

export default MainLayout;
