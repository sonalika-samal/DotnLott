import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || supabaseUrl === 'https://your-project-ref.supabase.co') {
  console.warn('Supabase URL is not configured. Database operations will fail.');
}

// Service role client bypasses RLS, safe for serverless route handlers
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
});
