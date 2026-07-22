import nodemailer from 'nodemailer';

let transporterInstance: any = null;

function getTransporter() {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER || 'connect@dotnlott.com';
  const smtpPass = process.env.SMTP_PASS || 'qvjfprehbmhsdhzd';

  if (!transporterInstance && smtpHost && smtpUser && smtpPass) {
    try {
      transporterInstance = nodemailer.createTransport({
        pool: true, // Enable SMTP connection pooling
        maxConnections: 3,
        maxMessages: 100,
        rateLimit: 5,
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    } catch (err) {
      console.error('Failed to initialize pooled SMTP transporter:', err);
    }
  }
  return transporterInstance;
}

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
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: #f8fafc;
    }
    .info-value {
      padding: 12px 16px;
      font-size: 13px;
      color: #0f172a;
    }
    .message-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .message-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #475569;
      margin-bottom: 8px;
    }
    .message-body {
      font-size: 14px;
      line-height: 1.6;
      color: #1e293b;
      white-space: pre-wrap;
      margin: 0;
    }
    .btn-container {
      text-align: center;
      margin-top: 24px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.2s ease;
    }
    .btn-primary {
      background-color: #6366f1;
      color: #ffffff;
    }
    .btn-whatsapp {
      background-color: #10b981;
      color: #ffffff;
    }
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.5;
    }
    @media only screen and (max-width: 480px) {
      .email-container {
        border-radius: 8px !important;
      }
      .header {
        padding: 24px 20px 16px 20px !important;
      }
      .content {
        padding: 20px !important;
      }
      .info-table, .info-table tbody, .info-table tr, .info-table td {
        display: block !important;
        width: 100% !important;
      }
      .info-table tr:not(:last-child) td {
        border-bottom: none !important;
      }
      .info-table tr td {
        box-sizing: border-box !important;
      }
      .info-label {
        width: 100% !important;
        padding: 12px 16px 4px 16px !important;
        background-color: #f8fafc !important;
        border-bottom: none !important;
      }
      .info-value {
        width: 100% !important;
        padding: 4px 16px 12px 16px !important;
        border-bottom: 1px solid #f1f5f9 !important;
      }
      .info-table tr:last-child .info-value {
        border-bottom: none !important;
      }
      .btn-container {
        margin-top: 16px !important;
      }
      .btn {
        display: block !important;
        width: 100% !important;
        margin-right: 0 !important;
        margin-bottom: 10px !important;
        box-sizing: border-box !important;
        padding: 12px 16px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-accent"></div>
    <div class="header">
      <div class="brand-badge">⚡ New Lead Received</div>
      <h1 class="title">Website Lead: ${data.name}</h1>
      <p class="subtitle">Submitted on DotnLott Website Contact Form</p>
    </div>

    <div class="content">
      <table class="info-table">
        <tr>
          <td class="info-label">Full Name</td>
          <td class="info-value"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Email Address</td>
          <td class="info-value"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="info-label">Phone Number</td>
          <td class="info-value">${data.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td class="info-label">Category</td>
          <td class="info-value"><strong>${data.category}</strong></td>
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

      <div class="btn-container">
        <a href="mailto:${data.email}?subject=Re:%20DotnLott%20Inquiry%20-%20${encodeURIComponent(data.category)}" class="btn btn-primary" style="margin-right: 8px; color: #ffffff !important; text-decoration: none;">Reply via Email</a>
        <a href="${whatsappUrl}" class="btn btn-whatsapp" style="color: #ffffff !important; text-decoration: none;">Chat on WhatsApp</a>
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
 * Generates an auto-responder confirmation HTML email template for the client
 */
export function generateClientConfirmationEmailHTML(data: EmailInquiryPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - DotnLott</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
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
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
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
      color: #10b981;
      background-color: #ecfdf5;
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
      line-height: 1.5;
    }
    .content {
      padding: 32px;
    }
    .status-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #6366f1;
      padding: 16px 20px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .status-title {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .status-desc {
      font-size: 13px;
      color: #475569;
      margin: 0;
      line-height: 1.5;
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
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: #f8fafc;
    }
    .info-value {
      padding: 12px 16px;
      font-size: 13px;
      color: #0f172a;
    }
    .btn-container {
      text-align: center;
      margin-top: 24px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.2s ease;
    }
    .btn-whatsapp {
      background-color: #10b981;
      color: #ffffff;
    }
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.6;
    }
    @media only screen and (max-width: 480px) {
      .email-container {
        border-radius: 8px !important;
      }
      .header {
        padding: 24px 20px 16px 20px !important;
      }
      .content {
        padding: 20px !important;
      }
      .status-card {
        padding: 12px 16px !important;
        margin-bottom: 20px !important;
      }
      .info-table, .info-table tbody, .info-table tr, .info-table td {
        display: block !important;
        width: 100% !important;
      }
      .info-table tr:not(:last-child) td {
        border-bottom: none !important;
      }
      .info-table tr td {
        box-sizing: border-box !important;
      }
      .info-label {
        width: 100% !important;
        padding: 12px 16px 4px 16px !important;
        background-color: #f8fafc !important;
        border-bottom: none !important;
      }
      .info-value {
        width: 100% !important;
        padding: 4px 16px 12px 16px !important;
        border-bottom: 1px solid #f1f5f9 !important;
      }
      .info-table tr:last-child .info-value {
        border-bottom: none !important;
      }
      .btn-container {
        margin-top: 16px !important;
      }
      .btn {
        display: block !important;
        width: 100% !important;
        margin-right: 0 !important;
        margin-bottom: 10px !important;
        box-sizing: border-box !important;
        padding: 12px 16px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-accent"></div>
    <div class="header">
      <div class="brand-badge">✓ Inquiry Received</div>
      <h1 class="title">Thank You for Reaching Out!</h1>
      <p class="subtitle">Hi ${data.name}, we've received your inquiry and our engineering leads are reviewing it.</p>
    </div>

    <div class="content">
      <div class="status-card">
        <div class="status-title">⚡ Estimated Response Time: Within a Few Hours</div>
        <p class="status-desc">
          Our core team will review your requirements for <strong>${data.category}</strong> and reply to this email within a few hours.
        </p>
      </div>

      <h4 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 12px;">Summary of Your Submitted Request</h4>
      
      <table class="info-table">
        <tr>
          <td class="info-label">Name</td>
          <td class="info-value"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Email</td>
          <td class="info-value"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="info-label">Phone</td>
          <td class="info-value">${data.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td class="info-label">Category</td>
          <td class="info-value"><strong>${data.category}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Message</td>
          <td class="info-value">${data.message}</td>
        </tr>
      </table>

      <div class="btn-container">
        <a href="https://wa.me/917846969508" class="btn btn-whatsapp" style="color: #ffffff !important; text-decoration: none;">Need Immediate Help? Chat on WhatsApp</a>
      </div>
    </div>

    <div class="footer">
      <strong>DotnLott AI Automation & Web Studio</strong><br>
      A brand under A2Z Version Private Limited (CIN: U47721BR2026PTC085973)<br>
      Operational Address: Odisha, India | Contact: <a href="mailto:connect@dotnlott.com" style="color: #6366f1; text-decoration: none;">connect@dotnlott.com</a>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends email notifications to connect@dotnlott.com AND confirmation email to the client
 */
export async function sendContactEmail(payload: EmailInquiryPayload) {
  const teamRecipient = 'connect@dotnlott.com';
  const teamSubject = `🚀 New Inquiry: ${payload.name} - ${payload.projectType}`;
  const teamHtmlContent = generateInquiryEmailHTML(payload);

  const clientSubject = `We've Received Your Inquiry - DotnLott`;
  const clientHtmlContent = generateClientConfirmationEmailHTML(payload);

  // 1. Check Web3Forms Access Key
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3Key) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          to: teamRecipient,
          subject: teamSubject,
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
      // Send to Team
      const resTeam = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'DotnLott <onboarding@resend.dev>',
          to: [teamRecipient],
          reply_to: payload.email,
          subject: teamSubject,
          html: teamHtmlContent,
        }),
      });

      if (!resTeam.ok) {
        const errText = await resTeam.text();
        throw new Error(`Resend Team delivery failed: ${resTeam.status} ${errText}`);
      }

      // Send Confirmation to Client
      const resClient = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'DotnLott <onboarding@resend.dev>',
          to: [payload.email],
          reply_to: 'connect@dotnlott.com',
          subject: clientSubject,
          html: clientHtmlContent,
        }),
      });

      if (!resClient.ok) {
        const errText = await resClient.text();
        throw new Error(`Resend Client confirmation failed: ${resClient.status} ${errText}`);
      }

      console.log('Successfully delivered inquiry emails via Resend!');
      return { success: true, method: 'resend' };
    } catch (err) {
      console.error('Resend dispatch error (falling back):', err);
    }
  }

  // 3. Check SMTP credentials from environment (Google Workspace) with fallback
  const transporter = getTransporter();
  if (transporter) {
    try {
      const smtpUser = process.env.SMTP_USER || 'connect@dotnlott.com';

      // Send both emails in parallel to reduce SMTP connection & send latency
      const [teamInfo, clientInfo] = await Promise.all([
        transporter.sendMail({
          from: process.env.SMTP_FROM || `"DotnLott Website" <${smtpUser}>`,
          to: [teamRecipient, 'hello.dotnlott@gmail.com'],
          replyTo: payload.email,
          subject: teamSubject,
          html: teamHtmlContent,
        }).catch((teamErr: any) => {
          console.error('Error delivering email to team:', teamErr);
          throw teamErr; // Bubble up to reject SMTP if team mail fails
        }),
        transporter.sendMail({
          from: process.env.SMTP_FROM || `"DotnLott Team" <${smtpUser}>`,
          to: payload.email,
          replyTo: teamRecipient,
          subject: clientSubject,
          html: clientHtmlContent,
        }).catch((clientErr: any) => {
          console.error('Error delivering client auto-responder:', clientErr);
          return null;
        })
      ]);

      const teamMessageId = teamInfo?.messageId || null;
      const clientMessageId = clientInfo?.messageId || null;

      if (teamMessageId || clientMessageId) {
        return { success: true, method: 'smtp', teamMessageId, clientMessageId };
      }
    } catch (err) {
      console.error('Failed to send SMTP email (falling back to log):', err);
    }
  }

  // Fallback: Log email details cleanly in console & server logs
  console.log('====================================================');
  console.log(`[INQUIRY EMAIL TO: ${teamRecipient}]`);
  console.log(`[CLIENT CONFIRMATION TO: ${payload.email}]`);
  console.log(`Subject: ${teamSubject}`);
  console.log(`From: ${payload.name} <${payload.email}>`);
  console.log(`Phone: ${payload.phone || 'N/A'}`);
  console.log(`Category: ${payload.category}`);
  console.log(`Package: ${payload.projectType}`);
  console.log(`Message: ${payload.message}`);
  console.log('====================================================');

  return { success: false, method: 'log', error: 'Email delivery failed, written to server logs only.' };
}

export interface EmailBookingPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  scheduledAt: string;
  meetingType: string;
  notes?: string;
}

/**
 * Generates a modern HTML email template for DotnLott team for new consultations
 */
export function generateBookingEmailHTML(data: EmailBookingPayload): string {
  const formattedDate = new Date(data.scheduledAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const whatsappCleanPhone = data.phone ? data.phone.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = whatsappCleanPhone
    ? `https://wa.me/${whatsappCleanPhone.startsWith('91') ? whatsappCleanPhone : '91' + whatsappCleanPhone}`
    : `https://wa.me/917846969508`;

  const meetingTypeLabel = data.meetingType === 'google_meet' ? 'Google Meet' : data.meetingType === 'zoom' ? 'Zoom' : 'Phone Call';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Booked: ${data.name}</title>
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
      color: #a855f7;
      background-color: #f5f3ff;
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
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: #f8fafc;
    }
    .info-value {
      padding: 12px 16px;
      font-size: 13px;
      color: #0f172a;
    }
    .message-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .message-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #475569;
      margin-bottom: 8px;
    }
    .message-body {
      font-size: 14px;
      line-height: 1.6;
      color: #1e293b;
      white-space: pre-wrap;
      margin: 0;
    }
    .btn-container {
      text-align: center;
      margin-top: 24px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.2s ease;
    }
    .btn-primary {
      background-color: #6366f1;
      color: #ffffff;
    }
    .btn-whatsapp {
      background-color: #10b981;
      color: #ffffff;
    }
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.5;
    }
    @media only screen and (max-width: 480px) {
      .email-container {
        border-radius: 8px !important;
      }
      .header {
        padding: 24px 20px 16px 20px !important;
      }
      .content {
        padding: 20px !important;
      }
      .info-table, .info-table tbody, .info-table tr, .info-table td {
        display: block !important;
        width: 100% !important;
      }
      .info-table tr:not(:last-child) td {
        border-bottom: none !important;
      }
      .info-table tr td {
        box-sizing: border-box !important;
      }
      .info-label {
        width: 100% !important;
        padding: 12px 16px 4px 16px !important;
        background-color: #f8fafc !important;
        border-bottom: none !important;
      }
      .info-value {
        width: 100% !important;
        padding: 4px 16px 12px 16px !important;
        border-bottom: 1px solid #f1f5f9 !important;
      }
      .info-table tr:last-child .info-value {
        border-bottom: none !important;
      }
      .btn-container {
        margin-top: 16px !important;
      }
      .btn {
        display: block !important;
        width: 100% !important;
        margin-right: 0 !important;
        margin-bottom: 10px !important;
        box-sizing: border-box !important;
        padding: 12px 16px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-accent"></div>
    <div class="header">
      <div class="brand-badge">🗓️ New Consultation Booked</div>
      <h1 class="title">Meeting booked by ${data.name}</h1>
      <p class="subtitle">Submitted on DotnLott Website Booking Form</p>
    </div>

    <div class="content">
      <table class="info-table">
        <tr>
          <td class="info-label">Full Name</td>
          <td class="info-value"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Email Address</td>
          <td class="info-value"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="info-label">Phone Number</td>
          <td class="info-value">${data.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td class="info-label">Company</td>
          <td class="info-value"><strong>${data.company || 'N/A'}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Scheduled Time</td>
          <td class="info-value" style="color: #6366f1; font-weight: bold;">${formattedDate} (IST)</td>
        </tr>
        <tr>
          <td class="info-label">Meeting Type</td>
          <td class="info-value"><strong>${meetingTypeLabel}</strong></td>
        </tr>
      </table>

      ${data.notes ? `
      <div class="message-box">
        <div class="message-title">Additional Notes</div>
        <p class="message-body">${data.notes}</p>
      </div>
      ` : ''}

      <div class="btn-container">
        <a href="mailto:${data.email}?subject=Re:%20DotnLott%20Consultation%20-%20${encodeURIComponent(data.name)}" class="btn btn-primary" style="margin-right: 8px; color: #ffffff !important; text-decoration: none;">Email Lead</a>
        <a href="${whatsappUrl}" class="btn btn-whatsapp" style="color: #ffffff !important; text-decoration: none;">Chat on WhatsApp</a>
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
 * Generates an auto-responder confirmation HTML email template for the client for new bookings
 */
export function generateClientBookingConfirmationEmailHTML(data: EmailBookingPayload): string {
  const formattedDate = new Date(data.scheduledAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const meetingTypeLabel = data.meetingType === 'google_meet' ? 'Google Meet' : data.meetingType === 'zoom' ? 'Zoom' : 'Phone Call';
  const meetingInstructions = data.meetingType === 'google_meet' 
    ? 'A Google Meet invitation has been added to this slot. The meeting link will be in your calendar invitation.' 
    : data.meetingType === 'zoom' 
      ? 'A Zoom link will be sent to you shortly before the meeting.' 
      : `We will call you at your provided phone number: ${data.phone || 'N/A'} at the scheduled time.`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation Confirmed - DotnLott</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
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
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
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
      color: #10b981;
      background-color: #ecfdf5;
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
      line-height: 1.5;
    }
    .content {
      padding: 32px;
    }
    .status-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #10b981;
      padding: 16px 20px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .status-title {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .status-desc {
      font-size: 13px;
      color: #475569;
      margin: 0;
      line-height: 1.5;
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
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: #f8fafc;
    }
    .info-value {
      padding: 12px 16px;
      font-size: 13px;
      color: #0f172a;
    }
    .btn-container {
      text-align: center;
      margin-top: 24px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.2s ease;
    }
    .btn-whatsapp {
      background-color: #10b981;
      color: #ffffff;
    }
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.6;
    }
    @media only screen and (max-width: 480px) {
      .email-container {
        border-radius: 8px !important;
      }
      .header {
        padding: 24px 20px 16px 20px !important;
      }
      .content {
        padding: 20px !important;
      }
      .status-card {
        padding: 12px 16px !important;
        margin-bottom: 20px !important;
      }
      .info-table, .info-table tbody, .info-table tr, .info-table td {
        display: block !important;
        width: 100% !important;
      }
      .info-table tr:not(:last-child) td {
        border-bottom: none !important;
      }
      .info-table tr td {
        box-sizing: border-box !important;
      }
      .info-label {
        width: 100% !important;
        padding: 12px 16px 4px 16px !important;
        background-color: #f8fafc !important;
        border-bottom: none !important;
      }
      .info-value {
        width: 100% !important;
        padding: 4px 16px 12px 16px !important;
        border-bottom: 1px solid #f1f5f9 !important;
      }
      .info-table tr:last-child .info-value {
        border-bottom: none !important;
      }
      .btn-container {
        margin-top: 16px !important;
      }
      .btn {
        display: block !important;
        width: 100% !important;
        margin-right: 0 !important;
        margin-bottom: 10px !important;
        box-sizing: border-box !important;
        padding: 12px 16px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-accent"></div>
    <div class="header">
      <div class="brand-badge">✓ Consultation Scheduled</div>
      <h1 class="title">Your Meeting is Confirmed!</h1>
      <p class="subtitle">Hi ${data.name}, we look forward to talking with you about your automation and web needs.</p>
    </div>

    <div class="content">
      <div class="status-card">
        <div class="status-title">⚡ How to Join</div>
        <p class="status-desc">${meetingInstructions}</p>
      </div>

      <h4 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 12px;">Summary of Your Consultation</h4>
      
      <table class="info-table">
        <tr>
          <td class="info-label">Name</td>
          <td class="info-value"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Scheduled Time</td>
          <td class="info-value"><strong>${formattedDate} (IST)</strong></td>
        </tr>
        <tr>
          <td class="info-label">Meeting Type</td>
          <td class="info-value">${meetingTypeLabel}</td>
        </tr>
        ${data.phone ? `
        <tr>
          <td class="info-label">Phone</td>
          <td class="info-value">${data.phone}</td>
        </tr>
        ` : ''}
        ${data.company ? `
        <tr>
          <td class="info-label">Company</td>
          <td class="info-value">${data.company}</td>
        </tr>
        ` : ''}
        ${data.notes ? `
        <tr>
          <td class="info-label">Notes</td>
          <td class="info-value">${data.notes}</td>
        </tr>
        ` : ''}
      </table>

      <div class="btn-container">
        <a href="https://wa.me/917846969508" class="btn btn-whatsapp" style="color: #ffffff !important; text-decoration: none;">Need to Reschedule? Chat on WhatsApp</a>
      </div>
    </div>

    <div class="footer">
      <strong>DotnLott AI Automation & Web Studio</strong><br>
      A brand under A2Z Version Private Limited (CIN: U47721BR2026PTC085973)<br>
      Operational Address: Odisha, India | Contact: <a href="mailto:connect@dotnlott.com" style="color: #6366f1; text-decoration: none;">connect@dotnlott.com</a>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends consultation booking email notifications to connect@dotnlott.com and confirmation email to the client
 */
export async function sendBookingEmail(payload: EmailBookingPayload) {
  const teamRecipient = 'connect@dotnlott.com';
  const teamSubject = `🗓️ New Booking: ${payload.name} - ${new Date(payload.scheduledAt).toLocaleDateString('en-IN')}`;
  const teamHtmlContent = generateBookingEmailHTML(payload);

  const clientSubject = `Consultation Scheduled - DotnLott`;
  const clientHtmlContent = generateClientBookingConfirmationEmailHTML(payload);

  // 1. Check Web3Forms Access Key
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3Key) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          to: teamRecipient,
          subject: teamSubject,
          from_name: payload.name,
          replyto: payload.email,
          name: payload.name,
          email: payload.email,
          phone: payload.phone || 'N/A',
          company: payload.company || 'N/A',
          scheduledAt: payload.scheduledAt,
          meetingType: payload.meetingType,
          notes: payload.notes || 'N/A',
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log('Successfully delivered booking email via Web3Forms!');
        return { success: true, method: 'web3forms' };
      }
    } catch (err) {
      console.error('Web3Forms booking dispatch error:', err);
    }
  }

  // 2. Check Resend API Key
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      // Send to Team
      const resTeam = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'DotnLott <onboarding@resend.dev>',
          to: [teamRecipient],
          reply_to: payload.email,
          subject: teamSubject,
          html: teamHtmlContent,
        }),
      });

      if (!resTeam.ok) {
        const errText = await resTeam.text();
        throw new Error(`Resend Booking Team delivery failed: ${resTeam.status} ${errText}`);
      }

      // Send Confirmation to Client
      const resClient = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'DotnLott <onboarding@resend.dev>',
          to: [payload.email],
          reply_to: 'connect@dotnlott.com',
          subject: clientSubject,
          html: clientHtmlContent,
        }),
      });

      if (!resClient.ok) {
        const errText = await resClient.text();
        throw new Error(`Resend Booking Client confirmation failed: ${resClient.status} ${errText}`);
      }

      console.log('Successfully delivered booking emails via Resend!');
      return { success: true, method: 'resend' };
    } catch (err) {
      console.error('Resend booking dispatch error (falling back):', err);
    }
  }

  // 3. Check SMTP credentials from environment (Google Workspace) with fallback
  const transporter = getTransporter();
  if (transporter) {
    try {
      const smtpUser = process.env.SMTP_USER || 'connect@dotnlott.com';

      // Send both emails in parallel to reduce SMTP connection & send latency
      const [teamInfo, clientInfo] = await Promise.all([
        transporter.sendMail({
          from: process.env.SMTP_FROM || `"DotnLott Website" <${smtpUser}>`,
          to: [teamRecipient, 'hello.dotnlott@gmail.com'],
          replyTo: payload.email,
          subject: teamSubject,
          html: teamHtmlContent,
        }).catch((teamErr: any) => {
          console.error('Error delivering booking email to team:', teamErr);
          throw teamErr;
        }),
        transporter.sendMail({
          from: process.env.SMTP_FROM || `"DotnLott Team" <${smtpUser}>`,
          to: payload.email,
          replyTo: teamRecipient,
          subject: clientSubject,
          html: clientHtmlContent,
        }).catch((clientErr: any) => {
          console.error('Error delivering client booking auto-responder:', clientErr);
          return null;
        })
      ]);

      const teamMessageId = teamInfo?.messageId || null;
      const clientMessageId = clientInfo?.messageId || null;

      if (teamMessageId || clientMessageId) {
        return { success: true, method: 'smtp', teamMessageId, clientMessageId };
      }
    } catch (err) {
      console.error('Failed to send SMTP booking email (falling back to log):', err);
    }
  }

  // Fallback: Log email details cleanly in console & server logs
  console.log('====================================================');
  console.log(`[BOOKING EMAIL TO: ${teamRecipient}]`);
  console.log(`[CLIENT BOOKING CONFIRMATION TO: ${payload.email}]`);
  console.log(`Subject: ${teamSubject}`);
  console.log(`From: ${payload.name} <${payload.email}>`);
  console.log(`Phone: ${payload.phone || 'N/A'}`);
  console.log(`Company: ${payload.company || 'N/A'}`);
  console.log(`Time: ${payload.scheduledAt}`);
  console.log(`Type: ${payload.meetingType}`);
  console.log(`Notes: ${payload.notes || 'N/A'}`);
  console.log('====================================================');

  return { success: false, method: 'log', error: 'Email delivery failed, written to server logs only.' };
}
