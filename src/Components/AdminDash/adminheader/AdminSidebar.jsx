import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItemText, ListItemButton, ListItemIcon, Divider } from "@mui/material";
import { Dashboard, Group, Book, MenuBook, MonetizationOn, Feedback, Search, AccountCircle ,Logout} from '@mui/icons-material'; // Import icons
import './admindash.css';




function AdminSidebar() {
  const navigate = useNavigate(); // Hook for navigation

  // Define the handleNavigation function
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };
  const handleLogout = () => {
    // Clear any user-related data (e.g., tokens)
    localStorage.removeItem("authToken"); // Example: Remove the authentication token
    localStorage.removeItem("userInfo"); // Example: Remove user info (if applicable)

    // Redirect to login or home page
    navigate("/login"); // Adjust the path as per your app's routing

    // Optionally, display a success message (use a toast library or alert)
    alert("You have been logged out.");
  };

  return (
    <div className="admin-sidebar">
      <h2>BookWave</h2>
      <List>
        {/* Dashboard */}

        <ListItemButton className="sidebar-item" onClick={() => handleNavigation("/admindash")}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton className="sidebar-item" onClick={() => handleNavigation("/member")}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Members" />
        </ListItemButton>
        {/* Books */}
        <ListItemButton className="sidebar-item" onClick={() => handleNavigation("/adminbook")}>
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <ListItemText primary="Books"/>
        </ListItemButton>

        <ListItemButton className="sidebar-item" onClick={() => handleNavigation("/borrow")}>
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <ListItemText primary="Book Details"/>
        </ListItemButton>

        {/* E-books */}
        <ListItemButton className="sidebar-item"  onClick={() => handleNavigation('/adminebook')}>
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="E-books" />
        </ListItemButton>

        <ListItemButton className="sidebar-item" onClick={() => handleNavigation("/adminthesis")}>
         <ListItemIcon>
           <Book />
         </ListItemIcon>
         <ListItemText primary="Thesis" />
       </ListItemButton>


        {/* Dues */}
        <ListItemButton className="sidebar-item" onClick={()=> handleNavigation('/adminpay')}>
          <ListItemIcon>
            <MonetizationOn />
          </ListItemIcon>
          <ListItemText primary="Dues" />
        </ListItemButton>

        {/* Feedback */}
        <ListItemButton className="sidebar-item"  onClick={() => handleNavigation('/adminfeed')}>
      
          <ListItemIcon>
            <Feedback />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>

         {/* Feedback */}
         <ListItemButton className="sidebar-item"   onClick={handleLogout}>  
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>

        <Divider /> {/* Optional Divider for separation */}

  
      </List>
    </div>
  );
}

export default AdminSidebar;