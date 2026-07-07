import Link from "next/link";
import ScatterField from "@/components/ScatterField";
import Trajectory from "@/components/Trajectory";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import WorkshopCard from "@/components/WorkshopCard";
import TeamCard from "@/components/TeamCard";
import {
  getSiteContent,
  getFeaturedEvents,
  getWorkshops,
  getTeam,
} from "@/lib/data";

export default async function HomePage() {
  const [content, events, workshops, team] = await Promise.all([
    getSiteContent(),
    getFeaturedEvents(),
    getWorkshops(),
    getTeam(),
  ]);

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
        <div className="shell relative grid items-center gap-8 pb-16 pt-28 md:pb-24 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="max-w-xl">
            <p className="eyebrow text-sandstone">
              {content.cohortLabel} · {content.location}
            </p>
            <h1 className="display mt-5 text-[2.6rem] leading-[0.98] sm:text-6xl">
              {content.heroHeadline}
            </h1>
            <p className="pretty mt-6 max-w-lg text-lg leading-relaxed text-white/85">
              {content.heroLede}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/workshops"
                className="rounded-sm bg-white px-6 py-3 font-semibold text-cardinal shadow-sm transition-colors hover:bg-sandstone"
              >
                Browse the workshop library
              </Link>
              <Link
                href="/events"
                className="rounded-sm px-6 py-3 font-semibold text-white ring-1 ring-inset ring-white/40 transition-colors hover:bg-white/10"
              >
                See upcoming events
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
      <section className="shell py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-cardinal">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cardinal" />
              What we do
            </p>
            <h2 className="display mt-3 text-3xl text-ink sm:text-4xl">
              {content.missionTitle}
            </h2>
            <p className="pretty mt-5 text-lg leading-relaxed text-stone">
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
            eyebrow="Featured events"
            title="What our students are running next"
            intro="Symposia, field studies, and workshops led by the current cohort and their mentors. Everyone's welcome — bring a friend."
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
      {/* Workshops teaser                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-ink/8 py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Workshop library"
            title="Workshops you can actually use"
            intro="The team adds a few every month — slides, recordings, and workbooks. Free for everyone in the program, one click away in the shared library."
            link={{ href: "/workshops", label: "Open the library" }}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workshops.slice(0, 4).map((w, i) => (
              <Reveal as="li" key={w.id} delay={i * 90}>
                <WorkshopCard workshop={w} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Team preview                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell py-20">
        <SectionHeading
          eyebrow="The people"
          title="Mentors and students, working side by side"
          intro="Stanford researchers, program staff, and the high-school fellows doing the work."
          link={{ href: "/team", label: "Meet the team" }}
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 3).map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 90}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA band                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-cardinal">
        {/* echo the hero: sprinkled dots + the trend line, faint */}
        <ScatterField tint="light" count={44} seed={13} className="absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-1/2 hidden w-[42rem] -translate-y-1/2 opacity-25 md:block">
          <Trajectory className="h-auto w-full" />
        </div>
        <div className="shell relative flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="display text-3xl text-white sm:text-4xl">
              Know a high schooler who&apos;d be into this?
            </h2>
            <p className="mt-3 max-w-xl text-white/80">
              We mentor students from across the Bay Area — no experience needed,
              just curiosity. Send us a note and we&apos;ll tell you how it works.
            </p>
          </div>
          <a
            href="mailto:ypha@stanford.edu"
            className="shrink-0 rounded-sm bg-white px-7 py-3.5 font-semibold text-cardinal transition-colors hover:bg-sandstone"
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}
