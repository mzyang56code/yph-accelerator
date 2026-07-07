import Link from "next/link";
import { saveWorkshop } from "@/app/admin/actions";
import { Field, Text, Area, Select, SubmitButton } from "./ui";
import { workshopCategories, workshopFileKinds, type Workshop } from "@/lib/data";

export default function WorkshopForm({ workshop }: { workshop?: Workshop }) {
  return (
    <form action={saveWorkshop} className="max-w-2xl space-y-5">
      {workshop && <input type="hidden" name="id" value={workshop.id} />}

      <Field label="Title">
        <Text name="title" defaultValue={workshop?.title} required />
      </Field>

      <Field
        label="Google Drive link"
        hint="Upload the file to your shared Drive, then paste the share link here"
      >
        <Text name="drive_url" type="url" defaultValue={workshop?.driveUrl === "#" ? "" : workshop?.driveUrl} placeholder="https://drive.google.com/…" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Topic">
          <Select name="category" options={workshopCategories} defaultValue={workshop?.category} />
        </Field>
        <Field label="Format">
          <Select name="file_kind" options={workshopFileKinds} defaultValue={workshop?.fileKind} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Released">
          <Text name="released" type="date" defaultValue={workshop?.released} required />
        </Field>
        <Field label="Length (minutes)">
          <Text name="duration_min" type="number" defaultValue={String(workshop?.durationMin ?? 45)} />
        </Field>
      </div>

      <Field label="Summary">
        <Area name="summary" defaultValue={workshop?.summary} rows={3} />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>Save workshop</SubmitButton>
        <Link href="/admin/workshops" className="text-sm font-medium text-stone hover:text-cardinal">
          Cancel
        </Link>
      </div>
    </form>
  );
}
