import React from 'react';
import { Container, Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material';

const AboutManoShakti = () => {
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
          Welcome to <span style={{ color: '#333', fontWeight: 'bold' }}>ManoShakti</span>
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#555', textAlign: 'justify' }}>
          Your trusted partner in promoting student mental wellness. <span style={{ color: '#333', fontWeight: 'bold' }}>ManoShakti</span> is a comprehensive, 
          integrated platform specifically designed to evaluate and monitor the mental health of students, using well-established 
          and scientifically validated scales: DASS (Depression, Anxiety, Stress Scale), FoMO (Fear of Missing Out), and ADHD 
          (Attention Deficit Hyperactivity Disorder).
        </Typography>

        {/* Mission Section */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#555', textAlign: 'justify' }}>
          To provide an accessible, scalable, and supportive tool for preliminary mental wellness diagnostics, empowering educational 
          institutions, school counselors, and psychologists to identify and address potential mental health issues early. By streamlining 
          the assessment process, <span style={{ color: '#333', fontWeight: 'bold' }}>ManoShakti</span> enables quick, efficient, and accurate evaluations, helping to 
          ensure that no student’s mental health needs go unnoticed.
        </Typography>

        {/* Key Features Section */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Key Features
        </Typography>
        <List sx={{ textAlign: 'left' }}>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>DASS Scale Assessment</Typography>}
              secondary={
                <Typography variant="body2" sx={{ textAlign: 'justify', color: '#555' }}>
                  Measures levels of depression, anxiety, and stress, providing an early indication of students who may need additional support.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>FoMO Scale Evaluation</Typography>}
              secondary={
                <Typography variant="body2" sx={{ textAlign: 'justify', color: '#555' }}>
                  Identifies signs of fear of missing out, a growing concern in our digital age that can affect students' self-esteem and well-being.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>ADHD Scale Analysis</Typography>}
              secondary={
                <Typography variant="body2" sx={{ textAlign: 'justify', color: '#555' }}>
                  Screens for attention deficit hyperactivity disorder, aiding in the early detection of students who may benefit from additional resources and interventions.
                </Typography>
              }
            />
          </ListItem>
        </List>

        {/* Vision Section */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#555', textAlign: 'justify' }}>
          We believe that every student deserves the opportunity to thrive in a supportive environment that values mental health. Through 
          <span style={{ color: '#333', fontWeight: 'bold' }}> ManoShakti</span>, we aim to foster awareness, reduce stigma, and contribute to a future where students feel 
          empowered, understood, and ready to succeed.
        </Typography>

        {/* Join Us Section */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Join Us in Our Mission
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#555', textAlign: 'justify' }}>
          At <span style={{ color: '#333', fontWeight: 'bold' }}>ManoShakti</span>, we are committed to creating a brighter, healthier future for students. Join us in promoting 
          mental wellness, early intervention, and lasting support. Together, let’s nurture a generation that feels empowered to take charge 
          of their mental health and well-being.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutManoShakti;
