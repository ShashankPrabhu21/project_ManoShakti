import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ authenticated, onLogout, children }) => {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Navbar authenticated={authenticated} onLogout={onLogout} setActiveSection={setActiveSection} />

            <Box
                component="main"
                sx={{
                    flex: 1,
                    width: '100%',
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Render the active section */}
                {React.cloneElement(children, { activeSection, setActiveSection })}
            </Box>

            <Footer sx={{ mt: 'auto', py: 2, textAlign: 'center' }} />
        </Box>
    );
}

export default MainLayout;
