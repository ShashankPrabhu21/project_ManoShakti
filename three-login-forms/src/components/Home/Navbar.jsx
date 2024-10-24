import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Close icon for the menu
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger icon for mobile
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Arrow icon for back button

function Navbar({ authenticated, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null); // State for login dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const menuRef = useRef(); // Reference for detecting clicks outside the menu

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the dropdown menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the dropdown menu
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the mobile menu
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after selecting a section
    }
  };

  const handleLoginSelect = () => {
    handleMenuClose(); // Close dropdown after selection
    setIsMenuOpen(false); // Close mobile menu
  };

  // Close the mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* "ManoShakti" logo aligned to the left */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>ManoShakti</Link>
        </Typography>

        {/* Navigation links for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button onClick={() => scrollToSection('home')} color="inherit">Home</Button>
          <Button onClick={() => scrollToSection('about')} color="inherit">About Us</Button>
          <Button onClick={() => scrollToSection('services')} color="inherit">Services</Button>
          <Button onClick={() => scrollToSection('contact')} color="inherit">Contact</Button>

          {/* Login dropdown for larger screens */}
          <Button
            aria-controls="login-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            variant="outlined" // Different style for dropdown button
            sx={{ borderRadius: '20px', padding: '6px 12px' }}
          >
            Login
          </Button>
          <Menu
            id="login-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLoginSelect}>
              <Link to="/login/student" style={{ textDecoration: 'none', color: 'inherit' }}>Student Login</Link>
            </MenuItem>
            <MenuItem onClick={handleLoginSelect}>
              <Link to="/login/parent" style={{ textDecoration: 'none', color: 'inherit' }}>Parent Login</Link>
            </MenuItem>
            <MenuItem onClick={handleLoginSelect}>
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
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Mobile menu */}
        {isMenuOpen && (
          <Box
            ref={menuRef}
            sx={{
              display: { xs: 'block', md: 'none' },
              position: 'absolute',
              backgroundColor: 'white',
              top: '64px',
              right: 0,
              zIndex: 1,
              width: '200px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
            }}
          >
            <Button onClick={() => scrollToSection('home')} style={{ display: 'block', padding: '8px', color: 'black' }}>Home</Button>
            <Button onClick={() => scrollToSection('about')} style={{ display: 'block', padding: '8px', color: 'black' }}>About Us</Button>
            <Button onClick={() => scrollToSection('services')} style={{ display: 'block', padding: '8px', color: 'black' }}>Services</Button>
            <Button onClick={() => scrollToSection('contact')} style={{ display: 'block', padding: '8px', color: 'black' }}>Contact</Button>

            {/* Login dropdown for mobile */}
            <Button
              aria-controls="login-menu-mobile"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="primary" // Change to primary for better visibility
              variant="contained" // Using contained style for visibility
              sx={{ borderRadius: '20px', padding: '6px 12px', display: 'block' }}
            >
              Login
            </Button>
            <Menu
              id="login-menu-mobile"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLoginSelect}>
                <Link to="/login/student" style={{ textDecoration: 'none', color: 'inherit' }}>Student Login</Link>
              </MenuItem>
              <MenuItem onClick={handleLoginSelect}>
                <Link to="/login/parent" style={{ textDecoration: 'none', color: 'inherit' }}>Parent Login</Link>
              </MenuItem>
              <MenuItem onClick={handleLoginSelect}>
                <Link to="/login/counselor" style={{ textDecoration: 'none', color: 'inherit' }}>Counselor Login</Link>
              </MenuItem>
            </Menu>

            {authenticated && (
              <Button color="inherit" onClick={onLogout} style={{ display: 'block', padding: '8px', color: 'black' }}>Logout</Button>
            )}
          </Box>
        )}

        {/* Back to Home button with arrow icon */}
        <IconButton 
          color="inherit" 
          onClick={() => scrollToSection('home')} 
          sx={{ ml: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
