import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import DeleteButton from "@/components/admin/DeleteButton";
import ReorderButtons from "@/components/admin/ReorderButtons";
import { getEvents } from "@/lib/data";
import { formatDateRange } from "@/lib/format";
import { deleteEvent, moveEvent } from "../actions";

export default async function EventsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { error } = await searchParams;
  const events = await getEvents();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow text-cardinal">Events</p>
          <h1 className="display mt-1 text-3xl text-ink">Events</h1>
          <p className="mt-2 text-sm text-stone">Use the arrows to set the order shown on the public events page.</p>
        </div>
        <Link href="/admin/events/new" className="rounded-md bg-cardinal px-4 py-2.5 text-sm font-semibold text-white hover:bg-cardinal-bright">
          + New event
        </Link>
      </div>

      {error && (
        <p className="mt-5 rounded-md border border-cardinal/20 bg-cardinal/5 px-3 py-2 text-sm text-cardinal">{error}</p>
      )}

      <div className="mt-6 divide-y divide-ink/8 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {events.length === 0 && <p className="p-6 text-sm text-stone">No events yet.</p>}
        {events.map((e, i) => (
          <div key={e.id} className="flex items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <ReorderButtons
                action={moveEvent}
                id={e.id}
                disableUp={i === 0}
                disableDown={i === events.length - 1}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-display font-semibold text-ink">{e.title}</h2>
                  {e.featured && (
                    <span className="rounded-full bg-cardinal/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-cardinal">Featured</span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-stone">
                  {formatDateRange(e.date, e.endDate)} · {e.tag} · {e.location}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/events/${e.id}`} className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink hover:border-cardinal hover:text-cardinal">
                Edit
              </Link>
              <DeleteButton action={deleteEvent} id={e.id} what={`“${e.title}”`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
