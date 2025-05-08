import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import '../App.css';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/user-dashboard", 
  },
  {
    title: "Metrics",
    icon: <EqualizerIcon />,
    link: "/user-metric", 
  },
  {
    title: "Alerts",
    icon: <PriorityHighTwoToneIcon />,
    link: "/user-alerts", 
  }
];
