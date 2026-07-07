import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import DeleteButton from "@/components/admin/DeleteButton";
import { getTeam } from "@/lib/data";
import { deleteTeamMember } from "../actions";

export default async function TeamAdmin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { error } = await searchParams;
  const team = await getTeam();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow text-cardinal">The people</p>
          <h1 className="display mt-1 text-3xl text-ink">Team</h1>
        </div>
        <Link href="/admin/team/new" className="rounded-md bg-cardinal px-4 py-2.5 text-sm font-semibold text-white hover:bg-cardinal-bright">
          + New member
        </Link>
      </div>

      {error && (
        <p className="mt-5 rounded-md border border-cardinal/20 bg-cardinal/5 px-3 py-2 text-sm text-cardinal">{error}</p>
      )}

      <div className="mt-6 divide-y divide-ink/8 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {team.length === 0 && <p className="p-6 text-sm text-stone">No team members yet.</p>}
        {team.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-display font-semibold text-ink">{m.name}</h2>
                <span className="rounded-full bg-paper px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-stone">{m.kind}</span>
              </div>
              <p className="mt-0.5 text-sm text-stone">{m.role}{m.affiliation ? ` · ${m.affiliation}` : ""}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/team/${m.id}`} className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink hover:border-cardinal hover:text-cardinal">
                Edit
              </Link>
              <DeleteButton action={deleteTeamMember} id={m.id} what={`“${m.name}”`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
