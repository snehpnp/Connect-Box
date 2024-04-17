const nodemailer = require('nodemailer');

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  host: 'growmorealgo.com', // SMTP server hostname
  port: 465, // Port for secure SMTP
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'support@growmorealgo.com', // Sender's email address
    pass: '3?[$8udJtA(^' // Sender's email password or App Password
  }
});

// Email content
const mailOptions = {
  from: 'support@growmorealgo.com', // Sender's email address
  to: 'snehpnp@gmail.com', // Recipient's email address
  subject: 'Test Email', // Email subject
  text: 'Hello, This is a test email.' // Email body (plain text)
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
