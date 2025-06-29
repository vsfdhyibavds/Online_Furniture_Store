import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  // For development, use a service like Ethereal Email or configure with your email provider
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
    pass: process.env.SMTP_PASS || 'ethereal.pass'
  }
});

export async function sendWelcomeEmail(email, firstName) {
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@furnstore.com',
      to: email,
      subject: 'Welcome to FurnStore!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to FurnStore, ${firstName}!</h1>
          <p>Thank you for joining our community of furniture enthusiasts.</p>
          <p>We're excited to help you transform your space with our premium furniture collection.</p>
          <div style="margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Start Shopping
            </a>
          </div>
          <p>Best regards,<br>The FurnStore Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
}

export async function sendOrderConfirmationEmail(email, firstName, orderId) {
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@furnstore.com',
      to: email,
      subject: `Order Confirmation - #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Order Confirmed!</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for your order! We've received your order <strong>#${orderId}</strong> and are processing it now.</p>
          <p>You'll receive another email with tracking information once your order ships.</p>
          <div style="margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders/${orderId}" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              View Order Details
            </a>
          </div>
          <p>Best regards,<br>The FurnStore Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email, resetToken) {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@furnstore.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Password Reset Request</h1>
          <p>You requested a password reset for your FurnStore account.</p>
          <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Reset Password
            </a>
          </div>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The FurnStore Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
}