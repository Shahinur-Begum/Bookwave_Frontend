// Dashboard/MainContent.js
import React from "react";
import CardSection from "./CardSection";
import IssuedBooks from "./IssuedBooks";
import OnLoanBooks from "./OnLoanBooks";

import "./dashboarduser.css";

function MainContent() {
  return (
    <div className="main-content">
      <CardSection />
      <IssuedBooks />
      <OnLoanBooks />
  
    </div>
  );
}

export default MainContent;
