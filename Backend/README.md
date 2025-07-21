# Node.js Paystack Webhook & Automated Email Backend

This backend receives Paystack payment notifications, verifies payment, and sends product login details to the customer's email using nodemailer.

## Features
- Express server with /paystack-webhook endpoint
- Paystack webhook verification
- Automated email delivery (nodemailer)
- .env support for secrets

## Setup
1. Install dependencies:
   ```bash
   npm install express body-parser nodemailer dotenv
   ```
2. Create a `.env` file with:
   ```env
   PORT=3000
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   RECEIVER_EMAIL=your_gmail@gmail.com
   ```
3. Start the server:
   ```bash
   node index.js
   ```
4. Set your Paystack webhook to `http://your-server/paystack-webhook`

## How it works
- On successful payment, Paystack POSTs to `/paystack-webhook`.
- The backend sends product login details to the buyer's email.

---

**Replace credentials and customize product login details as needed.**
