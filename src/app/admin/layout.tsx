import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/workshops", label: "Workshops" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/home", label: "Homepage" },
  { href: "/admin/program", label: "Program" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  let email: string | null = null;
  if (configured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
  }

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
            <nav className="hidden items-center gap-1 sm:flex">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-stone transition-colors hover:bg-paper hover:text-cardinal"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
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
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-ink/8 px-6 py-2 sm:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-stone">
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
