import React from "react";
import AdminLayout from './Wrapper.js';
import Widget from '../components/widget/Widget.js';

import ChatWidget from './ChatWidget.js';

function Dashboard() {
  return (
    <>
      
      <AdminLayout>
        <ChatWidget /> 
        <Widget />  
      </AdminLayout>

      
    </>
  );
}

export default Dashboard;
