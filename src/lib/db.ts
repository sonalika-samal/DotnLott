import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface QuoteInput {
  lead: LeadInput;
  selectedWorkflows: string[];
  estimatedMonthlyPrice: number;
  estimatedSetupPrice: number;
  discountApplied: number;
  customRequirements?: string;
}

export interface BookingInput {
  lead: LeadInput;
  scheduledAt: string;
  meetingType: string;
  notes?: string;
}

export interface ContactInput {
  lead: LeadInput;
  subject: string;
  message: string;
}

// Helper to check if Supabase is properly configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url !== 'https://your-project-ref.supabase.co' && !url.includes('your-project-ref');
}

/**
 * Gets or creates a lead by email address.
 * Falls back to generating a mock local lead if database is unavailable.
 */
async function getOrCreateLead(lead: LeadInput): Promise<{ id: string; isMock: boolean }> {
  if (!isSupabaseConfigured()) {
    console.warn('Database not configured. Returning mock Lead ID.');
    return { id: uuidv4(), isMock: true };
  }

  try {
    // Check if lead exists
    const { data: existingLead, error: searchError } = await supabase
      .from('leads')
      .select('id')
      .eq('email', lead.email.toLowerCase())
      .maybeSingle();

    if (searchError) {
      console.error('Error searching lead:', searchError);
      throw searchError;
    }

    if (existingLead) {
      // Update phone/company if provided and not already set
      if (lead.phone || lead.company) {
        await supabase
          .from('leads')
          .update({
            name: lead.name,
            ...(lead.phone ? { phone: lead.phone } : {}),
            ...(lead.company ? { company: lead.company } : {}),
          })
          .eq('id', existingLead.id);
      }
      return { id: existingLead.id, isMock: false };
    }

    // Create new lead
    const newId = uuidv4();
    const { error: insertError } = await supabase
      .from('leads')
      .insert({
        id: newId,
        name: lead.name,
        email: lead.email.toLowerCase(),
        phone: lead.phone || null,
        company: lead.company || null,
      });

    if (insertError) {
      console.error('Error inserting lead:', insertError);
      throw insertError;
    }

    return { id: newId, isMock: false };
  } catch (error) {
    console.error('Database connection error in getOrCreateLead. Falling back to Mock Lead ID.', error);
    return { id: uuidv4(), isMock: true };
  }
}

/**
 * Saves a quote.
 */
export async function saveQuote(input: QuoteInput) {
  const { id: leadId, isMock } = await getOrCreateLead(input.lead);

  if (isMock) {
    return { success: true, isMock: true, quoteId: uuidv4() };
  }

  try {
    const quoteId = uuidv4();
    const { error } = await supabase
      .from('quotes')
      .insert({
        id: quoteId,
        lead_id: leadId,
        selected_workflows: input.selectedWorkflows,
        estimated_monthly_price: input.estimatedMonthlyPrice,
        estimated_setup_price: input.estimatedSetupPrice,
        discount_applied: input.discountApplied,
        custom_requirements: input.customRequirements || null,
      });

    if (error) {
      console.error('Error inserting quote:', error);
      throw error;
    }

    return { success: true, isMock: false, quoteId };
  } catch (error) {
    console.error('Failed to save quote to DB. Gracing out.', error);
    return { success: true, isMock: true, quoteId: uuidv4() };
  }
}

/**
 * Saves a consultation booking.
 */
export async function saveBooking(input: BookingInput) {
  const { id: leadId, isMock } = await getOrCreateLead(input.lead);

  if (isMock) {
    return { success: true, isMock: true, bookingId: uuidv4() };
  }

  try {
    const bookingId = uuidv4();
    const { error } = await supabase
      .from('bookings')
      .insert({
        id: bookingId,
        lead_id: leadId,
        scheduled_at: input.scheduledAt,
        meeting_type: input.meetingType,
        notes: input.notes || null,
      });

    if (error) {
      console.error('Error inserting booking:', error);
      throw error;
    }

    return { success: true, isMock: false, bookingId };
  } catch (error) {
    console.error('Failed to save booking to DB. Gracing out.', error);
    return { success: true, isMock: true, bookingId: uuidv4() };
  }
}

/**
 * Saves a general contact submission.
 */
export async function saveContactSubmission(input: ContactInput) {
  const { id: leadId, isMock } = await getOrCreateLead(input.lead);

  if (isMock) {
    return { success: true, isMock: true, submissionId: uuidv4() };
  }

  try {
    const submissionId = uuidv4();
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        id: submissionId,
        lead_id: leadId,
        subject: input.subject,
        message: input.message,
      });

    if (error) {
      console.error('Error inserting contact submission:', error);
      throw error;
    }

    return { success: true, isMock: false, submissionId };
  } catch (error) {
    console.error('Failed to save contact submission to DB. Gracing out.', error);
    return { success: true, isMock: true, submissionId: uuidv4() };
  }
}
