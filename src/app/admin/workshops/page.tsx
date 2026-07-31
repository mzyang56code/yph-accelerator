import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import ReorderButtons from "@/components/admin/ReorderButtons";
import { getWorkshops } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { deleteWorkshop, moveWorkshop } from "../actions";

export default async function WorkshopsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { error } = await searchParams;
  const workshops = await getWorkshops();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Library"
        title="Workshops"
        description={
          <>
            Use the arrows to set the order shown on the public library and homepage.{" "}
            <Link href="/admin/categories" className="font-medium text-cardinal hover:underline">
              Manage categories →
            </Link>
          </>
        }
        action={
          <Link href="/admin/workshops/new" className="rounded-md bg-cardinal px-4 py-2.5 text-sm font-semibold text-white hover:bg-cardinal-bright">
            + New workshop
          </Link>
        }
      />

      {error && (
        <p className="mt-5 rounded-md border border-cardinal/20 bg-cardinal/5 px-3 py-2 text-sm text-cardinal">{error}</p>
      )}

      <div className="mt-6 divide-y divide-ink/8 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {workshops.length === 0 && <p className="p-6 text-sm text-stone">No workshops yet.</p>}
        {workshops.map((w, i) => {
          const linked = w.driveUrl && w.driveUrl !== "#";
          return (
            <div key={w.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <ReorderButtons
                  action={moveWorkshop}
                  id={w.id}
                  disableUp={i === 0}
                  disableDown={i === workshops.length - 1}
                />
                <div className="min-w-0">
                  <h2 className="truncate font-display font-semibold text-ink">{w.title}</h2>
                  <p className="mt-0.5 text-sm text-stone">
                    {w.category} · {w.fileKind} · {formatDate(w.released)}
                    {!linked && <span className="ml-2 text-cardinal">· no Drive link</span>}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link href={`/admin/workshops/${w.id}`} className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink hover:border-cardinal hover:text-cardinal">
                  Edit
                </Link>
                <DeleteButton action={deleteWorkshop} id={w.id} what={`“${w.title}”`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
