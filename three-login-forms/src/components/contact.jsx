import React from 'react';
import { Container, Typography, Box, Divider, List, ListItem, ListItemText, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
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
          Contact Us
        </Typography>
        
        {/* Introduction Paragraph */}
        <Typography variant="body1" paragraph sx={{ color: '#555', textAlign: 'justify', mb: 3 }}>
          We are here to support you. Please feel free to reach out to us through any of the following means, 
          and we'll be happy to assist you with your needs. Our dedicated team is committed to providing timely 
          and effective support.
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Contact Information List */}
        <List sx={{ textAlign: 'left' }}>
          {/* Email */}
          <ListItem>
            <EmailIcon color="primary" sx={{ mr: 2 }} />
            <ListItemText
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Email</Typography>}
              secondary={
                <Typography variant="body2" sx={{ textAlign: 'justify', color: '#555' }}>
                  <Link href="mailto:support@example.com" color="inherit" underline="hover">
                    support@example.com
                  </Link>
                </Typography>
              }
            />
          </ListItem>

          {/* Phone */}
          <ListItem>
            <PhoneIcon color="primary" sx={{ mr: 2 }} />
            <ListItemText
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Phone</Typography>}
              secondary={
                <Typography variant="body2" sx={{ textAlign: 'justify', color: '#555' }}>
                  (123) 456-7890
                </Typography>
              }
            />
          </ListItem>

          {/* Address */}
          <ListItem>
            <LocationOnIcon color="primary" sx={{ mr: 2 }} />
            <ListItemText
              primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Address</Typography>}
              secondary={
                <Typography variant="body2" sx={{ textAlign: 'justify', color: '#555' }}>
                  1234 Education Way, Knowledge City
                </Typography>
              }
            />
          </ListItem>
        </List>

        {/* Closing Divider */}
        <Divider sx={{ my: 3 }} />
        
        {/* Final Message */}
        <Typography variant="body2" sx={{ color: '#777', textAlign: 'justify', mt: 3 }}>
          Our team is here to help you every step of the way. Whether you have questions, need assistance, 
          or just want to learn more about our services, feel free to contact us. We look forward to hearing 
          from you!
        </Typography>
      </Box>
    </Container>
  );
};

export default Contact;
