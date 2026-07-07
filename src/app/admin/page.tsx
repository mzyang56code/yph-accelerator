import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import { getEvents, getWorkshops, getTeam } from "@/lib/data";

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const [events, workshops, team] = await Promise.all([
    getEvents(),
    getWorkshops(),
    getTeam(),
  ]);

  const cards = [
    { href: "/admin/events", label: "Events", count: events.length, blurb: "Symposia, field visits, workshops, community days." },
    { href: "/admin/workshops", label: "Workshops", count: workshops.length, blurb: "Library items linked to your shared Google Drive." },
    { href: "/admin/team", label: "Team", count: team.length, blurb: "Faculty, staff, mentors, and student fellows." },
    { href: "/admin/home", label: "Homepage", count: null, blurb: "Headline, mission, and the stats row." },
  ];

  return (
    <div>
      <p className="eyebrow text-cardinal">Dashboard</p>
      <h1 className="display mt-2 text-3xl text-ink">Manage the site</h1>
      <p className="mt-2 text-stone">Changes go live right away.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-xl border border-ink/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cardinal/30 hover:shadow-[0_16px_40px_-24px_rgba(140,21,21,0.5)]"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-semibold text-ink">{c.label}</h2>
              {c.count !== null && (
                <span className="font-display text-2xl font-bold text-cardinal">{c.count}</span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-stone">{c.blurb}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-cardinal">
              Manage <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Adding a workshop</h2>
        <ol className="mt-3 space-y-1.5 text-sm text-stone">
          <li>1. Upload the file (slides, recording, workbook) to your shared Google Drive folder.</li>
          <li>2. In Drive, <strong>Share → Copy link</strong> (set to “anyone with the link can view”).</li>
          <li>3. Here, go to <Link href="/admin/workshops" className="font-medium text-cardinal hover:underline">Workshops → New</Link>, paste the link, add a title and topic.</li>
        </ol>
      </div>
    </div>
  );
}
