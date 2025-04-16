import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import '../App.css';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  { 
    title: "Users",
    icon: <VerifiedUserIcon />,
    link: "/users",
  },
  {
    title: "Notification",
    icon: <NotificationsNoneTwoToneIcon />,
    link: "/notification",
  },
  {
    title: "Alerts",
    icon: <PriorityHighTwoToneIcon />,
    link: "/alerts",
  }
];
