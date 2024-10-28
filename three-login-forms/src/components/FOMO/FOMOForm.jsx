import React, { useState } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Card, CardContent } from '@mui/material';

const FomoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
      <Typography variant="h4" align="center" sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: 4 }}>
        FoMO Questionnaire
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Card key={index} sx={{ marginBottom: 3, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h6">{`${index + 1}. ${question}`}</Typography>
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
};

export default FomoForm;
