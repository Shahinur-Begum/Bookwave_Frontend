import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);  // To store the list of issued books
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        const response = await axios.get(`http://localhost:8080/api/borrows-return/details/${studentId}`);
        console.log(response.data);  // Debugging: log the response
        
        if (response.data.books) {
          setIssuedBooks(response.data.books);  // Set the list of books
        }
      } catch (error) {
        console.error('Error fetching issued books:', error);
      }
    };

    fetchIssuedBooks();
  }, []);

  return (
    <section style={{ margin: "20px", padding: "10px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3>Issued Books</h3>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {issuedBooks.length > 0 ? (
          issuedBooks.map(({ id, title, author, category, cover }) => (
            <div key={id} style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              transition: "transform 0.2s ease-in-out"
            }}>
              <div>
                <img src={cover} alt={`Cover of ${title}`} style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "4px"
                }} />
              </div>
              <div style={{ marginTop: "10px" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{title}</h4>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>Category:</strong> {category}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No books issued currently.</p>
        )}
      </div>
    </section>
  );
};

export default IssuedBooks;
