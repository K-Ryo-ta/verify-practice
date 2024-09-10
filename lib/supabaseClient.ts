// lib/supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
