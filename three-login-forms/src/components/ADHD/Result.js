import React from 'react';

const Result = ({ total_score, parta_score, partb_score, inattentive_subscale_score, motor_impulsive_subscale_score, verbal_impulsive_subscale_score }) => {
  return (
    <div>
      <h2>Results</h2>
      <p>Total Score: {total_score}</p>
      <p>Part A Score: {parta_score}</p>
      <p>Part B Score: {partb_score}</p>
      <p>Inattentive Subscale Score: {inattentive_subscale_score}</p>
      <p>Motor Hyperactive/Impulsive Subscale Score: {motor_impulsive_subscale_score}</p>
      <p>Verbal Hyperactive/Impulsive Subscale Score: {verbal_impulsive_subscale_score}</p>
      <a href="/">Go Back</a>
    </div>
  );
};

export default Result;
