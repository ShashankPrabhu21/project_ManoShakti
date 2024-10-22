import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate, Link } from 'react-router-dom';

function ParentLogin({ handleAuthentication }) {
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

      // Check if user data exists in Firestore 'parents' collection
      const parentRef = doc(db, 'parents', user.uid);
      const parentSnapshot = await getDoc(parentRef);

      if (parentSnapshot.exists()) {
        // If user exists, trigger authentication and navigate to parent dashboard
        handleAuthentication(true, 'parent');
        navigate('/parent-dashboard'); // Navigate to parent dashboard
      } else {
        setError('No data found for this user.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Parent Login</h2>
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
        New here? <Link to="/register/parent">Register as a Parent</Link>
      </p>
    </div>
  );
}

export default ParentLogin;
