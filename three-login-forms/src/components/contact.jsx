import React from 'react';
import { Container, Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material';

const Contact = () => {
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
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We are here to support you. Reach out to us through any of the following means, and we'll be happy to assist you.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <List sx={{ textAlign: 'left' }}>
          <ListItem>
            <ListItemText primary="Email" secondary="support@example.com" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone" secondary="(123) 456-7890" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Address" secondary="1234 Education Way, Knowledge City" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Contact;
