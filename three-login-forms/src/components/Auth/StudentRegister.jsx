import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

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

  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'students', user.uid), {
        name,
        usn,
        branch,
        section,
        age,
        weight,
        contact,
        email,
      });

      alert('Registration successful');
    } catch (error) {
      console.error("Error registering user:", error);
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
      <Typography variant="h4" gutterBottom>Student Register</Typography>
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
        <TextField fullWidth label="USN" value={usn} onChange={(e) => setUsn(e.target.value)} margin="normal" />
        <TextField fullWidth label="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} margin="normal" />
        <TextField fullWidth label="Section" value={section} onChange={(e) => setSection(e.target.value)} margin="normal" />
        <TextField fullWidth label="Age" value={age} type="number" onChange={(e) => setAge(e.target.value)} margin="normal" />
        <TextField fullWidth label="Weight" value={weight} type="number" onChange={(e) => setWeight(e.target.value)} margin="normal" />
        <TextField fullWidth label="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} margin="normal" />
        <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" />
        <Button fullWidth variant="contained" color="primary" type="submit">Register</Button>
      </Box>
    </Box>
  );
}

export default StudentRegister;
