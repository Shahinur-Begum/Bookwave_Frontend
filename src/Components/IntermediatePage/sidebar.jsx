import React from "react";
import "./intermediatePage.css";

function Sidebar({ isExpanded, onDashboardClick }) {
  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <ul className="sidebar-items">
        <li><i className="fas fa-book"></i> {isExpanded && "Book Catalogue"}</li>
        <li><i className="fas fa-tablet-alt"></i> {isExpanded && "eBooks"}</li>
        <li><i className="fas fa-user"></i> {isExpanded && "Profile"}</li>
        <li><i className="fas fa-cog"></i> {isExpanded && "Settings"}</li>
        <li><i className="fas fa-credit-card"></i> {isExpanded && "Payment"}</li>
        <li><i className="fas fa-sign-out-alt"></i> {isExpanded && "Logout"}</li>
        <li onClick={onDashboardClick}> {/* Trigger navigation on click */}
          <i className="fas fa-tachometer-alt"></i> {isExpanded && "Dashboard"}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
