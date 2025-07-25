// RightSidebar.js
import React from 'react';
import './dashboarduser.css';
import dummyProfilePic from '../../Assets/dummy.jpeg';

const RightSidebar = () => {
  // Example student information
  const student = {
    name: "Sarah Connor",
    rollNumber: "2104088",
    batch: "21",
    department: "CSE",
    profilePicture: dummyProfilePic // Use the dummy profile picture
  };

  // Sample notices
  const notices = [
    "*Library closed on November 15 for maintenance.",
    "*Return all borrowed books by due date to avoid fees.",
    "*Join our Book Fair on December 1 for great discounts!",
    "*Study group meets every Wednesday at 5 PM in the study room.",
    "*Check out new arrivals in the library this week!"
  ];

  return (
    <div className="right-sidebar">
      {/* User Info Box */}
      <div className="user-info box">
        <img 
          src={student.profilePicture}
          alt={`${student.name}'s profile`} 
          className="user-profile-pic"
        />
        <div className="user-details">
          <h3>{student.name}</h3>
          <p className="roll-number">Roll No: {student.rollNumber}</p>
          <p className="batch">Batch: {student.batch}</p>
          <p className="department">Department: {student.department}</p>
        </div>
      </div>

      {/* Notes Box */}
      <div className="notes box">
        <h4>Notes</h4>
        <textarea placeholder="Write your notes here..." rows="5"></textarea>
      </div>

      {/* 
      <div className="comments box">
        <h4>Comments </h4>
        <textarea placeholder="Leave your comments about us here..." rows="5"></textarea>
      </div>

      <div className="comments box">
        <h4>Suggestions</h4>
        <textarea placeholder="Give ur suggestions about what books to add next..." rows="5"></textarea>
      </div>*/}

      {/* Notices Box */}
      <div className="notices box">
        <h4>Notice Board</h4>
        <ul>
          {notices.map((notice, index) => (
            <li key={index}>{notice}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RightSidebar;
