import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import dummyImg from "../../Assets/dummy.jpeg";
import Profile from "../../Components/Profile/profile";
import './header.css'; // Combined CSS
import SettingsPage from '../Dashboard/Functions/Settings/settings';

const Header = ({ books, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false); // For showing/hiding filter dropdown
  const [filterType, setFilterType] = useState('title'); // Default filter by title
  const [isModalOpen, setModalOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  // State to control the visibility of the settings page modal
  const [isSettingsPageOpen, setSettingsPageOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Fetch user details
  console.log(userInfo);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear any user-related data (e.g., tokens)
    localStorage.removeItem('userInfo'); // Clear user data
    navigate('/login'); // Redirect to login page

    // Optionally, display a success message (use a toast library or alert)
    alert('You have been logged out.');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search term is empty, clear suggestions
    if (value.trim() === "") {
      setSuggestedBooks([]); // Clear suggestions if the search term is empty
      onSearch(value, filterType); // Reset to all books (show all)
      return;
    }

    // Filter suggestions based on search term and filter type
    const filteredSuggestions = books.filter((book) =>
      book[filterType].toLowerCase().includes(value.toLowerCase())
    );
    setSuggestedBooks(filteredSuggestions); // Set the filtered suggestions

    // Pass the search term and filter type to the parent to update the filtered books
    onSearch(value, filterType);
  };

  // Handle filter change
  const handleFilterChange = (type) => {
    setFilterType(type);
    onSearch(searchTerm, type); // Update filter and trigger search
  };

  const handleBookClick = (book) => {
    if (book && book.id) {
      onSearch(book.id); // Notify parent that a book is selected
    }
  };

  const toggleFilter = () => setFilterVisible(!filterVisible);

  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isCatalogueVisible, setCatalogueVisible] = useState(false);

  const toggleSidebar = () => setSidebarExpanded((prev) => !prev);
  const toggleCatalogue = () => setCatalogueVisible((prev) => !prev);

  // Handle Profile click
  const handleProfileClick = () => {
    console.log('Profile clicked!'); // Debug to ensure this runs
    setModalOpen(true);
  };

  // Close Profile Modal
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
        <ul className="sidebar-items">
          {/* Book Catalogue */}
          <li onClick={toggleCatalogue}>
            <div>
              <i className="fas fa-book"></i> {isSidebarExpanded && "Book Catalogue"}
            </div>
          </li>

          {/* Subcategories */}
          {isCatalogueVisible && (
            <ul className="submenu">
              <li onClick={() => navigate('/storybooks')}>StoryBooks</li>
              <li onClick={() => navigate('/csebooks')}>Computer Science and Engineering</li>
              <li onClick={() => navigate('/eebooks')}>Electrical Engineering</li>
              <li onClick={() => navigate('/mebooks')}>Mechanical Engineering</li>
            </ul>
          )}

          <li  className="grey-option">
            <Link to="/ebooks">
              <i className="fas fa-tablet-alt"></i> {isSidebarExpanded && "eBooks"}
            </Link>
          </li>
          <li className="grey-option">
            <Link to="/Thesis">
              <i className="fas fa-book"></i> {isSidebarExpanded && "Thesis"}
           </Link>
          </li>

          <li  className="grey-option">
            <Link to="/payment">
              <i className="fas fa-credit-card"></i> {isSidebarExpanded && "Payment"}
            </Link>
          </li>
          <li  className="grey-option">
            <Link to="/feedback">
              <i className="fas fa-comment-dots"></i> {isSidebarExpanded && "Feedback"}
            </Link>
          </li>
          <li className="grey-option">

            <Link to="/dashboarduser">
              <i className="fas fa-tachometer-alt"></i> {isSidebarExpanded && "Dashboard"}
            </Link>
          </li>
          <li
            className="grey-option"
            onClick={() => setShowSettingsModal(true)}
          >
            <i className="fas fa-cogs settings-icon"></i>
            {isSidebarExpanded && 'Settings'}
          </li>
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <i className="fas fa-sign-out-alt"></i> {isSidebarExpanded && "Logout"}
          </li>
        </ul>
      </div>

      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SettingsPage onClose={() => setShowSettingsModal(false)} /> {/* Pass onClose to close the modal */}
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <div className="top-navbar">
        <button className="menu-icon" onClick={toggleSidebar}>☰</button>
        <div className="logo">BookWave</div>

        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder={`Search by ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}...`} // Dynamic placeholder
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Filter Button */}
        <button className="filter-button" onClick={toggleFilter}>
          <i className="fas fa-filter"></i> Filter
        </button>
        {filterVisible && (
          <div className="filter-dropdown">
            <div className="filter-option" onClick={() => handleFilterChange("title")}>Title</div>
            <div className="filter-option" onClick={() => handleFilterChange("author")}>Author</div>
          </div>
        )}

        {/* Suggested Books */}
        {searchTerm && suggestedBooks.length > 0 && (
          <div className="suggestions">
            <h3>Suggested Books:</h3>
            <ul>
              {suggestedBooks.map((book) => (
                <li key={book.id} onClick={() => handleBookClick(book)}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navbar Icons and Profile */}
        <div className="nav-icons">
          <i className="icon fas fa-sign-out-alt logout-icon" onClick={handleLogout}></i>
          <div className="profile" onClick={handleProfileClick}>
            <img src={dummyImg} alt="Profile" className="profile-pic" />
            <span className="username">{userInfo?.name}</span>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <Profile
        isOpen={isModalOpen}
        onClose={closeModal}
        email={userInfo?.email || ''}
        student={{
          profilePicture: dummyImg, // Replace with fetched picture if available
          name: userInfo?.name || '',
          id: userInfo?.id || '',
          email: userInfo?.email || '',
          batch: userInfo?.batch || '',
          department: userInfo?.dept || '',
          address: userInfo?.address || '',
          interest: userInfo?.interest || '',
        }}
      />
    </div>
  );
};

export default Header;
