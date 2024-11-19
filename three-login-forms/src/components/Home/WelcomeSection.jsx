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
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ color: '#3f51b5' }} // Primary color for the heading
          >
            Welcome to ManoShakti
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ color: '#555' }} // Darker color for the paragraph
          >
            Your one-stop solution for student psychological health assessments.
          </Typography>
        </Box>
      </Container>
    </main>
  );
}

export default WelcomeSection;