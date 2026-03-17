import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  NEXT_PUBLIC_SITE_URL,
} = process.env;

function createTransport() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'SMTP configuration is missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local'
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const transporter = createTransport();
  const siteUrl = NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Notification email to site owner
  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${SMTP_USER}>`,
    to: SMTP_USER,
    replyTo: payload.email,
    subject: `[Portfolio] New message: ${payload.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8; margin-top: 0;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #4b5563;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
            <td style="padding: 8px 0; color: #4b5563;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
            <td style="padding: 8px 0; color: #4b5563;">${escapeHtml(payload.subject)}</td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <strong style="color: #374151;">Message:</strong>
          <div style="margin-top: 8px; padding: 16px; background: #f9fafb; border-radius: 4px; color: #374151; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>
        </div>
        <hr style="margin: 24px 0; border-color: #e5e7eb;" />
        <p style="font-size: 12px; color: #9ca3af;">Sent from <a href="${siteUrl}">${siteUrl}</a></p>
      </div>
    `,
  });

  // Auto-reply to sender
  await transporter.sendMail({
    from: `"Prince Kushwaha" <${SMTP_USER}>`,
    to: payload.email,
    subject: `Re: ${payload.subject} — Thank you for reaching out!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8; margin-top: 0;">Thanks for your message, ${escapeHtml(payload.name)}!</h2>
        <p style="color: #4b5563;">I have received your message and will get back to you as soon as possible — usually within 24–48 hours.</p>
        <p style="color: #4b5563;">Here is a copy of what you sent:</p>
        <div style="padding: 16px; background: #f9fafb; border-radius: 4px; color: #374151; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>
        <hr style="margin: 24px 0; border-color: #e5e7eb;" />
        <p style="color: #374151; font-weight: bold;">Best regards,<br/>Prince Kushwaha</p>
        <p style="font-size: 12px; color: #9ca3af;">Full Stack Developer | New Delhi, India</p>
      </div>
    `,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
