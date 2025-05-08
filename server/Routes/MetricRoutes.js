// server/Routes/MetricRoutes.js
import express from 'express';
import Metrics from '../models/Metrics.js';

const router = express.Router();

router.get('/metrics/cpu', async (req, res) => {
  try {
    const latestMetrics = await Metrics.find().sort({ createdAt: -1 }).limit(20); // latest 20
    const response = latestMetrics.map(entry => ({
      time: entry.createdAt,
      value: parseFloat(entry.cpu.utilization.replace('%', '')) // remove % and convert
    }));
    res.json(response.reverse()); // chronological order
  } catch (err) {
    console.error('Failed to fetch CPU metrics:', err.message);
    res.status(500).json({ error: 'Failed to fetch CPU metrics' });
  }
});

export default router;
