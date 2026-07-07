import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * A cookie-free Supabase client for PUBLIC reads (the anon key + public-read
 * RLS). It carries no session, so it can run during static generation without
 * forcing every page dynamic. Writes still go through the session-bound server
 * client in `server.ts`.
 */
export function createPublicClient() {
  return createSupabaseClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
