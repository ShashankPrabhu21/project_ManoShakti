import React from 'react';
import WelcomeSection from './WelcomeSection';
import About from '../About';
import Services from '../Services';
import Contact from '../contact'; // Ensure this import is correct
import { Container, Typography, Box, Button, Collapse, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Home = ({ activeSection, setActiveSection }) => {
  return (
    <Container className="home-container" maxWidth="lg">
      <section id="home">
        <WelcomeSection />
      </section>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Explore Our Sections
        </Typography>

        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveSection('about')}
              endIcon={<ExpandMoreIcon />}
              sx={{
                transition: '0.3s',
                ...(activeSection === 'about' ? { bgcolor: 'primary.dark' } : {}),
              }}
            >
              About Us
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setActiveSection('services')}
              endIcon={<ExpandMoreIcon />}
              sx={{
                transition: '0.3s',
                ...(activeSection === 'services' ? { bgcolor: 'secondary.dark' } : {}),
              }}
            >
              Our Services
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => setActiveSection('contact')}
              endIcon={<ExpandMoreIcon />}
              sx={{
                transition: '0.3s',
                ...(activeSection === 'contact' ? { bgcolor: 'info.dark' } : {}),
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Box>

        {/* Collapsible Sections */}
        <Collapse in={activeSection === 'about'} unmountOnExit>
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'white', // Ensures a clean background
            }}
          >
            <About />
          </Box>
        </Collapse>

        <Collapse in={activeSection === 'services'} unmountOnExit>
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'white',
            }}
          >
            <Services />
          </Box>
        </Collapse>

        <Collapse in={activeSection === 'contact'} unmountOnExit>
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'white',
            }}
          >
            <Contact />
          </Box>
        </Collapse>
      </Box>
    </Container>
  );
};

export default Home;
