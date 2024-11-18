import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ADHDForm from '../adhdform';
import DASSForm from '../dassform';
import FOMOForm from '../fomoform';
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  useMediaQuery,
  Grid,
} from '@mui/material';

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [adhdSubmitted, setAdhdSubmitted] = useState(false);
  const [dassSubmitted, setDassSubmitted] = useState(false);
  const [fomoSubmitted, setFomoSubmitted] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentId = auth.currentUser.uid;
      const studentRef = doc(db, 'students', studentId);
      const studentSnapshot = await getDoc(studentRef);
      if (studentSnapshot.exists()) {
        setStudentData(studentSnapshot.data());
      } else {
        console.log('No such student document!');
      }
    };
    fetchStudentData();
  }, []);

  const handleFormSubmit = async (formType) => {
    const studentId = auth.currentUser.uid;

    try {
      const studentRef = doc(db, 'students', studentId);

      if (formType === 'adhd') setAdhdSubmitted(true);
      if (formType === 'dass') setDassSubmitted(true);
      if (formType === 'fomo') setFomoSubmitted(true);

      await updateDoc(studentRef, {
        [`forms.${formType}`]: true,
      });

      alert(`${formType.toUpperCase()} Form submitted successfully!`);
      setActiveForm(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleButtonClick = (formType) => {
    setActiveForm(activeForm === formType ? null : formType);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ boxShadow: 3, p: 3, mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1565c0' }}
        >
          Student Dashboard
        </Typography>

        {studentData && (
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography variant="h6">Welcome, {studentData.name}</Typography>
          </Box>
        )}
      </Card>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Fill Your Questionnaires
        </Typography>

        {/* Buttons */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm="auto">
            <Button
              variant="outlined"
              onClick={() => handleButtonClick('adhd')}
              sx={{
                width: isSmallScreen ? '100%' : 'auto',
                paddingX: 4,
                paddingY: 1.5,
                fontSize: '1rem',
                borderWidth: adhdSubmitted ? 3 : 1,
                borderColor: adhdSubmitted ? '#43a047' : '#1976d2',
                color: adhdSubmitted ? '#43a047' : '#1976d2',
                borderRadius: 8,
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: adhdSubmitted ? '#dcedc8' : '#e3f2fd',
                },
              }}
            >
              ADHD Form
            </Button>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              variant="outlined"
              onClick={() => handleButtonClick('dass')}
              sx={{
                width: isSmallScreen ? '100%' : 'auto',
                paddingX: 4,
                paddingY: 1.5,
                fontSize: '1rem',
                borderWidth: dassSubmitted ? 3 : 1,
                borderColor: dassSubmitted ? '#43a047' : '#1976d2',
                color: dassSubmitted ? '#43a047' : '#1976d2',
                borderRadius: 8,
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: dassSubmitted ? '#dcedc8' : '#e3f2fd',
                },
              }}
            >
              DASS Form
            </Button>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              variant="outlined"
              onClick={() => handleButtonClick('fomo')}
              sx={{
                width: isSmallScreen ? '100%' : 'auto',
                paddingX: 4,
                paddingY: 1.5,
                fontSize: '1rem',
                borderWidth: fomoSubmitted ? 3 : 1,
                borderColor: fomoSubmitted ? '#43a047' : '#1976d2',
                color: fomoSubmitted ? '#43a047' : '#1976d2',
                borderRadius: 8,
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: fomoSubmitted ? '#dcedc8' : '#e3f2fd',
                },
              }}
            >
              FOMO Form
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Form Display */}
      <Box sx={{ mt: 4 }}>
        {activeForm === 'adhd' && (
          <Card sx={{ p: 3, mb: 3 }}>
            <ADHDForm onSubmit={() => handleFormSubmit('adhd')} />
          </Card>
        )}
        {activeForm === 'dass' && (
          <Card sx={{ p: 3, mb: 3 }}>
            <DASSForm onSubmit={() => handleFormSubmit('dass')} />
          </Card>
        )}
        {activeForm === 'fomo' && (
          <Card sx={{ p: 3, mb: 3 }}>
            <FOMOForm onSubmit={() => handleFormSubmit('fomo')} />
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default StudentDashboard;