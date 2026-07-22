import { NextResponse } from 'next/server';
import { saveBooking } from '@/lib/db';
import { sendBookingEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.lead || !body.lead.name || !body.lead.email || !body.scheduledAt || !body.meetingType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lead.name, lead.email, scheduledAt, meetingType' },
        { status: 400 }
      );
    }

    const dbResult = await saveBooking({
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

    const emailResult = await sendBookingEmail({
      name: body.lead.name,
      email: body.lead.email,
      phone: body.lead.phone,
      company: body.lead.company,
      scheduledAt: body.scheduledAt,
      meetingType: body.meetingType,
      notes: body.notes,
    });

    if (!emailResult.success) {
      return NextResponse.json({
        success: false,
        error: emailResult.error || 'Failed to deliver booking email',
        dbResult,
        emailResult,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      dbResult,
      emailResult,
    });
  } catch (error) {
    console.error('API Booking route error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
