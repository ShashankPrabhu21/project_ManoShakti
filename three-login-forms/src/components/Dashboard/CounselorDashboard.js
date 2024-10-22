import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'; // Modular Firestore functions

function CounselorDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch all students from Firestore
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students'); // Get the 'students' collection reference
      const studentSnapshot = await getDocs(studentsCollection); // Get all documents in the collection
      setStudents(studentSnapshot.docs.map(doc => doc.data())); // Map through the documents and get the data
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
            {/* Check if the forms object exists and contains adhd, dass, and fomo */}
            <p><strong>ADHD Form:</strong> {student.forms?.adhd ? JSON.stringify(student.forms.adhd) : 'Not submitted'}</p>
            <p><strong>DASS Form:</strong> {student.forms?.dass ? JSON.stringify(student.forms.dass) : 'Not submitted'}</p>
            <p><strong>FOMO Form:</strong> {student.forms?.fomo ? JSON.stringify(student.forms.fomo) : 'Not submitted'}</p>
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
