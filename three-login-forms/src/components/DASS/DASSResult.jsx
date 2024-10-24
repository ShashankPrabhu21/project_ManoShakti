// src/components/Result.js
import React from 'react';

const Result = ({ depressionLevel, anxietyLevel, stressLevel, onReset }) => {
    return (
        <div className="container">
            <h2>Results</h2>
            <p>Depression level: {depressionLevel}</p>
            <p>Anxiety level: {anxietyLevel}</p>
            <p>Stress level: {stressLevel}</p>
            <button onClick={onReset}>Go Back</button>
        </div>
    );
};

export default Result;
