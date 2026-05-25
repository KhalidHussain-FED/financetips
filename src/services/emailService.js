import nodemailer from 'nodemailer';

// Create transporter with Finance Ledger Tips email settings
const transporter = nodemailer.createTransport({
  host: 'webs26.futuresouls.com',  // Your cPanel mail server
  port: 465,                        // SMTP Port for SSL/TLS
  secure: true,                     // Use SSL/TLS (true for port 465)
  auth: {
    user: 'info@financeledgertips.com',  // Your email address
    pass: process.env.EMAIL_PASS         // Password from .env file
  }
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email server connection error:', error);
  } else {
    console.log('Email server is ready to send messages from info@financeledgertips.com');
  }
});

export async function sendContactEmail(formData) {
  const { name, email, subject, message } = formData;

  // Email to admin (you)
  const adminMailOptions = {
    from: '"Finance Ledger Tips" <info@financeledgertips.com>',
    to: 'info@financeledgertips.com',
    replyTo: email,  // Reply goes to the person who filled the form
    subject: `New Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; padding: 20px; border-radius: 10px 10px 0 0;">
          <h2 style="color: #FFD300; margin: 0;">📬 New Contact Form Message</h2>
        </div>
        <div style="padding: 20px; border: 2px solid #FFD300; border-top: none; border-radius: 0 0 10px 10px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">Name:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">Subject:</td>
              <td style="padding: 10px;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <h3 style="margin: 0 0 10px 0;">Message:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Sent from Finance Ledger Tips Contact Form | ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `
  };

  // Auto-reply to user
  const userMailOptions = {
    from: '"Finance Ledger Tips" <info@financeledgertips.com>',
    to: email,
    subject: '✅ We received your message - Finance Ledger Tips',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; padding: 20px; border-radius: 10px 10px 0 0;">
          <h2 style="color: #FFD300; margin: 0;">Message Received!</h2>
        </div>
        <div style="padding: 20px; border: 2px solid #FFD300; border-top: none; border-radius: 0 0 10px 10px;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for contacting Finance Ledger Tips! We've received your message about "<strong>${subject}</strong>".</p>
          <p>Our team will review your inquiry and respond within <strong>24 hours</strong> during business days (Monday - Friday).</p>
          
          <div style="background: #FFF9E6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold;">📋 Your Message Summary:</p>
            <p style="margin: 0; color: #666; white-space: pre-wrap;">${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</p>
          </div>
          
          <p>In the meantime, you might find these helpful:</p>
          <ul>
            <li>📚 <a href="https://financeledgertips.com/blog" style="color: #000;">Browse our blog</a> for financial guides</li>
            <li>🏠 <a href="https://financeledgertips.com" style="color: #000;">Visit our homepage</a> for latest updates</li>
          </ul>
          
          <div style="border-top: 1px solid #eee; margin-top: 20px; padding-top: 20px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Best regards,<br>
              <strong style="color: #000;">Finance Ledger Tips Team</strong><br>
              📧 info@financeledgertips.com<br>
              🌐 <a href="https://financeledgertips.com" style="color: #000;">financeledgertips.com</a>
            </p>
          </div>
        </div>
      </div>
    `
  };

  try {
    // Send email to admin
    await transporter.sendMail(adminMailOptions);
    console.log('Admin notification sent to info@financeledgertips.com');
    
    // Send auto-reply to user
    await transporter.sendMail(userMailOptions);
    console.log('Auto-reply sent to', email);
    
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
}