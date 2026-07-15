import { NextResponse } from 'next/server';
import { saveQuote } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.lead || !body.lead.name || !body.lead.email || !body.selectedWorkflows) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lead.name, lead.email, selectedWorkflows' },
        { status: 400 }
      );
    }

    const result = await saveQuote({
      lead: {
        name: body.lead.name,
        email: body.lead.email,
        phone: body.lead.phone,
        company: body.lead.company,
      },
      selectedWorkflows: body.selectedWorkflows,
      estimatedMonthlyPrice: body.estimatedMonthlyPrice || 0,
      estimatedSetupPrice: body.estimatedSetupPrice || 0,
      discountApplied: body.discountApplied || 0,
      customRequirements: body.customRequirements,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Quote route error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
