const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  coursework: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Education', EducationSchema);
