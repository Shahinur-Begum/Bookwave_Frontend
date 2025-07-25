// Dashboard/Dashboard.js
import React, { useState } from "react";
import WelcomeBar from "./WelcomeBar";
import Header from "../Header/header";
import MainContent from "./MainContent";
import "./dashboarduser.css";
import MenuBar from './MenuBar';
import RightSideBar from './RightSideBar';
import Footer from './Foot';

function Dashboard() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(prevState => !prevState);
  };

  return (
    <div className="dashboard">
      <Header/>
        <div className="main-content-wrapper">
          <MenuBar /> 
        
          <div className="main-section">
            <MainContent />
          </div>
        
    
    </div>
    <Footer/>
    </div>
  );
}

export default Dashboard;
