const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, min: 0, max: 100, required: true },
  category: {
    type: String,
    enum: ['Languages', 'Frontend', 'Backend', 'AI/ML', 'Tools'],
    default: 'Frontend',
  },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Skill', SkillSchema);
