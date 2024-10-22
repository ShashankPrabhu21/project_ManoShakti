import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate,Link } from 'react-router-dom';

function CounselorLogin({ handleAuthentication }) {
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

      // Check if user data exists in Firestore 'counselors' collection
      const counselorRef = doc(db, 'counselors', user.uid);
      const counselorSnapshot = await getDoc(counselorRef);

      if (counselorSnapshot.exists()) {
        // If user exists, trigger authentication and navigate to counselor dashboard
        handleAuthentication(true, 'counselor');
        navigate('/counselor-dashboard'); // Navigate to counselor dashboard
      } else {
        setError('No data found for this user.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Counselor Login</h2>
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
        New here? <Link to="/register/counselor">Register as a Parent</Link>
      </p>
    </div>
  );
}

export default CounselorLogin;
