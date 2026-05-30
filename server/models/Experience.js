const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: '' },
  period: { type: String, required: true },
  points: { type: [String], default: [] },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Experience', ExperienceSchema);
