import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminebook.css";
import AdminSidebar from "../../adminheader/AdminSidebar";
import AdminBookNav from "../../Function/AdminBook/adminbooknav";
import img from "../../../../Assets/audiobook.jpg";

const AdminEbook = () => {
  const [ebooks, setEbooks] = useState([]);
  const [filteredEbooks, setFilteredEbooks] = useState([]);
  const [isAddEbookDialogOpen, setIsAddEbookDialogOpen] = useState(false);
  const [newEbook, setNewEbook] = useState({ title: "", pdf: "", audioLink: "", cover: "" });
  const [currentEbookId, setCurrentEbookId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const API_BASE_URL = "http://localhost:8080/api/ebooks";

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        console.log(response.data); // Log to check if 'id' is returned in the response
        setEbooks(response.data);
        setFilteredEbooks(response.data);
      })
      .catch((error) => console.error("Error fetching ebooks:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); // Update the search term
    const searchResults = ebooks.filter((ebook) =>
      ebook.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEbooks(searchResults); // Update filtered eBooks
  };

  const handleSaveEbook = () => {
    if (currentEbookId) {
      axios
        .put(`${API_BASE_URL}/${currentEbookId}`, newEbook)
        .then((response) => {
          const updatedEbooks = ebooks.map((ebook) =>
            ebook.id === currentEbookId ? response.data : ebook // Use 'id' here
          );
          setEbooks(updatedEbooks);
          setFilteredEbooks(updatedEbooks);
          closeAddEbookDialog();
        })
        .catch((error) => console.error("Error updating ebook:", error));
    } else {
      axios
        .post(API_BASE_URL, newEbook)
        .then((response) => {
          setEbooks([...ebooks, response.data]);
          setFilteredEbooks([...filteredEbooks, response.data]);
          closeAddEbookDialog();
        })
        .catch((error) => console.error("Error adding ebook:", error));
    }
  };

  const deleteEbook = (ebookId) => {
    axios
      .delete(`${API_BASE_URL}/${ebookId}`)
      .then(() => {
        setEbooks(ebooks.filter((ebook) => ebook.id !== ebookId)); // Use 'id' here
        setFilteredEbooks(filteredEbooks.filter((ebook) => ebook.id !== ebookId)); // Use 'id' here
      })
      .catch((error) => console.error("Error deleting ebook:", error));
  };

  const openAddEbookDialog = (ebook = null) => {
    if (ebook) {
      setNewEbook(ebook);
      setCurrentEbookId(ebook.id); // Use 'id' here
    } else {
      setNewEbook({ title: "", pdf: "", audioLink: "", cover: "" });
      setCurrentEbookId(null);
    }
    setIsAddEbookDialogOpen(true);
  };

  const closeAddEbookDialog = () => {
    setIsAddEbookDialogOpen(false);
    setNewEbook({ title: "", pdf: "", audioLink: "", cover: "" });
    setCurrentEbookId(null);
  };

  return (
    <div className="admin-ebook-container">
      <AdminSidebar />

      <AdminBookNav
        searchTerm={searchTerm}  // Bind searchTerm to AdminBookNav
        setSearchTerm={handleSearch}  // Pass the handleSearch function
        onSearch={handleSearch}  // Pass onSearch for search action
        hidepart={false}
      />

      <div className="admain-content">
        <div className="adbook-welcome-bar">
          <div className="adbook-welcome-text">
            <h1>E-Book Management</h1>
            <p>Manage eBooks in the library, including adding, editing, and deleting entries.</p>
          </div>
          <div className="adbook-welcome-image">
            <img src={img} alt="Library Book Catalogue" />
          </div>
        </div>

        <div className="admin-controls" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "18px",
              padding: "14px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "auto",
            }}
            onClick={() => openAddEbookDialog()}
          >
            Add New E-Book
          </button>
        </div>

        <table border="1" className="admin-book-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>PDF</th>
              <th>Audio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEbooks.length > 0 ? (
              filteredEbooks.map((ebook) => (
                <tr key={ebook.id} style={{ height: "180px" }}> {/* Further increased row height */}
                  <td>{ebook.id ? ebook.id : "N/A"}</td>
                  <td>
                    <img
                      src={ebook.cover}
                      alt="Book Cover"
                      style={{
                        width: "140px",  // Increased width even more
                        height: "200px", // Increased height further
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </td>
                  <td>{ebook.title}</td>
                  <td>
                    <a href={ebook.pdf} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </td>
                  <td>
                    {ebook.audioLink ? (
                      <a href={ebook.audioLink} target="_blank" rel="noopener noreferrer">
                        Listen
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <button onClick={() => openAddEbookDialog(ebook)}>Edit</button>
                    <button onClick={() => deleteEbook(ebook.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No eBooks found</td>
              </tr>
            )}
          </tbody>
        </table>

        {isAddEbookDialogOpen && (
          <div className="add-book-dialog" style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="dialog-content"
              style={{
                width: "400px", // Smaller width (adjust as needed)
                backgroundColor: "white",
                padding: "20px", // Reduced padding
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
                {currentEbookId ? "Edit E-Book" : "Add New E-Book"}
              </h2>
              <label>Title:</label>
              <input
                type="text"
                value={newEbook.title}
                onChange={(e) => setNewEbook({ ...newEbook, title: e.target.value })}
                style={{
                  padding: "8px", // Reduced padding
                  marginBottom: "12px", // Reduced margin
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "100%",
                  fontSize: "14px", // Reduced font size
                }}
              />
              <label>Cover URL:</label>
              <input
                type="text"
                value={newEbook.cover}
                onChange={(e) => setNewEbook({ ...newEbook, cover: e.target.value })}
                style={{
                  padding: "8px", // Reduced padding
                  marginBottom: "12px", // Reduced margin
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "100%",
                  fontSize: "14px", // Reduced font size
                }}
              />
              {newEbook.cover && (
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <img
                    src={newEbook.cover}
                    alt="Cover Preview"
                    style={{
                      width: "120px",  // Reduced width
                      height: "160px", // Reduced height
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              )}
              <label>PDF URL:</label>
              <input
                type="text"
                value={newEbook.pdf}
                onChange={(e) => setNewEbook({ ...newEbook, pdf: e.target.value })}
                style={{
                  padding: "8px", // Reduced padding
                  marginBottom: "12px", // Reduced margin
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "100%",
                  fontSize: "14px", // Reduced font size
                }}
              />
              <label>Audio Link (Optional):</label>
              <input
                type="text"
                value={newEbook.audioLink}
                onChange={(e) => setNewEbook({ ...newEbook, audioLink: e.target.value })}
                style={{
                  padding: "8px", // Reduced padding
                  marginBottom: "15px", // Reduced margin
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "100%",
                  fontSize: "14px", // Reduced font size
                }}
              />
              <div
                className="dialog-actions"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px", // Reduced margin top
                }}
              >
                <button
                  onClick={closeAddEbookDialog}
                  style={{
                    padding: "10px 20px", // Reduced padding
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEbook}
                  style={{
                    padding: "10px 20px", // Reduced padding
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEbook;
