const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
    console.log('Testing email configuration...');
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port:', process.env.SMTP_PORT);
    console.log('SMTP User:', process.env.SMTP_USER);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: true, // SSL
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: 'me@jace.au',
            subject: 'Test Email from Maddy Waitlist System',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Test Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px;">
            <h1 style="color: #2563EB; margin-bottom: 20px;">Email Configuration Test ✅</h1>
            <p style="color: #374151; font-size: 16px; line-height: 24px;">
              This is a test email to verify that the Maddy waitlist email system is configured correctly.
            </p>
            <div style="background-color: #EFF6FF; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <h2 style="color: #1E40AF; font-size: 18px; margin: 0 0 10px 0;">Configuration Details:</h2>
              <ul style="color: #374151; margin: 0; padding-left: 20px;">
                <li>SMTP Server: ${process.env.SMTP_HOST}</li>
                <li>Port: ${process.env.SMTP_PORT} (SSL)</li>
                <li>From: ${process.env.SMTP_FROM}</li>
              </ul>
            </div>
            <p style="color: #374151; font-size: 16px; line-height: 24px;">
              If you're seeing this email, the configuration is working correctly! 🎉
            </p>
            <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
              — Maddy Email System
            </p>
          </div>
        </body>
        </html>
      `,
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
}

testEmail();
