import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import SetupNotice from "@/components/admin/SetupNotice";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategory() {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  return (
    <div>
      <Link href="/admin/categories" className="text-sm text-stone hover:text-cardinal">← Categories</Link>
      <h1 className="display mt-2 text-3xl text-ink">New category</h1>
      <div className="mt-6">
        <CategoryForm />
      </div>
    </div>
  );
}
