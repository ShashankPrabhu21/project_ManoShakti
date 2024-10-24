import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, RadioGroup, FormControlLabel, Radio, Box, Card, CardContent } from '@mui/material';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const ADHDForm = () => {
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: '',
    q18: '',
    student_id: '',
    student_name: ''
  });

  const [results, setResults] = useState(null); // State to store the result from backend

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // Initialize formData with student details
      setFormData((prevData) => ({
        ...prevData,
        student_id: user.uid,
        student_name: user.displayName || '' // Use the display name if available
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Store the form data in Firebase Firestore under the student's document
      await setDoc(doc(db, "ADHD", user.uid), formData);
      console.log('Form Data saved:', formData);

      // Send form data to the Flask backend via POST request
      try {
        const response = await fetch('http://localhost:5000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON response from the backend
        const resultData = await response.json();
        setResults(resultData); // Store the response data in the state
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  // Questions Array
  const questions = [
    "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    "How often do you have problems remembering appointments or obligations?",
    "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    "How often do you make careless mistakes when you have to work on a boring or difficult project?",
    "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
    "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",    
    "How often do you misplace or have difficulty finding things at home or at work?",
    "How often are you distracted by activity or noise around you?",
    "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
    "How often do you feel restless or fidgety?",
    "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
    "How often do you find yourself talking too much when you are in social situations?",
    "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?",
    "How often do you have difficulty waiting your turn in situations when turn taking is required?",
    "How often do you interrupt others when they are busy?"
    


    // Add other questions similarly (up to q18)
  ];
  return (
    <Container className="container" sx={{ maxWidth: '100%', padding: 3, backgroundColor: '#f0f4f8' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: 4 }}>
        ADHD Assessment Form
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Questions in individual cards */}
        {questions.map((question, index) => (
          <Card key={index} variant="outlined" sx={{ marginBottom: 3, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                {`${index + 1}. ${question}`}
              </Typography>
              <RadioGroup name={`q${index + 1}`} value={formData[`q${index + 1}`]} onChange={handleChange} row>
                <FormControlLabel value="0" control={<Radio required />} label="Never" sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem' } }} />
                <FormControlLabel value="1" control={<Radio />} label="Rarely" sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem' } }} />
                <FormControlLabel value="2" control={<Radio />} label="Sometimes" sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem' } }} />
                <FormControlLabel value="3" control={<Radio />} label="Often" sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem' } }} />
                <FormControlLabel value="4" control={<Radio />} label="Very Often" sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem' } }} />
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

        {/* Fixed Submit Button at the bottom */}
        <Box sx={{ position: 'fixed', bottom: '10px', width: '100%', textAlign: 'center', padding: '0 15px' }}>
          <Button type="submit" variant="contained" color="secondary" sx={{ padding: '12px 24px', fontSize: '1rem', width: '100%', maxWidth: 400 }}>
            Submit Responses
          </Button>
        </Box>
      </form>

      {/* Display Results */}
      {results && (
        <Card variant="outlined" sx={{ padding: 2, marginTop: 4, backgroundColor: '#e3f2fd', borderRadius: 3 }}>
          <Typography variant="h5" align="center" sx={{ color: '#0288d1', fontWeight: 'bold' }}>ADHD Assessment Results</Typography>
          <Box mt={2}>
            <Typography>Total Score: {results.total_score}</Typography>
            <Typography>Part A Score: {results.parta_score}</Typography>
            <Typography>Part B Score: {results.partb_score}</Typography>
            <Typography>Inattentive Subscale: {results.inattentive_subscale_score}</Typography>
            <Typography>Motor Impulsive Subscale: {results.motor_impulsive_subscale_score}</Typography>
            <Typography>Verbal Impulsive Subscale: {results.verbal_impulsive_subscale_score}</Typography>
          </Box>
        </Card>
      )}
    </Container>
  );
};

export default ADHDForm;
