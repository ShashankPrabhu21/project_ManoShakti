import React, { useState } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Card, CardContent } from '@mui/material';

const DASSForm = ({ onSubmit }) => {
  const [responses, setResponses] = useState(Array(21).fill(''));

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(responses);
  };

  const questions = [
    "I found it hard to wind down",
    "I was aware of dryness of my mouth",
    "I couldn’t seem to experience any positive feeling at all",
        "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
        // Add all 21 questions here...
        "I felt scared without any good reason",
        "I felt that life was meaningless"
  ];

  return (
    <Container sx={{ maxWidth: '100%', padding: 3, backgroundColor: '#f0f4f8' }}>
      <Typography variant="h4" align="center" sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: 4 }}>
        DASS Questionnaire
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Card key={index} sx={{ marginBottom: 3, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h6">{`${index + 1}. ${question}`}</Typography>
              <RadioGroup name={`q${index + 1}`} value={responses[index]} onChange={(e) => handleResponseChange(index, e.target.value)} row>
                <FormControlLabel value="0" control={<Radio required />} label="Did not apply to me at all" />
                <FormControlLabel value="1" control={<Radio />} label="Applied to me to some degree" />
                <FormControlLabel value="2" control={<Radio />} label="Applied to me a considerable degree" />
                <FormControlLabel value="3" control={<Radio />} label="Applied to me very much" />
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </form>
    </Container>
  );
};

export default DASSForm;
