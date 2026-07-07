import Link from "next/link";

/** Shown across the admin when Supabase isn't configured yet. */
export default function SetupNotice() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <p className="eyebrow text-cardinal">Backend not connected</p>
      <h1 className="display mt-2 text-3xl text-ink">Connect Supabase to edit the site</h1>
      <p className="pretty mt-4 leading-relaxed text-stone">
        The site is running in fallback mode with built-in demo content. To turn
        on logins and the editable admin, connect a free Supabase project.
      </p>
      <ol className="mt-6 space-y-3 text-sm text-ink">
        <li className="flex gap-3"><span className="font-mono text-cardinal">1</span> Create a project at supabase.com and run <code className="rounded bg-white px-1.5 py-0.5 text-cardinal">supabase/schema.sql</code>.</li>
        <li className="flex gap-3"><span className="font-mono text-cardinal">2</span> Copy your Project URL + anon key into <code className="rounded bg-white px-1.5 py-0.5 text-cardinal">.env.local</code>.</li>
        <li className="flex gap-3"><span className="font-mono text-cardinal">3</span> Restart the dev server and invite your team.</li>
      </ol>
      <p className="mt-6 text-sm text-stone">
        Full walkthrough: <code className="rounded bg-white px-1.5 py-0.5 text-cardinal">SUPABASE_SETUP.md</code> in the project root.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-cardinal hover:underline">
        ← Back to the site
      </Link>
    </div>
  );
}
