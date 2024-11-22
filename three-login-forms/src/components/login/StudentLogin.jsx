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

  // Clear error and snackbar messages when closing the Snackbar
  const handleCloseSnackbar = () => {
    setError('');
    setSnackbarMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any existing error message

    try {
      // Sign in with email and password using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Trigger authentication and navigate to student dashboard
      handleAuthentication(true, 'student');
      navigate('/student-dashboard'); // Navigate to the student dashboard
    } catch (error) {
      // Firebase-specific error handling
      if (error.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format. Please check and try again.');
      } else {
        setError('An error occurred during login. Please try again later.');
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
      setSnackbarMessage('Password reset email sent. Check your inbox.');
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
    <>
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
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </Button>

        {/* Display error or success messages using Snackbar */}
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
    </>
  );
}

export default StudentLogin;
