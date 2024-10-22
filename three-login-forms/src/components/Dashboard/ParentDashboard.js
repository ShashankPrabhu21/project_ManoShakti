import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

function ParentDashboard() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Fetch student's data based on parent's linked student ID
    const fetchStudentData = async () => {
      const parentId = auth.currentUser.uid;
      const parentRef = db.collection('parents').doc(parentId);
      const parentSnapshot = await parentRef.get();
      if (parentSnapshot.exists) {
        const { studentId } = parentSnapshot.data();
        const studentRef = db.collection('students').doc(studentId);
        const studentSnapshot = await studentRef.get();
        if (studentSnapshot.exists) {
          setStudentData(studentSnapshot.data());
        }
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div>
      <h2>Parent Dashboard</h2>
      {studentData && (
        <div>
          <h3>Student: {studentData.name}</h3>
          {/* Display the student's form submissions */}
          <p><strong>ADHD Form:</strong> {JSON.stringify(studentData.forms.adhd)}</p>
          <p><strong>DASS Form:</strong> {JSON.stringify(studentData.forms.dass)}</p>
          <p><strong>FOMO Form:</strong> {JSON.stringify(studentData.forms.fomo)}</p>
        </div>
      )}
    </div>
  );
}

export default ParentDashboard;
