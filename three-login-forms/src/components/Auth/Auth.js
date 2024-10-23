// src/components/Auth/Auth.js
import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import StudentRegister from './StudentRegister';
import ParentRegister from './ParentRegister';
import CounselorRegister from './CounselorRegister';
import StudentLogin from '../login/StudentLogin';
import ParentLogin from '../login/ParentLogin';
import CounselorLogin from '../login/CounselorLogin';

const Auth = ({ handleAuthentication }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [selectedForm, setSelectedForm] = useState('student');

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login Portal
            </Typography>

            {/* Toggle between Login and Register */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button
                    variant={isLogin ? 'contained' : 'outlined'}
                    onClick={() => setIsLogin(true)}
                    sx={{ marginRight: 1 }}
                >
                    Login
                </Button>
                <Button
                    variant={!isLogin ? 'contained' : 'outlined'}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </Button>
            </Box>

            {/* Toggle between Student, Parent, and Counselor */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button
                    variant={selectedForm === 'student' ? 'contained' : 'outlined'}
                    onClick={() => setSelectedForm('student')}
                    sx={{ marginRight: 1 }}
                >
                    Student
                </Button>
                <Button
                    variant={selectedForm === 'parent' ? 'contained' : 'outlined'}
                    onClick={() => setSelectedForm('parent')}
                    sx={{ marginRight: 1 }}
                >
                    Parent
                </Button>
                <Button
                    variant={selectedForm === 'counselor' ? 'contained' : 'outlined'}
                    onClick={() => setSelectedForm('counselor')}
                >
                    Counselor
                </Button>
            </Box>

            {/* Form Container */}
            <Box sx={{ border: '1px solid', borderColor: 'grey.400', borderRadius: 2, padding: 3 }}>
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
            </Box>
        </Container>
    );
};

export default Auth;
