import React from "react";
import { SidebarData } from "./UserSidebarData.js";
import "../App.css";

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="lilita-one-regular sidebar-title">Nexus Agent</div>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => (
          <li
            key={key}
            className="row"
            onClick={() => {
              window.location.href = val.link;
            }}
          >
            <div>{val.icon}</div>
            <div>{val.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar; 