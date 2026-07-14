# Stanford Youth Public Health Accelerator

Website + editable backend for the Stanford Youth Public Health Accelerator
(YPHA) — a cohort-based mentorship program, built to work like YC and other
accelerators, that walks Bay Area high-schoolers from a first spark of interest
to a finished public-health project. Founded and directed by Stanford
undergraduates through the Stanford Undergraduate Global Health Club and the
Stanford Journal of Public Health, with support from the Stanford Center for
Innovation in Global Health.

**Program story, pillars, and the Cohort 2026–2027 timeline live in
[CONTENT.md](./CONTENT.md)** — the source of truth for site copy.

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
- `/` home · `/events` · `/workshops` (filterable, links to Drive) · `/team`

## Admin (`/admin`) — team-only, login-protected
Sign in at `/admin/login`, then edit **Events**, **Workshops**, **Team**, and
the **Homepage** content. Changes publish immediately (on-demand revalidation).

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
