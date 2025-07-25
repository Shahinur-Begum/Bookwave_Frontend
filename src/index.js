import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';  // Import App component
import "@fortawesome/fontawesome-free/css/all.min.css";  // Import FontAwesome styles

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App directly without a router here, as it is already handled in App.js
root.render(<App />);
