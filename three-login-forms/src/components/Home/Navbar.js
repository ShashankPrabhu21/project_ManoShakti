// src/components/Home/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to import your CSS

function Navbar({ authenticated, onLogout }) {
    return (
        <header>
            <div className="navbar">
                <div className="logo">
                    <h2>ManoShakthi</h2>
                </div>
                <ul className="nav-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li className="dropdown">
                        <Link to="#">Login</Link>
                        <div className="dropdown-content">
                            <Link to="/login/student">Student Login</Link>
                            <Link to="/login/parent">Parent Login</Link>
                            <Link to="/login/counselor">Counselor Login</Link>
                        </div>
                    </li>
                    {authenticated && (
                        <li>
                            <button onClick={onLogout}>Logout</button> {/* Add logout button */}
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
