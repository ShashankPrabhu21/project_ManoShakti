import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Import your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate, Link } from 'react-router-dom';

function StudentLogin({ handleAuthentication }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user data exists in Firestore 'students' collection
      const studentRef = doc(db, 'students', user.uid);
      const studentSnapshot = await getDoc(studentRef);

      if (studentSnapshot.exists()) {
        // If user exists, trigger authentication and navigate to student dashboard
        handleAuthentication(true, 'student');
        navigate('/student-dashboard'); // Navigate to the dashboard
      } else {
        // If user data doesn't exist, show error
        setError('No data found for this user. Please contact support.');
      }
    } catch (error) {
      // Display any login error
      setError(error.message);
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
       <p>
        New here? <Link to="/register/student">Register as a Student</Link>
      </p>
    </div>
  );
}

export default StudentLogin;
