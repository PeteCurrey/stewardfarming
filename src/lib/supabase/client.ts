import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createSupabaseClient(supabaseUrl, supabaseKey);
}
