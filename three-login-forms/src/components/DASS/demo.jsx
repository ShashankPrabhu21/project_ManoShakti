// src/components/DASSForm.jsx
import React, { useState } from 'react';
import { Container, Button, Typography, RadioGroup, FormControlLabel, Radio, Box, Card, CardContent } from '@mui/material';
import { db } from '../../firebaseConfig';

const DASSForm = ({ setResult }) => {
    const [responses, setResponses] = useState(Array(21).fill(''));

    const handleResponseChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calculate scores
        const depressionScore = (responses[2] + responses[4] + responses[9] + responses[12] + responses[15] + responses[16] + responses[20]) * 2;
        const anxietyScore = (responses[1] + responses[3] + responses[6] + responses[8] + responses[14] + responses[18] + responses[19]) * 2;
        const stressScore = (responses[0] + responses[5] + responses[7] + responses[10] + responses[11] + responses[13] + responses[17]) * 2;

        const depressionLevel = getDepressionLevel(depressionScore);
        const anxietyLevel = getAnxietyLevel(anxietyScore);
        const stressLevel = getStressLevel(stressScore);

        // Save to Firestore
        await db.collection('dass_responses').add({
            questionResponses: responses,
            depressionScore,
            depressionLevel,
            anxietyScore,
            anxietyLevel,
            stressScore,
            stressLevel,
        });

        setResult({ depressionLevel, anxietyLevel, stressLevel });
    };

    const getDepressionLevel = (score) => score >= 28 ? 'Extremely Severe' : score >= 21 ? 'Severe' : score >= 14 ? 'Moderate' : score >= 10 ? 'Mild' : 'Normal';
    const getAnxietyLevel = (score) => score >= 20 ? 'Extremely Severe' : score >= 15 ? 'Severe' : score >= 10 ? 'Moderate' : score >= 8 ? 'Mild' : 'Normal';
    const getStressLevel = (score) => score >= 34 ? 'Extremely Severe' : score >= 26 ? 'Severe' : score >= 19 ? 'Moderate' : score >= 15 ? 'Mild' : 'Normal';

    const questions = [
        "I found it hard to wind down",
        "I was aware of dryness of my mouth",
        "I couldn’t seem to experience any positive feeling at all",
        "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
        // Add all 21 questions here...
        "I felt scared without any good reason",
        "I felt that life was meaningless"
    ];

    const radioLabels = [
        "Did not apply to me at all",
        "Applied to me to some degree",
        "Applied to me a considerable degree",
        "Applied to me very much"
    ];

    return (
        <Container sx={{ maxWidth: '100%', padding: 3, backgroundColor: '#f0f4f8' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: 4 }}>
                DASS Questionnaire
            </Typography>

            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <Card key={index} variant="outlined" sx={{ marginBottom: 3, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" component="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                                {`${index + 1}. ${question}`}
                            </Typography>
                            <RadioGroup name={`q${index + 1}`} value={responses[index]} onChange={(e) => handleResponseChange(index, e.target.value)} row>
                                {radioLabels.map((label, value) => (
                                    <FormControlLabel key={value} value={value.toString()} control={<Radio required />} label={label} />
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>
                ))}


            </form>
        </Container>
    );
};

export default DASSForm;
