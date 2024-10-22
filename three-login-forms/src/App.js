import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import StudentLogin from './components/Auth/StudentLogin';
import CounselorLogin from './components/Auth/CounselorLogin';
import ParentLogin from './components/Auth/ParentLogin';
import StudentRegister from './components/Auth/StudentRegister';
import ParentRegister from './components/Auth/ParentRegister';
import CounselorRegister from './components/Auth/CounselorRegister';

import StudentDashboard from './components/Dashboard/StudentDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';
import CounselorDashboard from './components/Dashboard/CounselorDashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const handleAuthentication = (authStatus, type) => {
    setAuthenticated(authStatus);
    setUserType(type);
  };

  return (
    <div className="App">
      <h1>Login Portal</h1>

      <Routes>
        <Route
          path="/"
          element={<StudentLogin handleAuthentication={handleAuthentication} />}
        />
        {/* Only show dashboard if authenticated */}
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
