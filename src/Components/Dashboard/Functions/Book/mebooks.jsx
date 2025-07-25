import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./book.css"; // CSS for grid layout
import img from "../../../../Assets/MEimg.jpg"; // Image for welcome section
import Header from "../../../Header/header"; // Header Component

function MEBooks() {
  const [books, setBooks] = useState([]); // State for fetched books
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/books/category/Mechanical Engineering"
        );
        setBooks(response.data);
        setFilteredBooks(response.data); // Initialize with all ME books
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Function to handle navigation to book details page
  const goToDetails = (id) => {
    navigate(`/bookdetail/${id}`);
  };

  // Function to handle search functionality from the nav bar
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredBooks(books); // Show all books if search term is empty
    } else {
      // Filter books by title or author
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered); // Update filtered books based on search term
    }
  };

  return (
    <div className="book-container">
      {/* Include Header Component with search handling */}
      <Header
        books={books}
        onSearch={handleSearch}
        category="Mechanical Engineering"
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Bar */}
        <div className="welcome-bar">
          <div className="welcome-text">
            <h1>Mechanical Engineering</h1>
            <p>Explore the world of mechanical engineering with these amazing books!</p>
          </div>
          <div className="welcome-image">
            <img src={img} alt="Mechanical Engineering Books" />
          </div>
        </div>

        {/* Loading/Error Messages */}
        {loading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          // Books Grid
          <div className="books-grid">
            {filteredBooks.length === 0 ? (
              <p>No books found</p> // Show message if no books match search
            ) : (
              filteredBooks.map((book) => (
                <div className="book-card" key={book.id} onClick={() => goToDetails(book.id)}>
                  <img src={book.cover} alt={book.title} className="book-cover" />
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
  );
}

export default MEBooks;
