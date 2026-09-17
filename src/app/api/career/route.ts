import { NextResponse } from 'next/server';
import { saveCareerApplication } from '@/lib/db';
import { sendCareerEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const location = body.location?.trim();
    const position = body.position?.trim();
    const experience = body.experience?.trim();
    const portfolioUrl = body.portfolioUrl?.trim();
    const noticePeriod = body.noticePeriod?.trim();
    const message = body.message?.trim();

    if (!name || !email || !phone || !position || !experience || !portfolioUrl || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, phone, position, experience, portfolioUrl, and message are all required.',
        },
        { status: 400 }
      );
    }

    // 1. Save to database / leads storage
    const dbResult = await saveCareerApplication({
      name,
      email,
      phone,
      location: location || 'Not specified',
      position,
      experience,
      portfolioUrl,
      noticePeriod,
      message,
    });

    // 2. Dispatch Candidate Auto-Responder & Hiring Team Notifications
    const emailResult = await sendCareerEmail({
      name,
      email,
      phone,
      location: location || 'Not specified',
      position,
      experience,
      portfolioUrl,
      noticePeriod,
      message,
    });

    // 3. Send automated WhatsApp alert directly to +91 92348 32331
    const cleanRecruiterNumber = '919234832331';
    const whatsappLines = [
      `*New Job Application - DotnLott*`,
      ``,
      `*Candidate Name:* ${name}`,
      `*Role Applied:* ${position}`,
      `*Email:* ${email}`,
      `*Phone / WhatsApp:* ${phone}`,
      `*Current Location:* ${location || 'N/A'}`,
      `*Experience:* ${experience}`,
      noticePeriod ? `*Notice Period:* ${noticePeriod}` : null,
      `*Resume / Portfolio Link:* ${portfolioUrl}`,
      ``,
      `*Candidate Note:*`,
      `${message}`,
    ].filter(Boolean);

    const whatsappMessage = whatsappLines.join('\n');
    let whatsappDispatched = false;

    // Server-Side WhatsApp Dispatch via CallMeBot or Webhook Gateway
    const callmebotKey = process.env.CALLMEBOT_API_KEY || process.env.WHATSAPP_API_KEY;
    if (callmebotKey) {
      try {
        const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${cleanRecruiterNumber}&text=${encodeURIComponent(whatsappMessage)}&apikey=${callmebotKey}`;
        const cmbRes = await fetch(callmebotUrl);
        if (cmbRes.ok) {
          whatsappDispatched = true;
          console.log('Automated WhatsApp alert sent to 7846969508 via CallMeBot!');
        }
      } catch (cmbErr) {
        console.error('CallMeBot WhatsApp dispatch error:', cmbErr);
      }
    }

    const whatsappWebhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
    if (whatsappWebhookUrl && !whatsappDispatched) {
      try {
        await fetch(whatsappWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: cleanRecruiterNumber,
            message: whatsappMessage,
            applicant: { name, email, phone, position, location, experience, portfolioUrl, message },
          }),
        });
        whatsappDispatched = true;
      } catch (hookErr) {
        console.error('WhatsApp webhook dispatch error:', hookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Applied successfully! Your profile has been received.',
      dbResult,
      emailResult,
      whatsappDispatched,
      application: {
        name,
        email,
        position,
      },
    });
  } catch (error) {
    console.error('API Career route error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred while processing your application.' },
      { status: 500 }
    );
  }
}
