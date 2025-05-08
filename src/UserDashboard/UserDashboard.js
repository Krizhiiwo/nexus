import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardActionArea, Typography } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const Dashboard = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    deletedUsers: 0,
    adminUsers: 0,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminderText, setReminderText] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/user-total');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error.message);
      }
    };

    fetchStats();
  }, []);

  const toggleMonitoring = async () => {
    setLoading(true);
    try {
      const endpoint = isMonitoring ? '/api/monitor/stop' : '/api/monitor/start';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log('Response:', result);
      if (response.ok) {
        setIsMonitoring(!isMonitoring);
        alert(result.message);
      } else {
        alert(result.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Monitoring error:', error);
      alert('Failed to toggle monitoring');
    }
    setLoading(false);
  };

  const handleAddReminder = () => {
    if (reminderText.trim()) {
      const newReminder = {
        date: selectedDate.toDateString(),
        text: reminderText.trim(),
      };
      setReminders([...reminders, newReminder]);
      setReminderText('');
    }
  };

  return (
    <Box display="flex" gap={4} mt={2} alignItems="flex-start">
      {/* Left Side: Cards and Monitoring Button */}
      <Box flex={1}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Card sx={{ width: 250, height: 120 }}>
            <CardActionArea sx={{ height: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  TOTAL ERRORS
                </Typography>
                <Typography variant="body1">{stats.totalUsers}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: 250, height: 120 }}>
            <CardActionArea sx={{ height: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  FIXED ERRORS
                </Typography>
                <Typography variant="body1">{stats.deletedUsers}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: 250, height: 120 }}>
            <CardActionArea sx={{ height: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  RECENT ERRORS
                </Typography>
                <Typography variant="body1">{stats.adminUsers}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        <Box mt={3}>
          <button
            onClick={toggleMonitoring}
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: isMonitoring ? '#dc2626' : '#3f51b5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Please wait...' : isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </button>
        </Box>
      </Box>

      
      
    </Box>
  );
};

export default Dashboard;
