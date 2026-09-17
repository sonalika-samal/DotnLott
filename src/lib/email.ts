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
      .mobile-btn-stack {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        padding: 0 0 10px 0 !important;
      }
      .btn-primary, .btn-whatsapp, .btn {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
        margin-bottom: 10px !important;
        box-sizing: border-box !important;
        padding: 14px 16px !important;
        text-align: center !important;
        font-size: 14px !important;
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

      <div class="btn-container" style="text-align: center; margin-top: 24px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; margin: 0 auto; border-collapse: separate;">
          <tr>
            <td class="mobile-btn-stack" align="center" style="padding: 6px;">
              <a href="mailto:${data.email}?subject=Re:%20DotnLott%20Inquiry%20-%20${encodeURIComponent(data.category)}" class="btn btn-primary" style="display: block; width: 100%; box-sizing: border-box; padding: 13px 20px; font-size: 13px; font-weight: 700; color: #ffffff !important; background-color: #6366f1; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #6366f1;">✉️ Reply via Email</a>
            </td>
            <td class="mobile-btn-stack" align="center" style="padding: 6px;">
              <a href="${whatsappUrl}" class="btn btn-whatsapp" style="display: block; width: 100%; box-sizing: border-box; padding: 13px 20px; font-size: 13px; font-weight: 700; color: #ffffff !important; background-color: #10b981; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #10b981;">💬 Chat on WhatsApp</a>
            </td>
          </tr>
        </table>
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

      <div class="btn-container" style="text-align: center; margin-top: 24px;">
        <a href="https://wa.me/917846969508" class="btn btn-whatsapp" style="display: block; width: 100%; max-width: 380px; margin: 0 auto; box-sizing: border-box; padding: 14px 20px; font-size: 14px; font-weight: 700; color: #ffffff !important; background-color: #10b981; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #10b981;">💬 Need Immediate Help? Chat on WhatsApp</a>
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
      .mobile-btn-stack {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        padding: 0 0 10px 0 !important;
      }
      .btn-primary, .btn-whatsapp, .btn {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
        margin-bottom: 10px !important;
        box-sizing: border-box !important;
        padding: 14px 16px !important;
        text-align: center !important;
        font-size: 14px !important;
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

      <div class="btn-container" style="text-align: center; margin-top: 24px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; margin: 0 auto; border-collapse: separate;">
          <tr>
            <td class="mobile-btn-stack" align="center" style="padding: 6px;">
              <a href="mailto:${data.email}?subject=Re:%20DotnLott%20Consultation%20-%20${encodeURIComponent(data.name)}" class="btn btn-primary" style="display: block; width: 100%; box-sizing: border-box; padding: 13px 20px; font-size: 13px; font-weight: 700; color: #ffffff !important; background-color: #6366f1; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #6366f1;">✉️ Email Lead</a>
            </td>
            <td class="mobile-btn-stack" align="center" style="padding: 6px;">
              <a href="${whatsappUrl}" class="btn btn-whatsapp" style="display: block; width: 100%; box-sizing: border-box; padding: 13px 20px; font-size: 13px; font-weight: 700; color: #ffffff !important; background-color: #10b981; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #10b981;">💬 Chat on WhatsApp</a>
            </td>
          </tr>
        </table>
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

      <div class="btn-container" style="text-align: center; margin-top: 24px;">
        <a href="https://wa.me/917846969508" class="btn btn-whatsapp" style="display: block; width: 100%; max-width: 380px; margin: 0 auto; box-sizing: border-box; padding: 14px 20px; font-size: 14px; font-weight: 700; color: #ffffff !important; background-color: #10b981; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #10b981;">💬 Need to Reschedule? Chat on WhatsApp</a>
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

export interface EmailCareerPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  portfolioUrl: string;
  noticePeriod?: string;
  message: string;
}

/**
 * Generates an executive, professional acknowledgment email for the candidate
 * (Structured like top IT & technology companies: 2 clean paragraphs, no box-cards, no data summary tables)
 */
export function generateCareerCandidateConfirmationHTML(data: EmailCareerPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - DotnLott</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 32px 16px;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 580px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
      border: 1px solid #e2e8f0;
    }
    .header-accent {
      height: 4px;
      background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%);
    }
    .header {
      padding: 32px 32px 20px 32px;
      border-bottom: 1px solid #f1f5f9;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin: 0 0 2px 0;
    }
    .brand-tagline {
      font-size: 10px;
      font-weight: 700;
      color: #6366f1;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin: 0;
    }
    .content {
      padding: 32px;
      font-size: 14.5px;
      line-height: 1.7;
      color: #334155;
    }
    .greeting {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 16px 0;
    }
    .body-p {
      margin: 0 0 18px 0;
    }
    .role-highlight {
      color: #0f172a;
      font-weight: 600;
    }
    .signoff {
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid #f1f5f9;
      font-size: 13.5px;
      color: #475569;
      line-height: 1.6;
    }
    .signoff-name {
      font-weight: 700;
      color: #0f172a;
    }
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.6;
      text-align: center;
    }
    @media only screen and (max-width: 480px) {
      body {
        padding: 16px 8px !important;
      }
      .header {
        padding: 24px 20px 16px 20px !important;
      }
      .content {
        padding: 24px 20px !important;
        font-size: 14px !important;
      }
      .footer {
        padding: 16px 20px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-accent"></div>
    <div class="header">
      <div class="brand-title">DotnLott</div>
      <div class="brand-tagline">DREAM. BUILD. REPEAT.</div>
    </div>

    <div class="content">
      <p class="greeting">Dear ${data.name},</p>

      <p class="body-p">
        Thank you for your interest in career opportunities with <strong>DotnLott</strong>. We have successfully received your application for the <span class="role-highlight">${data.position}</span> role.
      </p>

      <p class="body-p">
        Our talent acquisition team is currently reviewing your profile and qualifications against the role requirements. If your background aligns with our current openings, we will contact you directly regarding the next steps in our hiring process.
      </p>

      <div class="signoff">
        Warm regards,<br>
        <span class="signoff-name">Talent Acquisition Team</span><br>
        DotnLott AI & Web Studio<br>
        <a href="mailto:connect@dotnlott.com" style="color: #6366f1; text-decoration: none;">connect@dotnlott.com</a> &bull; <a href="https://dotnlott.com" style="color: #6366f1; text-decoration: none;">dotnlott.com</a>
      </div>
    </div>

    <div class="footer">
      This is an automated acknowledgment confirming receipt of your candidacy at DotnLott.<br>
      A brand under A2Z Version Private Limited &bull; Odisha, India
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates an HTML notification email for DotnLott recruitment team
 */
export function generateCareerAdminNotificationHTML(data: EmailCareerPayload): string {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const whatsappCleanPhone = data.phone ? data.phone.replace(/[^0-9]/g, '') : '';
  const candidateWhatsAppUrl = whatsappCleanPhone
    ? `https://wa.me/${whatsappCleanPhone.startsWith('91') ? whatsappCleanPhone : '91' + whatsappCleanPhone}`
    : `https://wa.me/917846969508`;

  const forwardWhatsAppText = [
    `*Candidate Application - DotnLott*`,
    ``,
    `*Candidate Name:* ${data.name}`,
    `*Role Applied:* ${data.position}`,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.phone}`,
    `*Location:* ${data.location}`,
    `*Experience:* ${data.experience}`,
    data.noticePeriod ? `*Notice Period:* ${data.noticePeriod}` : null,
    `*Resume / Portfolio Link:* ${data.portfolioUrl}`,
    ``,
    `*Cover Note:*`,
    `${data.message}`,
  ].filter(Boolean).join('\n');

  const forwardToPartnerWhatsAppUrl = `https://wa.me/919234832331?text=${encodeURIComponent(forwardWhatsAppText)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application: ${data.name} - ${data.position}</title>
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
      .mobile-btn-stack {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        padding: 0 0 10px 0 !important;
      }
      .btn-primary, .btn-whatsapp, .btn {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        padding: 14px 16px !important;
        text-align: center !important;
        font-size: 14px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-accent"></div>
    <div class="header">
      <div class="brand-badge">💼 New Candidate Application</div>
      <h1 class="title">${data.name} — ${data.position}</h1>
      <p class="subtitle">Received via DotnLott /career portal</p>
    </div>

    <div class="content">
      <table class="info-table">
        <tr>
          <td class="info-label">Candidate Name</td>
          <td class="info-value"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Position Applied</td>
          <td class="info-value"><strong style="color: #6366f1;">${data.position}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Email Address</td>
          <td class="info-value"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="info-label">Phone / WhatsApp</td>
          <td class="info-value"><strong>${data.phone}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Current City</td>
          <td class="info-value">${data.location}</td>
        </tr>
        <tr>
          <td class="info-label">Experience</td>
          <td class="info-value"><strong>${data.experience}</strong></td>
        </tr>
        ${data.noticePeriod ? `
        <tr>
          <td class="info-label">Notice Period</td>
          <td class="info-value">${data.noticePeriod}</td>
        </tr>
        ` : ''}
        <tr>
          <td class="info-label">Resume / Portfolio</td>
          <td class="info-value"><a href="${data.portfolioUrl}" target="_blank" style="color: #6366f1; font-weight: bold; text-decoration: underline;">Open Link / Resume ↗</a></td>
        </tr>
        <tr>
          <td class="info-label">Applied At</td>
          <td class="info-value">${timestamp}</td>
        </tr>
      </table>

      <div class="message-box">
        <div class="message-title">Candidate Introduction / Why DotnLott?</div>
        <p class="message-body">${data.message}</p>
      </div>

      <div class="btn-container" style="text-align: center; margin-top: 24px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: 0 auto; border-collapse: separate;">
          <tr>
            <td colspan="2" align="center" style="padding: 6px 6px 10px 6px;">
              <a href="${forwardToPartnerWhatsAppUrl}" class="btn btn-whatsapp" style="display: block; width: 100%; box-sizing: border-box; padding: 14px 20px; font-size: 14px; font-weight: 700; color: #ffffff !important; background-color: #10b981; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #10b981; box-shadow: 0 2px 6px rgba(16,185,129,0.3);">📲 Forward Details to WhatsApp (+91 92348 32331)</a>
            </td>
          </tr>
          <tr>
            <td class="mobile-btn-stack" align="center" style="padding: 6px;">
              <a href="mailto:${data.email}?subject=Regarding%20your%20application%20for%20${encodeURIComponent(data.position)}%20at%20DotnLott" class="btn btn-primary" style="display: block; width: 100%; box-sizing: border-box; padding: 13px 20px; font-size: 13px; font-weight: 700; color: #ffffff !important; background-color: #6366f1; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #6366f1;">✉️ Reply to Candidate</a>
            </td>
            <td class="mobile-btn-stack" align="center" style="padding: 6px;">
              <a href="${candidateWhatsAppUrl}" class="btn btn-whatsapp" style="display: block; width: 100%; box-sizing: border-box; padding: 13px 20px; font-size: 13px; font-weight: 700; color: #ffffff !important; background-color: #059669; text-decoration: none; border-radius: 10px; text-align: center; border: 1px solid #059669;">💬 Chat with Candidate</a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="footer">
      Dispatched by DotnLott Talent Management System.<br>
      Admin Inboxes: <strong>connect@dotnlott.com, hello.dotnlott@gmail.com</strong>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends career application emails to DotnLott team and candidate auto-responder
 */
export async function sendCareerEmail(payload: EmailCareerPayload) {
  const teamRecipient = 'connect@dotnlott.com';
  const teamSubject = `🎯 New Application: ${payload.name} - ${payload.position}`;
  const teamHtmlContent = generateCareerAdminNotificationHTML(payload);

  const candidateSubject = `Application Received: ${payload.position} - DotnLott`;
  const candidateHtmlContent = generateCareerCandidateConfirmationHTML(payload);
  const candidateTextContent = `Dear ${payload.name},

Thank you for your interest in career opportunities with DotnLott. We have successfully received your application for the ${payload.position} role.

Our talent acquisition team is currently reviewing your profile and qualifications against the role requirements. If your background aligns with our current openings, we will contact you directly regarding the next steps in our hiring process.

Warm regards,
Talent Acquisition Team
DotnLott AI & Web Studio
connect@dotnlott.com • dotnlott.com`;

  let candidateSent = false;
  let teamSent = false;

  // 1. Google Workspace SMTP (Primary delivery for Candidate & Team)
  const transporter = getTransporter();
  if (transporter) {
    try {
      const smtpUser = process.env.SMTP_USER || 'connect@dotnlott.com';

      // Always send to Candidate
      try {
        const candidateInfo = await transporter.sendMail({
          from: process.env.SMTP_FROM || `"DotnLott Talent Team" <${smtpUser}>`,
          to: payload.email,
          replyTo: teamRecipient,
          subject: candidateSubject,
          text: candidateTextContent,
          html: candidateHtmlContent,
        });
        if (candidateInfo?.messageId) {
          candidateSent = true;
          console.log(`[SMTP] Candidate confirmation sent to ${payload.email} (${candidateInfo.messageId})`);
        }
      } catch (candidateErr) {
        console.error('[SMTP] Candidate delivery error:', candidateErr);
      }

      // Send to Hiring Team
      try {
        const teamInfo = await transporter.sendMail({
          from: process.env.SMTP_FROM || `"DotnLott Careers" <${smtpUser}>`,
          to: [teamRecipient, 'hello.dotnlott@gmail.com'],
          replyTo: payload.email,
          subject: teamSubject,
          html: teamHtmlContent,
        });
        if (teamInfo?.messageId) {
          teamSent = true;
          console.log(`[SMTP] Team notification sent to ${teamRecipient} (${teamInfo.messageId})`);
        }
      } catch (teamErr) {
        console.error('[SMTP] Team delivery error:', teamErr);
      }
    } catch (err) {
      console.error('[SMTP] Transport error:', err);
    }
  }

  // 2. Resend API Backup (if candidate or team failed)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && (!candidateSent || !teamSent)) {
    try {
      if (!candidateSent) {
        const resCandidate = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'DotnLott Careers <onboarding@resend.dev>',
            to: [payload.email],
            reply_to: teamRecipient,
            subject: candidateSubject,
            text: candidateTextContent,
            html: candidateHtmlContent,
          }),
        });
        if (resCandidate.ok) candidateSent = true;
      }

      if (!teamSent) {
        const resTeam = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'DotnLott Careers <onboarding@resend.dev>',
            to: [teamRecipient],
            reply_to: payload.email,
            subject: teamSubject,
            html: teamHtmlContent,
          }),
        });
        if (resTeam.ok) teamSent = true;
      }
    } catch (resendErr) {
      console.error('[Resend] Backup error:', resendErr);
    }
  }

  // 3. Web3Forms Backup for Team Notification (if team notification not delivered yet)
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3Key && !teamSent) {
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
          phone: payload.phone,
          position: payload.position,
          location: payload.location,
          experience: payload.experience,
          portfolioUrl: payload.portfolioUrl,
          noticePeriod: payload.noticePeriod || 'N/A',
          message: payload.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        teamSent = true;
      }
    } catch (err) {
      console.error('Web3Forms career dispatch error:', err);
    }
  }

  return {
    success: candidateSent || teamSent,
    candidateSent,
    teamSent,
  };
}

