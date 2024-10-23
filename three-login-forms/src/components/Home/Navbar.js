import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ authenticated, onLogout }) {
    const [anchorEl, setAnchorEl] = useState(null); // State for the dropdown menu
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); // Open the dropdown menu
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the dropdown menu
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the mobile menu
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Aligning "manoShakti" text to the left */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>manoShakti</Link>
                </Typography>

                {/* Navigation Links for larger screens */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Button onClick={() => scrollToSection('home')} color="inherit">Home</Button>
                    <Button onClick={() => scrollToSection('about')} color="inherit">About Us</Button>
                    <Button onClick={() => scrollToSection('services')} color="inherit">Services</Button>
                    <Button onClick={() => scrollToSection('contact')} color="inherit">Contact</Button>

                    {/* Login Dropdown */}
                    <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={handleMenuOpen} 
                        color="inherit">
                        Login
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>
                            <Link to="/login/student" style={{ textDecoration: 'none', color: 'inherit' }}>Student Login</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link to="/login/parent" style={{ textDecoration: 'none', color: 'inherit' }}>Parent Login</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link to="/login/counselor" style={{ textDecoration: 'none', color: 'inherit' }}>Counselor Login</Link>
                        </MenuItem>
                    </Menu>

                    {authenticated && (
                        <Button color="inherit" onClick={onLogout}>Logout</Button>
                    )}
                </Box>

                {/* Hamburger icon for mobile */}
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    onClick={toggleMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }} // Show on small screens only
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile Menu */}
                <Box sx={{ display: { xs: isMenuOpen ? 'block' : 'none', md: 'none' }, position: 'absolute', backgroundColor: 'white', top: '64px', right: 0, zIndex: 1 }}>
                    <Button onClick={() => scrollToSection('home')} style={{ display: 'block', padding: '8px', color: 'black' }}>Home</Button>
                    <Button onClick={() => scrollToSection('about')} style={{ display: 'block', padding: '8px', color: 'black' }}>About Us</Button>
                    <Button onClick={() => scrollToSection('services')} style={{ display: 'block', padding: '8px', color: 'black' }}>Services</Button>
                    <Button onClick={() => scrollToSection('contact')} style={{ display: 'block', padding: '8px', color: 'black' }}>Contact</Button>
                    <Button onClick={handleMenuOpen} style={{ display: 'block', padding: '8px', color: 'black' }}>Login</Button>
                    {authenticated && (
                        <Button color="inherit" onClick={onLogout} style={{ display: 'block', padding: '8px', color: 'black' }}>Logout</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
