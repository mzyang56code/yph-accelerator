/**
 * Supabase configuration. The whole app is built to run with OR without
 * Supabase configured: when these env vars are absent, the site falls back to
 * the built-in seed content (read-only) so it still builds, deploys, and runs.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
