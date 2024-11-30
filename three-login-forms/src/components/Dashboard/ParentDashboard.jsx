import React, { useState } from 'react';
import { db } from '../../firebaseConfig'; // Ensure db is properly configured
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Box, Button, TextField, Typography } from '@mui/material';

function ParentDashboard() {
  const [usnInput, setUsnInput] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [dassResponses, setDassResponses] = useState(null);
  const [adhdResponses, setAdhdResponses] = useState(null);
  const [fomoResponses, setFomoResponses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(''); // State to track active section

  const handleFetchDetails = async () => {
    if (!usnInput.trim()) {
      setError('Please enter a valid USN.');
      return;
    }

    setLoading(true);
    setError(null); // Reset error message

    try {
      const studentDocRef = doc(db, 'students', usnInput);
      const studentDocSnap = await getDoc(studentDocRef);

      if (studentDocSnap.exists) {
        const detailsCollectionRef = collection(studentDocRef, 'details');
        const detailsSnapshot = await getDocs(detailsCollectionRef);

        if (!detailsSnapshot.empty) {
          const detailsDoc = detailsSnapshot.docs[0];
          const details = detailsDoc.data();

          setStudentDetails({
            usn: usnInput,
            ...details,
          });
        } else {
          setStudentDetails(null);
          setError(`No details found for student with USN: ${usnInput}`);
        }

        const dassCollectionRef = collection(studentDocRef, 'dass_responses');
        const dassSnapshot = await getDocs(dassCollectionRef);
        setDassResponses(!dassSnapshot.empty ? dassSnapshot.docs[0].data() : null);

        const adhdCollectionRef = collection(studentDocRef, 'adhd_responses');
        const adhdSnapshot = await getDocs(adhdCollectionRef);
        setAdhdResponses(!adhdSnapshot.empty ? adhdSnapshot.docs[0].data() : null);

        const fomoCollectionRef = collection(studentDocRef, 'fomo_responses');
        const fomoSnapshot = await getDocs(fomoCollectionRef);
        setFomoResponses(!fomoSnapshot.empty ? fomoSnapshot.docs[0].data() : null);
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
        padding: '1rem',
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
        <Box sx={{ marginTop: '20px', textAlign: 'left', width: '100%' }}>
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

          {/* Section Buttons */}
          <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setActiveSection('ADHD')}
            >
              ADHD
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setActiveSection('FoMO')}
            >
              FoMO
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setActiveSection('DASS')}
            >
              DASS
            </Button>
          </Box>

          {/* Conditional Rendering of Sections */}
          {activeSection === 'ADHD' && adhdResponses && (
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant="h6">ADHD Responses:</Typography>
              <Typography><strong>Classification:</strong> {adhdResponses.classification}</Typography>
              <Typography>
                <strong>Submitted At:</strong>{' '}
                {new Date(adhdResponses.submittedAt.seconds * 1000).toLocaleString()}
              </Typography>
            </Box>
          )}

          {activeSection === 'FoMO' && fomoResponses && (
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant="h6">FoMO Responses:</Typography>
              <Typography><strong>Classification:</strong> {fomoResponses.classification}</Typography>
              <Typography>
                <strong>Submitted At:</strong>{' '}
                {new Date(fomoResponses.submittedAt.seconds * 1000).toLocaleString()}
              </Typography>
            </Box>
          )}

          {activeSection === 'DASS' && dassResponses && (
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant="h6">DASS Responses:</Typography>
              <Typography><strong>Anxiety Severity:</strong> {dassResponses.anxietySeverity}</Typography>
              <Typography><strong>Depression Severity:</strong> {dassResponses.depressionSeverity}</Typography>
              <Typography><strong>Stress Severity:</strong> {dassResponses.stressSeverity}</Typography>
              <Typography>
                <strong>Submitted At:</strong>{' '}
                {new Date(dassResponses.submittedAt.seconds * 1000).toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ParentDashboard;
