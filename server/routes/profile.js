const express = require('express');
const Profile = require('../models/Profile');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
