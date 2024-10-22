// src/components/Dashboard/ParentDashboard.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Import your Firebase config
import { doc, getDoc } from 'firebase/firestore';

function ParentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const user = auth.currentUser; // Assuming you're using Firebase auth

  useEffect(() => {
    const fetchStudentData = async () => {
      if (user) {
        const studentRef = doc(db, 'students', user.uid); // Assuming 'uid' is the student ID
        try {
          const studentDoc = await getDoc(studentRef);
          if (studentDoc.exists()) {
            setStudentData(studentDoc.data());
          } else {
            setError('No student data found.');
          }
        } catch (err) {
          setError(err.message);
        }
      } else {
        setError('User not authenticated.');
      }
    };

    fetchStudentData();
  }, [user]);

  return (
    <div>
      <h1>Parent Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {studentData ? (
        <div>
          <h2>Student Information</h2>
          {/* Render student data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ParentDashboard;
