import { NextResponse } from 'next/server';
import { saveBooking } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.lead || !body.lead.name || !body.lead.email || !body.scheduledAt || !body.meetingType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lead.name, lead.email, scheduledAt, meetingType' },
        { status: 400 }
      );
    }

    const result = await saveBooking({
      lead: {
        name: body.lead.name,
        email: body.lead.email,
        phone: body.lead.phone,
        company: body.lead.company,
      },
      scheduledAt: body.scheduledAt,
      meetingType: body.meetingType,
      notes: body.notes,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Booking route error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
