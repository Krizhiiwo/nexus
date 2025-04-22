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


// import React from "react";
// import Sidebar from './Sidebar.js'; 
// import "../App.css";
// import { Box } from '@mui/material';

// function AdminLayout({ children }) {
//   return (
//     <Box sx={{ backgroundColor: '#000721', minHeight: '100vh', display: 'flex' }}>
//       <Sidebar />
//       <div className="content" style={{ flex: 1, padding: '20px', color: '#000721' }}>
//         {children}
//       </div>
//     </Box>
//   );
// }

// export default AdminLayout;


