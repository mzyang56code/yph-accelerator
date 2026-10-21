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

**Update (2026-09-06): the in-house nomination feature was cut.** A database-backed
nomination form on `/educators` plus a `/admin → Nominations` inbox had been built
but never committed; **on request it was dropped rather than shipped**, and the
`nominations` table was never created in Supabase. Deleted: `NominationForm.tsx`,
`src/app/educators/actions.ts`, `src/app/admin/nominations/`, the `nominations`
schema block, and the nomination helpers in `src/lib/data.ts` and
`src/app/admin/actions.ts`. **The site therefore still has no public write path**
— every table stays read-public, write-authenticated.

In its place, `/educators`'s hero CTA is now a **`MailtoLink` — "Email us a
nomination"** — replacing the ghost "Nominations Open Soon" button and the
`NOMINATION_FORM_URL` constant, which is gone. Nominations arrive as email. The
hero copy now asks for name and year and says a project idea isn't needed.

**The print one-pager was cut in the same pass.** `/educators/flyer` and
`PrintButton.tsx` were built but never shipped (404 in production throughout);
both are deleted, along with the `@media print` block they needed in
`globals.css`. There is no flyer — don't cite one in outreach copy.

A backup of everything removed sits outside the repo, in this session's
scratchpad (`ypha-nominations-backup/`), if any of it is ever wanted back.

**Update (2026-10-20, later still): `/educators` is retired, and the homepage
carries its first press link.**

- **`/educators` is unlinked, not deleted.** The footer's "For Educators" link is
  gone and the route is out of `src/app/sitemap.ts`, so nothing on the site points
  at it. The page itself still responds, deliberately: its whole distribution
  model was teachers and counsellors being handed the URL by email, and those
  links are live in inboxes. A 404 would break them. See "For Educators page"
  below for what this leaves open.
- **Homepage "In the news" line.** One line above the partner logo strip, linking
  the Stanford Global Health piece on the first cohort's kickoff. See "Homepage"
  below.

**Update (2026-10-20, same day, later): the two fall checkpoints swapped dates and
"Discovery" became "Connection".** Nov 29 is now the **Fall Project Plan** and
Dec 23 the **Community Connection Checkpoint**; the Nov 13 lab is renamed
**Community Connection Lab + Faculty Spotlight** to keep the pair matching. Two
ledes had to be reworded because a straight swap made them false, and the fall arc
now runs plan-then-synthesis rather than synthesis-then-plan. Full write-up in
"The checkpoint swap" below. **The Nov 13 `/events` card still says "Discovery"**
and has to be fixed in `/admin → Events`, since event titles are Supabase rows.

**Update (2026-10-20): the Project Design Lab became Science Communication Lab 1
and moved to December 11.** A new `events` row went up in `/admin → Events`:
**Science Communication Lab 1 + Faculty Spotlight, Friday December 11, 2026,
4–5 PM Pacific, Zoom**, with "Hear from Everlyn Kamau, Postdoctoral Researcher at
UC Davis and Affiliate at UCSF" as the summary. `/program` had kept showing
**Dec 13 · Zoom · Project Design Lab**, since that timeline is hardcoded in
`src/app/program/page.tsx` and nothing in `/admin` reaches it, so the two pages
advertised different December sessions on different dates. Confirmed 2026-10-20
as a **rename and move of the same slot**, not an added session: the fall arc has
no separate project-design meeting now, and the event count stays at 17.
`/program` and the event list below are updated to match; the old Project Design
Lab agenda is kept under the new entry, marked superseded.

Three smaller drifts turned up on the same check and were **left alone on
request**: the Kickoff title (`YPHA Cohort Kickoff` on the card versus
`YPHA Kickoff` in code), Everlyn Kamau's affiliation, and the stale "Date change"
badge on the past October 17 row. All three are written up under "Events roster
and the Faculty Spotlight series" below.

**Update (2026-09-26):** The Applicant Info Session time changed from 10 AM to
**11 AM–12 PM Pacific** (same date, September 27). Commit `4865597` updates the
same three hardcoded spots (`JOIN_STEPS` and "Have questions?" in
`src/app/program/page.tsx`, `KEY_DATES` in `src/app/educators/page.tsx`); live and
verified on both pages 2026-09-26. The 2026-09-05 note below is kept for history.

**Update (2026-09-05):** The **Applicant Info Session moved September 20 →
September 27, 10 AM Pacific**, and the copy change is **live** (commit
`cc07691`, deployed 2026-09-05; verified on `/program` and `/educators`).

The date was hardcoded in three places, not read from anywhere shared:
`JOIN_STEPS` and the "Have questions?" paragraph in `src/app/program/page.tsx`,
and `KEY_DATES` in `src/app/educators/page.tsx`. The time sits in the
description line rather than the date label, because the label renders as a
short uppercase mono eyebrow.

**That loose end is closed (verified 2026-10-20).** The `events` row was separate
from the hardcoded copy above: its `date` moved to `2026-09-27` in
`/admin → Events` on 2026-09-01 but its `start_time` stayed empty, so `/events`
and the homepage showed the right date with no time while `/program` and
`/educators` said 11 AM–12 PM Pacific. Someone has since set `11:00`–`12:00` and
renamed the row "General Info Session" → **"YPHA Program Info Session"**; the card
now reads "Sep 27, 2026 · 11 AM – 12 PM PT" and agrees with both pages. Keep the
entry rule in mind for the next event: enter plain `11:00`, since the site stores
wall-clock time, reads it as `America/Los_Angeles`, and converts per viewer (see
"Time zones" below).

**Update (2026-08-26):** The `/program` page timeline was rebuilt from
`~/Downloads/YPHA_2026-2027_Program_Timeline.md` — real dates instead of
"Week 1 / Week 3", named events, the three-phase arc, and per-event detail in
expandable rows. Full detail in "Program timeline — Cohort 2026–2027" below.
A second pass the same day, on request: **the expandable rows were removed
entirely** — per-event agendas and deliverables are program-side detail, not
participant-facing, so the page is now date + format + name + one line per
event (the detail survives in this doc only); **April was restructured** (Impact Lab
removed, its evaluation content folded into the Mar 7 Midyear Progress Review,
Communications & Pitch Lab moved Apr 24 → Apr 4 — see "April restructure"); `Async` labels spelled out then
changed again to just **"Checkpoint"**; all hybrid events labelled
**"Hybrid (Stanford/Zoom)"**; the **AP-exam protected row removed**; the
**expand chevron removed**; "Implementation Checkpoint" and "Impact Checkpoint"
renamed to **"Putting Your Plan into Action"** and **"Evaluating Your Impact"**;
the Apr 18 lede reframed positively; and the fall closing expectation moved into
the Fall Project Plan description.

Two things to know: the **October 4 application deadline is an assumption**
(the source timeline says only "the October application deadline" — confirm
before it goes out), and `/educators` keeps its **own duplicated copy** of the
key dates (`KEY_DATES` in `src/app/educators/page.tsx`), so any date change has
to be made in two files.

**Deploys are automatic again.** Vercel's GitHub auto-deploy-on-push was broken
as of 2026-07-28 (last auto-deploy was 14 days stale), which is why older notes
here said to ship by hand. It was **verified working again on 2026-08-27** — a
push to `main` triggers a production deploy within seconds. `npx vercel --prod`
from a checkout with matching `.vercel/project.json` remains a valid fallback if
a push ever fails to trigger a build.

**The homepage carries one press link (added 2026-10-20).** The eyebrow "In the
news" then a link reading "Stanford Global Health on our first cohort's kickoff
↗". `PRESS` in `src/app/page.tsx`, dev-edited, the same fixed-in-code pattern as
`PARTNERS`. Three notes for whoever touches it:

- **It sits directly above the Events heading**, inside that section's `border-y`
  band and left-aligned to the heading beneath it. It was first shipped centred
  above the partner logo strip at the foot of the page, then **moved up on request
  the same day**. If it moves again, the alignment has to move with it: the
  partner-strip version was centred because that whole card is.
- **The CIGH logo stays unlinked** on purpose. A partner logo should point at the
  partner, not at a news story, so the article gets its own line instead.
- **Keep the trailing slash** on the URL
  (`…/accelerating-youth-engagement-in-public-health.html/`). The bare `.html`
  form 301-redirects to it, so dropping the slash costs a hop.

The article is bylined by Catherine Wu and quotes Max Yang. **One claim in it sits
awkwardly beside the site**, which matters more now that the homepage links to it:
the piece says the cohort is **20 Bay Area teams plus 5 from elsewhere in the
US**, while the nav, hero, and mission all frame YPHA as a Bay Area program. The
stat tiles themselves are fine: live values on 2026-10-20 are **70 / Youth public
health leaders mentored, 3 / Mentorship Labs this summer, 20 / Schools across the
Bay Area, 1 / Youth Public Health Symposium**, and that "20" lines up with the
article's 20 Bay Area teams. So the thing to reconcile is the **Bay Area framing**,
not a number.

**A caution this episode earned:** the stats in `seedSiteContent`
(`src/lib/data.ts`) read "48 / Students mentored this cohort", and that seed was
briefly mistaken for the live value when the discrepancy above was first written
up. The seed is only the no-Supabase fallback. Check `/admin/home` or the live
page before quoting any homepage stat, exactly as the CMS note below says.

If more press arrives, `PRESS` becomes an array and the line becomes a list.

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
  maintain. **A third state was added 2026-10-05** for when a cycle ends; see
  "Cohort application" below for all three and for the card's width rule.
- **How to Join** (in code, `JOIN_STEPS` in `src/app/program/page.tsx`): four
  pre-cohort steps, on real dates as of 2026-08-26 — **September 7**:
  applications open; **September 27**: Applicant Info Session (optional, Zoom,
  11 AM–12 PM Pacific), open Q&A on the application and the year ahead; **October 4**: application
  deadline (assumed, see the status note above); **October 17**: the cohort
  year begins at the YPHA Kickoff (hybrid) from 2 to 5 PM Pacific.
- **"What we'll ask for" + "Have questions?" added below the timeline steps**
  (2026-07-30, `APPLICATION_ASKS` in the same file): a two-column band listing
  what the application asks for — a general proposal centered on a real
  community problem, the community partners you'd work with, and what you're
  hoping to get out of a year of mentorship — paired with a "Have questions?"
  block pointing to the mid-September info meeting and a **Get in touch**
  mailto button (same `MailtoLink` component/style as the homepage contact band).
- **Timeline** (in code): the cohort year below, **October 17, 2026** (YPHA
  Kickoff) through **May 23–26, 2027** (Final Reflection). Rebuilt 2026-08-26 —
  see "Program timeline" below for the structure and the copy rules.
- **Symposium highlight** (in code): May's Annual Symposium & Showcase stays in
  the monthly rail but is set apart with a bordered/tinted box and a slightly
  larger marker dot (Cardinal Bright accent) — the site's one deliberately
  highlighted moment (per `DESIGN.md`'s "single highlighted moment" rule).
  **Deliberately still the only highlighted event**, even though the January
  Project Feedback Workshop is also a "major in-person event" in the source
  timeline — since 2026-08-26 both carry the same `Hybrid (Stanford/Zoom)`
  format label, so the symposium's bordered box is now the *only* thing setting
  it apart. That is intentional; do not add a second emphasis treatment.

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

## For Educators page (`/educators`, added 2026-07-30, retired 2026-10-20)

**Retired 2026-10-20: unlinked, not deleted.** On request. The footer link and
the sitemap entry are gone; `src/app/educators/page.tsx` stays in the repo and the
URL still serves the page, because the audience was mailed that URL directly and a
404 would break links already sent. Everything below describes the page as it
still exists at that URL.

Three things this leaves open:

- **The page is unlinked, not unindexed.** Dropping it from the sitemap stops it
  being *submitted*; it does not remove what search engines already have. If it
  should also stop appearing in results, add `robots: { index: false }` to its
  `metadata` export. That was not done, since "unlink" was the instruction.
- **Nothing explains the nomination channel now.** Nominations arrive as email and
  this page was the only place that said so, so a teacher who did not keep the
  link has no public route in. The footer "Email us" `MailtoLink` is the fallback,
  and it says nothing about nominations.
- **`KEY_DATES` is still duplicated here** and still carries the stale October 17
  "Date change" flag (see "Three smaller drifts"). An unlinked page is easy to
  forget on the next date change, and it is still reachable by anyone holding the
  link, so it can go stale in public.


A page for teachers/counselors to nominate a student, built code-fixed (like
`/about`) rather than CMS-driven. **Not in the main nav** — deliberately
dropped after the fact (see below); reachable only via the footer's Explore
column and direct link-sharing by email, since the audience finds this page by
being handed the link, not by browsing the site.

- **Hero is the whole point:** unlike other interior pages, the hero itself
  *is* the nomination CTA — headline "Nominate a student for the 2026
  cohort," subhead, and the CTA button inline. Since 2026-09-06 that button is
  a **`MailtoLink`, "Email us a nomination"** (see the status note above): the
  earlier ghost "Nominations Open Soon" state and its `NOMINATION_FORM_URL`
  constant are gone, as is the database-backed form that briefly replaced
  them. Earlier drafts had a separate mid-page
  "Nominate a Student" CTA band and a full "Other ways to help" section
  (share the page / invite a workshop) — both removed so the page has one
  job, per explicit feedback that a second full section diluted the ask.
- **Sections:** Hero (nomination CTA) → "Why nominate them" (4 reasons,
  editorial rows) → Key dates → "Have questions?" with a `MailtoLink`
  Get-in-touch button.
- **Key dates are duplicated, not imported.** `KEY_DATES` in
  `src/app/educators/page.tsx` is its own array, hand-kept in sync with
  `/program`'s `JOIN_STEPS`. Updated 2026-08-26 to the four real dates
  (September 7 / September 27 / October 4 / October 17) — it previously had
  three and still said "Mid-September" and "Early October". **Any date change
  has to be made in both files.** Worth extracting to a shared constant next
  time either one is touched.
- **Nav history:** briefly added to `SiteNav.tsx`'s main nav (first next to
  "Join our 2026 Cohort"), then removed — the primary nav's job is walking
  students/parents down the belief ladder toward applying, and a low-traffic
  educator link competed with that. Now lives only in `SiteFooter.tsx`'s
  Explore column.
- **Nomination intake is email, by decision.** There is no nomination Google
  Form and no in-house form; one of each was explored and both were dropped
  (2026-09-06). If intake ever outgrows the inbox, the draft field list is:
  student name/grade/school, student and/or parent email, nominator
  name/role/email, relationship to student, why they'd be a good fit, optional
  notes. A Google Form is the cheaper of the two revivals — the in-house route
  needs a `nominations` table with inverted RLS, since a nomination names a
  minor.

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

## Events roster and the Faculty Spotlight series (checked 2026-10-20)

`/events` is CMS content. The rows live in `public.events` and are edited in
`/admin → Events`, so treat this as "last known good" and re-check the live page
before quoting it. Read off `ypha.site/events` on 2026-10-20.

**Upcoming**

| Date | Time (PT) | Title | Spotlight guest |
|---|---|---|---|
| Fri Nov 13, 2026 | 3:30–4:30 PM | Community Discovery Lab + Faculty Spotlight | Joseph Becker, Associate Professor of Emergency Medicine at Stanford (`med.stanford.edu/profiles/joseph-becker`) |
| Fri Dec 11, 2026 | 4–5 PM | Science Communication Lab 1 + Faculty Spotlight | Everlyn Kamau (`profiles.ucsf.edu/everlyn.kamau`) |

Both are Zoom, tag `Workshop`, `featured: true`, blank `host`, no `register_url`,
and both put the guest's name in `summary` ("Hear from …") and the profile link
in `details` ("Learn more about Dr. X's work here: …"). That is the house pattern
for a Faculty Spotlight row; follow it for the next one.

**The Nov 13 card title is stale as of 2026-10-20.** `/program` now says
**Community *Connection* Lab + Faculty Spotlight**; the card above still says
*Discovery*. Event titles are Supabase rows, so this one has to be fixed in
`/admin → Events` and cannot be shipped from the repo. Until it is, the two pages
disagree on that title.

**Past** (newest first): YPHA Cohort Kickoff (Oct 17, 2–5 PM, Stanford Medical
School) · YPHA Program Info Session (Sep 27, 11 AM–12 PM, Zoom) · August
Mentorship Lab (Aug 23, 2–3 PM, Zoom, has a `register_url` Google Form) · July
Mentorship Lab (Jul 26, Zoom, no time) · June Mentorship Lab (Jun 27, Zoom, no
time, host "Mentors", tag `Community`) · Stanford Youth Public Health Summit
(Apr 19, Alway – Stanford Medical School, tag `Symposium`, hosts listed as
"Mentors: Max Yang, Catherine Wu, Taisho Shiono, Anya Vedantambe, Kate Quach").

Two of the past rows still carry **seed `id`s that no longer match their titles**
(`community-clinic-day` is the June Mentorship Lab, `fall-info-session` is the
April Summit), because they were edited in place over the demo content in
`seedEvents`. The `id` is not shown anywhere public, so this is cosmetic, but it
makes the rows confusing to match up in Supabase.

### The December rename (resolved 2026-10-20)

`/events` and `/program` disagreed about December for about a week, and
`/program` was the stale one:

- `/events` (CMS): **Dec 11, Science Communication Lab 1 + Faculty Spotlight**.
- `/program` (hardcoded, `src/app/program/page.tsx`): **Dec 13, Project Design
  Lab**, "Turn your research and your conversations into a project you can
  finish by May." Same entry in the 17-event list under "Program timeline —
  Cohort 2026–2027" in this doc.

This is not a date slip alone. Dec 13, 2026 is a **Sunday** and Dec 11 is a
**Friday**, which is the same weekday correction the Community Connection Lab got
when it moved Nov 9 → Nov 13. But the titles also describe different sessions:
project design versus science communication, and the latter is the theme the
timeline assigns to **Apr 4, Communications & Pitch Lab**. "Lab **1**" implies a
numbered series that the documented timeline does not contain.

Three readings were possible: a rename and move of the same slot, a new session
added beside a surviving Project Design Lab, or a cancellation with the design
work folded into a checkpoint. **Confirmed as the first**, 2026-10-20. December
keeps one live meeting and one checkpoint, the way every other month does, and
the fall arc now has no meeting dedicated to project design. If that turns out to
be a problem, the two fall checkpoints (Nov 29 and Dec 23) are where the design
work has to land.

The fix went into **three files**: the `timeline` array in
`src/app/program/page.tsx`, the 17-event list in this doc, and the upstream
source `~/Downloads/YPHA_2026-2027_Program_Timeline.md` (which carries its own
revision note). `/educators`'s `KEY_DATES` stops at October 17, so it was not
affected. The new `/program` lede reads "A researcher shares their work, then we
start on how to explain your own project to the people it is for," built to
parallel the November Faculty Spotlight row. **It was written here, not supplied
by the program**, so replace it if the session's actual framing differs.

### The checkpoint swap (2026-10-20)

On request, the two fall checkpoints traded dates and the "Discovery" naming
became "Connection" across the lab and its checkpoint:

| Date | Was | Now |
|---|---|---|
| Nov 13 (live) | Community Discovery Lab + Faculty Spotlight | Community **Connection** Lab + Faculty Spotlight |
| Nov 29 (checkpoint) | Community Discovery Checkpoint | **Fall Project Plan** |
| Dec 23 (checkpoint) | Fall Project Plan | **Community Connection Checkpoint** |

The *Finish with:* lists travelled with their events, not with their dates, so
Nov 29 now asks for the finalized proposal and Dec 23 for the research synthesis.

**Two ledes had to change, because a straight swap made them false.** Flagging
this because it was not part of the request:

- The Fall Project Plan read "Lock the plan before implementation starts. By the
  end of fall you should have either a confirmed community partner, or an active
  relationship with an organization and a plan to keep it going." Nov 29 is no
  longer the last fall item, so the second sentence moved to Dec 23, where "the
  end of fall" is still true. Nov 29 keeps the first sentence alone.
- The community checkpoint read "Put the reading and the conversations together,
  before you design anything." On Dec 23 that clause is false twice over: the
  Science Communication Lab already happened on Dec 11 and the plan was already
  locked on Nov 29. The clause is gone and the partner expectation took its place.

**The arc now runs plan-then-synthesis.** Students lock a project plan on Nov 29
and hand in the community research that was meant to inform it on Dec 23. The old
order was discovery, then synthesis, then design, then plan. Whether that reads
as intended is a program question, so it is recorded rather than argued with, but
it is the reason the two ledes could not simply be swapped.

Also worth knowing: the Nov 13 lab's outreach window used to run two and a half
weeks, to the Nov 29 checkpoint. It now runs about five and a half weeks, to
Dec 23.

### Three smaller drifts

- **Kickoff title.** The event row is **"YPHA Cohort Kickoff"**; `/program` and
  `/educators` both say **"YPHA Kickoff"** (commit `1257dc2` renamed it from
  "Launch Lab"). Pick one and use it in all three places.
- **Everlyn Kamau's affiliation looks wrong.** The card says "Postdoctoral
  Researcher at **UC Davis** and Affiliate at **UCSF**." Her UCSF Profiles page,
  the one the row's own `details` link points at, says **"Everlyn Kamau, PhD —
  Postdoctoral Scholar, Office of the CEO,"** school Chancellor/EVC/FAS, with a
  San Francisco address; her Google Scholar profile lists UCSF with a verified
  `ucsf.edu` address. A search turned up no UC Davis appointment. A likely
  origin of the error: UCSF Profiles is a UC Health-wide search, so every page
  carries a nav list reading "UC Davis / UCI / UCLA / UCSD / UCSF" and
  "UC Davis People". **Confirm with her before the next mailing**, since this is
  a public claim about a named person, then fix `summary` in `/admin → Events`.
  Checked 2026-10-20; nothing was changed.
- **The Kickoff's "Date change" badge is now on a past event.** `JOIN_STEPS` in
  `src/app/program/page.tsx` and `KEY_DATES` in `src/app/educators/page.tsx` both
  still carry `flag: "Date change"` on October 17 (added in commit `06feece`).
  The event happened on 2026-10-17, so the badge no longer warns anyone about
  anything. Drop it from both arrays on the next pass. For contrast, the
  Community Connection Lab's Nov 9 → Nov 13 move was deliberately shipped without
  a flag (commit `2a6a8c0`), so the badge is not a standing convention.

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

## Workshop categories

Categories are **admin-editable data**, not code — they live in the
`workshop_categories` table and are edited at `/admin → Workshops → Manage
categories`. The seed list in `src/lib/data.ts` (Epidemiology, Biostatistics,
Health equity, Global health, Research skills, Policy) is **fallback content
only**; it appears when Supabase isn't configured and does not describe the
live site.

Live categories as of 2026-09-05:

- **Content Workshops** — Food Safety, Mental Health, Intro to Epidemiology,
  Intro to Health Journalism, Intro to mapathons
- **Lessons** — Cold Emailing, How to Write a Letter to the Editor, How to spend
  your Public Health Summer, SCOPE (how to get started in public health)

**Pending: rename "Lessons" → "Skills Workshop".** Requested 2026-08-31, not yet
done — it needs a signed-in admin, since RLS makes the anon key read-only.
Rename it in `/admin → Workshops → Manage categories`; `saveWorkshopCategory`
re-labels every workshop carrying the old name in the same action
(`src/app/admin/actions.ts`), so nothing falls out of its filter. Note the
sibling category is plural, so **Skills Workshops** may read better in the
filter row; confirm the wording before making the change.

A category label is the join key: `workshops.category` stores the label as text
rather than a foreign key. That is why renaming has to cascade, and why the
rename must be done in the admin rather than by editing one row by hand.

## Cohort application (admin-toggled)

`/admin → Program`: an **Applications are open** toggle + a **Google Form URL**.
Those two fields together pick one of three CTA states, on both the homepage hero
and `/program`'s countdown card. Stored in `program_content` (`application_open`,
`application_url`).

| Toggle | URL | Heading | Button |
|---|---|---|---|
| on | set | "Applications Are Open." | "Apply to the 2026 cohort" → URL |
| off | set | "Applications Are Closed" (no period) | "Join our email list" → URL |
| off | `#` / empty | "Applications Open in _n_ days" | inert "2026 Cohort — Coming Soon" |

**The closed state has been live since 2026-10-05**, when the toggle was switched
off and the email-list URL pasted in. The stored URL carries Google's `?usp=dialog`
suffix, which is harmless — it is the responder link, not an edit link.

**Card width is measured, not guessed.** The heading is `whitespace-nowrap`, so the
card has to be wide enough for the longest state: "2026 Cohort Applications Are
Closed" is 343px at `text-xl` (Libre Franklin 700, `-0.025em` tracking), i.e. a
407px card with `p-8`. Its wrapper is `max-w-md` (448px) for that reason — it was
`max-w-sm` (384px) until 2026-10-06, which is what made the heading run past the
padding. Below the `sm` breakpoint no phone fits 407px, so the heading steps down
to `text-base` (275px of text, a 323px card with `px-6`) to stay on one line.
**Before lengthening any of the three headings, re-measure.** The subcopy under the
closed heading ("We'll email you when the next cohort opens.") was removed the same
day — it restated the button.

The closed row is why the URL field is not strictly an *application* URL: once a
cycle ends, the same field holds the **email-list** form, so the closed state has
somewhere to send people instead of a dead "Coming Soon". Clearing the URL is what
resets the card to the pre-cycle countdown, whose `APPLICATION_OPEN_DATE` lives in
`src/components/ProgramCountdown.tsx` and is **still 2026-09-07** — a dev has to
bump it to the 2027 open date before that third state is used again.

**The email-list form** (shown while applications are closed):
https://docs.google.com/forms/d/e/1FAIpQLScdXNuS_y4bwfKmGhmV270gO8FbdjcPmNRTiyp0kBlt1MlpuQ/viewform

**The application Google Form itself was built 2026-07-30:**
https://docs.google.com/forms/d/e/1FAIpQLSf6EY8AspgVCwl_pJlU8qvkPa2Gom97Gt5pv12jatSgjuuocg/viewform
— it ran for the 2026 cycle and **closed to responses by 2026-10-05**, so it must
not be left in the URL field: a visitor following it lands on "no longer accepting
responses". Structure,
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
No eyebrow; heading is just "How to Join". Four steps, real dates as of
2026-08-26:

- **September 7** — Applications for the 2026 cohort open.
- **September 27** — Applicant Info Session on Zoom from 11 AM to 12 PM Pacific, optional. An open Q&A on the application and the year ahead.
- **October 4** — Application deadline.
- **October 17** — The cohort year begins at the YPHA Kickoff (hybrid) from 2 to 5 PM Pacific.

**October 4 is an assumption, not a given date.** The source timeline states
only "the October application deadline." October 4 was chosen to sit two weeks
after the info session and two weeks before the YPHA Kickoff, leaving time to read
applications and match mentors. Confirm it before it goes out to educators.

**Welcome meeting naming: resolved.** The old placeholder "Welcome meeting" is
now the **YPHA Kickoff** (renamed from "YPHA Launch Lab" on 2026-10-01; October 17, 2 to 5 PM Pacific). The
"Have questions?" block on `/program` also moved from "mid-September" to
the info-session date.

**These dates exist in two places.** `/educators` has its own `KEY_DATES` array
(`src/app/educators/page.tsx`) with the same four steps — it is *not* imported
from `/program`. Change both, or the pages disagree.

## Program timeline — Cohort 2026–2027

Rebuilt 2026-08-26 from `~/Downloads/YPHA_2026-2027_Program_Timeline.md`, which
is the upstream source for everything in this section. Fixed in code (`TIMELINE`
in `src/app/program/page.tsx`), not CMS-editable.

**What changed from the old version.** The page used to show a
"Week 1 = live meeting / Week 3 = async check-in" cadence with vague entries
("A Stanford professor presents on their research"). Both the week language and
the legend's "first week / third week" labels are **gone** — every entry now
carries a real date and a real event name. The hidden Summer 2027 rows are gone
too; the source timeline ends in May.

**Section heading + intro** (in code, above the phases). Reworded 2026-10-06:

> ## What a year in the cohort looks like
>
> Cohort 2026–2027 will take place in three phases. Every month has one live
> meeting and one checkpoint between meetings. Your mentor and your community
> partner are part of the work the whole way through.

The heading takes **no trailing period** and sits on **one line from the `sm`
breakpoint up**. It had been capped at `max-w-[16ch]`, which broke 36 characters
over three lines; that cap is gone. It measures 573px at `text-4xl` against 592px
of usable width at `sm`, so the fit is real but has only ~19px of slack —
re-measure before rewording it longer. A 375px phone has ~327px usable, which no
readable size fits, so below `sm` it wraps to two lines by design.

**Structure.** Three phases, one per season, each with a name and a blurb in the
sticky left rail:

- **Fall 2026 — Discover & Co-Design.** Understand the problem, read what's already known, talk to the people closest to it, and build a plan you can run.
- **Winter 2027 — Implement & Iterate.** Start building, hit the obstacles, get help from mentors and peers, and adjust the project to fit what you're seeing.
- **Spring 2027 — Evaluate & Communicate.** Finish the work, figure out what changed because of it, and tell the story to a room that wants to hear it.

**Rhythm** (stated in the timeline section intro): one live meeting a month, one
async checkpoint between meetings, with mentor and community-partner work
running the whole way through. **May** is the one month that breaks it, with
three events (readiness check, symposium, reflection).

### April restructure (2026-08-26)

The source timeline had three April events — Apr 4 Impact Lab, Apr 18 Final
Implementation Checkpoint, Apr 24 Communications & Pitch Lab. **The Impact Lab
was removed** and its evaluation teaching folded into the **March 7 Midyear
Progress Review**; the Communications & Pitch Lab **moved from Apr 24 to Apr 4**.
April now has one live meeting and one checkpoint, matching every other month.

Why this is better than the source ordering: the Impact Lab taught "what counts
as evidence of impact" on April 4, by which point data collection was nearly
over — students learned what to measure after the window to measure it had
closed. At March 7 they hear it with six weeks of implementation left, so the
Mar 21 **Evaluating Your Impact** checkpoint immediately puts it to work. Teach
it, then do it.

Two costs to keep an eye on:
- **Mar 7 is now a double session** (10 detail bullets), carrying both the
  on-track review and the evaluation workshop. If it proves too full in
  practice, the split to make is a separate late-March live session, not moving
  the evaluation content back to April.
- **Apr 4 → May 16 is a six-week gap with no live meeting**, only the Apr 18 and
  May 2 checkpoints — and that stretch is exactly when students are building
  posters. The source timeline had a live session on Apr 24, three weeks out
  from the symposium. Consider optional mentor office hours in early May.

**The page shows four things per event and nothing else:** the date, the format
label, the event name, and a one-line description. **Removed 2026-08-26:** the
expandable rows that held each event's agenda and deliverables. Per-event
agendas and student deliverables are **program-side detail, not
participant-facing** — they are preserved below as internal reference, and must
not be put back on the page without a decision to reverse this.

**Event kinds** — the `kind` field on each event drives the marker. Two kinds:
- `live` — synchronous meeting. Filled dot. Legend: "Live meeting".
- `async` — a checkpoint you submit. Hollow ring dot. Labelled **"Checkpoint"**
  next to the date, matching the legend.

**Format labels** are the text after the `·` on each row: `Hybrid (Stanford/Zoom)`,
`Zoom`, or `Checkpoint`. All three hybrid events (Oct 17, Jan 21, May 16) use the
same `Hybrid (Stanford/Zoom)` label — Jan 21 and May 16 previously read
"In person / hybrid", but the venue-explicit label says more and keeps the three
consistent.

**A third `pause` kind was removed 2026-08-26** along with the AP-exam row it
existed for (see below). If a marker-less, non-expandable row is ever wanted
again, it was: no dot, no expansion, absent from the legend.

**Nothing on the timeline is interactive.** The rows were built on native
`<details>`/`<summary>` with a rotating chevron; the chevron was removed first,
then the whole expand mechanism, both on 2026-08-26. `EventRow` is now a plain
editorial row. The intro sentence "Open any date to see what happens and what
you'll walk away with" was removed with it.

**The 17 events.** `Format` is the label shown next to the date.

> **Reading this list:** the **bold event name** and the sentence after it are
> what a visitor sees. Everything introduced by *Finish with:*, and the agenda
> detail in the longer entries, is **internal program design, not on the site.**
> It is kept here because it is the actual plan for each session.
>
> **Upstream source:** `~/Downloads/YPHA_2026-2027_Program_Timeline.md`, a loose
> file outside the repo. It was **updated 2026-08-26 to match what shipped** (the
> April restructure, both renames, the October 4 deadline, and the removal of the
> AP-exam period), and it carries a revision note at the top recording what
> changed and why. It was **revised again 2026-10-20** for the December rename,
> with a second note recording that change and the three things it leaves open.
> The two documents agree as of that date; the timeline file holds the full
> per-session detail (Purpose / Workshop topics / Student output), this file
> holds what the site does with it. Worth copying that file into the
> repo so it stops living in a Downloads folder. (Was 19 —
the **May 3–14 "AP exams — protected" row was removed 2026-08-26** on request.
It said nothing new is assigned during AP exams and mentors stay available. The
May 2 Showcase Readiness Check still refers to the exams in its lede, "Get the
project presentation-ready before AP exams start," which was left in place
deliberately: it explains *why* that deadline sits where it does.)

### Fall 2026 — Discover & Co-Design
- **Oct 17 · Hybrid (Stanford/Zoom) · 2–5 PM Pacific · live** — **YPHA Kickoff.** Meet your mentor and the cohort; walk the year's checkpoints; feedback on your application proposal (a starting point, meant to change); sharpen problem/community/who-to-talk-to; see the year's path (problem → evidence → community input → design → implementation → evaluation → communication). *Finish with:* sharper problem statement, target community, first list of partners to contact.
- **Oct 28 · Checkpoint** — **Background Research Checkpoint.** *Finish with:* background review with 5–10 sources, what's already known, what others have tried, the questions reading can't answer, 2–3 possible partners.
- **Nov 13 · Zoom · 3:30–4:30 PM Pacific · live** — **Community Connection Lab + Faculty Spotlight.** (Moved 2026-10-14 from Nov 9, no time set; deliberately no "Date change" flag, unlike the Kickoff. Nov 13 is a Friday. Renamed 2026-10-20 from "Community Discovery Lab + Faculty Spotlight", so the lab keeps matching its checkpoint. **The `/events` card still reads "Discovery"** — that title is a Supabase row, not code, so fix it in `/admin → Events`. The card also names the guest: **Joseph Becker, Associate Professor of Emergency Medicine at Stanford**.) Faculty/practitioner presents; methods vs. community needs; how to approach a partner; agreeing-with-your-idea vs. listening; workshop outreach emails and interview questions. *Finish with:* specific people to contact, and the time to do it. **That window changed 2026-10-20**: the community synthesis moved to Dec 23, so the run is now about five and a half weeks rather than the two and a half it had to the old Nov 29 checkpoint.
- **Nov 29 · Checkpoint** — **Fall Project Plan.** (Swapped with the Dec 23 checkpoint on 2026-10-20, see "The checkpoint swap" below.) Its lede dropped the fall closing expectation in the swap, since Nov 29 is no longer the last fall item; that expectation moved to Dec 23 with the community checkpoint. *Finish with:* finalized proposal and timeline, the three milestones, partner role, evaluation measures, January first steps, anything still blocked.
- **Dec 11 · Zoom · 4–5 PM Pacific · live** — **Science Communication Lab 1 + Faculty Spotlight.** (Renamed and moved 2026-10-20 from "Project Design Lab", Dec 13. Dec 13 is a Sunday and Dec 11 is a Friday, the same weekday correction the Community Connection Lab got; deliberately no "Date change" flag, matching that move. The `/events` card names the guest: **Everlyn Kamau**, with the affiliation caveat under "Three smaller drifts" above. "Lab **1**" implies a numbered series that the rest of this timeline does not contain, so ask where Lab 2 goes before publishing a second one. See "The December rename" above.) Faculty/practitioner presents; then explaining your own project to the people it is for. *— Superseded agenda, kept for reference:* the Project Design Lab taught objective; feasible activities; partner role; target population and implementation plan; December/February/April milestones; what counts as success; ethical, logistical, feasibility problems, finishing with a near-final design ready for mentor and partner feedback. **That teaching no longer has a session of its own**; the workshop topics for the science-communication version have not been written down yet.
- **Dec 23 · Checkpoint** — **Community Connection Checkpoint.** (Swapped with the Nov 29 checkpoint and renamed from "Community Discovery Checkpoint" on 2026-10-20, see "The checkpoint swap" below.) Its lede lost "before you design anything", which the swap made false, and gained the fall closing expectation the Fall Project Plan used to carry (moved 2026-08-26 out of the phase-level `close` field, which was deleted): by the end of fall, either a confirmed community partner or an active relationship with an organization plus a plan to keep it going. Dec 23 is still the end of fall, so that clause stayed true where "before you design anything" did not. *Finish with:* research synthesis, evidence you reached partners (1–2 substantive conversations is the goal, partner timelines vary), community-named priorities, what you assumed vs. what changed, revised direction and partner role.

### Winter 2027 — Implement & Iterate
- **Jan 21 · Hybrid (Stanford/Zoom) · live** — **YPHA Project Feedback Workshop.** Short update (problem, what you tried, what happened, what you learned, biggest obstacle, help needed); faculty/mentors suggest fixes and make connections; scope narrowing; methods problems surfaced early; themed breakouts. *Finish with:* 1–3 next steps. **Framed as troubleshooting, not a review board** — the copy says "Nobody is grading you here, so bring the problems."
- **Jan 31 · Checkpoint** — **Putting Your Plan into Action.** (Renamed 2026-08-26 from "Implementation Checkpoint", which read as vague.) *Finish with:* feedback received and what changed, evidence of progress, February priorities, current blockers.
- **Feb 7 · Zoom · live** — **Implementation Lab.** Troubleshooting; partner engagement, recruitment, logistics, data collection; mentor and peer support; plan adjustments; sometimes a fellow-led mini-health workshop. *(No outputs list.)*
- **Feb 21 · Checkpoint** — **Pilot Checkpoint.** *Finish with:* what's implemented or tested, partner outreach status, people reached or data collected, early results, what's working and what isn't, proposed pivots.
- **Mar 7 · Zoom · live** — **Midyear Progress Review.** **Now a double session** (restructured 2026-08-26, see "April restructure" above): the on-track review *plus* the evaluation teaching that used to be April's Impact Lab. Progress against December milestones; early findings and partner feedback; remaining barriers; narrow/grow/turn; activities vs. outputs vs. outcomes; what counts as evidence; is it reaching the intended community; reading qual and quant feedback; conclusions the evidence supports and where the limits are; sometimes a fellow-led mini-workshop. *Finish with:* March–April priorities, agreed pivots, a plan for the evidence still to collect and the weeks to collect it in, updated path to done.
- **Mar 21 · Checkpoint** — **Evaluating Your Impact.** (Renamed 2026-08-26 from "Impact Checkpoint".) *Finish with:* draft outline of the final deliverable, what's completed and found, evidence you have, evidence you still need, April tasks.

### Spring 2027 — Evaluate & Communicate
- **Apr 4 · Zoom · live** — **Communications & Pitch Lab.** Presentation structure (problem, community need, approach, methods, findings, limitations, next steps); poster and slide design; explaining technical work; impact without overstatement. Most of the session is practice: groups of 3–4, a 3–5 minute pitch each, structured feedback, then a second run. *(No outputs list.)* **Moved from April 24.**
- **Apr 18 · Checkpoint** — **Final Implementation Checkpoint.** Lede is "The building is done. Now you find out what it added up to." — rewritten 2026-08-26 from "Confirm you're ready to stop building and start analyzing," which read as procedural. *Finish with:* core implementation substantially complete, current results, remaining analysis, remaining partner follow-up, deliverable status.
- **May 2 · Checkpoint** — **Showcase Readiness Check.** *Finish with:* final or near-final poster and slides, final results, draft pitch, remaining questions, symposium logistics confirmed.
- **May 16 · Hybrid (Stanford/Zoom) · live · HIGHLIGHTED** — **YPHA Annual Symposium & Showcase.** Poster presentations and short talks; Stanford faculty, staff, and mentors; community partners, family, peers. Copy states plainly: "There is no ranking and no prize."
- **May 23–26 · Checkpoint** — **Final Reflection.** Uses a custom `outputsLabel`, "What you'll think through" (not "You'll finish with"), since these are reflection questions rather than deliverables: what changed and what didn't work as expected, what you learned from your partner, what you'd do differently, what happens to the project next and any handoff plan, whether you want to stay on as an alum or mentor.

**Not put on the page:** the source doc's "Stanford timing" line for each event
(e.g. "Autumn Week 4", "Post-finals") — a Bay Area high schooler has no use for
Stanford quarter weeks — and the "Major Program Milestones" summary table, which
would restate the rail and add a second emphasis system competing with the
symposium highlight.

### Copy voice for the timeline

The source doc is written for program staff ("Student output", "Students should
not receive new substantive deliverables"). Everything that reached the page is
rewritten in the site's second-person voice. Since the 2026-08-26 cut, that is
just the 17 one-line event descriptions — but hold the same voice if any of the
deeper detail is ever surfaced again (it was phrased "You'll finish with…",
not "Student output"). Two constraints applied to this copy and worth
keeping on any future edit:

- **No em dashes in running prose** (short labels are fine). See "Copy conventions" at the end of this doc.
- **No negative parallelisms.** "It's troubleshooting, not a review board" and
  "not a competition or a ranking" were both rewritten to state the positive
  directly: "Nobody is grading you here, so bring the problems" and "There is no
  ranking and no prize."

Also scrubbed on the 2026-08-26 pass, per the same checklist: seven uses of
"actually", plus "genuinely", "concrete", "surfaced", and trailing "-ing"
tack-ons. Word repetition was cut rather than synonym-swapped, since elegant
variation is itself a tell.

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

---

## Copy conventions

Applies to all user-facing prose on this site, not just the program timeline.

**Avoid the hallmarks of AI writing** (from Wikipedia's "Signs of AI writing"
essay). The ones that keep showing up in drafts for this project:

- **Em dashes in running prose.** Fine in short labels and buttons; not inside sentences. Use a period, a comma, or a colon.
- **Negative parallelisms** — "not only… but", "it's not just… it's", "X, not Y", "rather than". State the positive directly. "There is no ranking and no prize" beats "not a competition or a ranking".
- **Overused vocabulary:** align with, crucial, delve, emphasizing, enhance, fostering, highlight, interplay, intricate, key, landscape, meticulous, pivotal, robust, showcase, tapestry, testament, underscore, valuable, vibrant.
- **Puffery:** boasts a, rich, profound, exemplifies, commitment to, nestled, in the heart of, groundbreaking, renowned, diverse array.
- **Copula avoidance** — don't dodge plain "is/are" with serves as, stands as, represents, features, offers.
- **Undue-significance framing:** marks a pivotal moment, plays a crucial role, sets the stage for.
- **Trailing "-ing" tack-ons:** sentences padded with highlighting, underscoring, reflecting, fostering, ensuring.
- **Filler intensifiers.** Watch "actually", "really", "genuinely", "concrete", "real" — a draft with seven "actually"s reads as generated even though each one is individually harmless.
- **Elegant variation.** Repeat a word the way a person would rather than reaching for a synonym to avoid it. The mini-health workshop line appears verbatim in February, March, and April on `/program`; that repetition is correct, because the source doc repeats it.
- **Excessive rule-of-three lists** and mechanical bold "key takeaway" formatting.

Prefer plain, concrete, specific language. State facts directly instead of
wrapping them in importance-signaling framing.
