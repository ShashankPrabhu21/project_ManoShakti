// src/App.js
import React, { useState } from 'react';   
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home'; 
import About from './components/About'; 
import Services from './components/Services'; 
import Contact from './components/contact'; 

import StudentLogin from './components/login/StudentLogin'; 
import ParentLogin from './components/login/ParentLogin'; 
import CounselorLogin from './components/login/CounselorLogin'; 

import StudentRegister from './components/Auth/StudentRegister'; 
import ParentRegister from './components/Auth/ParentRegister';
import CounselorRegister from './components/Auth/CounselorRegister';

import StudentDashboard from './components/Dashboard/StudentDashboard'; 
import ParentDashboard from './components/Dashboard/ParentDashboard'; 
import CounselorDashboard from './components/Dashboard/CounselorDashboard'; 

import MainLayout from './components/Home/MainLayout'; // Import MainLayout component

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const handleAuthentication = (authStatus, type) => {
    setAuthenticated(authStatus);
    setUserType(type);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserType('');
  };

  return (
    <Router>
      {/* MainLayout contains Navbar and possibly other elements */}
      <MainLayout authenticated={authenticated} onLogout={handleLogout}>
        <Routes>
          {/* Public Routes */}
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

          {/* Dashboard Routes (Private) */}
          <Route path="/student-dashboard" element={authenticated && userType === 'student' ? <StudentDashboard /> : <Navigate to="/" />} />
          <Route path="/parent-dashboard" element={authenticated && userType === 'parent' ? <ParentDashboard /> : <Navigate to="/" />} />
          <Route path="/counselor-dashboard" element={authenticated && userType === 'counselor' ? <CounselorDashboard /> : <Navigate to="/" />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
