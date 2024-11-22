import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';
import {useDispatch} from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
function StudentRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
const dispatch=useDispatch();
  const auth = getAuth();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !usn || !branch || !section || !age || !weight || !contact || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Reference to the student document
      const studentRef = doc(db, 'students', usn); // Using USN as the student ID

      // Add registration details to 'details' subcollection
     dispatch(loginSuccess(usn));
      // Add registration details directly to 'details' subcollection
      const detailsRef = collection(studentRef, 'details');
      await setDoc(doc(detailsRef, usn), {  // Using USN as document ID in the subcollection
        name,
        branch,
        section,
        age,
        weight,
        contact,
        email,
      });
      alert('Registration successful');
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered.');
      } else {
        alert('An error occurred during registration. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        paddingBottom: '60px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Student Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
        }}
      >
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="USN"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Age"
          value={age}
          type="number"
          onChange={(e) => setAge(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Weight"
          value={weight}
          type="number"
          onChange={(e) => setWeight(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </Box>
    </Box>
  );
}

export default StudentRegister;
