import type { Metadata } from "next";
import ScatterField from "@/components/ScatterField";
import ProgramCountdown from "@/components/ProgramCountdown";
import Reveal from "@/components/Reveal";
import MailtoLink from "@/components/MailtoLink";
import { getProgramContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Program",
  description:
    "How the Youth Public Health Accelerator works: the Leadership Summit, 1-on-1 mentorship, Group Mentorship Labs, and the year-long cohort timeline that ends at our symposium.",
};

// ---------------------------------------------------------------------------
// Hero, mission, founders, subject areas, and pillars are admin-editable
// (program_content). Only the fixed annual timeline below stays in code.
// ---------------------------------------------------------------------------
type Entry = { week: string; live: boolean; text: string; highlight?: boolean };
type Season = { season: string; term: string; accent: string; months: { month: string; entries: Entry[] }[] };

const JOIN_STEPS: { when: string; text: string }[] = [
  { when: "September 7", text: "Applications for the 2026 cohort open." },
  { when: "Mid-September", text: "General Info meeting (hybrid) — an open Q&A on the application and the year ahead." },
  { when: "Early October", text: "Application deadline." },
  { when: "Late October", text: "Cohort begins with the Welcome meeting (hybrid)." },
];

const APPLICATION_ASKS: string[] = [
  "A general proposal centered on a real community problem you want to work on.",
  "The community partners — a school, clinic, or organization — you'd work with.",
  "What you're hoping to get out of a year of mentorship.",
];

const TIMELINE: Season[] = [
  {
    season: "Fall",
    term: "2026",
    accent: "var(--color-season-fall)",
    months: [
      {
        month: "October",
        entries: [
          { week: "Week 1", live: true, text: "Welcome meeting (hybrid). A workshop on the checkpoints to hit by December and what we expect for the final proposal, plus personalized feedback on your application proposal." },
          { week: "Week 3", live: false, text: "Deadline: finalized proposal & schedule. Checkpoints set for December, February, and April." },
        ],
      },
      {
        month: "November",
        entries: [
          { week: "Week 1", live: true, text: "A Stanford professor presents on their research." },
          { week: "Week 3", live: false, text: "Literature review completed: research on what others have already done." },
        ],
      },
      {
        month: "December",
        entries: [
          { week: "Week 1", live: true, text: "A Stanford professor presents on their research." },
          { week: "Week 3", live: false, text: "December checkpoint: asynchronous check-in on progress." },
        ],
      },
    ],
  },
  {
    season: "Winter",
    term: "2027",
    accent: "var(--color-season-winter)",
    months: [
      {
        month: "January",
        entries: [
          { week: "Week 1", live: true, text: "High schoolers pitch their progress from the December checkpoint." },
          { week: "Week 3", live: false, text: "Progress update: submit revisions based on pitch feedback." },
        ],
      },
      {
        month: "February",
        entries: [
          { week: "Week 1", live: true, text: "2–3 high schoolers lead a mini-health workshop." },
          { week: "Week 3", live: false, text: "February checkpoint: check-in on community-partner outreach and data collection." },
        ],
      },
      {
        month: "March",
        entries: [
          { week: "Week 1", live: true, text: "2–3 high schoolers lead a mini-health workshop." },
          { week: "Week 3", live: false, text: "Draft outline of the final deliverable: methods and findings so far." },
        ],
      },
    ],
  },
  {
    season: "Spring",
    term: "2027",
    accent: "var(--color-season-spring)",
    months: [
      {
        month: "April",
        entries: [
          { week: "Week 1", live: true, text: "2–3 high schoolers lead a mini-health workshop." },
          { week: "Week 3", live: false, text: "April checkpoint: final project deliverable due ahead of the Symposium." },
        ],
      },
      {
        month: "May",
        entries: [
          {
            week: "Week 1",
            live: true,
            text: "End-of-Year Symposium: students present their projects as posters, with Stanford faculty, staff, and the wider community there to see the work.",
            highlight: true,
          },
        ],
      },
    ],
  },
];

export default async function ProgramPage() {
  const content = await getProgramContent();
  const applyOpen = content.applicationOpen;
  const applyUrl = content.applicationUrl && content.applicationUrl !== "#" ? content.applicationUrl : null;

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Hero — dot-map field + trajectory, with the apply CTA inline     */}
      {/* --------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-cardinal text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 85% 15%, rgba(255,255,255,0.10), transparent 45%), linear-gradient(160deg, #8c1515 0%, #7a1212 55%, #560c0c 100%)",
          }}
        />
        <ScatterField tint="light" count={70} seed={11} className="absolute inset-0" />
        <div className="shell relative grid items-center gap-10 pb-20 pt-28 md:pb-28 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="max-w-xl">
            <h1 className="display text-[2.6rem] leading-[0.98] sm:text-6xl">{content.heroTitle}</h1>
            <p className="pretty mt-6 max-w-lg text-lg leading-relaxed text-white/85">{content.heroIntro}</p>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <ProgramCountdown applyOpen={applyOpen} applyUrl={applyUrl} />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Joining — the pre-cohort steps, before the year-long timeline    */}
      {/* --------------------------------------------------------------- */}
      <section className="bg-paper py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <h2 className="display max-w-[18ch] text-2xl text-ink sm:text-3xl">
              How to Join
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {JOIN_STEPS.map((step, i) => (
              <Reveal key={step.when} delay={i * 60}>
                <li>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cardinal">
                    {step.when}
                  </p>
                  <p className="pretty mt-2 max-w-[32ch] text-base leading-relaxed text-ink/85">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-14 grid gap-10 border-t border-ink/10 pt-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h3 className="display text-xl text-ink sm:text-2xl">What we&apos;ll ask for</h3>
              <p className="pretty mt-3 max-w-[52ch] text-base leading-relaxed text-ink/80">
                The application is short, but it asks you to have thought a little
                about direction. You&apos;ll tell us about:
              </p>
              <ul className="mt-5 space-y-3">
                {APPLICATION_ASKS.map((ask) => (
                  <li key={ask} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cardinal" />
                    <span className="pretty text-base leading-relaxed text-ink/85">{ask}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="display text-xl text-ink sm:text-2xl">Have questions?</h3>
              <p className="pretty mt-3 max-w-[48ch] text-base leading-relaxed text-ink/80">
                Join our General Info meeting in{" "}
                <span className="font-semibold text-ink">mid-September</span>{" "}
                for an open Q&amp;A on the application and what the year looks
                like — or reach out any time.
              </p>
              <MailtoLink className="mt-6 inline-block rounded-sm bg-cardinal px-7 py-3.5 font-semibold text-white transition-colors hover:bg-cardinal-bright">
                Get in touch
              </MailtoLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Timeline — the cohort year, a warm chapter; seasons carry palette */}
      {/* --------------------------------------------------------------- */}
      <section className="border-y border-ink/8 bg-sand-light py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <h2 className="display max-w-[16ch] text-3xl text-ink sm:text-4xl">
              What a year in the cohort looks like.
            </h2>
            <p className="pretty mt-4 max-w-[58ch] text-lg leading-relaxed text-ink/80">
              Cohort 2026–2027. Each month opens with a live meeting; a mid-month
              check-in keeps projects moving between them.
            </p>
            {/* legend — fill vs. hollow, explained once */}
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink/80">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink" />
                Live meeting — first week
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full ring-[1.5px] ring-inset ring-ink" />
                Async check-in — third week
              </span>
            </div>
          </Reveal>

          <div className="mt-14 space-y-16">
            {TIMELINE.map((season, si) => (
              <Reveal key={season.season} delay={si * 60}>
                <div className="grid gap-6 md:grid-cols-[11rem_1fr] md:gap-12">
                  <div className="md:sticky md:top-24 md:self-start">
                    <h3 className="display text-3xl leading-none" style={{ color: season.accent }}>
                      {season.season}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/75">
                      {season.term}
                    </p>
                  </div>

                  <ol
                    className="relative space-y-9 border-l pl-8"
                    style={{ borderColor: `color-mix(in srgb, ${season.accent} 45%, transparent)` }}
                  >
                    {season.months.map((m) => (
                      <li key={m.month} className="relative">
                        <span
                          aria-hidden
                          className={`absolute -left-[calc(2rem+6px)] top-1.5 rounded-full ring-4 ring-sand-light ${
                            m.entries.some((e) => e.highlight) ? "h-4 w-4" : "h-3 w-3"
                          }`}
                          style={{
                            background: season.accent,
                            boxShadow: m.entries.some((e) => e.highlight)
                              ? `0 0 0 4px color-mix(in srgb, ${season.accent} 22%, transparent)`
                              : undefined,
                          }}
                        />
                        <h4 className="font-display text-lg font-semibold text-ink">{m.month}</h4>
                        <div className="mt-3 space-y-4">
                          {m.entries.map((e) => (
                            <div
                              key={e.week}
                              className={
                                e.highlight
                                  ? "rounded-md border border-cardinal-bright/30 bg-cardinal-bright/5 px-4 py-3"
                                  : undefined
                              }
                            >
                              <p className="flex items-center font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink/75">
                                <span
                                  aria-hidden
                                  className="mr-2 inline-block h-2 w-2 rounded-full"
                                  style={
                                    e.live
                                      ? { background: "currentColor" }
                                      : { boxShadow: "inset 0 0 0 1.5px currentColor" }
                                  }
                                />
                                {e.week} · {e.live ? "Live meeting" : "Async check-in"}
                              </p>
                              <p
                                className={`pretty mt-1 max-w-[64ch] text-sm leading-relaxed ${
                                  e.highlight ? "font-semibold text-ink" : "text-ink/85"
                                }`}
                              >
                                {e.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
