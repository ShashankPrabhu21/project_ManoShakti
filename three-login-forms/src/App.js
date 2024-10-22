// src/App.js

import React, { useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home'; 
import About from './components/About'; 
import Services from './components/Services'; 
import Contact from './components/contact'; 

import StudentLogin from './components/Auth/StudentLogin'; 
import ParentLogin from './components/Auth/ParentLogin'; 
import CounselorLogin from './components/Auth/CounselorLogin'; 

import StudentRegister from './components/Auth/StudentRegister'; // Import Registration Components
import ParentRegister from './components/Auth/ParentRegister';
import CounselorRegister from './components/Auth/CounselorRegister';

import StudentDashboard from './components/Dashboard/StudentDashboard'; 
import ParentDashboard from './components/Dashboard/ParentDashboard'; 
import CounselorDashboard from './components/Dashboard/CounselorDashboard'; 

import Navbar from './components/Home/Navbar'; 
import Footer from './components/Home/Footer'; 

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const handleAuthentication = (authStatus, type) => {
    setAuthenticated(authStatus);
    setUserType(type);
  };

  const handleLogout = () => {
    // Implement logout logic (e.g., signOut from Firebase)
    setAuthenticated(false);
    setUserType('');
  };

  return (
     <Router>
      <div className="App">
        <Navbar authenticated={authenticated} onLogout={handleLogout} /> {/* Pass props to Navbar */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* Login Routes */}
            <Route path="/login/student" element={<StudentLogin handleAuthentication={handleAuthentication} />} />
            <Route path="/login/parent" element={<ParentLogin handleAuthentication={handleAuthentication} />} />
            <Route path="/login/counselor" element={<CounselorLogin handleAuthentication={handleAuthentication} />} />

            {/* Registration Routes */}
            <Route path="/register/student" element={<StudentRegister />} />
            <Route path="/register/parent" element={<ParentRegister />} />
            <Route path="/register/counselor" element={<CounselorRegister />} />

            {/* Dashboard Routes */}
            <Route path="/student-dashboard" element={authenticated && userType === 'student' ? <StudentDashboard /> : <Navigate to="/" />} />
            <Route path="/parent-dashboard" element={authenticated && userType === 'parent' ? <ParentDashboard /> : <Navigate to="/" />} />
            <Route path="/counselor-dashboard" element={authenticated && userType === 'counselor' ? <CounselorDashboard /> : <Navigate to="/" />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
