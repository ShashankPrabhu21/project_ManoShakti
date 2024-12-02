import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Firebase config
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Snackbar, Alert, Typography } from '@mui/material';

function CounselorForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }

    try {
      // Send a password reset email
      await sendPasswordResetEmail(auth, email);
      setSnackbarMessage('Password reset email sent. Check your inbox.');
      
      // Redirect to Counselor Login page after email is sent
      setTimeout(() => {
        navigate('/login/counselor');
      }, 2000); // Wait 2 seconds before redirecting
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
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Reset Counselor Password
      </Typography>
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
        onClick={handlePasswordReset}
      >
        Reset Password
      </Button>

      {/* Display error or success messages using Snackbar */}
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

export default CounselorForgotPassword;
