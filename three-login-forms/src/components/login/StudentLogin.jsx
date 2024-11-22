import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; // Import your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication
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
  const navigate = useNavigate(); // Hook for navigation
  // Clear error message when closing the Snackbar
  const handleCloseSnackbar = () => {
    setError('');
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

        {/* Display error message using Snackbar */}
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust position
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
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
