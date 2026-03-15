import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabase = null;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend/.env');
  console.error('Please add these keys from your Supabase Dashboard > Settings > API');
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase Client Initialized Successfully');
  } catch (error) {
    console.error('❌ ERROR: Failed to initialize Supabase client:', error.message);
  }
}

export default supabase