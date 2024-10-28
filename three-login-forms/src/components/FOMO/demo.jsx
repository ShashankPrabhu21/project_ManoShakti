import React, { useState } from 'react';
import { Container, Button, Typography, RadioGroup, FormControlLabel, Radio, Box, Card, CardContent } from '@mui/material';
import FomoResult from './FOMOResult'; // Import the result component

function FomoForm() {
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
  });

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fomo_score = 0;
    for (let i = 1; i <= 10; i++) {
      fomo_score += parseInt(formData[`q${i}`] || '0');
    }

    let fomo_level;
    if (fomo_score <= 20) {
      fomo_level = "Low";
    } else if (fomo_score <= 30) {
      fomo_level = "Moderate";
    } else if (fomo_score <= 40) {
      fomo_level = "High";
    } else {
      fomo_level = "Extreme";
    }

    setResult({ fomo_score, fomo_level });
    setSubmitted(true);
  };

  if (submitted) {
    return <FomoResult result={result} />;
  }

  const questions = [
    "I fear others have more rewarding experiences than me.",
    "I fear my friends have more rewarding experiences than me.",
    "I get worried when I find out my friends are having fun without me.",
    "I get anxious when I don’t know what my friends are up to.",
    "It bothers me when I miss an opportunity to meet up with friends.",
    "When I miss out on a planned get-together, it bothers me.",
    "I feel uneasy when I find out my friends are hanging out without me.",
    "I get worried when I don’t get invited to activities.",
    "I worry about missing events that my friends are attending.",
    "I feel disappointed when I miss out on social gatherings."
  ];

  return (
    <Container sx={{ maxWidth: '100%', padding: 3, backgroundColor: '#f0f4f8' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: 4 }}>
        FoMO Questionnaire
      </Typography>

      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Card key={index} variant="outlined" sx={{ marginBottom: 3, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                {`${index + 1}. ${question}`}
              </Typography>
              <RadioGroup name={`q${index + 1}`} value={formData[`q${index + 1}`]} onChange={handleChange} row>
                {[1, 2, 3, 4, 5].map((value) => (
                  <FormControlLabel key={value} value={value.toString()} control={<Radio required />} label={value.toString()} />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

        
      </form>
    </Container>
  );
}

export default FomoForm;
