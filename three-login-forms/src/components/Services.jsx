import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const Services = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Box
        sx={{
          padding: '30px',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          boxShadow: 4,
          textAlign: 'center',
        }}
      >
        {/* Title Section */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Our Services
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#666', mb: 3, textAlign: 'justify' }}>
          We provide a range of services aimed at supporting students' academic, emotional, and career growth. Our holistic approach is tailored to the needs of students, parents, and counselors, ensuring that each individual receives the guidance they need.
        </Typography>

        {/* Services List */}
        <List sx={{ textAlign: 'left', mx: 'auto', maxWidth: '600px' }}>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'left' }}>Academic Counseling</Typography>} 
              secondary={<Typography sx={{ textAlign: 'justify', color: '#666' }}>Personalized guidance on course selection, study techniques, and improving academic performance, designed to help students succeed in their educational journey.</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'left' }}>Mental Health Support</Typography>} 
              secondary={<Typography sx={{ textAlign: 'justify', color: '#666' }}>Resources and support for managing stress, anxiety, and other mental health challenges. Our goal is to foster resilience and emotional well-being.</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'left' }}>Career Guidance</Typography>} 
              secondary={<Typography sx={{ textAlign: 'justify', color: '#666' }}>Career planning support, including resume building, interview preparation, and insights into potential career paths to align with students’ skills and aspirations.</Typography>}
            />
          </ListItem>
        </List>

        {/* Divider */}
        <Divider sx={{ my: 4 }} />

        {/* Specialized Programs Section */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Specialized Programs
        </Typography>
        <Typography variant="body2" paragraph sx={{ color: '#666', mx: 'auto', maxWidth: '600px', textAlign: 'justify' }}>
          Our specialized programs include evidence-based assessments like the ASRS (Adult ADHD Self-Report Scale), FOMO (Fear of Missing Out) questionnaire, and DASS (Depression Anxiety Stress Scales). These tools are crafted to support students in identifying and managing their mental health needs. Through these services, we aim to empower students to achieve personal and academic well-being.
        </Typography>
      </Box>
    </Container>
  );
};

export default Services;
