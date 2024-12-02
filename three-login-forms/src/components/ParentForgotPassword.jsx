import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
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

function ParentForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleSendPasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setSnackbarMessage('Password reset email sent. Redirecting to login page...');
      
      // Redirect to Parent Login page after 3 seconds
      setTimeout(() => navigate('/login/parent'), 3000);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format. Please check and try again.');
      } else {
        setError('An error occurred while sending the reset email. Please try again later.');
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
      <form onSubmit={handleSendPasswordReset}>
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
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>
      </form>

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

export default ParentForgotPassword;
