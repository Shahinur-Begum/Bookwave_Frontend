import React, { useEffect, useState } from 'react';
import './profile.css';

const UserInfoModal = ({ isOpen, onClose }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get email from localStorage after login
  const email = JSON.parse(localStorage.getItem('userInfo'))?.email;

  useEffect(() => {
    const email = localStorage.getItem('email'); // Retrieve email from localStorage
    if (isOpen && email) {
      console.log(`Fetching data for email: ${email}`); // Debug log
      // Fetch student data when modal is open
      setLoading(true);
      fetch(`http://localhost:8080/api/student/profile?email=${email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch student data.');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Check the data returned by the API
          setStudent(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setStudent(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, email]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-info-modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Display Loading, Error, or Data */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : student ? (
          <div>
            {/* Profile Picture */}
            <div className="user-profile-section">
              <img
                src={student.profilePicture || 'default-profile.jpg'}
                alt={`${student.name}'s profile`}
                className="user-profile-pic"
              />
            </div>

            {/* User Information */}
            <div className="user-details">
              <h3 className="user-name" id="user-info-modal-title">
                {student.name}
              </h3>
              <p className="user-detail"><strong>ID:</strong> {student.id}</p>
              <p className="user-detail"><strong>Email:</strong> {student.email}</p>
              <p className="user-detail"><strong>Batch:</strong> {student.batch}</p>
              <p className="user-detail"><strong>Dept:</strong> {student.dept}</p>
              <p className="user-detail"><strong>Address:</strong> {student.address}</p>
              <p className="user-detail"><strong>Interest:</strong> {student.interest}</p>
              {/* List of Phone Numbers */}
              <div>
                <strong>Phone Numbers:</strong>
                {student.phones?.length > 0 ? (
                  student.phones.map((phone, index) => (
                    <p key={index} className="user-detail">Phone {index + 1}: {phone.phoneNumber}</p>
                  ))
                ) : (
                  <p>No phone numbers available.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No student data available.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfoModal;
