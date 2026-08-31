import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verifying a session is a network round-trip to Supabase Auth, and signed-in
// traffic pays for it on *every* admin request (auth-js short-circuits when
// there's no access token, so a logged-out visitor never makes the call — which
// is why this only ever bites the team). Middleware has no timeout of its own,
// so one stalled Auth call runs all the way to Vercel's invocation limit and
// the response is a 504 MIDDLEWARE_INVOCATION_TIMEOUT instead of a page.
//
// So: bound the call, and treat "couldn't check" as "not signed in". That
// fails closed — a flaky Auth server can't hand out access — and the visitor
// gets the login page instead of a gateway error.
const AUTH_TIMEOUT_MS = 5_000;

/** fetch, but it gives up rather than hanging the whole invocation. */
function abortableFetch(input: RequestInfo | URL, init?: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS);
  return fetch(input, { ...init, signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
}

/**
 * The signed-in user, or null if Supabase didn't answer in time. The race
 * covers the stalls that aren't network-bound either (auth-js takes an
 * internal lock before it reads the session).
 */
async function resolveUser(
  supabase: ReturnType<typeof createServerClient>,
): Promise<{ email?: string } | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      supabase.auth.getUser(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("supabase-auth-timeout")), AUTH_TIMEOUT_MS);
      }),
    ]);
    return result.data.user;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

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
    global: { fetch: abortableFetch },
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

  const user = await resolveUser(supabase);

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
