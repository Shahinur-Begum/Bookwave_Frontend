import React, { useState, useEffect } from 'react';
import './settings.css';

const SettingsPage = ({ onClose }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [readingMode, setReadingMode] = useState('Day');

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  // Toggle Dark Mode
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Handle reading mode change
  const handleReadingModeChange = (e) => {
    setReadingMode(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-close" onClick={onClose}>
          &times;
        </div>
        <h1>Settings</h1>

        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle">
          <label>
            Dark Mode
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
            />
          </label>
        </div>

        {/* Reading Mode */}
        <div className="input-box">
          <label htmlFor="readingMode">Reading Mode</label>
          <select
            name="readingMode"
            value={readingMode}
            onChange={handleReadingModeChange}
          >
            <option value="Day">Day</option>
            <option value="Night">Night</option>
            <option value="Sepia">Sepia</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;