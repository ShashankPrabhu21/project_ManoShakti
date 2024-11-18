import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebaseConfig";
import "./threeform_style.css";

const ADHDForm = () => {
  const [responses, setResponses] = useState(
    Array(18).fill("") // Initializes an array of 18 empty strings
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null); // Initialize flashMessage state

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
    "When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?",
    "How often do you have difficulty waiting your turn in situations when turn taking is required?",
    "How often do you interrupt others when they are busy?",
  ];

  const options = ["Never", "Rarely", "Sometimes", "Often"];

  const handleChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (responses.includes(null)) {
      triggerFlashMessage("Please answer all questions.", "error");
      return;
    }

    setIsSubmitting(true);

    const optionToNumber = {
      Never: 0,
      Rarely: 1,
      Sometimes: 2,
      Often: 3,
    };

    const numericalResponses = responses.map((response) => optionToNumber[response]);

    const sumResponses = (questionIndexes) =>
      questionIndexes.reduce((sum, index) => sum + numericalResponses[index - 1], 0);

    const parta_score = sumResponses([1, 2, 3, 4, 5, 6]);
    const partb_score = sumResponses([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    const inattentive_subscale_score = sumResponses([1, 2, 3, 4, 7, 8, 9, 10]);
    const motor_impulsive_subscale_score = sumResponses([5, 6, 11, 12, 13]);
    const verbal_impulsive_subscale_score = sumResponses([14, 15, 16, 17]);

    const total_score = parta_score + partb_score;

    try {
      await addDoc(collection(db, "adhd_responses"), {
        responses: numericalResponses,
        parta_score,
        partb_score,
        inattentive_subscale_score,
        motor_impulsive_subscale_score,
        verbal_impulsive_subscale_score,
        total_score,
        submittedAt: new Date(),
      });
      triggerFlashMessage("Response saved successfully!", "success");
      setResponses(Array(18).fill(null));
    } catch (error) {
      console.error("Error saving responses: ", error);
      triggerFlashMessage("Failed to save the response. Please try again.", "error");
    }
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

      <h1 className="form-title">ADHD Survey</h1>
      <form onSubmit={handleSubmit} className="dass-form">
        {questions.map((question, index) => (
          <div key={`question${index + 1}`} className="question-container">
            <p className="question-text">{`${index + 1}. ${question}`}</p>
            <div className="options-container">
              {options.map((option, optIndex) => (
                <label key={optIndex} className="option-label">
                  <input
                    type="radio"
                    name={`question${index + 1}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={isSubmitting}>
  Submit
</button>

      </form>
    </div>
  );
};

export default ADHDForm;
