import React, { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./threeform_style.css"; // Assuming this CSS is the same for all forms (DASS, ADHD, FOMO)

const FOMOForm = () => {
  const [responses, setResponses] = useState(Array(10).fill("")); // Initialize responses for 10 questions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [usn, setUsn] = useState(""); // Add state for USN

  const questions = [
    "I fear others have more rewarding experiences than me.",
    "I fear my friends have more rewarding experiences than me.",
    "I get worried when I find out my friends are having fun without me.",
    "I get anxious when I don't know what my friends are up to.",
    "It is important that I understand my friends' in-jokes.",
    "Sometimes, I wonder if I spend too much time keeping up with what is going on.",
    "It bothers me when I miss an opportunity to meet up with friends.",
    "When I have a good time it is important for me to share the details online.",
    "When I miss out on a planned get-together it bothers me.",
    "When I go on vacation, I continue to keep tabs on what my friends are doing.",
  ];

  const options = [
    "Not at all true of me",
    "Slightly true of me",
    "Moderately true of me",
    "Very true of me",
    "Extremely true of me",
  ];

  const optionToNumber = {
    "Not at all true of me": 1,
    "Slightly true of me": 2,
    "Moderately true of me": 3,
    "Very true of me": 4,
    "Extremely true of me": 5,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (responses.includes("")) {
      triggerFlashMessage("Please answer all questions.", "error");
      return;
    }

    setIsSubmitting(true);

    const numericalResponses = responses.map((response) => optionToNumber[response]);
    const totalScore = numericalResponses.reduce((sum, value) => sum + value, 0);
    const fomoScore = totalScore / numericalResponses.length;

    // Classify the score
    let classification = "";
    if (fomoScore <= 2.0) {
      classification = "Low";
    } else if (fomoScore <= 3.0) {
      classification = "Moderate";
    } else if (fomoScore <= 4.0) {
      classification = "High";
    } else {
      classification = "Extreme";
    }

    try {
      const studentRef = doc(db, "students", usn); // Reference to student document using USN

      // Save FoMO responses in the 'fomo_responses' subcollection of the student
      const fomoResponseRef = collection(studentRef, "fomo_responses");
      await addDoc(fomoResponseRef, {
        responses: numericalResponses,
        totalScore,
        fomoScore,
        classification,
        submittedAt: new Date(),
      });

      triggerFlashMessage("Response saved successfully!", "success");
      setResponses(Array(10).fill("")); // Reset responses after submission
    } catch (error) {
      console.error("Error saving responses: ", error);
      triggerFlashMessage("Failed to save the response. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
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
      <h1 className="form-title">FoMO Survey</h1>
      <form onSubmit={handleSubmit} className="survey-form">
        <div className="question-container">
          <label className="question-text" htmlFor="usn">USN:</label>
          <input
            type="text"
            id="usn"
            value={usn}
            onChange={(e) => setUsn(e.target.value)} // Set USN value
            className="usn-input"
            required
          />
        </div>
        {questions.map((question, index) => (
          <div className="question-container" key={`question${index + 1}`}>
            <p className="question-text">{`${index + 1}. ${question}`}</p>
            <div className="options-container">
              {options.map((option, optIndex) => (
                <label className="option-label" key={optIndex}>
                  <input
                    type="radio"
                    name={`question${index + 1}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={(e) => handleChange(e, index)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FOMOForm;
