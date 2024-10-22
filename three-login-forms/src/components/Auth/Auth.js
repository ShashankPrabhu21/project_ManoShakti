// src/components/Auth/Auth.js
import React, { useState } from 'react';
import StudentRegister from './StudentRegister';
import ParentRegister from './ParentRegister';
import CounselorRegister from './CounselorRegister';
import StudentLogin from './StudentLogin';
import ParentLogin from './ParentLogin';
import CounselorLogin from './CounselorLogin';

const Auth = ({ handleAuthentication }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedForm, setSelectedForm] = useState('student');

  return (
    <div>
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

      {/* Render the selected login/register form */}
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
    </div>
  );
};

export default Auth;
