// src/components/DASSForm.js
import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import "../main.css";

const DASSForm = ({ setResult }) => {
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [responses, setResponses] = useState(Array(21).fill(null));

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

        // Define levels based on scores
        const getDepressionLevel = (score) => score >= 28 ? 'Extremely Severe' :
                                        score >= 21 ? 'Severe' :
                                        score >= 14 ? 'Moderate' :
                                        score >= 10 ? 'Mild' : 'Normal';

        const getAnxietyLevel = (score) => score >= 20 ? 'Extremely Severe' :
                                        score >= 15 ? 'Severe' :
                                        score >= 10 ? 'Moderate' :
                                        score >= 8 ? 'Mild' : 'Normal';

        const getStressLevel = (score) => score >= 34 ? 'Extremely Severe' :
                                        score >= 26 ? 'Severe' :
                                        score >= 19 ? 'Moderate' :
                                        score >= 15 ? 'Mild' : 'Normal';

        const depressionLevel = getDepressionLevel(depressionScore);
        const anxietyLevel = getAnxietyLevel(anxietyScore);
        const stressLevel = getStressLevel(stressScore);

        // Save to Firestore
        await db.collection('dass_responses').doc(studentId).set({
            studentName,
            studentId,
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

    return (
        <div className="container">
            <h2>DASS Questionnaire</h2>
            <form onSubmit={handleSubmit}>
                <label>Student ID:</label>
                <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />

                <label>Student Name:</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />

                <h3>DASS Questions (Rate 0-3)</h3>
                {[...Array(21)].map((_, index) => (
                    <div key={index}>
                        <label>{index + 1}. {questions[index]}</label>
                        {[0, 1, 2, 3].map((value) => (
                            <label key={value}>
                                <input type="radio" name={`q${index + 1}`} value={value} onChange={() => handleResponseChange(index, value)} required />
                                {radioLabels[value]}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

const questions = [
    "I found it hard to wind down",
    "I was aware of dryness of my mouth",
    "I couldn’t seem to experience any positive feeling at all",
    "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
    // ... add the rest of your questions here
    "I felt scared without any good reason",
    "I felt that life was meaningless"
];

const radioLabels = [
    "Did not apply to me at all",
    "Applied to me to some degree",
    "Applied to me a considerable degree",
    "Applied to me very much"
];

export default DASSForm;
