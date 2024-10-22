import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; // Import Firebase Auth

function ParentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert('Parent login successful');
      // Redirect or navigate to parent dashboard here
    } catch (error) {
      alert(error.message);
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

export default ParentLogin;
