const QuerySchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    errorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ErrorDetection',
      required: true
    },
    query: {
      type: String,
      required: true
    },
    chatbotResponse: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  module.exports = mongoose.model('Query', QuerySchema);
  