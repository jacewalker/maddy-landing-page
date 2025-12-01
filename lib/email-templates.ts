interface FormData {
  name: string
  email: string
  clinicName: string
  software: string
}

export function getSalesNotificationEmail(data: FormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Waitlist Signup</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Waitlist Signup! 🎉</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 24px;">
                Someone just joined the Maddy waitlist. Here are the details:
              </p>
              
              <!-- Details Table -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px; background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
                    <strong style="color: #1F2937;">Name:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB; color: #374151;">
                    ${data.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FFFFFF; border-bottom: 1px solid #E5E7EB;">
                    <strong style="color: #1F2937;">Email:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #FFFFFF; border-bottom: 1px solid #E5E7EB; color: #374151;">
                    <a href="mailto:${data.email}" style="color: #2563EB; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
                    <strong style="color: #1F2937;">Clinic Name:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB; color: #374151;">
                    ${data.clinicName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FFFFFF;">
                    <strong style="color: #1F2937;">Practice Software:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #FFFFFF; color: #374151;">
                    ${data.software}
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #6B7280; font-size: 14px; line-height: 20px;">
                Follow up with them soon to schedule a demo and answer any questions!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #F9FAFB; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6B7280; font-size: 12px;">
                Maddy AI - AI Receptionist for Allied Health
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function getUserConfirmationEmail(name: string): string {
  return `
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
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to Maddy! 👋</h1>
              <p style="margin: 0; color: #E0E7FF; font-size: 16px;">Thanks for joining our waitlist</p>
            </td>
          </tr>
          
          <!-- Content -->
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
              
              <!-- What's Next Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #EFF6FF; border-left: 4px solid #2563EB; border-radius: 4px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="margin: 0 0 12px; color: #1E40AF; font-size: 18px; font-weight: 600;">What's Next?</h2>
                    <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 22px;">
                      <li style="margin-bottom: 8px;">Our team will review your information</li>
                      <li style="margin-bottom: 8px;">We'll reach out to schedule a personalised demo</li>
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
          
          <!-- Footer -->
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
  `.trim()
}
