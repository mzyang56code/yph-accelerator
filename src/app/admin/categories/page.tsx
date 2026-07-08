import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import DeleteButton from "@/components/admin/DeleteButton";
import ReorderButtons from "@/components/admin/ReorderButtons";
import { getWorkshopCategories, getWorkshops } from "@/lib/data";
import { deleteWorkshopCategory, moveWorkshopCategory } from "../actions";

export default async function CategoriesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { error } = await searchParams;
  const [categories, workshops] = await Promise.all([getWorkshopCategories(), getWorkshops()]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow text-cardinal">Workshop library</p>
          <h1 className="display mt-1 text-3xl text-ink">Categories</h1>
          <p className="mt-2 max-w-lg text-sm text-stone">
            These are the filter tabs on the public workshop library. Reorder them to change the tab order.
          </p>
        </div>
        <Link href="/admin/categories/new" className="rounded-md bg-cardinal px-4 py-2.5 text-sm font-semibold text-white hover:bg-cardinal-bright">
          + New category
        </Link>
      </div>

      {error && (
        <p className="mt-5 rounded-md border border-cardinal/20 bg-cardinal/5 px-3 py-2 text-sm text-cardinal">{error}</p>
      )}

      <div className="mt-6 divide-y divide-ink/8 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {categories.length === 0 && <p className="p-6 text-sm text-stone">No categories yet.</p>}
        {categories.map((c, i) => {
          const count = workshops.filter((w) => w.category === c.label).length;
          return (
            <div key={c.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <ReorderButtons
                  action={moveWorkshopCategory}
                  id={c.id}
                  disableUp={i === 0}
                  disableDown={i === categories.length - 1}
                />
                <span className="h-4 w-4 shrink-0 rounded-full ring-1 ring-ink/10" style={{ backgroundColor: c.color }} />
                <div className="min-w-0">
                  <h2 className="truncate font-display font-semibold text-ink">{c.label}</h2>
                  <p className="mt-0.5 text-sm text-stone">{count} workshop{count === 1 ? "" : "s"}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link href={`/admin/categories/${c.id}`} className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink hover:border-cardinal hover:text-cardinal">
                  Edit
                </Link>
                <DeleteButton
                  action={deleteWorkshopCategory}
                  id={c.id}
                  what={`“${c.label}”`}
                  extraFields={{ label: c.label }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
