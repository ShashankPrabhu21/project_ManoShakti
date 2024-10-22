import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth
import { db } from '../../firebaseConfig'; // Firebase Firestore
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

function StudentRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [contact, setContact] = useState('');

  const auth = getAuth(); // Initialize Auth

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user's additional information to Firestore
      await setDoc(doc(db, 'students', user.uid), { // Change 'student' to 'students' if needed
        name,
        usn,
        branch,
        section,
        age,
        weight,
        contact,
        email,
      });

      alert('Registration successful');
    } catch (error) {
      console.error("Error registering user:", error); // Log the error for debugging
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Student Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="USN" value={usn} onChange={(e) => setUsn(e.target.value)} />
        <input type="text" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
        <input type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default StudentRegister;
