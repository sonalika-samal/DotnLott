import nodemailer from 'nodemailer';

export interface EmailInquiryPayload {
  name: string;
  email: string;
  phone?: string;
  category: string;
  projectType: string;
  message: string;
}

/**
  * Generates a modern HTML email template for DotnLott team (connect@dotnlott.com)
 */
export function generateInquiryEmailHTML(data: EmailInquiryPayload): string {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const whatsappCleanPhone = data.phone ? data.phone.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = whatsappCleanPhone
    ? `https://wa.me/${whatsappCleanPhone.startsWith('91') ? whatsappCleanPhone : '91' + whatsappCleanPhone}`
    : `https://wa.me/917846969508`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry from ${data.name}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      margin: 0;
      padding: 24px 12px;
      color: #0f172a;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
      border: 1px solid #e2e8f0;
    }
    .header-accent {
      height: 6px;
      background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%);
    }
    .header {
      padding: 32px 32px 24px 32px;
      background: #ffffff;
      border-bottom: 1px solid #f1f5f9;
    }
    .brand-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #6366f1;
      background-color: #eef2ff;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    .subtitle {
      font-size: 13px;
      color: #64748b;
      margin: 0;
    }
    .content {
      padding: 32px;
    }
    .info-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
    }
    .info-table tr:not(:last-child) td {
      border-bottom: 1px solid #f1f5f9;
    }
    .info-label {
      width: 38%;
      padding: 12px 16px;
      background-color: #f8fafc;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      padding: 12px 16px;
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
    }
    .info-value a {
      color: #6366f1;
      text-decoration: none;
    }
    .message-box {
      background-color: #f8fafc;
      border-left: 4px solid #6366f1;
      border-radius: 8px;
      padding: 18px 20px;
      margin-bottom: 28px;
    }
    .message-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .message-body {
      font-size: 13px;
      line-height: 1.6;
      color: #334155;
      white-space: pre-line;
      margin: 0;
    }
    .actions {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
      text-align: center;
    }
    .btn-primary {
      background-color: #0f172a;
      color: #ffffff !important;
    }
    .btn-whatsapp {
      background-color: #25D366;
      color: #ffffff !important;
    }
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #f1f5f9;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-accent"></div>
    <div class="header">
      <span class="brand-badge">⚡ New Lead Notification</span>
      <h1 class="title">Website Inquiry Received</h1>
      <p class="subtitle">A new project request was submitted via dotnlott.com</p>
    </div>

    <div class="content">
      <table class="info-table">
        <tr>
          <td class="info-label">Full Name</td>
          <td class="info-value">${data.name}</td>
        </tr>
        <tr>
          <td class="info-label">Business Email</td>
          <td class="info-value">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td class="info-label">Phone / WhatsApp</td>
          <td class="info-value">${data.phone || 'Not Provided'}</td>
        </tr>
        <tr>
          <td class="info-label">Service Category</td>
          <td class="info-value"><strong>${data.category}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Package / Type</td>
          <td class="info-value"><strong>${data.projectType}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Submitted On</td>
          <td class="info-value">${timestamp}</td>
        </tr>
      </table>

      <div class="message-box">
        <div class="message-title">Project Details / Requirement</div>
        <p class="message-body">${data.message}</p>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${data.email}?subject=Re:%20DotnLott%20Inquiry%20-%20${encodeURIComponent(data.projectType)}" class="btn btn-primary" style="margin-right: 8px;">Reply via Email</a>
        <a href="${whatsappUrl}" class="btn btn-whatsapp">Chat on WhatsApp</a>
      </div>
    </div>

    <div class="footer">
      This automated alert was dispatched by the DotnLott Lead Management System.<br>
      Target Inbox: <strong>connect@dotnlott.com</strong>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends an email notification to connect@dotnlott.com
 */
export async function sendContactEmail(payload: EmailInquiryPayload) {
  const recipient = 'connect@dotnlott.com';
  const subject = `🚀 New Inquiry: ${payload.name} - ${payload.projectType}`;
  const htmlContent = generateInquiryEmailHTML(payload);

  // 1. Check Web3Forms Access Key
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3Key) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          to: recipient,
          subject: subject,
          from_name: payload.name,
          replyto: payload.email,
          name: payload.name,
          email: payload.email,
          phone: payload.phone || 'N/A',
          category: payload.category,
          projectType: payload.projectType,
          message: payload.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log('Successfully delivered inquiry email via Web3Forms!');
        return { success: true, method: 'web3forms' };
      }
    } catch (err) {
      console.error('Web3Forms dispatch error:', err);
    }
  }

  // 2. Check Resend API Key
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'DotnLott <onboarding@resend.dev>',
          to: [recipient],
          reply_to: payload.email,
          subject: subject,
          html: htmlContent,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Successfully delivered inquiry email via Resend:', data.id);
        return { success: true, method: 'resend', id: data.id };
      }
    } catch (err) {
      console.error('Resend dispatch error:', err);
    }
  }

  // 3. Check SMTP credentials from environment
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"DotnLott Website" <${smtpUser}>`,
        to: recipient,
        replyTo: payload.email,
        subject: subject,
        html: htmlContent,
      });

      console.log('Successfully dispatched email to connect@dotnlott.com:', info.messageId);
      return { success: true, method: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error('Failed to send email via SMTP, falling back to db log:', err);
    }
  }

  // Fallback: Log email details cleanly in console & server logs
  console.log('====================================================');
  console.log(`[INQUIRY EMAIL TO: ${recipient}]`);
  console.log(`Subject: ${subject}`);
  console.log(`From: ${payload.name} <${payload.email}>`);
  console.log(`Phone: ${payload.phone || 'N/A'}`);
  console.log(`Category: ${payload.category}`);
  console.log(`Package: ${payload.projectType}`);
  console.log(`Message: ${payload.message}`);
  console.log('====================================================');

  return { success: true, method: 'log' };
}
