const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Admin = require('../models/Admin');
const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

const getTransporter = () =>
  nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

const sendOtpEmail = async (otp) => {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Haseeb Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'Admin Login Verification Code - Haseeb Portfolio',
    html: `
      <div style="font-family:Arial;max-width:400px;margin:auto;padding:30px;border:1px solid #eee;border-radius:8px">
        <h2 style="color:#0dcaf0">Haseeb Portfolio — Admin Login</h2>
        <p>Your verification code is:</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#1a1a2e;text-align:center;padding:20px;background:#f8f9fa;border-radius:8px">
          ${otp}
        </div>
        <p>Expires in <strong>5 minutes</strong>.</p>
        <p style="color:#999;font-size:12px">If you did not request this, ignore this email.</p>
      </div>
    `,
  });
};

// Step 1 — credentials
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password' });

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    admin.otpAttempts = 0;
    admin.otpLockedUntil = null;
    await admin.save();

    try {
      await sendOtpEmail(otp);
    } catch (emailErr) {
      console.error('OTP email error:', emailErr.message);
    }

    res.json({
      success: true,
      step: 'otp_required',
      message: `Verification code sent to ${email}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Step 2 — verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid request' });

    if (admin.otpLockedUntil && admin.otpLockedUntil > Date.now()) {
      const remaining = Math.ceil((admin.otpLockedUntil - Date.now()) / 60000);
      return res.status(403).json({ message: `Too many attempts. Try again in ${remaining} minute${remaining > 1 ? 's' : ''}.` });
    }

    if (!admin.otp || Date.now() > new Date(admin.otpExpiry).getTime())
      return res.status(400).json({ message: 'OTP expired. Please login again.' });

    if (admin.otp !== otp) {
      admin.otpAttempts += 1;
      if (admin.otpAttempts >= 3) {
        admin.otpLockedUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await admin.save();
      const left = 3 - admin.otpAttempts;
      return res.status(400).json({
        message: left > 0
          ? `Invalid verification code. ${left} attempt${left !== 1 ? 's' : ''} remaining.`
          : 'Account locked for 15 minutes due to too many failed attempts.',
      });
    }

    admin.otp = null;
    admin.otpExpiry = null;
    admin.otpAttempts = 0;
    admin.otpLockedUntil = null;
    await admin.save();

    res.json({
      success: true,
      token: signToken(admin._id),
      name: admin.name,
      email: admin.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid request' });

    if (admin.otpLockedUntil && admin.otpLockedUntil > Date.now()) {
      const remaining = Math.ceil((admin.otpLockedUntil - Date.now()) / 60000);
      return res.status(403).json({ message: `Account locked. Try again in ${remaining} minutes.` });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    admin.otpAttempts = 0;
    await admin.save();

    await sendOtpEmail(otp);

    res.json({ success: true, message: 'New code sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
