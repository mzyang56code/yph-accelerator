import Link from "next/link";
import { saveWorkshop } from "@/app/admin/actions";
import { Field, Text, Area, Select, SubmitButton } from "./ui";
import { workshopFileKinds, type Workshop, type WorkshopCategory } from "@/lib/data";

export default function WorkshopForm({
  workshop,
  categories,
}: {
  workshop?: Workshop;
  categories: WorkshopCategory[];
}) {
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
          {categories.length > 0 ? (
            <Select name="category" options={categories.map((c) => c.label)} defaultValue={workshop?.category} />
          ) : (
            <p className="mt-1.5 text-sm text-stone">
              No categories yet —{" "}
              <Link href="/admin/categories/new" className="font-medium text-cardinal hover:underline">
                create one first
              </Link>
              .
            </p>
          )}
        </Field>
        <Field label="Format">
          <Select name="file_kind" options={workshopFileKinds} defaultValue={workshop?.fileKind} />
        </Field>
      </div>
      <Link href="/admin/categories" className="-mt-2 inline-block text-xs font-medium text-cardinal hover:underline">
        Manage categories →
      </Link>

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
