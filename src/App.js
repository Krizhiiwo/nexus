import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './Admindashboard/Wrapper.js';
import Dashboard from './Admindashboard/Dashboard.js';
import Users from './Admindashboard/Users/Users.js';
import Notification from './Admindashboard/Notification.js';
import Alerts from './Admindashboard/Alerts.js';
import LoginSignup from './components/common/Login.js';
import Register from './components/common/Register.js';
import UserLayout from './UserDashboard/UserWrapper.js'; 
import UserDashboard from './UserDashboard/UserDashboard.js';
//import UserAlerts from './UserDashboard/UserAlerts.js';
import UserMetrics from './UserDashboard/UserMetrics.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
        <Route path="/notification" element={<AdminLayout><Notification /></AdminLayout>} />
        <Route path="/alerts" element={<AdminLayout><Alerts /></AdminLayout>} />

        {/* User Routes */} 
        <Route path="/user-dashboard" element={<UserLayout><UserDashboard /></UserLayout>} />
        <Route path="/user-metric" element={<UserLayout><UserMetrics /></UserLayout>} />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Box } from '@mui/material'; 
// import AdminLayout from './Admindashboard/Wrapper.js';
// import Dashboard from './Admindashboard/Dashboard.js';
// import Users from './Admindashboard/Users/Users.js';
// import Notification from './Admindashboard/Notification.js';
// import Alerts from './Admindashboard/Alerts.js';
// import LoginSignup from './components/common/Login.js';
// import Register from './components/common/Register.js';

// function App() {
//   return (
//     <Box sx={{ backgroundColor: '#222222', minHeight: '100vh' }}>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<LoginSignup />} />
//           <Route path="/register" element={<Register />} />

//           <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
//           <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
//           <Route path="/notification" element={<AdminLayout><Notification /></AdminLayout>} />
//           <Route path="/alerts" element={<AdminLayout><Alerts /></AdminLayout>} />

//           <Route path="/user-dashboard" element={<div>User Dashboard</div>} />

//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="*" element={<div>404 - Page Not Found</div>} />
//         </Routes>
//       </Router>
//     </Box>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import AdminLayout from './Admindashboard/Wrapper.js';
// import Dashboard from './Admindashboard/Dashboard.js';
// import Users from './Admindashboard/Users/Users.js';
// import Notification from './Admindashboard/Notification.js';
// import Alerts from './Admindashboard/Alerts.js';
// import LoginSignup from './components/common/Login.js';
// import Register from './components/common/Register.js';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginSignup />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
//         <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
//         <Route path="/notification" element={<AdminLayout><Notification /></AdminLayout>} />
//         <Route path="/alerts" element={<AdminLayout><Alerts /></AdminLayout>} />

//         <Route path="/user-dashboard" element={<div>User Dashboard</div>} />

//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






