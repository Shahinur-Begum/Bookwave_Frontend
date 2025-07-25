import React from 'react';
import './about.css'; // Ensure this CSS file exists for styling
import { FaBookOpen, FaHeadphones, FaCreditCard } from 'react-icons/fa';

const About = () => {
    return (
        <div className="about-page">
        <div className="about-container">
            <p>
                Welcome to <strong>BookWave</strong>, your go-to platform for an immersive reading experience. 
                We are dedicated to connecting readers with a diverse range of literature, ensuring 
                that you find exactly what you're looking for!
            </p>

            <div className="features">
                <div className="feature-item">
                    <FaBookOpen className="feature-icon" />
                    <p>Explore a vast collection of textbooks, novels, and audiobooks.</p>
                </div>
                <div className="feature-item">
                    <FaHeadphones className="feature-icon" />
                    <p>Enjoy listening to your favorite books on the go.</p>
                </div>
                <div className="feature-item">
                    <FaCreditCard className="feature-icon" />
                    <p> Got to know ur dues in a arranged way!</p>
                </div>
            </div>

            <p>
                Join us on this exciting journey through the world of books—where every page turns into a new adventure!
            </p>
        </div>
    </div>
    );
};

export default About;
