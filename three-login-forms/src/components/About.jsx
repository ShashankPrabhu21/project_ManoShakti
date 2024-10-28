import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Box
        sx={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 3, // Add a shadow for the boxy look
          textAlign: 'center', // Center text within the box
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          We are dedicated to providing comprehensive support and resources to students, parents, and counselors. Our goal is to foster a supportive community that addresses the educational, mental health, and career guidance needs of our members.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Our Projects
        </Typography>
        <Typography variant="body2" paragraph>
          Our platform includes projects like the Adult ADHD Self-Report Scale (ASRS v1.1) questionnaire, a Fear of Missing Out (FOMO) questionnaire, and the Depression Anxiety Stress Scales (DASS) questionnaire. These projects aim to help students understand and manage their mental well-being.
        </Typography>
        <Typography variant="body2" paragraph>
          By working alongside parents and counselors, we aim to create a well-rounded support system for students facing academic and emotional challenges.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
