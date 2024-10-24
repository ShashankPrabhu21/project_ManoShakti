import React, { useState } from 'react';
import '../main.css'; // Import the CSS for styling
import FomoResult from './FOMOResult'; // Import the result component

function FomoForm() {
  const [formData, setFormData] = useState({
    student_id: '',
    student_name: '',
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

  return (
    <div className="container">
      <h2>FoMO Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="student_id">Student ID:</label>
        <input type="text" id="student_id" name="student_id" value={formData.student_id} onChange={handleChange} required /><br /><br />

        <label htmlFor="student_name">Student Name:</label>
        <input type="text" id="student_name" name="student_name" value={formData.student_name} onChange={handleChange} required /><br /><br />

        <h3>FoMO Questions (Rate 1-5)</h3>

        {[...Array(10).keys()].map((index) => (
          <div key={index}>
            <label>{`${index + 1}. FoMO Question ${index + 1}`}</label><br />
            {['1', '2', '3', '4', '5'].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`q${index + 1}`}
                  value={value}
                  onChange={handleChange}
                  required
                /> {value}
              </label>
            ))}
            <br /><br />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FomoForm;
