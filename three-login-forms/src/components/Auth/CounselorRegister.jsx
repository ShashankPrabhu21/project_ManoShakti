import React, { useState } from 'react'; 
import { Box, Button, TextField, Typography } from '@mui/material';
import { auth, db } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CounselorRegister() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'counselors', user.uid), {
        name,
        contact,
        email,
      });

      alert('Counselor registration successful');
      navigate('/counselor-dashboard');
    } catch (error) {
      alert(error.message);
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
      <Typography variant="h4" gutterBottom>Counselor Register</Typography>
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
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} margin="normal" />
        <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" />
        <Button fullWidth variant="contained" color="primary" type="submit">Register</Button>
      </Box>
    </Box>
  );
}

export default CounselorRegister;
