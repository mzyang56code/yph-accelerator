import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Refreshes the Supabase session on admin routes and guards them: an
 * unauthenticated visitor to /admin/* (other than the login page) is sent to
 * the login page. If Supabase isn't configured, admin is left open in local
 * fallback mode (the admin pages themselves show a setup notice).
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!URL || !ANON) return response;

  const supabase = createServerClient(URL, ANON, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!user && !isLogin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isLogin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  // Forward the already-verified user's email as a request header, so
  // admin/layout.tsx can read it via headers() instead of paying for a
  // second getUser() round-trip to Supabase's Auth server on every
  // navigation.
  if (user?.email) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-email", user.email);
    const finalResponse = NextResponse.next({ request: { headers: requestHeaders } });
    response.cookies.getAll().forEach((cookie) => finalResponse.cookies.set(cookie));
    response = finalResponse;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
