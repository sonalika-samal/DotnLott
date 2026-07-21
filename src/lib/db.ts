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

/**
 * Gets or creates a lead by email address.
 * Simulates lead generation locally.
 */
async function getOrCreateLead(lead: LeadInput): Promise<{ id: string; isMock: boolean }> {
  return { id: uuidv4(), isMock: true };
}

/**
 * Saves a quote.
 */
export async function saveQuote(input: QuoteInput) {
  const { id: leadId } = await getOrCreateLead(input.lead);
  return { success: true, isMock: true, quoteId: uuidv4() };
}

/**
 * Saves a consultation booking.
 */
export async function saveBooking(input: BookingInput) {
  const { id: leadId } = await getOrCreateLead(input.lead);
  return { success: true, isMock: true, bookingId: uuidv4() };
}

/**
 * Saves a general contact submission.
 */
export async function saveContactSubmission(input: ContactInput) {
  const { id: leadId } = await getOrCreateLead(input.lead);
  return { success: true, isMock: true, submissionId: uuidv4() };
}
