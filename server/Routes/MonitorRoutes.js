import express from 'express';
import { startMonitoring, stopMonitoring } from './metricCollector.js'; // Ensure correct import

const router = express.Router();

// Start monitoring
router.post('/api/monitor/start', (req, res) => {
  try {
    startMonitoring();
    res.json({ message: 'Monitoring started' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to start monitoring' });
  }
});

// Stop monitoring
router.post('/api/monitor/stop', (req, res) => {
  try {
    stopMonitoring();
    res.json({ message: 'Monitoring stopped' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to stop monitoring' });
  }
});

export default router;



// // server/Routes/MonitorRoutes.js
// import express from 'express';
// import { startMonitoring, stopMonitoring } from '../services/metricCollector.js';

// const router = express.Router();

// router.post('/start', (req, res) => {
//   startMonitoring();
//   res.json({ message: 'Monitoring started' });
// });

// router.post('/stop', (req, res) => {
//   stopMonitoring();
//   res.json({ message: 'Monitoring stopped' });
// });

// export default router;
