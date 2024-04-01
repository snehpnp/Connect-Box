const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  host: 'mail.expertalgo.com', // Replace with your SMTP host
  port: 465, // Replace with your SMTP port
  secure: false, // Set to true if your SMTP server uses SSL/TLS
  auth: {
    user: 'info@expertalgo.com',
    pass: 'Expertalgo@543'
  }
});

// Email options
const mailOptions = {
  from: 'info@expertalgo.com',
  to: 'snehpnp@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email sent using Nodemailer.'
};

// Send email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
