import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const Navbar = ({ authenticated, onLogout, setActiveSection }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navButtons = [
    { label: 'Home', action: () => navigate('/') },
    { label: 'About Us', action: () => navigate('/about') },
    { label: 'Services', action: () => navigate('/services') },
    { label: 'Contact', action: () => navigate('/contact') },
  ];
  

  const loginOptions = [
    { label: 'Student Login', path: '/login/student' },
    { label: 'Parent Login', path: '/login/parent' },
    { label: 'Counselor Login', path: '/login/counselor' },
  ];

  const renderNavButton = (button, mobile = false) => (
    <Button
      key={button.label}
      onClick={button.action}
      color={mobile ? "primary" : "inherit"} // Change color based on mobile view
      variant={mobile ? "contained" : "text"} // Use contained variant for mobile
      sx={{
        borderRadius: '20px',
        padding: '6px 12px',
        margin: mobile ? '8px 0' : '0', // Add margin for mobile buttons
        width: mobile ? '100%' : 'auto', // Make buttons full width in mobile view
      }}
    >
      {button.label}
    </Button>
  );

  const renderLoginOptions = (mobile) => (
    <Menu
      id={mobile ? 'login-menu-mobile' : 'login-menu'}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {loginOptions.map((option) => (
        <MenuItem key={option.label} onClick={handleMenuClose}>
          <Link to={option.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            {option.label}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>ManoShakti</Link>
        </Typography>

        {/* Desktop Nav Buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navButtons.map(button => renderNavButton(button))}
          <Button
            aria-controls="login-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            variant="outlined"
            sx={{ borderRadius: '20px', padding: '6px 12px' }}
          >
            Login
          </Button>
          {authenticated && <Button color="inherit" onClick={onLogout}>Logout</Button>}
        </Box>

        {/* Mobile Menu Toggle */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Mobile Nav Menu */}
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
            {navButtons.map(button => renderNavButton(button, true))} {/* Pass true for mobile view */}
            <Button
              aria-controls="login-menu-mobile"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="primary"
              variant="contained"
              sx={{ borderRadius: '20px', padding: '6px 12px', display: 'block', marginTop: '8px' }}
            >
              Login
            </Button>
            {renderLoginOptions(true)}
            {authenticated && (
              <Button color="primary" onClick={onLogout} sx={{ display: 'block', padding: '8px', width: '100%' }}>
                Logout
              </Button>
            )}
          </Box>
        )}

        {/* Back to Home button with arrow icon */}
        <IconButton color="inherit" onClick={() => navigate('/')} sx={{ ml: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
      {renderLoginOptions(false)}
    </AppBar>
  );
};

export default Navbar;
