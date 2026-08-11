# YPHA — Content Source of Truth

Canonical copy + program facts for the Youth Public Health Accelerator site.
Public copy is admin-editable in Supabase (`site_content` for the homepage,
`program_content` for the program page); built-in defaults live in
`src/lib/data.ts`. Edit here when the story or schedule changes, then reflect it
in `/admin` (or the seed defaults for the fixed timeline).

**Status (2026-07-30):** Live on **ypha.site**. The cohort application is gated
behind an admin toggle (below) — currently **off**, so Apply buttons read
"2026 Cohort — Coming Soon". The `program_content` table migration has been run
in Supabase; the Program admin box works.

**Update (2026-07-30, later same day):** Added a nomination-first `/educators`
page (linked from the footer, not the main nav — see "For Educators page"
below); added a second homepage partner logo (Stanford CIGH, before ALAS);
built the actual **cohort application Google Form** (see "Cohort application"
below — not yet wired into `/admin → Program`'s Application form URL field);
and revamped `/admin` for performance and navigation IA (see "Admin panel
revamp" below).

**Deploys are currently manual.** Vercel's GitHub auto-deploy-on-push was found
not to be firing (last auto-deploy was 14 days stale) — `git push` alone does
**not** update ypha.site. Ship with `npx vercel --prod` from a repo checkout
with matching `.vercel/project.json` after pushing to `main`. Worth checking
the Vercel dashboard's Project → Settings → Git connection to fix the
underlying integration.

**Note on this doc's relationship to the CMS:** homepage/program hero fields
are genuinely admin-editable (Supabase), so a teammate can change the live
values in `/admin` at any time without touching code — treat the copy below as
"last known good," not a lock. Verify in `/admin/home` or `/admin/program`
before assuming it's still accurate.

---

## Homepage

- **Hero eyebrow removed:** the "Cohort 2026 · San Francisco Bay Area" eyebrow
  above the headline is gone; the headline is now the first element in the
  hero and is set larger (`text-4xl`/`sm:text-6xl`, was `text-[2.6rem]`/`sm:text-6xl`).
- **Hero headline** (CMS): "Accelerating the next generation of public health leaders" (no trailing period).
- **Hero lede** (CMS): "We're a Stanford program that pairs high school students with undergraduate mentors to accelerate public health ideas and initiatives within their own communities."
- **Hero CTAs:** primary = *Apply to the 2026 cohort* (or **"2026 Cohort — Coming Soon"** until the application toggle is on) → the Google Form; secondary = *Learn more* → `/program`.
- **Mission title dropped from the page** (2026-07-30): the "Mission title" CMS
  field (currently "We mentor youth to champion community-based health") still
  exists in `/admin/home` and the `site_content` schema, but `src/app/page.tsx`
  no longer renders it — the mission section is now just the body paragraph
  (`text-lg`, `text-stone`) next to the stats. Decided the hero headline
  already does the "big claim" job, so a second bolded title read as
  redundant. If a future edit re-adds a title element here, don't reintroduce
  the header/paragraph pairing without re-checking this still makes sense.
- **Mission body** (CMS): the stray leftover-fragment issue previously flagged
  here has been checked and is **no longer present** — current live text
  matches the canonical paragraph in `/about`'s `MISSION` array (first
  paragraph). Re-verify in `/admin/home` if this drifts again.
- **Section headings simplified** (2026-07-30) — three homepage sections lost
  their descriptive `intro` line and now show title-only, to read less like
  duplicate landing-page copy: "What our students are running next" → **"Events"**;
  "Mentors and students, working side by side" → **"Our Team"**. The Workshops
  section kept its title change ("Workshops you can actually use" → **"Workshops"**)
  but got its intro back: *"Shareable presentations on today's public health
  challenges, plus the skills to act on them."* — phrased not to repeat the
  word "Workshops" from the heading right above it.
- **New "In partnership with" band** (2026-07-30): a white, shadow-lifted card
  sitting between the Team section and the "Know a high schooler…" contact
  band (`src/app/page.tsx`, `PARTNERS` array). Two partners now: **Stanford
  Center for Innovation in Global Health** (`public/partners/cigh.png`, added
  2026-07-30 later the same day) first, then **ALAS — Ayudando Latinos a
  Soñar** (`public/partners/alas.png`). Both committed to the repo, not
  referenced from anyone's local Downloads folder. Add future partners by
  appending to `PARTNERS`; no CMS field for this yet.
- Sections top-to-bottom: hero → mission + stats → Events → Workshops (carousel)
  → Our Team (5 directors, click a card for the bio popup) → In partnership
  with (partner logos) → permanent, compact **Get in touch** contact band.
- **Footer** (`SiteFooter.tsx`) trimmed of two disclaimer phrases (2026-07-30):
  copyright line is now "© 2026 Stanford Youth Public Health Accelerator."
  (dropped "A student program."), and the legal line is now "Not an official
  Stanford University webpage." (dropped "Program prototype.").

## Program page (`/program`) — what's shown

Focused on the **cohort mentorship structure**. It intentionally does **not**
show YC framing, the "founded & directed by" founders, the "four ways" pillars,
or the subject-area tags (those are kept as background at the bottom).

- **Hero** (CMS): "From a first spark to a finished project." + intro: *"A year-long, cohort-based mentorship program. Each high schooler is paired with a Stanford mentor and moves through a set schedule of monthly meetings and check-ins, carrying one public-health project from first proposal to finished work."*
- **Hero eyebrow removed** (2026-07-30): "The program" label above the title is gone.
- **Countdown card replaces the Trajectory graphic** (2026-07-30): the hero used
  to mirror the homepage hero exactly (same dot-map + rising-line illustration
  + inline Apply pill) — one of the reasons the page felt like a duplicate
  landing page. The right column is now `ProgramCountdown`
  (`src/components/ProgramCountdown.tsx`), a translucent (`bg-black/20`) card
  on the cardinal field showing "2026 Cohort Applications Open in" + a large
  day-count down to a hardcoded `APPLICATION_OPEN_DATE` (**September 7, 2026**,
  a dev-updated constant like the timeline dates below) + a ghost button
  reading "Available Sep. 7th, 2026". Once the admin **Applications are open**
  toggle flips on, the same card swaps to "Applications Are Open." plus a real
  filled Apply button to the Google Form — no separate on/off markup to
  maintain.
- **How to Join** (in code, `JOIN_STEPS` in `src/app/program/page.tsx`): now
  **four** pre-cohort steps (was three) — **September 7**: applications open;
  **Mid-September**: General Info meeting (hybrid), open Q&A on the
  application and the year ahead; **Early October**: application deadline;
  **Late October**: cohort begins with the Welcome meeting (hybrid).
- **"What we'll ask for" + "Have questions?" added below the timeline steps**
  (2026-07-30, `APPLICATION_ASKS` in the same file): a two-column band listing
  what the application asks for — a general proposal centered on a real
  community problem, the community partners you'd work with, and what you're
  hoping to get out of a year of mentorship — paired with a "Have questions?"
  block pointing to the mid-September info meeting and a **Get in touch**
  mailto button (same `MailtoLink` component/style as the homepage contact band).
- **Timeline** (in code): the cohort year below, starting **October 2026**
  (cohort start) through **May 2027** (the Symposium).
- **Symposium highlight** (in code): May's End-of-Year Symposium stays in the
  monthly rail but is set apart with a bordered/tinted box and a slightly
  larger marker dot (Cardinal Bright accent) — the site's one deliberately
  highlighted moment (per `DESIGN.md`'s "single highlighted moment" rule).

## Events, Workshops, and About Us pages — captions removed (2026-07-30)

All three interior pages dropped their `PageHeader` `eyebrow`/`intro` text so
the header is title-only, for the same "stop echoing the landing page" reason
as the homepage section-heading trims above:
- `/events`: dropped eyebrow "What's happening" and the intro sentence. Title-only "Events".
- `/about`: dropped the intro "Why we exist, and the Stanford students and mentors making it happen." Title-only "About Us".
- `/workshops`: page **title changed** "The workshop library" → **"Workshop Library"**,
  eyebrow "Workshop library" dropped, then the intro line was **re-added**
  (initially removed, then asked back) reading: *"A growing library of talks
  and skill-building sessions, free for every student in the program."* —
  deliberately worded differently from the homepage Workshops intro above so
  the two don't read as copy-pasted.

## For Educators page (`/educators`, added 2026-07-30)

A page for teachers/counselors to nominate a student, built code-fixed (like
`/about`) rather than CMS-driven. **Not in the main nav** — deliberately
dropped after the fact (see below); reachable only via the footer's Explore
column and direct link-sharing (email, flyer), since the audience finds this
page by being handed the link, not by browsing the site.

- **Hero is the whole point:** unlike other interior pages, the hero itself
  *is* the nomination CTA — headline "Nominate a student for the 2026
  cohort," subhead, and the CTA button inline (ghost "Nominations Open Soon"
  until a real Google Form URL is set on the `NOMINATION_FORM_URL` constant
  in `src/app/educators/page.tsx`). Earlier drafts had a separate mid-page
  "Nominate a Student" CTA band and a full "Other ways to help" section
  (share the page / invite a workshop) — both removed so the page has one
  job, per explicit feedback that a second full section diluted the ask.
- **Sections:** Hero (nomination CTA) → "Why nominate them" (4 reasons,
  editorial rows) → Key dates (condensed pull from `/program`'s `JOIN_STEPS`)
  → "Have questions?" with a `MailtoLink` Get-in-touch button.
- **Nav history:** briefly added to `SiteNav.tsx`'s main nav (first next to
  "Join our 2026 Cohort"), then removed — the primary nav's job is walking
  students/parents down the belief ladder toward applying, and a low-traffic
  educator link competed with that. Now lives only in `SiteFooter.tsx`'s
  Explore column.
- **Nomination Google Form:** does not exist yet (separate from the cohort
  application form below). Draft field list for whoever builds it: student
  name/grade/school, student and/or parent email, nominator name/role/email,
  relationship to student, why they'd be a good fit, optional notes.

## Admin ordering behavior (2026-07-30)

New **workshops** and new **events** created in `/admin` now sort to the
**top** of their public list instead of the bottom — `saveWorkshop` and
`saveEvent` in `src/app/admin/actions.ts` assign a new row's `sort_order`
*below* the current minimum (was: above the current max). This was a
deliberate reversal from the original "new items join the end" behavior.
Manual reordering via the ↑/↓ arrows in `/admin` still works the same way.

## Event start/end times (2026-08-11)

Events now carry an optional **start time** and **end time** alongside the
existing start/end dates. Both are `time` columns on `public.events`
(`start_time`, `end_time`); the migration **has been run** against the live
Supabase project, so `/admin` event saves work. Note that adding the columns
was required before *any* event could be saved — `saveEvent` always sends both
fields, so until the migration landed every save failed with PostgREST's
`PGRST204`.

- **Both fields are optional.** Leave them blank and the card renders exactly
  as it did before — date only, no empty "time" line. The five pre-existing
  events were left with null times; set them in `/admin → Events` as they're
  confirmed.
- **Where it shows:** under the date in the "When" row, on both the event card
  and the expanded popup (`src/components/EventCard.tsx`), and in the
  `/admin/events` list line.
- **Formatting** lives in `formatTime` / `formatTimeRange`
  (`src/lib/format.ts`), matching the existing deterministic no-timezone-drift
  approach: `"16:00"` → `4 PM`, `"09:30"` → `9:30 AM`, on-the-hour times drop
  the `:00`. A start with no end renders as just the start time.
- **One validation:** on a single-day event, an end time at or before the start
  is rejected (almost always a slipped AM/PM). Multi-day events skip the check,
  since they legitimately end "earlier" in the day than they start.

### Time zones

**Admins always enter Pacific time** — the wall clock at the venue. The form
says so, and `/admin/events` shows times back with a "PT" label.

On the card, the venue time sits **on the same line as the date**, in the same
face, size, weight, and colour — only the `·` between them is dimmed:

> **When** &nbsp;Aug 23, 2026 · 2 PM – 3 PM PT
> **Where** Zoom

A visitor outside Pacific additionally gets **their own** time on a quiet line
beneath ("5 – 6 PM ET your time"). A Bay Area visitor — most of them — never
sees it. The venue time leads because it's what the admin typed and what's
true for everyone; the viewer's zone is the annotation, not the headline.

In the expanded popup the two stack instead of sharing a line: its three-column
grid is too narrow to hold both.

Three things worth knowing before changing any of this:

- **Times are stored naive** (`time` columns, no zone), and the zone is a
  separate fixed constant, `SITE_TZ` in `src/lib/format.ts`. This is
  deliberate and matches how Google Calendar models events. Don't "fix" it by
  switching to `timestamptz`: an event is a wall-clock promise about a place,
  so if DST law changes, 10 AM must stay 10 AM rather than sliding an hour.
  If YPHA ever runs an event outside Pacific, add a per-event `timezone`
  column rather than converting the stored values.
- **All zone math goes through `Intl`** (the IANA tzdb built into the browser
  and Node) — no date library, and DST is handled for us. Labels use
  `shortGeneric` ("PT", not "PST"/"PDT"), falling back to `short` ("GMT+2")
  outside North America, where `shortGeneric` returns prose like "France
  Time".
- **The viewer's zone is browser-only**, so the local line renders *after*
  mount (`useEventTimes` in `EventCard.tsx`). The server, and therefore the
  first client render, always shows venue time — rendering the viewer's zone
  during SSR would be a hydration mismatch. Keep that ordering if you touch
  the component.

Events far enough east land on a different calendar day for the viewer than
the date printed beside them, so the range appends the local date in that case
("3 AM – 8 AM GMT+10 (Aug 24)").

## Admin panel revamp (2026-07-30)

Triggered by feedback that `/admin` felt slow/clunky and the nav was
unfocused. Root cause of the slowness: `src/middleware.ts` and
`src/app/admin/layout.tsx` were **both** calling `supabase.auth.getUser()` —
a live network round-trip to Supabase's Auth server — on every single admin
navigation. Fixed by having middleware forward the already-verified email via
an `x-user-email` request header, read in `layout.tsx` via `headers()`
instead of a second `getUser()` call. Also: dashboard summary cards switched
from fetching full row sets to `count`-only queries (`countEvents` etc. in
`src/lib/data.ts`); added `loading.tsx` skeletons (root + all four list
pages, via `src/components/admin/ListSkeleton.tsx`) so navigation shows
instant feedback; extracted `AdminNav.tsx` (active-state highlighting,
`usePathname`-based, grouped **Content** — Events/Workshops/Team — and
**Pages** — Homepage/Program, with Dashboard standing alone) and
`AdminPageHeader.tsx` (shared eyebrow/title/description/action layout,
replacing duplicated markup across six pages). **Categories was briefly
added to the nav, then explicitly pulled back out** — it's meant to stay
reachable only via the "Manage categories →" link on the Workshops page and
the dashboard card, not as its own top-level tab.

## Cohort application (admin-toggled)

`/admin → Program`: an **Applications are open** toggle + a **Google Form URL**.
Off → the Apply buttons read "2026 Cohort — Coming Soon"; on → "Apply to the 2026
cohort" opens the form. Drives the CTAs on both the homepage hero and `/program`.
Stored in `program_content` (`application_open`, `application_url`).

**The application Google Form itself was built 2026-07-30:**
https://docs.google.com/forms/d/e/1FAIpQLSf6EY8AspgVCwl_pJlU8qvkPa2Gom97Gt5pv12jatSgjuuocg/viewform
— **not yet pasted into** `/admin → Program`'s Application form URL field
(still `#` as of this writing; `application_open` still off). Structure,
built deliberately non-intimidating despite being competitive (~20 spots):
- **About You:** full name*, email*, phone (optional), high school*, grade in
  Fall 2026* (9th–12th), how they heard about YPHA (optional).
- **About You (short answer):** what draws them to public health*, a
  firsthand health/community issue they've noticed*, what they're hoping to
  get out of a year of mentorship*.
- **Your Idea** (intro: *"You don't need a finished plan here — just your
  best current thinking... We just want to see that you've thought about
  it."*) — mirrors `/program`'s `APPLICATION_ASKS` copy, with soft word-count
  guidance appended to each title rather than hard validation: community
  problem (~150 words)*, who it helps and why (~150 words)*, potential
  partners (~75 words, optional — explicitly fine to not know yet), what a
  win looks like by next May (~100 words)*.
- **Anything Else?** one optional open-ended question.
- Built and published via Chrome browser automation (no Google Forms API
  exists as a tool) — if it needs edits, either ask for them again the same
  way or edit directly at the editor URL (ask Max for it; not saved here
  since it requires his Google auth).

---

## How to Join (before the cohort year starts)

Shown as its own step-list ahead of the timeline (`JOIN_STEPS` in
`src/app/program/page.tsx`), since these happen before the cohort itself begins.
No eyebrow; heading is just "How to Join". Current four steps (see "Program
page" section above for the 2026-07-30 change from three steps to four):

- **September 7** — Applications for the 2026 cohort open.
- **Mid-September** — General Info meeting (hybrid): an open Q&A on the application and the year ahead.
- **Early October** — Application deadline.
- **Late October** — Cohort begins with the Welcome meeting (hybrid).

**Welcome meeting naming: TBD.** "Welcome meeting" is a placeholder pending a
rebrand decision. Once a name is picked, update it in both the "How to Join"
late-October step and the October Week 1 timeline entry below.

## Program timeline — Cohort 2026–2027

Cadence: **Week 1 = live meeting**, **Week 3 = async check-in/deadline**. The site
renders **Fall 2026 → Spring 2027 (May)**; Summer is kept here for reference but
hidden on the page. (This timeline is fixed in code, `src/app/program/page.tsx`.)

### Fall 2026
- **October** — W1 (live): Welcome meeting (hybrid); workshop on the December checkpoints + final-proposal expectations; feedback on the application proposal. W3 (async): **Deadline: finalized proposal & schedule;** checkpoints set for December, February, April.
- **November** — W1 (live): **A Stanford professor presents on their research.** W3 (async): **Literature review completed:** research on what others have already done.
- **December** — W1 (live): **A Stanford professor presents on their research.** W3 (async): December checkpoint: asynchronous check-in on progress.

### Winter 2027
- **January** — W1 (live): high schoolers pitch their December-checkpoint progress. W3 (async): progress update: submit revisions based on pitch feedback.
- **February** — W1 (live): 2–3 high schoolers lead a mini-health workshop. W3 (async): **February checkpoint:** check-in on community-partner outreach and data collection.
- **March** — W1 (live): 2–3 high schoolers lead a mini-health workshop. W3 (async): draft outline of the final deliverable: methods and findings so far.

### Spring 2027
- **April** — W1 (live): 2–3 high schoolers lead a mini-health workshop. W3 (async): **April checkpoint:** final project deliverable due ahead of the Symposium.
- **May** — W1 (live, highlighted): **End-of-Year Symposium:** students present their projects as posters, with Stanford faculty, staff, and the wider community there to see the work. Set apart in the rail with a bordered box and a larger marker (see "Symposium highlight" above), not a separate section.

### Summer 2027 — *(hidden on the site)*
- **June / July / August** — W1 (live): Stanford student leads a mini-health workshop.

---

## About Us page (`/about`)

Renamed from `/team` (2026-07-27); `/team` now 308-redirects to `/about`
(`next.config.ts`). Combines the mission statement with the existing team
roster (Directors, Mentors, Student fellows), which is unchanged and still
admin-editable at `/admin/team`.

**Mission statement** is fixed in code (`MISSION` array in
`src/app/about/page.tsx`), the same "stable narrative copy, dev-edited" pattern
as the `/program` timeline. It renders as plain paragraphs, full `shell` width
(no reading-column cap), with no eyebrow on the page header. Canonical text:

> YPHA turns a high schooler's curiosity about public and global health into
> something real: a project that serves their own community, built with the
> guidance of a Stanford mentor over a full year.
>
> We're founded and directed by Stanford undergraduates through the Stanford
> Undergraduate Global Health Club and the Stanford Journal of Public Health,
> with support from the Stanford Center for Innovation in Global Health.
>
> YPHA is an annual, cohort-based accelerator built around four goals: turn a
> student's interest into a sustained project that serves their community;
> build the accountability and momentum a year-long commitment takes;
> strengthen the public health work a community is already doing; and connect
> a student's idea to the Stanford mentors and experts who can help it go
> further.
>
> Every student in the cohort is paired with a Stanford mentor and works
> toward checkpoints they set for the year, with monthly meetings, regular
> check-ins, and mini-grants to help fund the work itself. The year closes at
> our End-of-Year Symposium, where students present what they built to the
> Stanford community and beyond.
>
> Reaching students from under-resourced backgrounds is central to that
> mission: who gets mentorship, and who gets a seat at the table, is itself a
> public health question.

This supersedes the old "Program background" draft (Leadership Summit / 1-on-1
Mentorship / Group Mentorship Labs pillars framing) — that described the
pre-accelerator program structure and is no longer the canonical mission copy.
