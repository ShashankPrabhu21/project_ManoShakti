import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; // Import Firebase Auth

function CounselorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert('Counselor login successful');
      // Redirect or navigate to counselor dashboard here
    } catch (error) {
      alert(error.message);
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

export default CounselorLogin;
