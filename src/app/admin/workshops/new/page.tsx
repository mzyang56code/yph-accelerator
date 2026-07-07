import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import WorkshopForm from "@/components/admin/WorkshopForm";

export default function NewWorkshop() {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  return (
    <div>
      <Link href="/admin/workshops" className="text-sm text-stone hover:text-cardinal">← Workshops</Link>
      <h1 className="display mt-2 text-3xl text-ink">New workshop</h1>
      <div className="mt-6">
        <WorkshopForm />
      </div>
    </div>
  );
}
