import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed

import Welcome from "./welcome"; // Welcome component
import Header from "../Header/header"; // Header component
import "./intermediatePage.css"; // CSS for styling

const IntermediatePage = () => {
  const [books, setBooks] = useState([]); // Store all fetched books
  const [filteredBooks, setFilteredBooks] = useState([]); // Store filtered books based on search
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For navigation to book detail page

  // Fetch all books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/admin/books"); // API to fetch books
        setBooks(response.data); // Set all fetched books
        setFilteredBooks(response.data); // Set filtered books to all initially
      } catch (err) {
        console.error("Error fetching books:", err); // Log error for debugging
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []); // Run only once when the component mounts

  // Handle search functionality (filter books by title or author)
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredBooks(books); // If no search term, show all books
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered); // Update filtered books based on the search term
    }
  };

  // Navigate to book details page
  const goToDetails = (id) => {
    navigate(`/bookdetail/${id}`);
  };

  return (
    <div className="intermediate-page">
      {/* Header component with search functionality */}
      <Header books={books} onSearch={handleSearch} />

      <div className="main-content">
        {/* Welcome component */}
        <Welcome />

        <div className="page-layout">
          <div className="bookpage main">
            <div className="bookpage main-sec">
              {/* Display loading message or error */}
              {loading ? (
                <p>Loading books...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                // Display filtered books in a grid layout
                <div className="books-grid">
                  {filteredBooks.length === 0 ? (
                    <p>No books found</p> // Show this if no books match the search
                  ) : (
                    filteredBooks.map((book) => (
                      <div className="book-card" key={book.id} onClick={() => goToDetails(book.id)}>
                        <img
                          src={book.cover || "default-cover.jpg"}
                          alt={`Cover of ${book.title || "Untitled Book"}`}
                          className="book-cover"
                        />
                        <div className="book-info">
                          <h3 className="book-title">{book.title}</h3>
                          <p className="book-author">by {book.author}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntermediatePage;
