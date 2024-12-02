import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { db } from '../../firebaseConfig'; 
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Box, Button, TextField, Typography } from '@mui/material';

function ParentDashboard() {
  const [usnInput, setUsnInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to another page

  const handleFetchDetails = async () => {
    if (!usnInput.trim()) {
      setError('Please enter a valid USN.');
      return;
    }

    setLoading(true);
    setError(null); 

    try {
      const studentDocRef = doc(db, 'students', usnInput);
      const studentDocSnap = await getDoc(studentDocRef);

      if (studentDocSnap.exists) {
        const detailsCollectionRef = collection(studentDocRef, 'details');
        const detailsSnapshot = await getDocs(detailsCollectionRef);

        if (!detailsSnapshot.empty) {
          const detailsDoc = detailsSnapshot.docs[0];
          const details = detailsDoc.data();

          // Fetch DASS responses
          const dassCollectionRef = collection(studentDocRef, 'dass_responses');
          const dassSnapshot = await getDocs(dassCollectionRef);

          // Fetch ADHD responses
          const adhdCollectionRef = collection(studentDocRef, 'adhd_responses');
          const adhdSnapshot = await getDocs(adhdCollectionRef);

          // Fetch FoMO responses
          const fomoCollectionRef = collection(studentDocRef, 'fomo_responses');
          const fomoSnapshot = await getDocs(fomoCollectionRef);

          // Pass all data to the next page
          navigate('/student-details', { 
            state: { 
              studentDetails: { usn: usnInput, ...details }, 
              dassResponses: !dassSnapshot.empty ? dassSnapshot.docs[0].data() : null,
              adhdResponses: !adhdSnapshot.empty ? adhdSnapshot.docs[0].data() : null,
              fomoResponses: !fomoSnapshot.empty ? fomoSnapshot.docs[0].data() : null
            } 
          });
        } else {
          setError(`No details found for student with USN: ${usnInput}`);
        }
      } else {
        setError(`No student found with USN: ${usnInput}`);
      }
    } catch (err) {
      console.error('Error fetching student details:', err);
      setError('Error fetching student details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7f7f7', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Parent Dashboard</Typography>
      <TextField label="Enter Student USN" value={usnInput} onChange={(e) => setUsnInput(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={handleFetchDetails} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Details'}
      </Button>

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default ParentDashboard;
