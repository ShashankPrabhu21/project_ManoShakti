import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebaseConfig'; // Import db from firebaseConfig
import { doc, getDoc } from 'firebase/firestore'; // Import functions for Firestore
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../login.css"
function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(); // Initialize Firebase Auth
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Student login successful');

      // Use doc and getDoc to access Firestore
      const studentDocRef = doc(db, 'students', auth.currentUser.uid); // Use current user ID
      const docSnap = await getDoc(studentDocRef);

      if (docSnap.exists()) {
        console.log('Student data:', docSnap.data());
        navigate('/student-dashboard'); // Navigate to the student dashboard
      } else {
        console.log('No such student document!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default StudentLogin;
