import React from "react";
import Sidebar from './Sidebar.js'; 
import "../App.css";

function AdminLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
