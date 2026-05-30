const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  skills: { type: [String], default: [] },
  credentialUrl: { type: String, default: '' },
  category: {
    type: String,
    enum: ['Web Development', 'AI/ML', 'Database', 'Cloud', 'Programming', 'Other'],
    default: 'Other',
  },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Certificate', CertificateSchema);
