import Link from "next/link";
import { notFound } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import WorkshopForm from "@/components/admin/WorkshopForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { getWorkshopById } from "@/lib/data";
import { deleteWorkshop } from "../../actions";

export default async function EditWorkshop({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { id } = await params;
  const workshop = await getWorkshopById(id);
  if (!workshop) notFound();

  return (
    <div>
      <Link href="/admin/workshops" className="text-sm text-stone hover:text-cardinal">← Workshops</Link>
      <h1 className="display mt-2 text-3xl text-ink">Edit workshop</h1>
      <div className="mt-6">
        <WorkshopForm workshop={workshop} />
      </div>
      <div className="mt-10 max-w-2xl border-t border-ink/10 pt-6">
        <p className="mb-2 text-sm font-semibold text-ink">Danger zone</p>
        <DeleteButton action={deleteWorkshop} id={workshop.id} label="Delete this workshop" what={`“${workshop.title}”`} />
      </div>
    </div>
  );
}
