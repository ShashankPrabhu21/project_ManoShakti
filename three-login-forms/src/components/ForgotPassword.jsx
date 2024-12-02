import React, { useState } from 'react';
// Correct import path for firebaseConfig.js
import { auth } from "../firebaseConfig";  // Adjusted import
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleSendPasswordReset = async () => {
    setError(''); // Reset error message
    try {
      await sendPasswordResetEmail(auth, email);
      setSnackbarMessage('Password reset email sent. Redirecting to login page...');
      
      // Redirect to the login page after 3 seconds
      setTimeout(() => navigate('/login/student'), 3000); // Redirect after 3 seconds
    } catch (error) {
      // Handle different error cases
      if (error.code === 'auth/user-not-found') {
        setError('No user is registered with this email. Please check and try again.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format. Please enter a valid email.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else {
        console.error('Unexpected error during password reset:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center">
          Forgot Password
        </Typography>
      </Box>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSendPasswordReset}
      >
        Reset Password
      </Button>

      {/* Snackbar to display success or error message */}
      <Snackbar
        open={Boolean(error || snackbarMessage)}
        autoHideDuration={6000}
        onClose={() => {
          setError('');
          setSnackbarMessage('');
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setError('');
            setSnackbarMessage('');
          }}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error || snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ForgotPassword;
