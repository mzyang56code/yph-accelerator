import Link from "next/link";
import { notFound } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import CategoryForm from "@/components/admin/CategoryForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { getWorkshopCategoryById, getWorkshops } from "@/lib/data";
import { deleteWorkshopCategory } from "../../actions";

export default async function EditCategory({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { id } = await params;
  const category = await getWorkshopCategoryById(id);
  if (!category) notFound();
  const workshops = await getWorkshops();
  const count = workshops.filter((w) => w.category === category.label).length;

  return (
    <div>
      <Link href="/admin/categories" className="text-sm text-stone hover:text-cardinal">← Categories</Link>
      <h1 className="display mt-2 text-3xl text-ink">Edit category</h1>
      <div className="mt-6">
        <CategoryForm category={category} />
      </div>
      <div className="mt-10 max-w-2xl border-t border-ink/10 pt-6">
        <p className="mb-2 text-sm font-semibold text-ink">Danger zone</p>
        {count > 0 ? (
          <p className="text-sm text-stone">
            {count} workshop{count === 1 ? "" : "s"} still use this category — reassign them before deleting it.
          </p>
        ) : (
          <DeleteButton
            action={deleteWorkshopCategory}
            id={category.id}
            label="Delete this category"
            what={`“${category.label}”`}
            extraFields={{ label: category.label }}
          />
        )}
      </div>
    </div>
  );
}
