import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function WelcomeSection() {
  return (
    <main>
      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
        <Box 
          className="welcome-section" 
          sx={{ 
            backgroundColor: '#f0f4f8', // Light background color
            borderRadius: '8px', // Rounded corners
            boxShadow: 2, // Subtle shadow
            p: 4, // Padding
            mb: 4,
          }}
        >
          
        </Box>
      </Container>
    </main>
  );
}

export default WelcomeSection;