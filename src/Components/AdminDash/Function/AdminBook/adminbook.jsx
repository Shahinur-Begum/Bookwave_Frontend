import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminbook.css";
import AdminSidebar from "../../adminheader/AdminSidebar";
import AdminBookNav from "../../Function/AdminBook/adminbooknav";
import dummyImg from "../../../../Assets/dummy.jpeg";
import img from "../../../../Assets/bookcatalogue.jpg";

const AdminBook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchBy, setSearchBy] = useState("title");
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "", cover: "", available: 0 });
  const [currentBookId, setCurrentBookId] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080/api/admin/books";

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const searchResults = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(searchResults);
    } else {
      setFilteredBooks(books);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSaveBook = () => {
    if (currentBookId) {
      axios
        .put(`${API_BASE_URL}/${currentBookId}`, newBook)
        .then((response) => {
          const updatedBooks = books.map((book) =>
            book.id === currentBookId ? response.data : book
          );
          setBooks(updatedBooks);
          setFilteredBooks(updatedBooks);
          closeAddBookDialog();
        })
        .catch((error) => console.error("Error updating book:", error));
    } else {
      axios
        .post(API_BASE_URL, newBook)
        .then((response) => {
          setBooks([...books, response.data]);
          setFilteredBooks([...filteredBooks, response.data]);
          closeAddBookDialog();
        })
        .catch((error) => console.error("Error adding book:", error));
    }
  };

  const deleteBook = (bookId) => {
    axios
      .delete(`${API_BASE_URL}/${bookId}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== bookId));
        setFilteredBooks(filteredBooks.filter((book) => book.id !== bookId));
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const openAddBookDialog = (book = null) => {
    if (book) {
      setNewBook(book);
      setCurrentBookId(book.id);
    } else {
      setNewBook({ title: "", author: "", category: "", cover: "", available: 0 });
      setCurrentBookId(null);
    }
    setIsAddBookDialogOpen(true);
  };

  const closeAddBookDialog = () => {
    setIsAddBookDialogOpen(false);
    setNewBook({ title: "", author: "", category: "", cover: "", available: 0 });
    setCurrentBookId(null);
  };

  return (
    <div className="admin-book-container">
      <AdminSidebar />
      <AdminBookNav
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        setFilteredBooks={setFilteredBooks}
        hidepart={true}
      />

      <div className="admain-content">
        <div className="adbook-welcome-bar">
          <div className="adbook-welcome-text">
            <h1>Book Management</h1>
            <p>Manage the book catalog, edit or delete books, and add new books to the system.</p>
          </div>
          <div className="adbook-welcome-image">
            <img src={img} alt="Book Catalogue" />
          </div>
        </div>

        {/* Add Book Button */}
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <button
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              fontSize: "18px",
              padding: "12px 24px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => openAddBookDialog()}
          >
            Add Book
          </button>
        </div>

        {/* Books Table */}
        <table className="admin-book-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>
                    <img
                      src={book.cover || dummyImg}
                      alt={book.title}
                      style={{ width: "150px", height: "200px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.available}</td>
                  <td>
                    <button onClick={() => openAddBookDialog(book)}>Edit</button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No books found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Book Dialog */}
        {isAddBookDialogOpen && (
          <div className="add-book-dialog">
            <div className="dialog-content">
              <h2>{currentBookId ? "Edit Book" : "Add New Book"}</h2>
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={newBook.category}
                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cover URL"
                value={newBook.cover}
                onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
              />
              <input
                type="number"
                placeholder="Available"
                value={newBook.available}
                onChange={(e) => setNewBook({ ...newBook, available: e.target.value })}
              />
              <button onClick={handleSaveBook}>
                {currentBookId ? "Update Book" : "Add Book"}
              </button>
              <button onClick={closeAddBookDialog}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBook;
