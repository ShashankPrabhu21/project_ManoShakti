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
                minHeight: '100vh', // Ensure the layout takes full viewport height
                bgcolor: 'background.default', // Set background to match the theme
                color: 'text.primary', // Ensure text color matches the theme
            }}
        >
            {/* Navbar Component */}
            <Navbar authenticated={authenticated} onLogout={onLogout} />
            
            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flex: 1, // This makes the content area flexible and pushes the footer down
                    width: '100%',
                    p: 3, // Padding for spacing
                    display: 'flex',
                    justifyContent: 'center', // Center the children content
                    alignItems: 'center',
                }}
            >
                {children} {/* Render main content here */}
            </Box>

            {/* Footer Component */}
            <Footer 
                sx={{
                    mt: 'auto', // Push footer to the bottom if content is short
                    py: 2, // Padding for vertical spacing
                    textAlign: 'center',
                }}
            />
        </Box>
    );
}

export default MainLayout;
