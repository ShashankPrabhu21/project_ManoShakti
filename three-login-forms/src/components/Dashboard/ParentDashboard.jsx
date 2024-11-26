import React, { useState } from 'react';
import { db } from '../../firebaseConfig'; // Ensure db is properly configured
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Box, Button, TextField, Typography } from '@mui/material';

function ParentDashboard() {
  const [usnInput, setUsnInput] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [dassResponses, setDassResponses] = useState(null); // State for DASS responses
  const [adhdResponses, setAdhdResponses] = useState(null); // State for ADHD responses
  const [fomoResponses, setFomoResponses] = useState(null); // State for FoMO responses
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchDetails = async () => {
    if (!usnInput.trim()) {
      setError('Please enter a valid USN.');
      return;
    }

    setLoading(true);
    setError(null); // Reset error message

    try {
      // Fetch the student document from the 'students' collection
      const studentDocRef = doc(db, 'students', usnInput);
      const studentDocSnap = await getDoc(studentDocRef);

      if (studentDocSnap.exists) {
        // Fetch the 'details' subcollection
        const detailsCollectionRef = collection(studentDocRef, 'details');
        const detailsSnapshot = await getDocs(detailsCollectionRef);

        if (!detailsSnapshot.empty) {
          const detailsDoc = detailsSnapshot.docs[0];
          const details = detailsDoc.data();

          console.log('Setting student details:', {
            usn: usnInput,
            ...details,
          });

          setStudentDetails({
            usn: usnInput,
            ...details,
          });
        } else {
          setStudentDetails(null);
          setError(`No details found for student with USN: ${usnInput}`);
        }

        // Fetch the DASS responses from the 'dass_responses' subcollection
        const dassCollectionRef = collection(studentDocRef, 'dass_responses');
        const dassSnapshot = await getDocs(dassCollectionRef);

        if (!dassSnapshot.empty) {
          const dassDoc = dassSnapshot.docs[0];
          const dassData = dassDoc.data();

          console.log('Setting DASS responses:', dassData);
          setDassResponses(dassData);
        } else {
          setDassResponses(null);
          setError(`No DASS responses found for student with USN: ${usnInput}`);
        }

        // Fetch the ADHD responses from the 'adhd_responses' subcollection
        const adhdCollectionRef = collection(studentDocRef, 'adhd_responses');
        const adhdSnapshot = await getDocs(adhdCollectionRef);

        if (!adhdSnapshot.empty) {
          const adhdDoc = adhdSnapshot.docs[0];
          const adhdData = adhdDoc.data();

          console.log('Setting ADHD responses:', adhdData);
          setAdhdResponses(adhdData);
        } else {
          setAdhdResponses(null);
          setError(`No ADHD responses found for student with USN: ${usnInput}`);
        }

        // Fetch the FoMO responses from the 'fomo_responses' subcollection
        const fomoCollectionRef = collection(studentDocRef, 'fomo_responses');
        const fomoSnapshot = await getDocs(fomoCollectionRef);

        if (!fomoSnapshot.empty) {
          const fomoDoc = fomoSnapshot.docs[0];
          const fomoData = fomoDoc.data();

          console.log('Setting FoMO responses:', fomoData);
          setFomoResponses(fomoData);
        } else {
          setFomoResponses(null);
          setError(`No FoMO responses found for student with USN: ${usnInput}`);
        }
      } else {
        setError(`No student found with USN: ${usnInput}`);
      }
    } catch (err) {
      console.error('Error fetching student details:', err);
      setError('Error fetching student details. Please try again later.');
      setStudentDetails(null);
      setDassResponses(null);
      setAdhdResponses(null);
      setFomoResponses(null);
    } finally {
      setLoading(false);
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
        Parent Dashboard
      </Typography>
      <TextField
        label="Enter Student USN"
        value={usnInput}
        onChange={(e) => setUsnInput(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchDetails}
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch Details'}
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {studentDetails && (
        <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
          <Typography variant="h6">Student Details:</Typography>
          <Box sx={{ marginBottom: '10px' }}>
            <Typography><strong>Name:</strong> {studentDetails.name}</Typography>
            <Typography><strong>Age:</strong> {studentDetails.age}</Typography>
            <Typography><strong>Branch:</strong> {studentDetails.branch}</Typography>
            <Typography><strong>Section:</strong> {studentDetails.section}</Typography>
            <Typography><strong>Contact:</strong> {studentDetails.contact}</Typography>
            <Typography><strong>Email:</strong> {studentDetails.email}</Typography>
            <Typography><strong>Weight:</strong> {studentDetails.weight}</Typography>
          </Box>
        </Box>
      )}

      {dassResponses && (
        <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
          <Typography variant="h6">DASS Responses:</Typography>
          <Box sx={{ marginBottom: '10px' }}>
            <Typography><strong>Anxiety Severity:</strong> {dassResponses.anxietySeverity}</Typography>
            <Typography><strong>Depression Severity:</strong> {dassResponses.depressionSeverity}</Typography>
            <Typography><strong>Stress Severity:</strong> {dassResponses.stressSeverity}</Typography>
            <Typography><strong>Submitted At:</strong> {new Date(dassResponses.submittedAt.seconds * 1000).toLocaleString()}</Typography>
          </Box>
        </Box>
      )}

      {adhdResponses && (
        <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
          <Typography variant="h6">ADHD Responses:</Typography>
          <Box sx={{ marginBottom: '10px' }}>
            <Typography><strong>Classification:</strong> {adhdResponses.classification}</Typography>
            <Typography><strong>Submitted At:</strong> {new Date(adhdResponses.submittedAt.seconds * 1000).toLocaleString()}</Typography>
          </Box>
        </Box>
      )}

      {fomoResponses && (
        <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
          <Typography variant="h6">FoMO Responses:</Typography>
          <Box sx={{ marginBottom: '10px' }}>
            <Typography><strong>Classification:</strong> {fomoResponses.classification}</Typography>
            
            <Typography><strong>Submitted At:</strong> {new Date(fomoResponses.submittedAt.seconds * 1000).toLocaleString()}</Typography>
            
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ParentDashboard;
