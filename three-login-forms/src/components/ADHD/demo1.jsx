import React, { useState } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Card, CardContent } from '@mui/material';

const ADHDForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: '',
    q16: '', q17: '', q18: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
  ];

  return (
    <Container sx={{ maxWidth: '100%', padding: 3, backgroundColor: '#f0f4f8' }}>
      <Typography variant="h4" align="center" sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: 4 }}>
        ADHD Assessment Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Card key={index} sx={{ marginBottom: 3, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h6">{`${index + 1}. ${question}`}</Typography>
              <RadioGroup name={`q${index + 1}`} value={formData[`q${index + 1}`]} onChange={handleChange} row>
                <FormControlLabel value="0" control={<Radio required />} label="Never" />
                <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                <FormControlLabel value="3" control={<Radio />} label="Often" />
                <FormControlLabel value="4" control={<Radio />} label="Very Often" />
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </form>
    </Container>
  );
};

export default ADHDForm;
