import nodemailer from 'nodemailer';
import config from '../config/env.js';

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host:   config.email.host,
  port:   config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

/**
 * Send the 6-digit password reset code to the user's email.
 * @param {string} toEmail
 * @param {string} code
 */
export const sendResetCodeEmail = async (toEmail, code) => {
  const html = `
    <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f8f7fc;border-radius:12px;">
      <div style="text-align:center;margin-bottom:28px;">
        <h2 style="color:#362b55;font-size:22px;margin:0;">ResumeForge</h2>
        <p style="color:#888;font-size:13px;margin-top:4px;">Password Reset</p>
      </div>
      <div style="background:#fff;border-radius:10px;padding:28px;border:1px solid #e2dff0;">
        <p style="color:#333;font-size:15px;line-height:1.7;margin-bottom:24px;">
          We received a request to reset your password. Enter the code below to continue.
          This code expires in <strong>15 minutes</strong>.
        </p>
        <div style="text-align:center;background:#f0ecff;border-radius:10px;padding:20px 0;margin-bottom:24px;">
          <span style="font-size:36px;font-weight:900;letter-spacing:10px;color:#362b55;">${code}</span>
        </div>
        <p style="color:#888;font-size:13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from:    config.email.from,
    to:      toEmail,
    subject: 'Your ResumeForge password reset code',
    html,
  });
};
