const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  readAt: {
    type: Date,
    default: null
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('message', MessageSchema);
