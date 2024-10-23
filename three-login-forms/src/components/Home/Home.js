import React, { useState } from 'react'; 
import WelcomeSection from './WelcomeSection'; 
import { Container, Typography, Box, TextField, Button } from '@mui/material'; 
import { db } from '../../firebaseConfig'; // Import your Firebase config
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods
import './Home.css'; 

const Home = () => {
  // State for feedback form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add feedback to Firestore
      await addDoc(collection(db, 'feedbacks'), {
        name,
        email,
        feedback,
        createdAt: new Date(),
      });

      alert('Feedback submitted successfully!');
      setName('');
      setEmail('');
      setFeedback('');
    } catch (error) {
      console.error('Error adding feedback: ', error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <Container className="home-container" maxWidth="lg">
      <section id="home">
        <WelcomeSection /> 
      </section>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Select your role to log in:
        </Typography>

        {/* About Section */}
        <section id="about">
          <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: 2, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography paragraph>
              At ManoShakthi, we are dedicated to providing comprehensive support and resources for students, parents, and counselors. Our mission is to create a nurturing environment where individuals can thrive academically and emotionally.
            </Typography>
            <Typography paragraph>
              We offer a range of services, including academic counseling, mental health support, and career guidance. Our experienced team is here to assist with various challenges faced by students, ensuring they have the tools and resources necessary to succeed.
            </Typography>
            <Typography paragraph>
              Whether you are a student seeking guidance, a parent looking for resources to support your child, or a counselor aiming to enhance your practice, we are here to help. Join us in our commitment to fostering a supportive and empowering community.
            </Typography>
          </Box>
        </section>

        {/* Services Section */}
        <section id="services">
          <Box sx={{ padding: '20px', borderRadius: 2, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Our Services
            </Typography>
            <Typography paragraph>
              At ManoShakthi, we offer a variety of services designed to support students, parents, and counselors in their educational journeys. Our dedicated team is committed to helping you achieve your goals through personalized assistance and expert guidance.
            </Typography>
            <ul>
              <li>
                <strong>Academic Counseling:</strong> Our academic counselors work closely with students to help them navigate their educational paths. We provide guidance on course selection, study strategies, and time management, ensuring students make informed decisions that align with their career aspirations.
              </li>
              <li>
                <strong>Mental Health Support:</strong> We understand that mental well-being is crucial for success. Our mental health professionals offer counseling services, workshops, and resources to help students cope with stress, anxiety, and other challenges. We aim to create a safe space for individuals to discuss their concerns and seek support.
              </li>
              <li>
                <strong>Career Guidance:</strong> Preparing for the future can be overwhelming. Our career guidance services assist students in exploring potential career paths, developing job search skills, and preparing for interviews. We also provide resources for resume building and networking, ensuring students are ready to enter the workforce confidently.
              </li>
            </ul>
          </Box>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography paragraph>
              We value your feedback and are here to help! If you have any questions, comments, or concerns, please feel free to reach out to us. Our team is dedicated to providing the support you need.
            </Typography>
            <Typography paragraph>
              <strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a>
            </Typography>
            <Typography paragraph>
              <strong>Phone:</strong> <a href="tel:+1234567890">(123) 456-7890</a>
            </Typography>
            <Typography paragraph>
              We appreciate your feedback! Please fill out the form below to share your thoughts with us.
            </Typography>

            {/* Feedback Form */}
            <form onSubmit={handleSubmit}>
              <TextField 
                label="Your Name" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
              <TextField 
                label="Your Email" 
                type="email" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <TextField 
                label="Feedback" 
                multiline 
                rows={4} 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                required 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)} 
              />
              <Button type="submit" variant="contained" color="primary">
                Submit Feedback
              </Button>
            </form>

            <Typography paragraph>
              Feel free to follow us on social media for the latest updates and resources:
            </Typography>
            <ul>
              <li><a href="https://www.facebook.com/YourPage" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.twitter.com/YourPage" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.instagram.com/YourPage" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </Box>
        </section>
      </Box>
    </Container>
  );
};

export default Home;
