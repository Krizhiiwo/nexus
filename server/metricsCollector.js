// metricsCollector.js

import si from 'systeminformation';
import fs from 'fs';
import mongoose from 'mongoose';
import readline from 'readline';
import dotenv from 'dotenv';
import path from 'path';
import Metrics from './models/Metrics.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// MongoDB URI
const { MONGO_URI } = process.env;
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI. Please check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

let interval;

async function collectMetrics() {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const diskIO = await si.disksIO().catch(() => null);
    const diskUsage = await si.fsSize();
    const networkIO = await si.networkStats();
    const load = await si.currentLoad();
    const processes = await si.processes();

    let errorLogs = 0;
    let totalLogs = 0;

    try {
      const logData = fs.readFileSync('sample.log', 'utf8');
      const logLines = logData.split('\n');
      totalLogs = logLines.length;
      errorLogs = logLines.filter(line => line.toLowerCase().includes('error')).length;
    } catch {
      console.warn('⚠️ Log file not found or unreadable');
    }

    const metrics = {
      cpu: {
        utilization: cpu.currentLoad.toFixed(2) + '%',
      },
      memory: {
        total: (memory.total / 1e9).toFixed(2) + ' GB',
        used: (memory.used / 1e9).toFixed(2) + ' GB',
        free: (memory.free / 1e9).toFixed(2) + ' GB',
        swapUsed: (memory.swaptotal / 1e9).toFixed(2) + ' GB',
      },
      diskIO: diskIO
        ? {
            read: `${(diskIO.rIO_sec / 1024).toFixed(2)} KB/s`,
            write: `${(diskIO.wIO_sec / 1024).toFixed(2)} KB/s`,
          }
        : 'Disk I/O not supported on this OS',
      diskUsage: diskUsage.map(disk => ({
        fs: disk.fs,
        used: (disk.used / 1e9).toFixed(2) + ' GB',
        available: ((disk.size - disk.used) / 1e9).toFixed(2) + ' GB',
        usagePercent: ((disk.used / disk.size) * 100).toFixed(2) + '%',
      })),
      networkIO: networkIO.map(net => ({
        iface: net.iface,
        rx: `${(net.rx_sec / 1024).toFixed(2)} KB/s`,
        tx: `${(net.tx_sec / 1024).toFixed(2)} KB/s`,
        dropped: (net.rx_dropped || 0) + (net.tx_dropped || 0),
      })),
      loadAverages: {
        '1min': load.avgload,
        '5min': load.avgload,
        '15min': load.avgload,
      },
      processCounts: {
        total: processes.all,
        running: processes.running,
        blocked: processes.blocked,
      },
      logs: {
        totalLogs,
        errorLogs,
      },
    };

    console.clear();
    console.log(JSON.stringify(metrics, null, 2));

    await Metrics.create(metrics);
    console.log('📥 Metrics saved to MongoDB');
  } catch (err) {
    console.error('Error collecting or saving metrics:', err.message);
  }
}

function startMonitoring() {
  console.log('📊 Starting metric collection every 5 seconds. Press "q" to stop.');
  interval = setInterval(collectMetrics, 5000);
}

// Keyboard listener for stopping
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
    clearInterval(interval);
    console.log('\nMonitoring stopped by user (q pressed).');
    process.exit();
  }
});

startMonitoring();




// import si from 'systeminformation';
// import fs from 'fs';
// import readline from 'readline';

// let interval;

// async function collectMetrics() {
//   const cpu = await si.currentLoad();
//   const memory = await si.mem();
//   const diskIO = await si.disksIO().catch(() => null);
//   const diskUsage = await si.fsSize();
//   const networkIO = await si.networkStats();
//   const load = await si.currentLoad();
//   const processes = await si.processes();

//   let errorLogs = 0;
//   let totalLogs = 0;

//   try {
//     const logData = fs.readFileSync('sample.log', 'utf8');
//     const logLines = logData.split('\n');
//     totalLogs = logLines.length;
//     errorLogs = logLines.filter(line => line.toLowerCase().includes('error')).length;
//   } catch {
//     console.warn('Log file not found or unreadable');
//   }

//   const metrics = {
//     cpu: {
//       utilization: cpu.currentLoad.toFixed(2) + '%',
//     },
//     memory: {
//       total: (memory.total / 1e9).toFixed(2) + ' GB',
//       used: (memory.used / 1e9).toFixed(2) + ' GB',
//       free: (memory.free / 1e9).toFixed(2) + ' GB',
//       swapUsed: (memory.swaptotal / 1e9).toFixed(2) + ' GB',
//     },
//     diskIO: diskIO
//       ? {
//           read: `${(diskIO.rIO_sec / 1024).toFixed(2)} KB/s`,
//           write: `${(diskIO.wIO_sec / 1024).toFixed(2)} KB/s`,
//         }
//       : 'Disk I/O not supported on this OS',
//     diskUsage: diskUsage.map(disk => ({
//       fs: disk.fs,
//       used: (disk.used / 1e9).toFixed(2) + ' GB',
//       available: ((disk.size - disk.used) / 1e9).toFixed(2) + ' GB',
//       usagePercent: ((disk.used / disk.size) * 100).toFixed(2) + '%',
//     })),
//     networkIO: networkIO.map(net => ({
//       iface: net.iface,
//       rx: `${(net.rx_sec / 1024).toFixed(2)} KB/s`,
//       tx: `${(net.tx_sec / 1024).toFixed(2)} KB/s`,
//       dropped: (net.rx_dropped || 0) + (net.tx_dropped || 0),
//     })),
//     loadAverages: {
//       '1min': load.avgload,
//       '5min': load.avgload,
//       '15min': load.avgload,
//     },
//     processCounts: {
//       total: processes.all,
//       running: processes.running,
//       blocked: processes.blocked,
//     },
//     logs: {
//       totalLogs,
//       errorLogs,
//     },
//   };

//   console.clear();
//   console.log(JSON.stringify(metrics, null, 2));
// }

// function startMonitoring() {
//   console.log('📊 Starting metric collection every 5 seconds. Press "q" to stop.');
//   interval = setInterval(collectMetrics, 5000);
// }

// // Listen for 'q' key to quit
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.resume();
// process.stdin.on('keypress', (str, key) => {
//   if (key.name === 'q') {
//     clearInterval(interval);
//     console.log('\n🛑 Monitoring stopped by user (q pressed).');
//     process.exit();
//   }
// });

// startMonitoring();
