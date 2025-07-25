import React, { useState } from 'react';
import './navbar.css';
import { GiBookCover } from 'react-icons/gi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { CiMenuBurger } from 'react-icons/ci';
import { BiSearch, BiFilterAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setSearchQuery, setAuthorFilter }) => {
  const [active, setActive] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');  // Track search type (title or author)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle the sidebar
  const toggleNav = () => {
    setActive(!active);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    if (searchType === 'title') {
      setSearchQuery(query); // Update search query by title
    } else {
      setAuthorFilter(query); // Update author filter
    }
  };

  // Handle search type change (title or author)
  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setShowFilterDropdown(false); // Close dropdown after selection
    setLocalSearchQuery(''); // Clear search input
    if (type === 'title') {
      setSearchQuery('');  // Reset the search query when switching to title search
    } else {
      setAuthorFilter(''); // Reset the author filter when switching to author search
    }
  };

  // Redirect to login page
  const handleRedirectToLogin = () => {
    navigate('/login'); // Redirect to the specified route
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <div className="toggleNavbar" onClick={toggleNav}>
            {active ? <AiFillCloseCircle className="icon" /> : <CiMenuBurger className="icon" />}
          </div>
          <a href="#" className="logo">
            <GiBookCover className="home-icon" />
            <span>BookWave.</span>
          </a>
        </div>

        {/* Search Form */}
        <form className="searchForm">
          <div className="searchInputContainer">
            <BiSearch className="searchIcon" />
            <input
              type="text"
              placeholder={`Search by ${searchType}...`} // Corrected the placeholder syntax
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="searchInput"
            />
          </div>
        </form>

        {/* Filter Icon */}
        <div className="filterIconContainer" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
          <BiFilterAlt className="filterIcon" />
        </div>

        {/* Filter Dropdown */}
        {showFilterDropdown && (
          <div className="filterDropdown">
            <div className="filterGroup">
              <button className="filterOption" onClick={() => handleSearchTypeChange('title')}>
                Title
              </button>
            </div>
            <div className="filterGroup">
              <button className="filterOption" onClick={() => handleSearchTypeChange('author')}>
                Author
              </button>
            </div>
          </div>
        )}

        {/* Login Button */}
        <button className="login-button">
          <Link to="/login">LOGIN</Link>
        </button>

        {/* Left Sidebar */}
        <div className={active ? 'navBar activeNavbar leftSidebar' : 'navBar leftSidebar'}>
          <ul className="navLists grid">
            <li className="navItem" onClick={() => handleRedirectToLogin('/login')}>
              <span className="navLink">
                <i className="fas fa-book"></i> Catalogue
              </span>
            </li>
            <li className="navItem" onClick={() => handleRedirectToLogin('/login')}>
              <span className="navLink">
                <i className="fas fa-tablet-alt"></i> E-Resource
              </span>
            </li>
            <li className="navItem" onClick={() => handleRedirectToLogin('/login')}>
              <span className="navLink">
                <i className="fas fa-credit-card"></i> Payment
              </span>
            </li>
            <li className="navItem" onClick={() => handleRedirectToLogin('/login')}>
              <span className="navLink">
                <i className="fas fa-comment-dots"></i> Feedback
              </span>
            </li>
            <li className="navItem">
              <Link to="/about" className="navLink">
                <i className="fas fa-info-circle"></i> About Us
              </Link>
            </li>
            <li className="navItem">
              <Link to="/contact" className="navLink">
                <i className="fas fa-envelope"></i> Contact
              </Link>
            </li>
          </ul>
        </div>
        {active && <div className="blueOverlay" onClick={toggleNav}></div>}
      </header>
    </section>
  );
};

export default Navbar;
