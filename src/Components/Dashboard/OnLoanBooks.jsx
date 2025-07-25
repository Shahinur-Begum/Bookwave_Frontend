import React, { useState, useEffect } from "react";
import axios from "axios";

const DueBooks = () => {
  const [dueBooks, setDueBooks] = useState([]);  // To store the list of due books

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    const fetchDueBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/borrows-return/due-books/${studentId}`);
        console.log(response.data);  // Debugging: log the response
        
        if (response.data.dueBooks) {  // Correct the property name here
          setDueBooks(response.data.dueBooks);  // Set the list of books
        }
      } catch (error) {
        console.error('Error fetching due books:', error);
      }
    };

    fetchDueBooks();
  }, []);

  return (
    <section style={{ margin: "20px", padding: "10px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3>Due Books</h3>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {dueBooks.length > 0 ? (
          dueBooks.map(({ cover, title, author, category, due }, index) => (
            <div key={index} style={{
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
                <p><strong>Due:</strong> {due} days</p> {/* Display due value */}
              </div>
            </div>
          ))
        ) : (
          <p style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "black",
            textAlign: "center",
            marginTop: "20px"
          }}>No due books currently.</p>
        )}
      </div>
    </section>
  );
};

export default DueBooks;
