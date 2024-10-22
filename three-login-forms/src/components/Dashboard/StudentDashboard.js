import React, { useEffect, useState } from 'react'; 
import { auth, db } from '../../firebaseConfig'; // Import Firebase Auth & Firestore
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import ADHDForm from '../ADHD/AdhdForm';
import DASSForm from '../DASS/DASSForm';
import FOMOForm from '../FOMO/FOMOForm';

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Fetch student data from Firestore
    const fetchStudentData = async () => {
      const studentId = auth.currentUser.uid; // Get the current user's ID
      const studentRef = doc(db, 'students', studentId); // Reference to the student's document
      const studentSnapshot = await getDoc(studentRef);
      if (studentSnapshot.exists()) {
        setStudentData(studentSnapshot.data());
      } else {
        console.log('No such student document!');
      }
    };

    fetchStudentData();
  }, []);

  const handleFormSubmission = async (formType, formData) => {
    const studentId = auth.currentUser.uid; // Get the current user's ID
    await db.collection('students').doc(studentId).update({
      [`forms.${formType}`]: formData,
    }).then(() => {
      alert(`${formType.toUpperCase()} form submitted successfully`);
      setFormSubmitted(true);
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {studentData && (
        <div>
          <h3>Welcome, {studentData.name}</h3>
          {/* Display the personal details */}
          <p><strong>USN/Roll Number:</strong> {studentData.usn}</p>
          <p><strong>Branch:</strong> {studentData.branch}</p>
          <p><strong>Age:</strong> {studentData.age}</p>
          <p><strong>Weight:</strong> {studentData.weight}</p>
          <p><strong>Contact:</strong> {studentData.contact}</p>

          {/* Display Forms */}
          <h3>Fill Your Questionnaires</h3>
          {!formSubmitted && (
            <>
              <ADHDForm onSubmit={(data) => handleFormSubmission('adhd', data)} />
              <DASSForm onSubmit={(data) => handleFormSubmission('dass', data)} />
              <FOMOForm onSubmit={(data) => handleFormSubmission('fomo', data)} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
