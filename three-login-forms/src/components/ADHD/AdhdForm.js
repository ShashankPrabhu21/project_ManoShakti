import React, { useState } from 'react';
import '../main.css';

const ADHDForm = () => {
  const [formData, setFormData] = useState({
    student_id: '',
    student_name: '',
    q1: '',
    q2: '',
    // Add for all 18 questions
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form or send it to a backend service like Firebase
    console.log('Form Data:', formData);
  };

  return (
    <div className="container">
      <h2>ADHD Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="student_id">Student ID:</label>
        <input
          type="text"
          id="student_id"
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label htmlFor="student_name">Student Name:</label>
        <input
          type="text"
          id="student_name"
          name="student_name"
          value={formData.student_name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <h3>ADHD Questions (Rate 1-5)</h3>

        <label>
          1. How often do you have trouble wrapping up the final details of a project...?
        </label>
        <br />
        <label>
          <input type="radio" name="q1" value="0" onChange={handleChange} required /> Never
        </label>
        <label>
          <input type="radio" name="q1" value="1" onChange={handleChange} /> Rarely
        </label>
        <label>
          <input type="radio" name="q1" value="2" onChange={handleChange} /> Sometimes
        </label>
        <label>
          <input type="radio" name="q1" value="3" onChange={handleChange} /> Often
        </label>
        <label>
          <input type="radio" name="q1" value="4" onChange={handleChange} /> Very Often
        </label>
        <br /><br />

        {/* Repeat for other questions (q2 to q18) */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ADHDForm;
