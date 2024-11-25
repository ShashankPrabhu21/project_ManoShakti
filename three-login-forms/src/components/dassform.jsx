import React, { useState } from "react";
import { addDoc, collection,doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./threeform_style.css";

const DASSForm = () => {
  const [responses, setResponses] = useState(Array(21).fill(null));
  const [usn, setUsn] = useState(""); // State to store the USN
  const [flashMessage, setFlashMessage] = useState(null);

  const questions = [
    "I found it hard to wind down",
    "I was aware of dryness of my mouth",
    "I couldn’t seem to experience any positive feeling at all",
    "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
    "I found it difficult to work up the initiative to do things",
    "I tended to over-react to situations",
    "I experienced trembling (e.g. in the hands)",
    "I felt that I was using a lot of nervous energy",
    "I was worried about situations in which I might panic and make a fool of myself",
    "I felt that I had nothing to look forward to",
    "I found myself getting agitated",
    "I found it difficult to relax",
    "I felt down-hearted and blue",
    "I was intolerant of anything that kept me from getting on with what I was doing",
    "I felt I was close to panic",
    "I was unable to become enthusiastic about anything",
    "I felt I wasn’t worth much as a person",
    "I felt that I was rather touchy",
    "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)",
    "I felt scared without any good reason",
    "I felt that life was meaningless",
  ];

  const options = [
    "Did not apply to me at all",
    "Applied to me to some degree, or some of the time",
    "Applied to me to a considerable degree or a good part of time",
    "Applied to me very much or most of the time",
  ];

  const optionToNumber = {
    "Did not apply to me at all": 0,
    "Applied to me to some degree, or some of the time": 1,
    "Applied to me to a considerable degree or a good part of time": 2,
    "Applied to me very much or most of the time": 3,
  };

  const depressionQuestions = [2, 4, 9, 12, 16, 17, 20];
  const anxietyQuestions = [1, 3, 6, 8, 15, 18, 19];
  const stressQuestions = [0, 5, 7, 10, 11, 13, 14];

  const calculateSeverity = (score, type) => {
    const cutoffs = {
      Depression: [10, 14, 21, 28],
      Anxiety: [8, 10, 15, 20],
      Stress: [15, 19, 26, 34],
    };
    const labels = ["Normal", "Mild", "Moderate", "Severe", "Extremely Severe"];
    const index = cutoffs[type].findIndex((cutoff) => score < cutoff);
    return labels[index] || labels[labels.length - 1];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (responses.includes(null) || usn === "") {
      triggerFlashMessage("Please answer all questions and provide your USN.", "error");
      return;
    }

    try {
      const depressionScore =
        depressionQuestions.reduce((sum, q) => sum + responses[q], 0) * 2;
      const anxietyScore =
        anxietyQuestions.reduce((sum, q) => sum + responses[q], 0) * 2;
      const stressScore =
        stressQuestions.reduce((sum, q) => sum + responses[q], 0) * 2;

      const depressionSeverity = calculateSeverity(depressionScore, "Depression");
      const anxietySeverity = calculateSeverity(anxietyScore, "Anxiety");
      const stressSeverity = calculateSeverity(stressScore, "Stress");

      // Save the response inside the student's document in the Firestore collection
      const studentRef = doc(db, "students", usn); // Reference to the student's document using USN
      const dassResponseRef = collection(studentRef, "dass_responses"); // Create sub-collection for DASS responses

      // Save the DASS response data
      await addDoc(dassResponseRef, {
        responses,
        depressionScore,
        anxietyScore,
        stressScore,
        depressionSeverity,
        anxietySeverity,
        stressSeverity,
        submittedAt: new Date(),
      });



      triggerFlashMessage("Response saved successfully!", "success");
      setUsn(""); // Reset USN after submission
      setResponses(Array(21).fill(null));
    } catch (error) {
      console.error("Error saving responses: ", error);
      triggerFlashMessage("Failed to save the response. Please try again.", "error");
    }
  };

  const handleChange = (e, index) => {
    const value = optionToNumber[e.target.value];
    setResponses((prev) => {
      const newResponses = [...prev];
      newResponses[index] = value;
      return newResponses;
    });
  };

  const triggerFlashMessage = (message, type) => {
    setFlashMessage({ message, type });
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000);
  };

  return (
    <div className="form-container">
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.message}
        </div>
      )}
      <h1 className="form-title">DASS-21 Survey</h1>
      <form onSubmit={handleSubmit} className="dass-form">
        {/* USN Input Field */}
        <div className="question-container">
          <label className="question-text" htmlFor="usn">USN:</label>
          <input
            type="text"
            id="usn"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            className="usn-input"
            required
          />
        </div>
        
        {questions.map((question, idx) => (
          <div key={idx} className="question-container">
            <p className="question-text">{`${idx + 1}. ${question}`}</p>
            <div className="options-container">
              {options.map((option, optIdx) => (
                <label key={optIdx} className="option-label">
                  <input
                    type="radio"
                    name={`question${idx}`}
                    value={option}
                    checked={responses[idx] === optionToNumber[option]}
                    onChange={(e) => handleChange(e, idx)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DASSForm;
