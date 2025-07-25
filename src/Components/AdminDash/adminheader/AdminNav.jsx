import React, { useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Notifications, Settings, Logout, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // To make API calls

const AdminNav = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState(null); // State to hold admin info
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const email = userInfo?.email; // Get email from userInfo object
        console.log("Email from localStorage:", email); // Log the email from localStorage

        if (!email) {
          setError("No email found in localStorage.");
          setLoading(false);
          return;
        }

        // Make API call to get logged-in admin's info using stored email
        const response = await axios.get("http://localhost:8080/api/admin/students/profile", {
          params: { email: email },
        });
        console.log("Admin data response:", response); // Log the API response

      if (response.status === 200) {
        setAdminInfo(response.data);  // Set admin info from response
      }
      } catch (err) {
        setError("Error fetching admin data.");
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    fetchAdminInfo();
  }, []);

  const handleLogout = () => {
    // Clear any user-related data (e.g., tokens)
    localStorage.removeItem("authToken"); // Example: Remove the authentication token
    localStorage.removeItem("userInfo"); // Example: Remove user info (if applicable)

    // Redirect to login or home page
    navigate("/login"); // Adjust the path as per your app's routing

    // Optionally, display a success message (use a toast library or alert)
    alert("You have been logged out.");
  };

  // Display loading, error, or admin data
  return (
    <nav className="admin-navbar">
      {/* Left Section - Welcome Message */}
      <div className="navbar-left">
        <Typography variant="h6" className="welcome-message">
          Welcome back,
        </Typography>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : adminInfo ? (
          <Typography variant="h5" className="admin-name">
            {adminInfo.name} {/* Admin name dynamically fetched */}
          </Typography>
        ) : (
          <Typography variant="h5" className="admin-name">
            No admin data available
          </Typography>
        )}
      </div>


      {/* Right Section - Icons */}
      <div className="navbar-right">
        <IconButton className="icon-button" onClick={handleLogout}>
          <Logout />
        </IconButton>
        {/* Avatar */}
        {loading ? (
          <Avatar alt="Loading..." src="/path-to-default-image.jpg" className="profile-avatar" />
        ) : error ? (
          <Avatar alt="Error" src="/path-to-error-image.jpg" className="profile-avatar" />
        ) : adminInfo ? (
          <Avatar
            alt={adminInfo.name}
            src={adminInfo.profileImage || "/path-to-default-image.jpg"} // Use admin's profile image or fallback to a default image
            className="profile-avatar"
          />
        ) : (
          <Avatar alt="No Admin Data" src="/path-to-default-image.jpg" className="profile-avatar" />
        )}
      </div>
    </nav>
  );
};

export default AdminNav;