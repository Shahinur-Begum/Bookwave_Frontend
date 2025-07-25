// src/components/Sidebar/Sidebar.js

import React from "react";
import "./dashboarduser.css";
import { Link } from "react-router-dom";
import ebooks from './Functions/Ebook/ebooks';

function Sidebar({ isExpanded }) {
  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <ul className="sidebar-items">
       <li> <Link to='/book'>
        <i className="fas fa-book"></i> {isExpanded && "Book Catalogue"} </Link></li>
       <li>
          <Link to="/ebooks">
            <i className="fas fa-tablet-alt"></i> {isExpanded && "eBooks"}
          </Link>
        </li>
        
        <li><i className="fas fa-user"></i> {isExpanded && "Profile"}</li>
        <li><i className="fas fa-cog"></i> {isExpanded && "Settings"}</li>
        <li>
        <Link to="/payment">
        <i className="fas fa-credit-card"></i> {isExpanded && "Payment"}
        </Link>
        </li>
        <li><i className="fas fa-sign-out-alt"></i> {isExpanded && "Logout"}</li>
        <li><i className="fas fa-comment-dots"></i> {isExpanded && "Feedback"}</li>
        <li><i className="fas fa-tachometer-alt"></i> {isExpanded && "Dashboard"}</li>

      </ul>
    </div>
  );
}

export default Sidebar;
