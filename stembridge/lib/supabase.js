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

// Give a helpful error if the .env.local file isn't set up yet
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables.\n" +
      "Copy .env.local.example → .env.local and fill in your values.\n" +
      "See README.md → Setup for instructions."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
