const ServerMetricSchema = new mongoose.Schema({
    serverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Server',
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    },
    cpuUsage: {
      type: Number, 
      required: true
    },
    memoryUsage: {
      type: Number, 
      required: true
    },
    diskUsage: {
      type: Number, 
      required: true
    },
    networkIn: {
      type: Number 
    },
    networkOut: {
      type: Number 
    },
    uptime: {
      type: Number 
    },
    loadAverage: {
      type: [Number] 
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('ServerMetric', ServerMetricSchema);