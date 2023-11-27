require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT; // You can change the port as needed

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

app.use(cors());
// Set your email and password
const senderEmail = 'dayatechmedia@gmail.com';
const password = 'jjlbhtcrvjiebopt';

// Input recipient email address
const recipientEmail = 'egaputradelmar@gmail.com';

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: senderEmail,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Define the route for handling POST requests
app.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create email options
    const mailOptions = {
      from: `"Ega Portofolio Message" <${senderEmail}>`,
      to: recipientEmail,
      cc: `${name} <${email}>`,
      subject: `${subject} (${email})`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.send('Email sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
