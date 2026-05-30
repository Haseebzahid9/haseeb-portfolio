const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'Full Stack', 'Frontend', 'Backend', 'AI/ML', 'DSA', 'Mobile', 'Database',
      'C', 'C++', 'C#', 'Python', 'Java', 'JavaScript',
      'DBMS', 'OOP', 'OS', 'Networking', 'Compiler', 'Assembly',
      'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
      'Cloud', 'DevOps', 'Cybersecurity', 'Blockchain',
    ],
    required: true,
  },
  description: { type: String, required: true },
  technologies: [String],
  image: { type: String, default: '' },
  github: { type: String, default: '#' },
  live: { type: String, default: '#' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
