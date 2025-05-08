// models/Metrics.js
import mongoose from 'mongoose';

const MetricsSchema = new mongoose.Schema({
  cpu: {
    utilization: String,
  },
  // Add all other fields used in metricsCollector.js...
}, { timestamps: true });

const Metrics = mongoose.model('Metrics', MetricsSchema);
export default Metrics;

// import mongoose from 'mongoose';

// const metricsSchema = new mongoose.Schema({
//   cpu: {
//     utilization: String,
//   },
//   memory: {
//     total: String,
//     used: String,
//     free: String,
//     swapUsed: String,
//   },
//   diskIO: mongoose.Schema.Types.Mixed, 
//   diskUsage: [
//     {
//       fs: String,
//       used: String,
//       available: String,
//       usagePercent: String,
//     }
//   ],
//   networkIO: [
//     {
//       iface: String,
//       rx: String,
//       tx: String,
//       dropped: Number,
//     }
//   ],
//   loadAverages: {
//     '1min': Number,
//     '5min': Number,
//     '15min': Number,
//   },
//   processCounts: {
//     total: Number,
//     running: Number,
//     blocked: Number,
//   },
//   logs: {
//     totalLogs: Number,
//     errorLogs: Number,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Metrics = mongoose.model('Metrics', metricsSchema);

// export default Metrics;





// import mongoose from 'mongoose';

// const ServerMetricSchema = new mongoose.Schema({
//   serverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Server',
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//     index: true
//   },
//   cpuUsage: {
//     type: Number,
//     required: true
//   },
//   memoryUsage: {
//     type: Number,
//     required: true
//   },
//   diskUsage: {
//     type: Number,
//     required: true
//   },
//   networkIn: {
//     type: Number
//   },
//   networkOut: {
//     type: Number
//   },
//   uptime: {
//     type: Number
//   },
//   loadAverage: {
//     type: [Number]
//   }
// }, { timestamps: true });

// const ServerMetric = mongoose.model('ServerMetric', ServerMetricSchema);
// export default ServerMetric; 





// const ServerMetricSchema = new mongoose.Schema({
//     serverId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Server',
//       required: true
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now,
//       index: true
//     },
//     cpuUsage: {
//       type: Number, 
//       required: true
//     },
//     memoryUsage: {
//       type: Number, 
//       required: true
//     },
//     diskUsage: {
//       type: Number, 
//       required: true
//     },
//     networkIn: {
//       type: Number 
//     },
//     networkOut: {
//       type: Number 
//     },
//     uptime: {
//       type: Number 
//     },
//     loadAverage: {
//       type: [Number] 
//     }
//   }, { timestamps: true });
  
//   module.exports = mongoose.model('ServerMetric', ServerMetricSchema);