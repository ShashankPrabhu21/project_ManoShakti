import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';

function CounselorDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch all students from Firestore
    const fetchStudents = async () => {
      const studentSnapshot = await db.collection('students').get();
      setStudents(studentSnapshot.docs.map(doc => doc.data()));
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Counselor Dashboard</h2>
      {students.length > 0 ? (
        students.map((student, index) => (
          <div key={index}>
            <h3>{student.name}</h3>
            <p><strong>USN:</strong> {student.usn}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Weight:</strong> {student.weight}</p>
            <p><strong>Contact:</strong> {student.contact}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <h4>Forms:</h4>
            <p><strong>ADHD Form:</strong> {JSON.stringify(student.forms.adhd)}</p>
            <p><strong>DASS Form:</strong> {JSON.stringify(student.forms.dass)}</p>
            <p><strong>FOMO Form:</strong> {JSON.stringify(student.forms.fomo)}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default CounselorDashboard;
