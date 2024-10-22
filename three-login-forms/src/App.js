import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import StudentLogin from './components/Auth/StudentLogin';
import ParentLogin from './components/Auth/ParentLogin';
import CounselorLogin from './components/Auth/CounselorLogin';

import StudentRegister from './components/Auth/StudentRegister';
import ParentRegister from './components/Auth/ParentRegister';
import CounselorRegister from './components/Auth/CounselorRegister';

import StudentDashboard from './components/Dashboard/StudentDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';
import CounselorDashboard from './components/Dashboard/CounselorDashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState(''); // Track the logged-in user type (student, parent, or counselor)
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [selectedForm, setSelectedForm] = useState('student'); // Track which form (student, parent, or counselor)

  const handleAuthentication = (authStatus, type) => {
    setAuthenticated(authStatus);
    setUserType(type);
  };

  return (
    <div className="App">
      <h1>Login Portal</h1>

      {/* Toggle between Login and Register */}
      <div className="toggle-buttons">
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>

      {/* Toggle between Student, Parent, and Counselor */}
      <div className="user-type-buttons">
        <button onClick={() => setSelectedForm('student')}>Student</button>
        <button onClick={() => setSelectedForm('parent')}>Parent</button>
        <button onClick={() => setSelectedForm('counselor')}>Counselor</button>
      </div>

      {/* Render either Login or Register form based on toggle and user type */}
      {isLogin ? (
        selectedForm === 'student' ? (
          <StudentLogin handleAuthentication={handleAuthentication} />
        ) : selectedForm === 'parent' ? (
          <ParentLogin handleAuthentication={handleAuthentication} />
        ) : (
          <CounselorLogin handleAuthentication={handleAuthentication} />
        )
      ) : (
        selectedForm === 'student' ? (
          <StudentRegister />
        ) : selectedForm === 'parent' ? (
          <ParentRegister />
        ) : (
          <CounselorRegister />
        )
      )}

      <Routes>
        {/* Dashboard Routes */}
        <Route
          path="/student-dashboard"
          element={authenticated && userType === 'student' ? <StudentDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/parent-dashboard"
          element={authenticated && userType === 'parent' ? <ParentDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/counselor-dashboard"
          element={authenticated && userType === 'counselor' ? <CounselorDashboard /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
