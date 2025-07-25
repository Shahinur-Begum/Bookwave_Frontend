import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-background">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">
          We’d love to hear from you! If you have any questions or inquiries, feel free to reach out to us!
        </p>

        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Phone Number:</strong> 018********</p>
          <p><strong>Email:</strong> info@example.com</p>
          <p><strong>Address:</strong> 123 Main Street, City, State, Zip</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
