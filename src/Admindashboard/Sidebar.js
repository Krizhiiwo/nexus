import React from 'react';
import { SidebarData } from "../Admindashboard/SidebarData.js";
import "../App.css";
import { Link } from 'react-router-dom'; 

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="lilita-one-regular sidebar-title">Nexus Agent</div>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => (
          <li key={key} className="row">
            <Link to={val.link} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <div>{val.icon}</div>
              <div>{val.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;