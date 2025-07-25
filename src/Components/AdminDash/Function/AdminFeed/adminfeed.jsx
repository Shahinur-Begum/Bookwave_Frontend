import React, { useState, useEffect } from "react";
import AdminSidebar from "../../adminheader/AdminSidebar";
import BookNavBar from "../../../AdminDash/Function/AdminBook/adminbooknav";
import img from "../../../../Assets/feedback.jpg";
import "./adminfeed.css";
import axios from "axios";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Store search term
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]); // Filtered feedback data
  const [errorMessage, setErrorMessage] = useState(""); // Error message if any

  // Fetch all feedback from the backend when the component is mounted
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
    
        const response = await axios.get("http://localhost:8080/api/feedback/all");
        setFeedbackList(response.data); // Set feedback to state
        setFilteredFeedbacks(response.data); // Initially set filtered feedbacks as all feedbacks
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setErrorMessage("Failed to fetch feedbacks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []); // Empty array ensures this runs once when the component mounts

  // Handle search term change
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter feedbacks based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = feedbackList.filter((feedback) =>
        feedback.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFeedbacks(filtered);
    } else {
      setFilteredFeedbacks(feedbackList); // Reset filter if search term is empty
    }
  }, [searchTerm, feedbackList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-feedback-container">
      <AdminSidebar />
      <BookNavBar onSearch={handleSearch} /> {/* Pass the handleSearch function to BookNavBar */}

      <div className="adfeed-content">
        <div className="adfeed-welcome-bar">
          <div className="adfeed-welcome-text">
            <h1>Feedback Management</h1>
            <p>Manage and review feedback provided by students.</p>
          </div>
          <div className="adfeed-welcome-image">
            <img src={img} alt="Feedback" />
          </div>
        </div>

        {/* Error message display */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Table to display feedbacks */}
        <div className="adfeed-table-container">
          <table className="admin-feedback-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Rating (1-5)</th>
                <th>Admin ID</th>
                <th>Student ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.feedbackId}>
                    <td>{feedback.feedbackId}</td>
                    <td>{feedback.description}</td>
                    <td>{feedback.rating}</td>
                    <td>{feedback.adminId}</td>
                    <td>{feedback.studentId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No feedback found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;