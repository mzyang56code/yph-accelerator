import Link from "next/link";
import { notFound } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import EventForm from "@/components/admin/EventForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { getEventById } from "@/lib/data";
import { deleteEvent } from "../../actions";

export default async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  return (
    <div>
      <Link href="/admin/events" className="text-sm text-stone hover:text-cardinal">← Events</Link>
      <h1 className="display mt-2 text-3xl text-ink">Edit event</h1>
      <div className="mt-6">
        <EventForm event={event} />
      </div>
      <div className="mt-10 max-w-2xl border-t border-ink/10 pt-6">
        <p className="mb-2 text-sm font-semibold text-ink">Danger zone</p>
        <DeleteButton action={deleteEvent} id={event.id} label="Delete this event" what={`“${event.title}”`} />
      </div>
    </div>
  );
}
