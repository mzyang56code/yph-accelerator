---
name: Stanford Youth Public Health Accelerator
description: Warm, credible recruitment site for a YC-style high-school public-health accelerator.
colors:
  cardinal: "#8c1515"
  cardinal-dark: "#560c0c"
  cardinal-bright: "#b1040e"
  paper: "#f7f3ea"
  sand-light: "#f2ecdd"
  sandstone: "#e6d8ba"
  sandstone-deep: "#cdb98d"
  ink: "#2e2d29"
  stone: "#5a5750"
  palo-alto: "#175e54"
  palo-alto-bright: "#2e8b7a"
  season-fall: "#8c1515"
  season-winter: "#2f5f86"
  season-spring: "#196b5c"
  season-summer: "#8a5a12"
typography:
  display:
    fontFamily: "Libre Franklin, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.2em"
rounded:
  sm: "2px"
  md: "6px"
  lg: "8px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cardinal}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.sandstone}"
    textColor: "{colors.cardinal}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.stone}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  card:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Stanford Youth Public Health Accelerator

## 1. Overview

**Creative North Star: "The Rising Trend Line"**

The site's whole visual argument is a plotted-data motif made hopeful: scattered
points that resolve into a confident upward trajectory. It's public-health
epidemiology as optimism — data you can read, aimed at a student who's just
starting out. The register is brand (design is the product), and the job is to
make a curious high schooler, and the parent looking over their shoulder, believe
"this is real, this is credible, and I belong here."

The system is warm and human before it is institutional. Stanford Cardinal
carries the identity in committed blocks (hero and calls-to-action), warm paper
and sand surfaces carry the reading, and a single Palo Alto green marks health
and vitality. It is plainspoken, never corporate, and never talks down to
teenagers. It explicitly rejects the three anti-references from PRODUCT.md:
generic SaaS/startup marketing (gradient heroes, hero-metric templates, identical
icon-card grids), the stuffy institutional university-department page, and
anything childish or juvenile.

**Key Characteristics:**
- Committed Cardinal blocks against warm, readable paper — not accent-timid
- A signature dot-scatter + trajectory motif ("elevating youth") behind content
- Editorial structure over cards; hairline borders over shadows
- Human, unbuzzwordy copy voice; equity woven in, not bolted on

## 2. Colors

A warm, committed palette: one saturated Cardinal doing identity work, Stanford
sandstone/paper as the reading surface, and a restrained health-green accent.

### Primary
- **Cardinal** (#8c1515): The brand. Owns the hero, interior page headers, the
  primary CTA bands, and primary link/heading emphasis. Used in committed 30–60%
  blocks, not as a timid accent.
- **Cardinal Bright** (#b1040e): Stanford digital red, reserved for hover/emphasis
  and the single highlighted moment (the May symposium node).
- **Cardinal Dark** (#560c0c): Gradient floor on Cardinal fields and the mobile nav.

### Secondary
- **Palo Alto Green** (#175e54) / **Bright** (#2e8b7a): The health/vitality accent,
  used sparingly — the mentorship "heart" label, category dots, timeline roles.

### Neutral
- **Ink** (#2e2d29): Warm near-black; all primary text. Never pure black.
- **Stone** (#5a5750): Secondary text, metadata, captions.
- **Paper** (#f7f3ea): The default warm body surface.
- **Sand Light** (#f2ecdd): A soft warm wash for section bands (e.g. the program
  timeline) — one step warmer than paper, lighter than sandstone.
- **Sandstone** (#e6d8ba) / **Deep** (#cdb98d): Warm fills, the sandstone eyebrow
  on Cardinal, hover on light CTAs.

### Tertiary
- **Season hues** (#8c1515 fall / #2f5f86 winter / #196b5c spring / #8a5a12 summer):
  A deliberate full-palette system used only on the program timeline, one hue per
  season — winter's cool slate blue is deliberately distinct from spring's green
  so the two are never mistaken at a glance. All clear ≥3:1 on the sand-light band.

### Named Rules
**The Committed-Cardinal Rule.** Cardinal is not a 10% accent; it owns whole
fields (hero, CTA bands). Between them, surfaces are warm neutrals, never a third
saturated color competing for the eye.

**The Tint-Warm Rule.** Neutrals lean into the brand's warm sandstone hue, never
toward a generic cool gray. Pure gray is prohibited.

## 3. Typography

**Display Font:** Libre Franklin (with system-ui, sans-serif)
**Body Font:** Manrope (with system-ui, sans-serif)
**Label/Mono Font:** Spline Sans Mono (with ui-monospace, monospace)

**Character:** A warm Franklin-Gothic humanist display — credible and civic,
legible at any size — set heavy and tight for titles, paired with Manrope's
friendly geometric-humanist body. Spline Sans Mono carries the data-label motif
(the epidemiology fingerprint) on eyebrows and metadata.

### Hierarchy
- **Display** (700, `clamp(2.6rem, 6vw, 3.75rem)`, line-height 1.02, tracking -0.025em): Hero and section titles.
- **Headline** (700, ~1.75rem): Sub-section headings, card titles.
- **Title** (600, ~1.125rem): Month names, small headings.
- **Body** (400, 1rem, line-height 1.6, 62–65ch measure): All reading text.
- **Label** (500, 0.72rem, tracking 0.2em, uppercase): Eyebrows, data metadata.

### Named Rules
**The Sparing-Eyebrow Rule.** The uppercase mono label is a data motif, not
section scaffolding. One or two per page, on genuine labels — never an eyebrow
stacked above every heading.

## 4. Elevation

Flat by default. Depth comes from warm surface changes (paper → white → sand →
Cardinal) and hairline `ink/8–12%` borders, not from shadows. The one exception
is interactive lift: event cards raise on hover with a soft Cardinal-tinted
shadow.

### Shadow Vocabulary
- **Card hover** (`box-shadow: 0 16px 40px -24px rgba(140,21,21,0.5)`): The only
  ambient shadow — a warm lift on hover of interactive event cards.

### Named Rules
**The Flat-Border Rule.** Separate regions with a background change or a 1px
hairline, never a drop shadow at rest and never a colored side-stripe.

## 5. Components

### Buttons
- **Shape:** Sharp, near-square (2px radius).
- **Primary:** On Cardinal bands, a white button with Cardinal text (`14px 28px`).
- **Hover / Focus:** Background shifts paper → sandstone; visible Cardinal-bright focus ring.
- **Outline:** Transparent with a white inset ring and white text, on Cardinal fields.

### Chips
- **Style:** Pill (`rounded-full`), transparent with a 1px `ink/15` border, Stone mono uppercase text.
- **State:** Static metadata (subject areas, categories) — not interactive filters here.

### Cards / Containers
- **Corner Style:** Gently curved (8px radius).
- **Background:** White on paper; borders `ink/10`.
- **Shadow Strategy:** Flat at rest; hover lift only on event cards (see Elevation).
- **Border:** 1px hairline; hover brightens toward `cardinal/25–30%`.
- **Internal Padding:** 24px.
- **Rule:** Never nest a card inside a card. Prefer editorial rows and rails to card grids.

### Navigation
- **Style:** Fixed, transparent over the hero so the Cardinal gradient runs to the top; fills to `cardinal/95` on scroll.
- **Typography:** White label links; a sandstone underline slides in on the active/hover link.
- **Mobile:** Cardinal-dark drawer.

### The Dot-Map Signature (custom)
`ScatterField` sprinkles plotted points (light on Cardinal fields, faint Cardinal
on light sections) and `Trajectory` draws a rising trend line. This is the brand's
irreducible motif — the "imagery" of an otherwise photo-light site. Motion:
points scatter in, then the trajectory draws; both respect `prefers-reduced-motion`.

### Status/Countdown Card (custom, added 2026-07-30)
`ProgramCountdown` (`/program` hero, right column, replacing a second copy of
`Trajectory`): a translucent panel — `bg-black/20`, `ring-1 ring-inset
ring-white/10`, no border, no backdrop-blur — that recedes into the Cardinal
field rather than sitting on top of it like a white card would. Holds a
single large sandstone/white numeral (days-until, not hrs/min — deliberately
simplified from an earlier three-unit d/h/m version that read as "too much"),
and one button that changes meaning rather than markup: a ghost outline
("ring-1 ring-inset ring-white/40") state before the admin toggle flips, a
solid white-fill state after. Centered content, `max-w-md` card width so the
title fits one line.

### Partner Logo Strip — "In partnership with" (custom, added 2026-07-30)
Homepage-only, sitting between the Team section and the contact band. This is
a deliberate, scoped **exception to the Flat-Border Rule** below: a white card
lifted off the warm paper background with a real ambient shadow
(`shadow-[0_20px_48px_-28px_rgba(46,45,41,0.35)]`), at the user's explicit
request, because the "Supported by"/"In partnership with" convention reads
oddly flush with the page. Don't generalize this shadow to other cards —
it's specific to this one floating band, not a system-wide change to the
Elevation rules. Label is centered, larger than the `.eyebrow` mono default
(`font-mono text-base sm:text-lg uppercase tracking-[0.2em]`, not the 0.72rem
eyebrow size) since a single small caption over a large logo read as
disproportionate. Rename the label per partner-relationship type — "Supported
by" implies funding, "In partnership with" (current) implies collaboration;
pick whichever matches the actual relationship for the next partner.
**Two logos as of 2026-07-30 (later same day):** Stanford Center for
Innovation in Global Health (`public/partners/cigh.png`) added as the first
logo, ALAS second. Logos render at a shared height via `object-contain`, so
mismatched source aspect ratios (CIGH is a wide ~2.6:1 lockup vs. ALAS's
near-square seal) aren't an issue — don't pre-crop future logos to match.

### Nomination-First Hero (custom, added 2026-07-30 — `/educators`)
A second instance of the "one job per hero" pattern (see Status/Countdown
Card above): the `/educators` hero skips the usual dot-map + headline pattern
and puts the single ask — nominating a student — directly in the Cardinal
hero with the CTA inline, rather than burying it in a mid-page band. Ghost
button ("Nominations Open Soon") vs. filled white button once a real
Google-Form URL is set, same swap-not-duplicate convention as
`ProgramCountdown`'s pre/post-open Apply button.

### Timeline Event Row (`/program`, added 2026-08-26)

The cohort timeline's per-event row, `EventRow` in
`src/app/program/page.tsx`. Four things, nothing more: a mono date + format line
(`Oct 18 · Hybrid (Stanford/Zoom)`), the event name in 16px display semibold, and
a one-line student-facing description.

- **Rows, not cards.** Each event is a `border-t border-ink/10` row on the
  sand-light band, per the Flat-Border Rule. Don't turn these into white cards;
  17 stacked cards on a warm band, inside a rail that is already a container,
  would break both the Flat-Border Rule and "never nest a card inside a card."
- **Flat and non-interactive by decision, not omission.** This row was first
  built on native `<details>`/`<summary>`, with each event's session agenda and
  student deliverables behind a rotating chevron. The chevron went first, then
  the whole expand mechanism (both 2026-08-26): that depth is program-side
  detail and was judged not participant-facing. It now lives in CONTENT.md.
  **If it is ever surfaced again, `<details>` is the right primitive** — no
  client component, keyboard-accessible for free, and the text ships in the
  server HTML so it stays searchable and indexable while collapsed. What it also
  needs is a visible affordance; a hover-only cue leaves touch users with no
  signal that anything opens.
- **Two row kinds**, from the event's `kind`: `live` (filled dot) and `async`
  (hollow ring, labelled "Checkpoint"). A third `pause` kind — no dot, no legend
  entry — existed for an AP-exam window and was removed with it. The legend
  explains the two dots once, above the rail.
- **One eyebrow per row.** The date + format line is the only mono label,
  keeping the Sparing-Eyebrow Rule intact even at 17 rows.
- **Still exactly one highlighted moment.** The May symposium keeps the bordered
  Cardinal-Bright box, Cardinal title, and the larger rail marker. January's
  Project Exchange Forum is also a major hybrid event and carries the identical
  `Hybrid (Stanford/Zoom)` label, so the box is the only thing distinguishing the
  symposium. Resist adding a second emphasis treatment — the highlight works
  because it is the page's only one.

### Event Card Meta List (`EventCard.tsx`, revised 2026-08-11)
The When / Where / Led by list under an event's summary. Two roles only, held
in the `metaLabel` / `metaValue` constants at the top of the file — edit those
rather than the six call sites, which is how the card drifted out of sync
before.

- **Labels**: 12px mono, uppercase, `tracking-wide`, `ink/70`, fixed `w-16`
  column. `pt-1` optically drops them onto the 16px value's baseline; without
  it they float high.
- **Values**: 16px display (Libre Franklin) medium, `ink`. One size for every
  value — date, time, place, host. Resist promoting one above the others; two
  value sizes in a list this short reads as an accident, not a hierarchy.
- **Date and time share a line**, separated by a `·` at `stone/50`. Each half
  is `whitespace-nowrap` so a narrow card breaks between them instead of
  mid-date, and the separator travels with the time.
- **Rows are conditional.** `Led by` renders only when a host is set, and the
  summary only when there's summary text. An event with neither used to show a
  labelled empty row above a blank band. The footer is `mt-auto` (not a
  `flex-1` summary) so cards still bottom-align across a grid row.

## 6. Do's and Don'ts

### Do:
- **Do** commit Cardinal to whole fields (hero, CTA bands); let warm neutrals carry the space between.
- **Do** keep body text in Ink (#2e2d29) at ≥4.5:1; bump off light grays that drift under contrast.
- **Do** use editorial rows, rails, and hairlines instead of card grids; keep the dot-map motif as the signature imagery.
- **Do** keep copy plainspoken and human; write equity in as invitation, not slogan.

### Don't:
- **Don't** ship generic SaaS/startup marketing — no gradient-drenched heroes, no hero-metric template, no identical icon-card grids.
- **Don't** read as a stuffy institutional university-department page — dense, formal, lifeless.
- **Don't** go childish or juvenile — the audience is teenagers, addressed as capable near-adults.
- **Don't** use `border-left`/`border-right` > 1px as a colored stripe, gradient text, or decorative glassmorphism.
- **Don't** stack a tiny uppercase mono eyebrow above every section; keep the label a sparing data motif.
