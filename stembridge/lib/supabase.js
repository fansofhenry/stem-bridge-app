// lib/supabase.js
// ─────────────────────────────────────────────────────────────
// Creates and exports a Supabase client.
// Import this wherever you need database access.
//
// Usage:
//   import { supabase } from '@/lib/supabase'
//   const { data, error } = await supabase.from('projects').select('*')
// ─────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Warn but don't crash — allows the app to start without Supabase for local UI dev.
// Database calls will fail gracefully instead of crashing at import time.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Missing Supabase environment variables.\n" +
      "Copy .env.local.example → .env.local and fill in your values.\n" +
      "See README.md → Setup for instructions.\n" +
      "The app will run but database features will not work."
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
