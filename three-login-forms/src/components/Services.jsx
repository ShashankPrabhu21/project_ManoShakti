import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const Services = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Box
        sx={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Our Services
        </Typography>
        <Typography variant="body1" paragraph>
          We offer a variety of services tailored to meet the needs of students, parents, and counselors, including:
        </Typography>
        <List sx={{ textAlign: 'left' }}>
          <ListItem>
            <ListItemText primary="Academic Counseling" secondary="Guidance on course selection, study strategies, and academic performance." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mental Health Support" secondary="Access to resources for managing stress, anxiety, and other mental health concerns." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Career Guidance" secondary="Advice on career planning, resume building, and job interview preparation." />
          </ListItem>
        </List>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Specialized Programs
        </Typography>
        <Typography variant="body2" paragraph>
          We also offer specialized programs, such as our ASRS, FOMO, and DASS assessments, which are designed to help students manage their mental health effectively. Through these services, we empower students to reach their full potential.
        </Typography>
      </Box>
    </Container>
  );
};

export default Services;
