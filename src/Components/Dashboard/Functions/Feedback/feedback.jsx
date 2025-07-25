import React, { useState } from 'react';
import axios from 'axios';
import './feedback.css';
import Header from '../../../Header/header';
import img from '../../../../Assets/feedback.jpg';

const FeedbackForm = () => {
  const studentId = localStorage.getItem('studentId'); // Get from localStorage
  const [adminId] = useState('3'); // Default adminId
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(''); // Emoji rating

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !description || !rating) {
      alert('Please fill all the fields!');
      return;
    }

    const feedback = {
      description,
      rating: parseFloat(rating),
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/feedback/submit/${studentId}/${adminId}`,
        feedback
      );
      alert('Feedback submitted successfully!');
      console.log('Response:', response.data);
      // No need to reset studentId
      setDescription('');
      setRating('');
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <Header />
      <div className="main-content">
        {/* Welcome Section */}
        <div className="feedwelcome-bar">
          <div className="welcome-text">
            <h2>Feedback</h2>
            <p>
              Your feedback is invaluable in helping us improve and provide a better experience for you.
            </p>
          </div>
          <div className="welcome-image">
            <img src={img} alt="Feedback" />
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Removed Student ID field */}

          <input type="hidden" value={adminId} />

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label>User Friendliness (Rate Us):</label>
            <div className="rating-emoji">
              {[
                { value: '1', label: 'angry', emoji: '😡' },
                { value: '2', label: 'sad', emoji: '😞' },
                { value: '3', label: 'neutral', emoji: '😐' },
                { value: '4', label: 'happy', emoji: '🙂' },
                { value: '5', label: 'very happy', emoji: '😊' },
              ].map(({ value, label, emoji }) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    onChange={(e) => setRating(e.target.value)}
                    checked={rating === value}
                    required
                  />
                  <span role="img" aria-label={label} className="emoji">
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
