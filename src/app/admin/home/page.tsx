import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import SiteContentForm from "@/components/admin/SiteContentForm";
import { getSiteContent } from "@/lib/data";

export default async function HomeAdmin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { error } = await searchParams;
  const content = await getSiteContent();

  return (
    <div>
      <p className="eyebrow text-cardinal">Homepage</p>
      <h1 className="display mt-1 text-3xl text-ink">Homepage content</h1>
      <p className="mt-2 text-stone">The hero, mission, and the stats row on the front page.</p>

      {error && (
        <p className="mt-5 rounded-md border border-cardinal/20 bg-cardinal/5 px-3 py-2 text-sm text-cardinal">{error}</p>
      )}

      <div className="mt-6">
        <SiteContentForm content={content} />
      </div>
    </div>
  );
}
