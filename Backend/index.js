require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Example login details for each product
const PRODUCT_LOGINS = {
  chatgpt: 'ChatGPT Login: user@example.com / pass123',
  capcut: 'CapCut Login: user@example.com / pass456',
  canva: 'Canva Login: user@example.com / pass789',
  combo: 'Combo Login: user@example.com / pass999',
};

app.post('/paystack-webhook', async (req, res) => {
  const event = req.body;
  // Only process successful payments
  if (event.event === 'charge.success') {
    const email = event.data.customer.email;
    // Determine products purchased (customize as needed)
    // For demo, send all logins
    let purchased = Object.values(PRODUCT_LOGINS).join('\n');
    // Send email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Premium Product Login',
        text: `Thank you for your purchase!\n\n${purchased}`,
      });
      console.log('Login sent to:', email);
    } catch (err) {
      console.error('Email error:', err);
    }
  }
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
