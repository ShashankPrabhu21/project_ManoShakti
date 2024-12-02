import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Hook to access passed state
import { Box, Typography, Button } from '@mui/material';

function StudentDetailsPage() {
  const location = useLocation();
  const { studentDetails, dassResponses, adhdResponses, fomoResponses } = location.state || {}; // Get passed data

  const [activeSection, setActiveSection] = useState(''); // Default section is 'DASS'

  if (!studentDetails) {
    return <Typography variant="h6">No details available</Typography>;
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Student Details</Typography>

      {/* Student Basic Details */}
      <Typography><strong>Name:</strong> {studentDetails.name}</Typography>
      <Typography><strong>USN:</strong> {studentDetails.usn}</Typography>
      <Typography><strong>Branch:</strong> {studentDetails.branch}</Typography>
      <Typography><strong>Section:</strong> {studentDetails.section}</Typography>
      <Typography><strong>Contact:</strong> {studentDetails.contact}</Typography>
      <Typography><strong>Email:</strong> {studentDetails.email}</Typography>
      <Typography><strong>Weight:</strong> {studentDetails.weight}</Typography>

      {/* Section Buttons */}
      <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button
          variant={activeSection === 'DASS' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => setActiveSection('DASS')}
        >
          DASS
        </Button>
        <Button
          variant={activeSection === 'FoMO' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => setActiveSection('FoMO')}
        >
          FoMO
        </Button>
        <Button
          variant={activeSection === 'ADHD' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => setActiveSection('ADHD')}
        >
          ADHD
        </Button>
      </Box>

      {/* Conditional Rendering of Sections */}
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
    </Box>
  );
}

export default StudentDetailsPage;
