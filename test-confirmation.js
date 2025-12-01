const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

// Import the email template function
const { getUserConfirmationEmail } = require('./lib/email-templates.ts');

async function sendConfirmationTest() {
    console.log('Sending waitlist confirmation email...');
    console.log('From:', process.env.SMTP_FROM);
    console.log('To: me@jace.au');

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Since we can't import TS directly, let's inline the template
    const getUserConfirmationEmail = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Maddy</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to Maddy! 👋</h1>
              <p style="margin: 0; color: #E0E7FF; font-size: 16px;">Thanks for joining our waitlist</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #374151; font-size: 16px; line-height: 24px;">
                Hi ${name},
              </p>
              <p style="margin: 0 0 16px; color: #374151; font-size: 16px; line-height: 24px;">
                Thank you for signing up for early access to Maddy - your AI-powered virtual receptionist for Allied Health practices!
              </p>
              <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 24px;">
                We're excited to help you never miss a call, fill your calendar, and give your team their time back.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #EFF6FF; border-left: 4px solid #2563EB; border-radius: 4px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="margin: 0 0 12px; color: #1E40AF; font-size: 18px; font-weight: 600;">What's Next?</h2>
                    <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 22px;">
                      <li style="margin-bottom: 8px;">Our team will review your information</li>
                      <li style="margin-bottom: 8px;">We'll reach out to schedule a personalized demo</li>
                      <li>You'll get exclusive early access pricing</li>
                    </ul>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 24px;">
                In the meantime, if you have any questions, feel free to reply to this email.
              </p>
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 24px;">
                Best regards,<br>
                <strong>The Maddy Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #F9FAFB; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px; color: #374151; font-size: 14px; font-weight: 600;">
                Maddy AI
              </p>
              <p style="margin: 0; color: #6B7280; font-size: 12px;">
                AI-powered virtual receptionist for Australian Allied Health practices
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: 'me@jace.au',
            subject: 'Welcome to Maddy - Thanks for Joining!',
            html: getUserConfirmationEmail('Jace'),
        });

        console.log('✅ Confirmation email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
}

sendConfirmationTest();
