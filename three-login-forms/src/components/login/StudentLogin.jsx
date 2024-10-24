import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Import your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user data exists in Firestore 'students' collection
      const studentRef = doc(db, 'students', user.uid);
      const studentSnapshot = await getDoc(studentRef);

      if (studentSnapshot.exists()) {
        // If user exists, trigger authentication and navigate to student dashboard
        handleAuthentication(true, 'student');
        navigate('/student-dashboard'); // Navigate to the dashboard
      } else {
        // If user data doesn't exist, show error
        setError('No data found for this user. Please contact support.');
      }
    } catch (error) {
      // Display any login error
      setError(error.message);
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

        {/* Display error message */}
        <Snackbar 
          open={Boolean(error)} 
          autoHideDuration={6000} 
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust position
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
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
