import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../adminheader/AdminSidebar";
import BookNavBar from "../../../AdminDash/Function/AdminBook/adminbooknav";
import img from "../../../../Assets/borrow.webp";
import "./borrow.css";

const BorrowReturnPage = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    bookId: "",
    studentId: "",
    issuedDate: "",
    returnDate: "",
  });

  const API_URL = "http://localhost:8080/api/borrows-return";

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAddRecordClick = () => {
    setIsEditing(false);
    setIsFormVisible(true);
    setFormData({
      bookId: "",
      studentId: "",
      issuedDate: "",
      returnDate: "",
    });
  };

  const handleEditClick = (bookId) => {
    const recordToEdit = records.find((record) => record.bookId === bookId);
    if (!recordToEdit) return;

    setIsEditing(true);
    setIsFormVisible(true);
    setFormData({
      bookId: recordToEdit.bookId,
      studentId: recordToEdit.studentId,
      issuedDate: formatDate(recordToEdit.issuedDate),
      returnDate: formatDate(recordToEdit.returnDate),
    });
  };

  const handleDeleteClick = async (bookId, studentId) => {
    try {
      await axios.delete(`${API_URL}/delete/${studentId}/${bookId}`);
      await fetchRecords(); // refresh all
      setFilteredRecords((prev) =>
        prev.filter(
          (record) =>
            !(record.studentId === studentId && record.bookId === bookId)
        )
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `${API_URL}/update/${formData.studentId}/${formData.bookId}`,
          formData
        );
      } else {
        await axios.post(`${API_URL}/create`, formData);
      }
      fetchRecords();
      setIsFormVisible(false);
      setFormData({
        bookId: "",
        studentId: "",
        issuedDate: "",
        returnDate: "",
      });
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsFormVisible(false);
    setFormData({
      bookId: "",
      studentId: "",
      issuedDate: "",
      returnDate: "",
    });
  };

  return (
    <div className="admin-borrow-container">
      <AdminSidebar />
      <div className="admin-content">
        <BookNavBar
          books={records}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterOptions={["studentId", "bookId"]}
          onSearch={(term, type) => {
            const lower = term.toLowerCase();
            const filtered = records.filter((record) =>
              record[type]?.toString().toLowerCase().includes(lower)
            );
            setFilteredRecords(filtered);
          }}
          onSelectBook={(bookId) => {
            const selected = records.find((r) => r.bookId === bookId);
            if (selected) {
              setFormData({
                bookId: selected.bookId,
                studentId: selected.studentId,
                issuedDate: formatDate(selected.issuedDate),
                returnDate: formatDate(selected.returnDate),
              });
              setIsFormVisible(true);
              setIsEditing(true);
            }
          }}
          hidepart={true}
        />

        <div className="adfeed-content">
          <div className="adfeed-welcome-bar">
            <div className="adfeed-welcome-text">
              <h1>Borrow and Return Records</h1>
              <p>Manage borrowing and returning records of students.</p>
            </div>
            <div className="adfeed-welcome-image">
              <img src={img} alt="Borrow and Return" />
            </div>
          </div>

          <div className="add-record-button-container" style={{ textAlign: "right" }}>
            <button className="add-record-btn" onClick={handleAddRecordClick}>
              Add Record
            </button>
          </div>

          {isFormVisible && (
            <form onSubmit={handleSubmit} className="add-record-form">
              <input
                type="text"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                placeholder="Book ID"
                required
              />
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Student ID"
                required
              />
              <input
                type="date"
                name="issuedDate"
                value={formData.issuedDate}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
              <button type="submit" className="add-record-btn">
                {isEditing ? "Update" : "Add"}
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          )}

          <table className="admin-borrow-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Student ID</th>
                <th>Issued Date</th>
                <th>Return Date</th>
                <th>Due</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={`${record.studentId}-${record.bookId}`}>
                    <td>{record.bookId}</td>
                    <td>{record.studentId}</td>
                    <td>{formatDate(record.issuedDate)}</td>
                    <td>{formatDate(record.returnDate)}</td>
                    <td style={{ textAlign: "center" }}>
                      {record.due > 0 ? (
                        <div>
                          Overdue
                          <div style={{ fontSize: "0.9em", color: "#555" }}>
                            {record.due} days
                          </div>
                        </div>
                      ) : (
                        <div>
                          On Time
                          <div style={{ fontSize: "0.9em", color: "#555" }}>0 days</div>
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(record.bookId)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteClick(record.bookId, record.studentId)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowReturnPage;
