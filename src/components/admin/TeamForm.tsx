import Link from "next/link";
import { saveTeamMember } from "@/app/admin/actions";
import { Field, Text, Area, Select, SubmitButton } from "./ui";
import { teamKinds, type TeamMember } from "@/lib/data";

export default function TeamForm({ member }: { member?: TeamMember }) {
  return (
    <form action={saveTeamMember} className="max-w-2xl space-y-5">
      {member && <input type="hidden" name="id" value={member.id} />}

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
