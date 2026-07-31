import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProgramForm from "@/components/admin/ProgramForm";
import { getProgramContent } from "@/lib/data";

export default async function ProgramAdmin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { error } = await searchParams;
  const content = await getProgramContent();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Program"
        title="Program page"
        description={
          <>
            The hero and the cohort-application toggle on <code>/program</code>. The monthly cohort timeline is
            fixed in code. Ask a dev to change it.
          </>
        }
      />

      {error && (
        <p className="mt-5 rounded-md border border-cardinal/20 bg-cardinal/5 px-3 py-2 text-sm text-cardinal">{error}</p>
      )}

      <div className="mt-6">
        <ProgramForm content={content} />
      </div>
    </div>
  );
}
