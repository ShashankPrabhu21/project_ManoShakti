import React, { useState } from 'react';
import './App.css'; // Importing the CSS file
import StudentLogin from './components/Auth/StudentLogin';
import CounselorLogin from './components/Auth/CounselorLogin';
import ParentLogin from './components/Auth/ParentLogin';
import StudentRegister from './components/Auth/StudentRegister'; // Assuming this exists
import ParentRegister from './components/Auth/ParentRegister';   // Assuming this exists
import CounselorRegister from './components/Auth/CounselorRegister'; // Assuming this exists

 

function App() {
  const [selectedForm, setSelectedForm] = useState('student'); // State to manage form selection
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration

  return (
    <div className="App">
      <h1>Login Portal</h1>
      
      {/* Toggle between Login and Register */}
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>

      <div>
        {/* Toggle between Student, Counselor, and Parent */}
        <button onClick={() => setSelectedForm('student')}>Student</button>
        <button onClick={() => setSelectedForm('counselor')}>Counselor</button>
        <button onClick={() => setSelectedForm('parent')}>Parent</button>
      </div>

      {/* Login or Register Forms Based on Toggle */}
      {isLogin ? (
        <div>
          {selectedForm === 'student' && <StudentLogin />}
          {selectedForm === 'counselor' && <CounselorLogin />}
          {selectedForm === 'parent' && <ParentLogin />}
        </div>
      ) : (
        <div>
          {selectedForm === 'student' && <StudentRegister />}
          {selectedForm === 'counselor' && <CounselorRegister />}
          {selectedForm === 'parent' && <ParentRegister />}
        </div>
      )}
 
    </div>
  );
}

export default App;
