// src/components/TopNavbar/TopNavbar.js

import React, { useState } from 'react';
import './intermediatePage.css';
import img from '../../Assets/dummy.jpeg';

function TopNavbar({ toggleSidebar }) {
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="top-navbar">
    {/* Hamburger icon for sidebar toggle */}
    <button className="menu-icon" onClick={toggleSidebar}>
      ☰
    </button>
      
      <div className="logo">BookWave</div>
      <input type="text" className="search-bar" placeholder="Search for books, authors..." />
      
      {/* Filter button */}
      <button className="filter-button" onClick={toggleFilter}>
        <i className="fas fa-filter"></i> Filter
      </button>
      
      {/* Filter dropdown menu */}
      {filterVisible && (
        <div className="filter-dropdown">
          <div className="filter-option">Genre</div>
          <div className="filter-option">Author</div>
          <div className="filter-option">Date Published</div>
        </div>
      )}

      <div className="nav-icons">
        <i className="icon fas fa-bell bell-icon"></i> {/* Font Awesome bell icon */}
        <i className="icon fas fa-comments chat-icon"></i> {/* Font Awesome chat icon */}
        <div className="profile">
          <img src={img} alt="Profile" className="profile-pic" />
          <span className="username">Sarah Connor</span>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
