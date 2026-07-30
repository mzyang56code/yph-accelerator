import Image from "next/image";
import Link from "next/link";
import ScatterField from "@/components/ScatterField";
import Trajectory from "@/components/Trajectory";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import WorkshopCarousel from "@/components/WorkshopCarousel";
import TeamCard from "@/components/TeamCard";
import MailtoLink from "@/components/MailtoLink";
import {
  getSiteContent,
  getProgramContent,
  getFeaturedEvents,
  getWorkshops,
  getWorkshopCategories,
  getTeam,
} from "@/lib/data";

// Content changes go live immediately via revalidatePath in the admin actions;
// this is just a time-based safety net.
export const revalidate = 300;

// Partner logos live in /public/partners so they ship with the repo — not a
// dev's local Downloads folder — and stay put regardless of where a source
// file moves on any one machine.
const PARTNERS: { name: string; logo: string }[] = [
  { name: "Stanford Center for Innovation in Global Health", logo: "/partners/cigh.png" },
  { name: "ALAS — Ayudando Latinos a Soñar", logo: "/partners/alas.png" },
];

export default async function HomePage() {
  const [content, program, events, workshops, categories, team] = await Promise.all([
    getSiteContent(),
    getProgramContent(),
    getFeaturedEvents(),
    getWorkshops(),
    getWorkshopCategories(),
    getTeam(),
  ]);
  const colorByLabel = Object.fromEntries(categories.map((c) => [c.label, c.color]));
  const applyOpen = program.applicationOpen;
  const applyUrl =
    program.applicationUrl && program.applicationUrl !== "#" ? program.applicationUrl : null;

  return (
    <div className="relative">
      {/* dispersed plotted points sprinkled down the whole page, behind content */}
      <ScatterField tint="cardinal" count={95} seed={22} className="absolute inset-0 -z-10" />

      {/* ---------------------------------------------------------------- */}
      {/* Hero — cardinal field, dots sprinkled across it + the trend line  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-cardinal text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 85% 15%, rgba(255,255,255,0.10), transparent 45%), linear-gradient(160deg, #8c1515 0%, #7a1212 55%, #560c0c 100%)",
          }}
        />
        {/* light dots across the full red field */}
        <ScatterField tint="light" count={74} seed={7} className="absolute inset-0" />
        <div className="shell relative grid items-center gap-8 pb-12 pt-28 md:pb-16 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="max-w-xl">
            <h1 className="display text-4xl leading-[0.98] sm:text-6xl">
              {content.heroHeadline}
            </h1>
            <p className="pretty mt-6 max-w-lg text-lg leading-relaxed text-white/85">
              {content.heroLede}
            </p>
            {/* Apply button is admin-toggled (site_content.application_open). */}
            <div className="mt-9 flex flex-wrap gap-3">
              {applyOpen ? (
                <Link
                  href={applyUrl ?? "/program"}
                  target={applyUrl ? "_blank" : undefined}
                  rel={applyUrl ? "noopener noreferrer" : undefined}
                  className="rounded-sm bg-white px-6 py-3 font-semibold text-cardinal shadow-sm transition-colors hover:bg-sandstone"
                >
                  Apply to the 2026 cohort
                </Link>
              ) : (
                <span className="rounded-sm bg-white/15 px-6 py-3 font-semibold text-white/80 ring-1 ring-inset ring-white/30">
                  2026 Cohort — Coming Soon
                </span>
              )}
              <Link
                href="/program"
                className="rounded-sm px-6 py-3 font-semibold text-white ring-1 ring-inset ring-white/40 transition-colors hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Trajectory className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Mission + stats                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell pb-20 pt-12 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="pretty text-lg leading-relaxed text-stone">
              {content.missionBody}
            </p>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-center">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8">
              {content.stats.map((s) => (
                <div key={s.label}>
                  <div className="rule-tick mb-3" />
                  <dt className="font-display text-4xl font-semibold text-cardinal">{s.value}</dt>
                  <dd className="mt-1 text-sm leading-snug text-stone">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured events                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-ink/8 py-20">
        <div className="shell">
          <SectionHeading
            title="Events"
            link={{ href: "/events", label: "All events" }}
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal as="li" key={event.id} delay={i * 90}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Workshops teaser — editorial rail (varies the rhythm vs. grids)  */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-ink/8 py-20">
        <div className="shell">
          <SectionHeading
            title="Workshops"
            intro="Shareable presentations on today's public health challenges, plus the skills to act on them."
            link={{ href: "/workshops", label: "Open the library" }}
          />
          <WorkshopCarousel workshops={workshops} colorByLabel={colorByLabel} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Team preview                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell py-20">
        <SectionHeading
          title="Our Team"
          link={{ href: "/about", label: "Meet the team" }}
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 5).map((m, i) => (
            <Reveal as="li" key={m.id} delay={(i % 3) * 90}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* In partnership with — partner logo strip                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-paper py-14">
        <div className="shell">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-lg bg-white p-8 text-center shadow-[0_20px_48px_-28px_rgba(46,45,41,0.35)] sm:p-10">
            <p className="font-mono text-base uppercase tracking-[0.2em] text-stone sm:text-lg">
              In partnership with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {PARTNERS.map((p) => (
                <Image
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  width={140}
                  height={120}
                  className="h-24 w-auto object-contain sm:h-28"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Contact band — permanent + compact                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-cardinal">
        <ScatterField tint="light" count={44} seed={13} className="absolute inset-0" />
        <div className="shell relative flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="display balance text-3xl text-white sm:text-4xl">
              Know a high schooler who&apos;d be into this?
            </h2>
            <p className="pretty mt-3 text-white/80">
              We mentor students across the Bay Area. No experience needed, just curiosity.
            </p>
          </div>
          <MailtoLink className="shrink-0 rounded-sm bg-white px-7 py-3.5 font-semibold text-cardinal transition-colors hover:bg-sandstone">
            Get in touch
          </MailtoLink>
        </div>
      </section>
    </div>
  );
}
