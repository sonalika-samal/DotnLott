import { NextResponse } from 'next/server';
import { saveContactSubmission } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.lead || !body.lead.name || !body.lead.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lead.name, lead.email, subject, message' },
        { status: 400 }
      );
    }

    const result = await saveContactSubmission({
      lead: {
        name: body.lead.name,
        email: body.lead.email,
        phone: body.lead.phone,
        company: body.lead.company,
      },
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Contact route error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
