const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = async ({ name, email, subject, message }) => {
  // Notify Haseeb
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `[Portfolio] ${subject}`,
    html: `<h3>New message from ${name}</h3>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong><br/>${message}</p>`,
  });

  // Auto-reply to sender
  await transporter.sendMail({
    from: `"Haseeb Raza" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thank you for reaching out!',
    html: `<h2>Hi ${name},</h2>
           <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
           <p><strong>Your message:</strong><br/>${message}</p>
           <br/>
           <p>Best regards,<br/><strong>Haseeb Raza</strong><br/>Frontend Developer | CS Student at FAST-NUCES</p>`,
  });
};

module.exports = sendContactEmail;
