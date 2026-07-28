import Image from "next/image";
import Link from "next/link";
import { saveEvent } from "@/app/admin/actions";
import { Field, Text, Area, Select, Toggle, SubmitButton } from "./ui";
import { eventTags, type Event } from "@/lib/data";

export default function EventForm({ event }: { event?: Event }) {
  return (
    <form action={saveEvent} className="max-w-2xl space-y-5">
      {event && <input type="hidden" name="id" value={event.id} />}
      <input type="hidden" name="existing_photo_url" value={event?.photoUrl ?? ""} />

      <Field label="Photo / flyer" hint="JPG or PNG, under 5MB. Shown when someone opens the event popup.">
        <div className="mt-2 flex items-center gap-4">
          {event?.photoUrl ? (
            <Image
              src={event.photoUrl}
              alt=""
              width={128}
              height={96}
              className="h-24 w-32 shrink-0 rounded-md object-cover ring-1 ring-ink/10"
            />
          ) : (
            <div className="grid h-24 w-32 shrink-0 place-items-center rounded-md bg-paper text-xs text-stone ring-1 ring-ink/10">
              No photo
            </div>
          )}
          <div className="flex-1 space-y-2">
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="block w-full text-sm text-stone file:mr-3 file:rounded-md file:border-0 file:bg-paper file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ink hover:file:bg-sandstone"
            />
            {event?.photoUrl && <Toggle name="remove_photo" label="Remove current photo" />}
          </div>
        </div>
      </Field>

      <Field label="Title">
        <Text name="title" defaultValue={event?.title} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date">
          <Text name="date" type="date" defaultValue={event?.date} required />
        </Field>
        <Field label="End date" hint="Optional, for multi-day events">
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

      <Field label="Summary" hint="Short teaser shown on the event card">
        <Area name="summary" defaultValue={event?.summary} rows={3} />
      </Field>

      <Field label="Full description" hint="Shown when someone clicks the card to expand it (optional)">
        <Area name="details" defaultValue={event?.details} rows={6} />
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
