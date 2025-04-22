import React from "react";
import AdminLayout from './Wrapper.js';
import Widget from '../components/widget/Widget.js';
import UserStatsChart from './UserStatsChart.js';
import ChatWidget from './ChatWidget.js';
import DashboardCalendarWithReminder from './DashboardCalendarWithReminder.js';

function Dashboard() {
  return (
    <>
      <AdminLayout>
        <ChatWidget /> 
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Left Side: Widgets and Chart */}
          <div style={{ flex: 3 }}>
            <Widget />
            <UserStatsChart />
          </div>

          {/* Right Side: Calendar */}
          <div style={{ flex: 1 }}>
            <DashboardCalendarWithReminder />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Dashboard;




// import React from "react";
// import AdminLayout from './Wrapper.js';
// import Widget from '../components/widget/Widget.js';
// import UserStatsChart from './UserStatsChart.js';


// import ChatWidget from './ChatWidget.js';

// function Dashboard() {
//   return (
//     <>
      
//       <AdminLayout>
//         <ChatWidget /> 
//         <Widget />  
//         <UserStatsChart />
//       </AdminLayout>

      
//     </>
//   );
// }

// export default Dashboard;
