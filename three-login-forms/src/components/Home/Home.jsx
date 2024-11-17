import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the custom CSS

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box className="home-container">
      {/* Hero Section */}
      <Box className="hero-section">
        <Box>
          <Typography variant="h2" className="hero-title">
            Welcome to ManoShakti
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            Empowering student mental health with personalized assessments and support.
          </Typography>
          <Button
            variant="contained"
            className="hero-button"
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Explore Our Sections */}
      <Box className="explore-sections"> 
        <Typography variant="h5" className="section-title">
          Explore Our Sections
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            className="nav-button"
            onClick={() => navigate('/about')}
          >
            About Us
          </Button>
          <Button
            variant="outlined"
            className="nav-button"
            onClick={() => navigate('/services')}
          >
            Our Services
          </Button>
          <Button
            variant="outlined"
            className="nav-button"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>
        </Stack>
      </Box>

      {/* Key Features Section */}
      <Box className="key-features">
        <Typography variant="h5" className="section-title">
          Key Features
        </Typography>
        <Stack direction="row" spacing={6} justifyContent="center" sx={{ flexWrap: 'wrap' }}>
          <Box className="feature-box">
            <Typography variant="h6" className="feature-title">Data-Driven Insights</Typography>
            <Typography variant="body2" className="feature-description">
              Track student progress and get actionable reports.
            </Typography>
          </Box>
          <Box className="feature-box">
            <Typography variant="h6" className="feature-title">Confidentiality</Typography>
            <Typography variant="body2" className="feature-description">
              We ensure complete privacy and security for all assessments.
            </Typography>
          </Box>
          <Box className="feature-box">
            <Typography variant="h6" className="feature-title">Expert Guidance</Typography>
            <Typography variant="body2" className="feature-description">
              Receive personalized recommendations from our counselors.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Ready to Get Started Section */}
      <Box className="get-started">
        <Container className="get-started-container">
          <Typography variant="h4" className="get-started-title">
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" className="get-started-description">
            Join us today and take the first step toward better mental health.
          </Typography>
          <Button
            variant="contained"
            className="get-started-button"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Footer Section */}
      
    </Box>
  );
};

export default Home;
