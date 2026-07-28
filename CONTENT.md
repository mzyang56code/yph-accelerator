# YPHA — Content Source of Truth

Canonical copy + program facts for the Youth Public Health Accelerator site.
Public copy is admin-editable in Supabase (`site_content` for the homepage,
`program_content` for the program page); built-in defaults live in
`src/lib/data.ts`. Edit here when the story or schedule changes, then reflect it
in `/admin` (or the seed defaults for the fixed timeline).

**Status (2026-07-28):** Live on **ypha.site**. The cohort application is gated
behind an admin toggle (below) — currently **off**, so Apply buttons read
"2026 Cohort — Coming Soon". The `program_content` table migration has been run
in Supabase; the Program admin box works.

**Deploys are currently manual.** Vercel's GitHub auto-deploy-on-push was found
not to be firing (last auto-deploy was 14 days stale) — `git push` alone does
**not** update ypha.site. Ship with `npx vercel --prod` from a repo checkout
with matching `.vercel/project.json` after pushing to `main`. Worth checking
the Vercel dashboard's Project → Settings → Git connection to fix the
underlying integration.

---

## Homepage

- **Hero headline** (CMS): "Accelerating the next generation of public health leaders."
- **Hero lede** (CMS): "We're a Stanford program that pairs high school students with undergraduate mentors to accelerate public health ideas and initiatives within their own communities."
- **Hero CTAs:** primary = *Apply to the 2026 cohort* (or **"2026 Cohort — Coming Soon"** until the application toggle is on) → the Google Form; secondary = *Learn more* → `/program`.
- **Mission title** (CMS): "Every student gets mentorship for a real project."
- **Mission body** (CMS): has drifted from this doc and needs an admin edit — currently still has the pre-cleanup em dashes plus a stray `Timeline: Summer 2026: Recruitment...` fragment appended that looks like a leftover planning note, not intentional copy. Flagged, not fixed here (this doc doesn't have write access to Supabase).
- Sections: featured events · workshop carousel (arrow-paged, Google-Slides first-slide previews) · 5 directors (click a card for the bio popup) · a permanent, compact **Get in touch** contact band.

## Program page (`/program`) — what's shown

Focused on the **cohort mentorship structure**. It intentionally does **not**
show YC framing, the "founded & directed by" founders, the "four ways" pillars,
or the subject-area tags (those are kept as background at the bottom).

- **Hero** (CMS): "From a first spark to a finished project." + intro: *"A year-long, cohort-based mentorship program. Each high schooler is paired with a Stanford mentor and moves through a set schedule of monthly meetings and check-ins, carrying one public-health project from first proposal to finished work."* Apply CTA is inline in the hero (admin-toggled).
- **How to Join** (in code, `JOIN_STEPS` in `src/app/program/page.tsx`): the three pre-cohort steps below, shown between the hero and the timeline. No eyebrow label, just the heading.
- **Timeline** (in code): the cohort year below, now starting **October 2026** (cohort start) through **May 2027** (the Symposium).
- **Symposium highlight** (in code): May's End-of-Year Symposium stays in the monthly rail but is set apart with a bordered/tinted box and a slightly larger marker dot (Cardinal Bright accent) — the site's one deliberately highlighted moment (per `DESIGN.md`'s "single highlighted moment" rule).

## Cohort application (admin-toggled)

`/admin → Program`: an **Applications are open** toggle + a **Google Form URL**.
Off → the Apply buttons read "2026 Cohort — Coming Soon"; on → "Apply to the 2026
cohort" opens the form. Drives the CTAs on both the homepage hero and `/program`.
Stored in `program_content` (`application_open`, `application_url`).

---

## How to Join (before the cohort year starts)

Shown as its own step-list ahead of the timeline (`JOIN_STEPS` in
`src/app/program/page.tsx`), since these happen before the cohort itself begins.
No eyebrow; heading is just "How to Join":

- **Early September** — General Info meeting. Applications for the 2026 cohort open.
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
