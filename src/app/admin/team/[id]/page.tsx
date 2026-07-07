import Link from "next/link";
import { notFound } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import TeamForm from "@/components/admin/TeamForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { getTeamMemberById } from "@/lib/data";
import { deleteTeamMember } from "../../actions";

export default async function EditTeamMember({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { id } = await params;
  const member = await getTeamMemberById(id);
  if (!member) notFound();

  return (
    <div>
      <Link href="/admin/team" className="text-sm text-stone hover:text-cardinal">← Team</Link>
      <h1 className="display mt-2 text-3xl text-ink">Edit team member</h1>
      <div className="mt-6">
        <TeamForm member={member} />
      </div>
      <div className="mt-10 max-w-2xl border-t border-ink/10 pt-6">
        <p className="mb-2 text-sm font-semibold text-ink">Danger zone</p>
        <DeleteButton action={deleteTeamMember} id={member.id} label="Delete this member" what={`“${member.name}”`} />
      </div>
    </div>
  );
}
