import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import EventForm from "@/components/admin/EventForm";

export default function NewEvent() {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  return (
    <div>
      <Link href="/admin/events" className="text-sm text-stone hover:text-cardinal">← Events</Link>
      <h1 className="display mt-2 text-3xl text-ink">New event</h1>
      <div className="mt-6">
        <EventForm />
      </div>
    </div>
  );
}
