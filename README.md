# Stanford Youth Public Health Accelerator

Website + editable backend for the Stanford Youth Public Health Accelerator
(YPHA) — a year-long, cohort-based mentorship program that walks Bay Area
high-schoolers from a first spark of interest to a finished public-health
project, pairing each with a Stanford mentor. Founded and directed by Stanford
undergraduates through the Stanford Undergraduate Global Health Club and the
Stanford Journal of Public Health, with support from the Stanford Center for
Innovation in Global Health.

**Site copy, the cohort timeline, and program background live in
[CONTENT.md](./CONTENT.md)** — the source of truth.

Production runs on **Vercel** (custom domain **ypha.site**), project-linked via
`.vercel/project.json`. **GitHub auto-deploy-on-push works again** — verified
2026-08-27: a push to `main` triggered a production deploy within seconds, no
manual step needed. (It was broken as of 2026-07-28, which is why older notes
said to run `npx vercel --prod` by hand; that's still a valid fallback if a
push ever fails to trigger a build.)

## Stack
- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind v4**
- **Supabase** — auth (email/password + Google) and Postgres content store
- **Google Drive** — where workshop files live; the site stores links
- Deploys free on **Vercel**

## Running locally
```bash
npm install
npm run dev        # http://localhost:3000 (this project has used :3200)
```
Without Supabase configured, the site runs in **fallback mode**: public pages
show built-in demo content and `/admin` shows a setup notice. Everything still
builds and deploys.

## Public site
- `/` home · `/program` (cohort hero + year-long timeline + Apply) · `/events` · `/workshops` (filterable, links to Drive) · `/about` (mission + team, formerly `/team`)
- `/educators` — the teacher/counselor referral channel: why to nominate, key
  dates, and an **email CTA**. Nominations arrive as mail, not as form
  submissions — the site has no public write path. Linked from the footer, not
  the main nav.

## Admin (`/admin`) — team-only, login-protected
Sign in at `/admin/login`, then edit **Events**, **Workshops**, **Team**, the
**Homepage**, and the **Program** page. Changes publish immediately (on-demand
revalidation). The **Program** box holds the hero copy plus the **cohort
application toggle** ("Applications are open" + a Google Form URL) that flips the
Apply buttons between live and "Coming Soon" across the site.

### Session checks are bounded (`src/middleware.ts`)

`middleware.ts` guards `/admin/:path*` by verifying the Supabase session. That
verification is a **network round-trip to Supabase Auth on every admin
request**, and only signed-in traffic pays for it: `auth-js` returns early when
there's no access token, so a logged-out visitor never makes the call. That
asymmetry is worth remembering when debugging — probing `/admin` anonymously
looks instant and proves nothing about the path that actually breaks.

Middleware has no timeout of its own, so a stalled Auth call used to run to
Vercel's invocation limit and return **504 `MIDDLEWARE_INVOCATION_TIMEOUT`**
instead of a page (seen twice, 2026-08-31). The call is now bounded two ways,
because the two stall in different places: an `AbortController`-backed fetch
cancels the HTTP request, and a `Promise.race` deadline covers the non-network
stalls (`auth-js` takes an internal lock before reading the session). Both use
`AUTH_TIMEOUT_MS`, currently 5s.

On timeout `resolveUser()` returns `null`, which feeds the existing guard
unchanged: you land on `/admin/login` rather than a gateway error. This **fails
closed** — a flaky Auth server can't hand out admin access — and can't loop,
since the `!user && !isLogin` check already exempts the login page. It does not
make Auth faster: during a real outage you'll be bounced to login and won't be
able to sign in, because signing in needs the same server. What it prevents is a
slow-but-working Auth call taking the admin panel down for 25 seconds at a time.
If legitimate sessions start getting bounced, raise `AUTH_TIMEOUT_MS`.

## Connecting the backend
See **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** — create a Supabase project, run
[`supabase/schema.sql`](./supabase/schema.sql), drop two keys into `.env.local`
(template in `.env.local.example`), and invite your team. ~15 minutes.

## Project layout
```
src/
  app/                 public pages + /admin (dashboard, CRUD, login)
    admin/actions.ts   server actions (create/update/delete, sign-out)
    auth/callback/     OAuth code exchange
  components/          UI (Trajectory/ScatterField hero, cards, admin forms)
  lib/
    data.ts            content accessors (Supabase, with seed fallback)
    supabase/          server / browser / public clients + config
  middleware.ts        refreshes session, guards /admin
supabase/schema.sql    tables + RLS + seed content
```
