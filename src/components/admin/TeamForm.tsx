import Image from "next/image";
import Link from "next/link";
import { saveTeamMember } from "@/app/admin/actions";
import { Field, Text, Area, Select, SubmitButton, Toggle } from "./ui";
import { teamKinds, type TeamMember } from "@/lib/data";

export default function TeamForm({ member }: { member?: TeamMember }) {
  return (
    <form action={saveTeamMember} className="max-w-2xl space-y-5">
      {member && <input type="hidden" name="id" value={member.id} />}
      <input type="hidden" name="existing_photo_url" value={member?.photoUrl ?? ""} />

      <Field label="Photo" hint="JPG or PNG, under 5MB. Square photos crop best.">
        <div className="mt-2 flex items-center gap-4">
          {member?.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-ink/10"
            />
          ) : (
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-paper text-xs text-stone ring-1 ring-ink/10">
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
            {member?.photoUrl && <Toggle name="remove_photo" label="Remove current photo" />}
          </div>
        </div>
      </Field>

      <Field label="Name">
        <Text name="name" defaultValue={member?.name} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Role" hint="e.g. Epidemiology Mentor">
          <Text name="role" defaultValue={member?.role} />
        </Field>
        <Field label="Group">
          <Select name="kind" options={teamKinds} defaultValue={member?.kind} />
        </Field>
      </div>

      <Field label="Affiliation" hint="e.g. Class of 2027, or Stanford School of Medicine">
        <Text name="affiliation" defaultValue={member?.affiliation} />
      </Field>

      <Field label="Bio">
        <Area name="bio" defaultValue={member?.bio} rows={3} />
      </Field>

      <Field label="Sort order" hint="Lower numbers appear first within a group">
        <Text name="sort_order" type="number" defaultValue={String(member?.sortOrder ?? 0)} />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>Save member</SubmitButton>
        <Link href="/admin/team" className="text-sm font-medium text-stone hover:text-cardinal">
          Cancel
        </Link>
      </div>
    </form>
  );
}
