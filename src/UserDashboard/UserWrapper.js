// src/UserDashboard/UserWrapper.js
import React from "react";
import Sidebar from './UserSidebar.js'; 
import "../App.css";

function UserLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default UserLayout;
