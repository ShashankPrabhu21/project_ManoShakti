import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; // Import your Firebase config
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Firebase Authentication
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

function StudentLogin({ handleAuthentication }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleCloseSnackbar = () => {
    setError('');
    setSnackbarMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any existing error message

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      handleAuthentication(true, 'student');
      navigate('/student-dashboard');
    } catch (error) {


      if (error.code === 'auth/invalid-credential') {
        setError('Please check the email or password.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many login attempts. Please wait a moment before trying again.');
      } else {
        console.error('Unexpected error during login:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };


  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSnackbarMessage('Password reset email sent successfully. Please check your inbox and spam folder.');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No user is registered with this email. Please check your email address or register first.');
          break;
        case 'auth/invalid-email':
          setError('The email address you entered is invalid. Please enter a valid email.');
          break;
        case 'auth/network-request-failed':
          setError('Network error occurred. Please check your internet connection and try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many requests. Please wait a moment before trying again.');
          break;
        default:
          console.error('Unexpected error during password reset:', error);
          setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center">
          Student Login
        </Typography>
      </Box>
      <form onSubmit={handleLogin}>
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
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      
      <Button
  variant="text"
  color="secondary"
  fullWidth
  sx={{ mt: 1 }}
  onClick={() => navigate('/forgot-password')} // Navigate to the forgot password page
>
  Forgot Password?
</Button>

      <Snackbar
        open={Boolean(error || snackbarMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error || snackbarMessage}
        </Alert>
      </Snackbar>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        New here? <Link to="/register/student">Register as a Student</Link>
      </Typography>
    </Container>
  );
}

export default StudentLogin;
