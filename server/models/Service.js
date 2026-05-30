const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'code' },
  tags: { type: [String], default: [] },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Service', ServiceSchema);
