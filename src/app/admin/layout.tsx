import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import AdminNav from "@/components/admin/AdminNav";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  // The user's email arrives pre-verified from middleware.ts (via the
  // x-user-email request header) — reading it here avoids a second
  // getUser() round-trip to Supabase's Auth server on every navigation.
  const email = configured ? (await headers()).get("x-user-email") : null;

  // Login page and fallback (unconfigured) render bare — no admin chrome.
  if (!configured || !email) {
    return <div className="min-h-screen bg-paper">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 font-display text-sm font-bold text-cardinal">
              <span className="grid h-7 w-7 place-items-center rounded-sm bg-cardinal text-white">Y</span>
              YPHA Admin
            </Link>
            <AdminNav variant="desktop" />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-stone hover:text-cardinal" target="_blank">
              View site ↗
            </Link>
            <span className="hidden text-xs text-ink/40 md:inline">{email}</span>
            <form action={signOut}>
              <button className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-cardinal hover:text-cardinal">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <AdminNav variant="mobile" />
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
