
import React, { useState } from 'react'; 
import { Box, Button, TextField, Typography } from '@mui/material';
import { auth, db } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function ParentRegister() {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentUsn, setStudentUsn] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Check if all fields are filled
    if (!parentName || !studentName || !studentUsn || !contact || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }
  
    // Password validation
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert('Password must contain at least one special character.');
      return;
    }
  
    if (/^[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert('Password must not start with a digit or special character.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'parents', user.uid), {
        parentName,
        studentName,
        studentUsn,
        contact,
        email,
      });
  
      alert('Parent registration successful');
  
      // Clear form fields
      setParentName('');
      setStudentName('');
      setStudentUsn('');
      setContact('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
  
      // Redirect to Parent Login page
      navigate('/login/parent');
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
      <Typography variant="h4" gutterBottom>Parent Register</Typography>
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
        <TextField fullWidth label="Parent Name" value={parentName} onChange={(e) => setParentName(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Student USN" value={studentUsn} onChange={(e) => setStudentUsn(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" required />
        <Button fullWidth variant="contained" color="primary" type="submit">Register</Button>
      </Box>
    </Box>
  );
}

export default ParentRegister;
