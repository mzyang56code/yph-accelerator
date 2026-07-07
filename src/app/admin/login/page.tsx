import { isSupabaseConfigured } from "@/lib/supabase/config";
import LoginForm from "@/components/admin/LoginForm";
import SetupNotice from "@/components/admin/SetupNotice";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/admin") ? sp.next : "/admin";
  const initialError = sp.error === "auth" ? "Sign-in failed. Please try again." : null;

  return <LoginForm next={next} initialError={initialError} />;
}
