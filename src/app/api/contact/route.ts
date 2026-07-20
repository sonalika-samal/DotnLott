import { NextResponse } from 'next/server';
import { saveContactSubmission } from '@/lib/db';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Support both flattened and nested formats
    const name = body.lead?.name || body.name;
    const email = body.lead?.email || body.email;
    const phone = body.lead?.phone || body.phone;
    const category = body.category || 'AI Automation';
    const projectType = body.projectType || body.subject || 'Custom Inquiry';
    const message = body.message;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Save to Database / Leads Storage
    const dbResult = await saveContactSubmission({
      lead: {
        name,
        email,
        phone,
      },
      subject: `${category} - ${projectType}`,
      message,
    });

    // Send Clean Formatted Email to connect@dotnlott.com
    const emailResult = await sendContactEmail({
      name,
      email,
      phone,
      category,
      projectType,
      message,
    });

    return NextResponse.json({
      success: true,
      dbResult,
      emailResult,
    });
  } catch (error) {
    console.error('API Contact route error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
