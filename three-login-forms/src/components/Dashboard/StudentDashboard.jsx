import React, { useEffect, useState } from 'react'; 
import { auth, db } from '../../firebaseConfig'; // Import Firebase Auth & Firestore
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import ADHDForm from '../ADHD/AdhdForm';
import DASSForm from '../DASS/DASSForm';
import FOMOForm from '../FOMO/FOMOForm';
import { Container, Typography, Card, CardContent, Grid, Box, Button } from '@mui/material';

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Fetch student data from Firestore
    const fetchStudentData = async () => {
      const studentId = auth.currentUser.uid; // Get the current user's ID
      const studentRef = doc(db, 'students', studentId); // Reference to the student's document
      const studentSnapshot = await getDoc(studentRef);
      if (studentSnapshot.exists()) {
        setStudentData(studentSnapshot.data());
      } else {
        console.log('No such student document!');
      }
    };

    fetchStudentData();
  }, []);

  const handleFormSubmission = async (formType, formData) => {
    const studentId = auth.currentUser.uid; // Get the current user's ID
    await db.collection('students').doc(studentId).update({
      [`forms.${formType}`]: formData,
    }).then(() => {
      alert(`${formType.toUpperCase()} form submitted successfully`);
      setFormSubmitted(true);
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
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
              <Grid item xs={12} sm={6}>
                <Typography><strong>USN/Roll Number:</strong> {studentData.usn}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Branch:</strong> {studentData.branch}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Age:</strong> {studentData.age}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Weight:</strong> {studentData.weight}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Contact:</strong> {studentData.contact}</Typography>
              </Grid>
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
            <ADHDForm onSubmit={(data) => handleFormSubmission('adhd', data)} />
          </Card>
          <Card sx={{ mb: 3, p: 2 }}>
            <DASSForm onSubmit={(data) => handleFormSubmission('dass', data)} />
          </Card>
          <Card sx={{ mb: 3, p: 2 }}>
            <FOMOForm onSubmit={(data) => handleFormSubmission('fomo', data)} />
          </Card>
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
