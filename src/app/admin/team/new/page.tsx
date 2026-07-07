import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import TeamForm from "@/components/admin/TeamForm";

export default function NewTeamMember() {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  return (
    <div>
      <Link href="/admin/team" className="text-sm text-stone hover:text-cardinal">← Team</Link>
      <h1 className="display mt-2 text-3xl text-ink">New team member</h1>
      <div className="mt-6">
        <TeamForm />
      </div>
    </div>
  );
}
