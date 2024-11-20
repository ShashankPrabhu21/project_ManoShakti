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
      <Typography variant="h1" className="hero-title">
      <span className="highlight">ManoShakti</span>
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 3 }}
          justifyContent="center"
          sx={{ flexWrap: 'wrap' }}
        >
          <Button
            variant="outlined"
            className="nav-button"
            onClick={() => navigate('/about')}
            sx={{
              width: { xs: '100%', md: 'auto' },
            }}
          >
            About Us
          </Button>
          <Button
            variant="outlined"
            className="nav-button"
            onClick={() => navigate('/services')}
            sx={{
              width: { xs: '100%', md: 'auto' },
            }}
          >
            Our Services
          </Button>
          <Button
            variant="outlined"
            className="nav-button"
            onClick={() => navigate('/contact')}
            sx={{
              width: { xs: '100%', md: 'auto' },
            }}
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 2 }}
          justifyContent="center"
          alignItems={{ xs: 'center', md: 'stretch' }}
          sx={{
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {[
            {
              title: 'Data-Driven Insights',
              description: 'Track student progress and get actionable reports.',
            },
            {
              title: 'Confidentiality',
              description: 'We ensure complete privacy and security for all assessments.',
            },
            {
              title: 'Expert Guidance',
              description: 'Receive personalized recommendations from our counselors.',
            },
          ].map((feature, index) => (
            <Box
              key={index}
              className="feature-box"
              sx={{
                flexGrow: 1,
                flexBasis: '0',
                maxWidth: { md: '33%' },
                width: { xs: '100%', md: 'auto' },
                textAlign: 'center',
                padding: '16px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
              }}
            >
              <Typography variant="h6" className="feature-title">
                {feature.title}
              </Typography>
              <Typography variant="body2" className="feature-description">
                {feature.description}
              </Typography>
            </Box>
          ))}
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
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      
    </Box>
  );
};

export default Home;
