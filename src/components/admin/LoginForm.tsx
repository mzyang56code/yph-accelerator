"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm({ next, initialError }: { next: string; initialError?: string | null }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [loading, setLoading] = useState(false);

  const inputCls =
    "mt-1.5 w-full rounded-md border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20";

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-xl border border-ink/10 bg-white p-8 shadow-sm">
        <p className="eyebrow text-cardinal">YPHA Team</p>
        <h1 className="display mt-2 text-2xl text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-stone">Manage events, workshops, team, and the homepage.</p>

        {error && (
          <p className="mt-5 rounded-md border border-cardinal/20 bg-cardinal/5 px-3 py-2 text-sm text-cardinal">
            {error}
          </p>
        )}

        <form onSubmit={signInWithEmail} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Email</span>
            <input className={inputCls} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Password</span>
            <input className={inputCls} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-cardinal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cardinal-bright disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-stone">
        Trouble signing in? Ask a program admin to invite you in Supabase.
      </p>
    </div>
  );
}
