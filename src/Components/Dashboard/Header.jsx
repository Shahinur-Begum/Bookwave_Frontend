// src/components/Tabs/Tabs.js

import React, { useState } from 'react';
import './dashboarduser.css';

function Tabs() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="tabs">
      {["Home", "Files", "Notes", "Notifications"].map((tab) => (
        <div
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
