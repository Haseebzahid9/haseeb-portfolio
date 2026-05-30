const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Haseeb Raza' },
  title: { type: String, default: 'Frontend Developer' },
  bioshort: { type: String, default: '' },
  biolong: { type: String, default: '' },
  phone: { type: String, default: '+92 3184006367' },
  email: { type: String, default: 'haseebzahid4998@gmail.com' },
  city: { type: String, default: 'Lahore, Pakistan' },
  degree: { type: String, default: 'BS Computer Science' },
  freelance: { type: String, default: 'Available' },
  github: { type: String, default: 'https://github.com/Haseebzahid9' },
  linkedin: { type: String, default: 'https://www.linkedin.com/in/haseebraza4998/' },
  instagram: { type: String, default: 'https://www.instagram.com/haseebzahid_/' },
});

module.exports = mongoose.model('Profile', ProfileSchema);
