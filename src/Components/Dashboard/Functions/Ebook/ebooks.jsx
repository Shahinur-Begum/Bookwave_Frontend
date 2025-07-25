import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ebooks.css';
import Header from '../../../Header/header';
import img from "../../../../Assets/audiobook.jpg";
import axios from 'axios';

// Set the base URL for Axios
const BASE_URL = 'http://localhost:8080/api'; // Replace with your actual backend URL

const EbookPage = () => {
  const navigate = useNavigate();

  const [ebooks, setEbooks] = useState([]); // State for all ebooks
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books based on search
  const [searchTerm, setSearchTerm] = useState(''); // State for storing search term
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Sidebar state

  // Fetch all ebooks from the backend when the component mounts
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ebooks`); // Corrected string interpolation
        setEbooks(response.data);
        setFilteredBooks(response.data); // Initialize filtered books with all fetched ebooks
      } catch (error) {
        console.error('Error fetching ebooks:', error);
      }
    };

    fetchEbooks();
  }, []);

  const goToDetails = (book) => {
    navigate('/audio');
  };

  // Function to handle search by title only
  const handleSearch = (searchTerm) => {
    const cleanedSearchTerm = searchTerm.trim().toLowerCase(); // Clean the search term

    setSearchTerm(searchTerm); // Update the search term state

    if (cleanedSearchTerm === '') {
      setFilteredBooks(ebooks); // If search term is empty, display all books
      return;
    }

    // Filter books by title only
    const filtered = ebooks.filter((book) =>
      book.title.toLowerCase().includes(cleanedSearchTerm)
    );

    setFilteredBooks(filtered); // Update filtered books based on the search term
  };

  const handleSelectBook = (audioLink) => {
    navigate('/audio', { state: { audioLink } }); // Navigate to the audio page and pass the audio link
  };

  const handleReadPdf = (pdf) => {
    window.open(pdf, '_blank'); // Open the PDF in a new tab or window
  };

  return (
    <div className="ebook-page-container">
      <Header books={ebooks} onSearch={handleSearch} hidepart={true} />

      {/* Main Content */}
      <div className={`main-content ${isSidebarExpanded ? "shrink" : ""}`}>
        {/* Welcome Bar */}
        <div className="welcome-bar">
          <div className="welcome-text">
            <h2>E-Resource And Audiobook</h2>
            <p>Explore a vast collection of eResources and audiobooks that bring stories to life.</p>
          </div>
          <div className="welcome-image">
            <img src={img} alt="Book Catalogue" />
          </div>
        </div>

        {/* Render filtered books */}
        <div className="ebook-grid">
          {filteredBooks.length === 0 ? (
            <p>No books found matching your search.</p> // Message when no books match search term
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id} className="ebook-card">
                <img src={book.cover} alt={book.title} className="ebook-cover" />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <div className="ebook-actions">
                  <button
                    className="play-button"
                    onClick={() => handleReadPdf(book.pdf)} // Use book.pdf here
                  >
                    Read PDF
                  </button>
                  <button
                    className="play-button"
                    onClick={() => handleSelectBook(book.audioLink)} // Pass only the audio link
                  >
                    Play Audio
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EbookPage;
