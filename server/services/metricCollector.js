// src/metricCollector.js
import si from 'systeminformation';
import ServerMetric from './models/Metrics.js'; // Adjust the path according to your project structure

let interval = null;  // This will hold the interval ID
const serverId = 'YOUR_SERVER_ID_HERE'; // Replace with your server ID

async function collectMetrics() {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const diskUsage = await si.fsSize();
    const networkIO = await si.networkStats();
    const load = await si.currentLoad();
    const uptime = await si.time();

    const averageDiskUsage = diskUsage.length
      ? diskUsage.reduce((sum, d) => sum + (d.used / d.size), 0) / diskUsage.length
      : 0;

    const totalNetworkIn = networkIO.reduce((sum, n) => sum + (n.rx_sec || 0), 0);
    const totalNetworkOut = networkIO.reduce((sum, n) => sum + (n.tx_sec || 0), 0);

    const metricData = {
      serverId,
      cpuUsage: cpu.currentLoad,
      memoryUsage: (memory.used / memory.total) * 100,
      diskUsage: averageDiskUsage * 100,
      networkIn: totalNetworkIn / 1024,
      networkOut: totalNetworkOut / 1024,
      uptime: uptime.uptime,
      loadAverage: [load.avgload, load.avgload, load.avgload]
    };

    await ServerMetric.create(metricData);
    console.log('📥 Saved metric at', new Date().toISOString());
  } catch (err) {
    console.error('❌ Error saving metric:', err.message);
  }
}

export function startMonitoring() {
  if (interval) {
    console.log('⚠️ Monitoring already running');
    return;
  }
  console.log('✅ Monitoring started');
  interval = setInterval(collectMetrics, 5000); // Collect metrics every 5 seconds
}

export function stopMonitoring() {
  if (!interval) {
    console.log('⚠️ Monitoring not running');
    return;
  }
  clearInterval(interval);
  interval = null;
  console.log('🛑 Monitoring stopped');
}


// import si from 'systeminformation';
// import fs from 'fs';
// import ServerMetric from '../models/Metrics.js'; 

// let interval = null;
// const serverId = 'YOUR_SERVER_ID_HERE'; 

// async function collectMetrics() {
//   const cpu = await si.currentLoad();
//   const memory = await si.mem();
//   const diskUsage = await si.fsSize();
//   const networkIO = await si.networkStats();
//   const load = await si.currentLoad();
//   const uptime = await si.time();

//   const averageDiskUsage = diskUsage.length
//     ? diskUsage.reduce((sum, d) => sum + (d.used / d.size), 0) / diskUsage.length
//     : 0;

//   const totalNetworkIn = networkIO.reduce((sum, n) => sum + (n.rx_sec || 0), 0);
//   const totalNetworkOut = networkIO.reduce((sum, n) => sum + (n.tx_sec || 0), 0);

//   const metricData = {
//     serverId,
//     cpuUsage: cpu.currentLoad,
//     memoryUsage: (memory.used / memory.total) * 100,
//     diskUsage: averageDiskUsage * 100,
//     networkIn: totalNetworkIn / 1024,
//     networkOut: totalNetworkOut / 1024,
//     uptime: uptime.uptime,
//     loadAverage: [load.avgload, load.avgload, load.avgload]
//   };

//   try {
//     await ServerMetric.create(metricData);
//     console.log('📥 Saved metric at', new Date().toISOString());
//   } catch (err) {
//     console.error('❌ Error saving metric:', err.message);
//   }
// }

// export function startMonitoring() {
//   if (interval) {
//     console.log('⚠️ Monitoring already running');
//     return;
//   }
//   console.log('✅ Monitoring started');
//   interval = setInterval(collectMetrics, 5000);
// }

// export function stopMonitoring() {
//   if (!interval) {
//     console.log('⚠️ Monitoring not running');
//     return;
//   }
//   clearInterval(interval);
//   interval = null;
//   console.log('🛑 Monitoring stopped');
// }
