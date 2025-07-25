import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();  // Extract the book id from the URL
  const [book, setBook] = useState(null);  // State to hold book data
  const [error, setError] = useState(null);  // State for error messages
  const [isReserved, setIsReserved] = useState(false);  // State to track if the book is reserved

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetch book details using the correct API
        const response = await axios.get(`http://localhost:8080/api/admin/books/${id}`);
        setBook(response.data);  // Update state with fetched book data
        setIsReserved(response.data.isReserved);  // Set reservation status if available
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to fetch book details. Please try again.");
      }
    };

    fetchBookDetails();
  }, [id]);  // Re-run effect when 'id' changes

  const handleReserve = async () => {
    if (book.available > 0 && !isReserved) {
      try {
        // Reserve the book (decrease availability)
        const updatedBook = { ...book, available: book.available - 1 };

        // Send PUT request to update availability in the backend
        const response = await axios.put(`http://localhost:8080/api/admin/books/${id}`, updatedBook);
        
        if (response.status === 200) {
          // Update the frontend state with the new availability and set reserved status
          setBook(response.data);
          setIsReserved(true); // Mark the book as reserved
        }
      } catch (err) {
        console.error("Error reserving the book:", err);
        setError("Failed to reserve the book. Please try again.");
      }
    }
  };

  const handleCancelReservation = async () => {
    if (isReserved) {
      try {
        // Unreserve the book (increase availability)
        const updatedBook = { ...book, available: book.available + 1 };

        // Send PUT request to update availability in the backend
        const response = await axios.put(`http://localhost:8080/api/admin/books/${id}`, updatedBook);
        
        if (response.status === 200) {
          // Update the frontend state with the new availability and unset reserved status
          setBook(response.data);
          setIsReserved(false); // Mark the book as unreserved
        }
      } catch (err) {
        console.error("Error canceling reservation:", err);
        setError("Failed to cancel the reservation. Please try again.");
      }
    }
  };

  if (error) {
    return <p>{error}</p>;  // Display error message if any
  }

  if (!book) {
    return <p>Loading...</p>;  // Show loading message while waiting for data
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto', fontFamily: 'Arial, sans-serif', textAlign: 'center', border: '1px solid #ddd', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <div style={{ marginBottom: '30px' }}>
        <img src={book.cover} alt={book.title} style={{ width: '300px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
      </div>
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>{book.title}</h1>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Availability:</strong> {book.available > 0 ? `${book.available} available` : "Unavailable"}</p>

        {/* Reserve Button */}
        {!isReserved ? (
          <button
            onClick={handleReserve}
            style={{
              padding: '12px 25px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background-color 0.3s ease, transform 0.2s ease'
            }}
            className={book.available === 0 || isReserved ? 'disabled' : ''}
            disabled={book.available === 0 || isReserved}  // Disable button if the book is reserved or unavailable
          >
            {book.available > 0 ? "Reserve" : "Unavailable"}
          </button>
        ) : (
          <>
            <button
              onClick={handleCancelReservation}
              style={{
                padding: '12px 25px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background-color 0.3s ease, transform 0.2s ease', marginLeft: '10px'
              }}
            >
              Cancel Reservation
            </button>
            <p style={{ color: 'green', fontWeight: 'bold' }}>This book is reserved.</p>
          </>
        )}

        {/* Message if unavailable */}
        {book.available === 0 && !isReserved && <p style={{ color: 'red', fontWeight: 'bold' }}>This book is currently unavailable.</p>}
      </div>
    </div>
  );
};

export default BookDetails;
