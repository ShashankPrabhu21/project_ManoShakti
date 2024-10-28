import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ADHDForm from '../ADHD/AdhdForm';
import DASSForm from '../DASS/DASSForm';
import FOMOForm from '../FOMO/FOMOForm';
import { Container, Typography, Card, CardContent, Grid, Box, Button } from '@mui/material';

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [adhdData, setAdhdData] = useState(null);
  const [dassData, setDassData] = useState(null);
  const [fomoData, setFomoData] = useState(null);

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

  const handleSubmitAllForms = async () => {
    const studentId = auth.currentUser.uid;
    try {
      const studentRef = doc(db, 'students', studentId);
      await updateDoc(studentRef, {
        'forms.adhd': adhdData,
        'forms.dass': dassData,
        'forms.fomo': fomoData,
      });
      alert('All forms submitted successfully');
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting forms:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ boxShadow: 3, p: 3, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0' }}>
          Student Dashboard
        </Typography>

        {studentData && (
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">Welcome, {studentData.name}</Typography>
              </Grid>
              {/* Display additional student data */}
            </Grid>
          </CardContent>
        )}
      </Card>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Fill Your Questionnaires
        </Typography>
      </Box>

      {!formSubmitted && (
        <Box>
          <Card sx={{ mb: 3, p: 2 }}>
            <ADHDForm onSubmit={(data) => setAdhdData(data)} />
          </Card>
          <Card sx={{ mb: 3, p: 2 }}>
            <DASSForm onSubmit={(data) => setDassData(data)} />
          </Card>
          <Card sx={{ mb: 3, p: 2 }}>
            <FOMOForm onSubmit={(data) => setFomoData(data)} />
          </Card>
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitAllForms}
              disabled={!adhdData || !dassData || !fomoData}
              sx={{
                paddingX: 5,
                paddingY: 2,
                fontSize: '1.2rem',
                boxShadow: 3,
              }}
            >
              Submit All Forms
            </Button>
          </Box>
        </Box>
      )}

      {formSubmitted && (
        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="primary" onClick={() => setFormSubmitted(false)}>
            Fill Another Form
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default StudentDashboard;
