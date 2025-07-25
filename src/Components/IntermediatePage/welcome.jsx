import React, { useEffect, useState } from 'react';
import './intermediatePage.css'; // Ensure this path is correct

const Welcome = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve the user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // If the user info exists, extract the name or email
    if (userInfo) {
      // For example, if the user data has a 'name' field:
      setUserName(userInfo.name || userInfo.email);  // Use 'name' if available, otherwise use email
    }
  }, []);

  return (
    <div className="welcome">
      <div className="welcome-container">
        <div>
          <h1>Welcome Back, {userName}</h1>  {/* Fallback to 'Guest' if no user is logged in */}
          <p>Hello! We’re glad to see you again.</p>
        </div>
        {/* Add any additional content here if needed, such as an image or a button */}
      </div>
    </div>
  );
};

export default Welcome;