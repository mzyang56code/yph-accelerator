import Link from "next/link";
import { saveEvent } from "@/app/admin/actions";
import { Field, Text, Area, Select, Toggle, SubmitButton } from "./ui";
import { eventTags, type Event } from "@/lib/data";

export default function EventForm({ event }: { event?: Event }) {
  return (
    <form action={saveEvent} className="max-w-2xl space-y-5">
      {event && <input type="hidden" name="id" value={event.id} />}

      <Field label="Title">
        <Text name="title" defaultValue={event?.title} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date">
          <Text name="date" type="date" defaultValue={event?.date} required />
        </Field>
        <Field label="End date" hint="Optional — for multi-day events">
          <Text name="end_date" type="date" defaultValue={event?.endDate ?? ""} />
        </Field>
      </div>

      <Field label="Location">
        <Text name="location" defaultValue={event?.location} required />
      </Field>

      <Field label="Led by" hint="Which students or mentors are running it">
        <Text name="host" defaultValue={event?.host} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Type">
          <Select name="tag" options={eventTags} defaultValue={event?.tag} />
        </Field>
        <Field label="Registration link" hint="Optional URL">
          <Text name="register_url" defaultValue={event?.registerUrl ?? ""} placeholder="https://…" />
        </Field>
      </div>

      <Field label="Summary">
        <Area name="summary" defaultValue={event?.summary} rows={3} />
      </Field>

      <Toggle name="featured" label="Feature on the homepage" defaultChecked={event?.featured} />

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>Save event</SubmitButton>
        <Link href="/admin/events" className="text-sm font-medium text-stone hover:text-cardinal">
          Cancel
        </Link>
      </div>
    </form>
  );
}
