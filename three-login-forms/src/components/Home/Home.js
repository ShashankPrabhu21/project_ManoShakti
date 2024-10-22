// src/components/Home.js

import React from 'react';

import WelcomeSection from './WelcomeSection'; // Adjust the path based on your folder structure

const Home = () => {
  return (
    <div>
     
      <WelcomeSection /> {/* Render the Welcome Section */}

      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Select your role to log in:</h2>

        

        {/* About Section */}
        <section style={{ margin: '20px 0' }}>
          <h2>About Us</h2>
          <p>We provide support and resources for students, parents, and counselors.</p>
        </section>

        {/* Services Section */}
        <section style={{ margin: '20px 0' }}>
          <h2>Our Services</h2>
          <ul>
            <li>Academic Counseling</li>
            <li>Mental Health Support</li>
            <li>Career Guidance</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section style={{ margin: '20px 0' }}>
          <h2>Contact Us</h2>
          <p>Email: support@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </section>
      </div>
    </div>
  );
};

export default Home;
