import React, { useState } from 'react';

const ADHDResult = () => {
  const [results, setResults] = useState(null); // State to store the result from backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to gather form data from the form
    const formData = new FormData(e.target);

    try {
      // Send form data to the Flask backend via POST request
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        body: formData,  // Sending formData directly in the body
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
  };

  return (
    <div>
      <h3>ADHD Results</h3>
      {results ? (
        // Display the results after form submission
        <div>
          <p>Total Score: {results.total_score}</p>
          <p>Part A Score: {results.parta_score}</p>
          <p>Part B Score: {results.partb_score}</p>
          <p>Inattentive Subscale Score: {results.inattentive_subscale_score}</p>
          <p>Motor Impulsive Subscale Score: {results.motor_impulsive_subscale_score}</p>
          <p>Verbal Impulsive Subscale Score: {results.verbal_impulsive_subscale_score}</p>
        </div>
      ) : (
        // Display the form before submission
        <form onSubmit={handleSubmit}>
          <label>1. How often do you have trouble wrapping up the final details of a project?</label><br />
          <input type="radio" name="q1" value="0" required /> Never
          <input type="radio" name="q1" value="1" /> Rarely
          <input type="radio" name="q1" value="2" /> Sometimes
          <input type="radio" name="q1" value="3" /> Often
          <input type="radio" name="q1" value="4" /> Very Often
          <br /><br />

          {/* Repeat this structure for all other questions */}

          <input type="text" name="student_name" placeholder="Student Name" required />
          <input type="text" name="student_id" placeholder="Student ID" required />
          
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ADHDResult;
