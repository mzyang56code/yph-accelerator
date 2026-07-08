import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import WorkshopForm from "@/components/admin/WorkshopForm";
import { getWorkshopCategories } from "@/lib/data";

export default async function NewWorkshop() {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const categories = await getWorkshopCategories();
  return (
    <div>
      <Link href="/admin/workshops" className="text-sm text-stone hover:text-cardinal">← Workshops</Link>
      <h1 className="display mt-2 text-3xl text-ink">New workshop</h1>
      <div className="mt-6">
        <WorkshopForm categories={categories} />
      </div>
    </div>
  );
}
