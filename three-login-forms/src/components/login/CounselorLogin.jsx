import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig'; // Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';

function CounselorLogin({ handleAuthentication }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user data exists in Firestore 'counselors' collection
      const counselorRef = doc(db, 'counselors', user.uid);
      const counselorSnapshot = await getDoc(counselorRef);

      if (counselorSnapshot.exists()) {
        // If user exists, trigger authentication and navigate to counselor dashboard
        handleAuthentication(true, 'counselor');
        navigate('/counselor-dashboard'); // Navigate to counselor dashboard
      } else {
        setError('No data found for this user.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center">
          Counselor Login
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
        onClick={() => navigate('/forgot-password/counselor')}
      >
        Forgot Password?
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

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        New here? <Link to="/register/counselor">Register as a Counselor</Link>
      </Typography>
    </Container>
  );
}

export default CounselorLogin;
