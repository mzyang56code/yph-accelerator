import type { Metadata } from "next";
import ScatterField from "@/components/ScatterField";
import ProgramCountdown from "@/components/ProgramCountdown";
import Reveal from "@/components/Reveal";
import MailtoLink from "@/components/MailtoLink";
import { getProgramContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Program",
  description:
    "How the Youth Public Health Accelerator works: how to join, and the year-long cohort timeline that runs from the October Launch Lab through the May symposium.",
};

// ---------------------------------------------------------------------------
// Hero copy is admin-editable (program_content). The fixed annual timeline
// below stays in code — source of truth is CONTENT.md.
// ---------------------------------------------------------------------------

const JOIN_STEPS: { when: string; text: string }[] = [
  { when: "September 7", text: "Applications for the 2026 cohort open." },
  { when: "September 20", text: "Applicant Info Session on Zoom, optional. An open Q&A on the application and the year ahead." },
  { when: "October 4", text: "Application deadline." },
  { when: "October 18", text: "The cohort year begins at the YPHA Launch Lab (hybrid)." },
];

const APPLICATION_ASKS: string[] = [
  "A general proposal centered on a real community problem you want to work on.",
  "The community partners you'd work with, like a school, clinic, or organization.",
  "What you're hoping to get out of a year of mentorship.",
];

// --- The cohort year -------------------------------------------------------
// "live" = synchronous meeting · "async" = a checkpoint you submit (labelled
// "Checkpoint" next to the date, matching the legend).
type EventKind = "live" | "async";

type CohortEvent = {
  date: string;
  format: string;
  kind: EventKind;
  title: string;
  lede: string;
  highlight?: boolean;
};

type Phase = {
  season: string;
  term: string;
  arc: string;
  blurb: string;
  accent: string;
  months: { month: string; events: CohortEvent[] }[];
};

const TIMELINE: Phase[] = [
  {
    season: "Fall",
    term: "2026",
    arc: "Discover & Co-Design",
    blurb:
      "Understand the problem, read what's already known, talk to the people closest to it, and build a plan you can run.",
    accent: "var(--color-season-fall)",
    months: [
      {
        month: "October",
        events: [
          {
            date: "Oct 18",
            format: "Hybrid (Stanford/Zoom)",
            kind: "live",
            title: "YPHA Launch Lab",
            lede:
              "Meet your mentor and the rest of the cohort, and start turning the idea you applied with into a working project.",
          },
          {
            date: "Oct 28",
            format: "Checkpoint",
            kind: "async",
            title: "Background Research Checkpoint",
            lede: "Find out what's already known before you commit to a design.",
          },
        ],
      },
      {
        month: "November",
        events: [
          {
            date: "Nov 9",
            format: "Zoom",
            kind: "live",
            title: "Community Discovery Lab + Faculty Spotlight",
            lede:
              "A Stanford faculty member or practitioner shares their work, then we get you ready to talk to your own community.",
          },
          {
            date: "Nov 29",
            format: "Checkpoint",
            kind: "async",
            title: "Community Discovery Checkpoint",
            lede: "Put the reading and the conversations together, before you design anything.",
          },
        ],
      },
      {
        month: "December",
        events: [
          {
            date: "Dec 13",
            format: "Zoom",
            kind: "live",
            title: "Project Design Lab",
            lede: "Turn your research and your conversations into a project you can finish by May.",
          },
          {
            date: "Dec 23",
            format: "Checkpoint",
            kind: "async",
            title: "Fall Project Plan",
            lede:
              "Lock the plan before implementation starts. By the end of fall you should have either a confirmed community partner, or an active relationship with an organization and a plan to keep it going.",
          },
        ],
      },
    ],
  },
  {
    season: "Winter",
    term: "2027",
    arc: "Implement & Iterate",
    blurb:
      "Start building, hit the obstacles, get help from mentors and peers, and adjust the project to fit what you're seeing.",
    accent: "var(--color-season-winter)",
    months: [
      {
        month: "January",
        events: [
          {
            date: "Jan 21",
            format: "Hybrid (Stanford/Zoom)",
            kind: "live",
            title: "YPHA Project Feedback Workshop",
            lede:
              "Share what happened when you started putting the plan into practice, and get unstuck. Nobody is grading you here, so bring the problems.",
          },
          {
            date: "Jan 31",
            format: "Checkpoint",
            kind: "async",
            title: "Putting Your Plan into Action",
            lede: "Act on the feedback you got at the Workshop.",
          },
        ],
      },
      {
        month: "February",
        events: [
          {
            date: "Feb 7",
            format: "Zoom",
            kind: "live",
            title: "Implementation Lab",
            lede: "A working session on the problems that come up once you're building.",
          },
          {
            date: "Feb 21",
            format: "Checkpoint",
            kind: "async",
            title: "Pilot Checkpoint",
            lede: "Shift from plans to evidence. What have you built so far?",
          },
        ],
      },
      {
        month: "March",
        events: [
          {
            date: "Mar 7",
            format: "Zoom",
            kind: "live",
            title: "Midyear Progress Review",
            lede:
              "Check whether the project is on track, and learn how to tell what it is changing. You still have time to go collect whatever the evidence is missing.",
          },
          {
            date: "Mar 21",
            format: "Checkpoint",
            kind: "async",
            title: "Evaluating Your Impact",
            lede: "Start the turn from running the project to evaluating it.",
          },
        ],
      },
    ],
  },
  {
    season: "Spring",
    term: "2027",
    arc: "Evaluate & Communicate",
    blurb:
      "Finish the work, figure out what changed because of it, and tell the story to a room that wants to hear it.",
    accent: "var(--color-season-spring)",
    months: [
      {
        month: "April",
        events: [
          {
            date: "Apr 4",
            format: "Zoom",
            kind: "live",
            title: "Communications & Pitch Lab",
            lede: "Turn the project into a story people can follow, then practice saying it out loud.",
          },
          {
            date: "Apr 18",
            format: "Checkpoint",
            kind: "async",
            title: "Final Implementation Checkpoint",
            lede: "The building is done. Now you find out what it added up to.",
          },
        ],
      },
      {
        month: "May",
        events: [
          {
            date: "May 2",
            format: "Checkpoint",
            kind: "async",
            title: "Showcase Readiness Check",
            lede: "Get the project presentation-ready before AP exams start.",
          },
          {
            date: "May 16",
            format: "Hybrid (Stanford/Zoom)",
            kind: "live",
            title: "YPHA Annual Symposium & Showcase",
            lede:
              "You present the year's work as a poster and a short talk, in front of the people who helped you get there.",
            highlight: true,
          },
          {
            date: "May 23–26",
            format: "Checkpoint",
            kind: "async",
            title: "Final Reflection",
            lede: "Close out the year, and decide what happens to the project next.",
          },
        ],
      },
    ],
  },
];

// A single event in the rail: date + format, name, one-line description.
// Deliberately flat — the per-event agendas and deliverables are program-side
// detail, not participant-facing, and live in CONTENT.md instead.
function EventRow({ event }: { event: CohortEvent }) {
  const body = (
    <>
      <p className="flex flex-wrap items-center gap-x-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink/70">
        <span className="inline-flex items-center whitespace-nowrap">
          <span
            aria-hidden
            className="mr-2 inline-block h-2 w-2 shrink-0 rounded-full"
            style={
              event.kind === "live"
                ? { background: "currentColor" }
                : { boxShadow: "inset 0 0 0 1.5px currentColor" }
            }
          />
          {event.date}
        </span>
        <span aria-hidden className="text-ink/30">
          ·
        </span>
        <span>{event.format}</span>
      </p>
      <h5
        className={`font-display mt-1.5 text-base font-semibold leading-snug ${
          event.highlight ? "text-cardinal" : "text-ink"
        }`}
      >
        {event.title}
      </h5>
      <p className="pretty mt-1 max-w-[62ch] text-sm leading-relaxed text-ink/80">{event.lede}</p>
    </>
  );

  return event.highlight ? (
    <div className="my-3 rounded-md border border-cardinal-bright/30 bg-cardinal-bright/5 px-4 py-3">
      {body}
    </div>
  ) : (
    <div className="border-t border-ink/10 py-4">{body}</div>
  );
}

export default async function ProgramPage() {
  const content = await getProgramContent();
  const applyOpen = content.applicationOpen;
  const applyUrl = content.applicationUrl && content.applicationUrl !== "#" ? content.applicationUrl : null;

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Hero — dot-map field + countdown card                           */}
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
            <h2 className="display max-w-[18ch] text-2xl text-ink sm:text-3xl">How to Join</h2>
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
                Join our Applicant Info Session on{" "}
                <span className="font-semibold text-ink">September 20</span>{" "}
                for an open Q&amp;A on the application and what the year looks like.
                Or reach out any time.
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
            <p className="pretty mt-4 max-w-[62ch] text-lg leading-relaxed text-ink/80">
              Cohort 2026–2027, in three phases. Every month has one live meeting
              and one checkpoint between meetings. Your mentor and your community
              partner are part of the work the whole way through.
            </p>
            {/* legend — fill vs. hollow, explained once */}
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink/80">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink" />
                Live meeting
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full ring-[1.5px] ring-inset ring-ink" />
                Checkpoint
              </span>
              <span className="text-ink/65">Dates below are tentative.</span>
            </div>
          </Reveal>

          <div className="mt-14 space-y-16">
            {TIMELINE.map((phase, pi) => (
              <Reveal key={phase.season} delay={pi * 60}>
                <div className="grid gap-6 md:grid-cols-[13rem_1fr] md:gap-12">
                  <div className="md:sticky md:top-24 md:self-start">
                    <h3 className="display text-3xl leading-none" style={{ color: phase.accent }}>
                      {phase.season}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/75">
                      {phase.term}
                    </p>
                    <p className="font-display mt-4 text-base font-semibold text-ink">{phase.arc}</p>
                    <p className="pretty mt-2 max-w-[28ch] text-sm leading-relaxed text-ink/75">
                      {phase.blurb}
                    </p>
                  </div>

                  <div>
                    <ol
                      className="relative space-y-10 border-l pl-8"
                      style={{ borderColor: `color-mix(in srgb, ${phase.accent} 45%, transparent)` }}
                    >
                      {phase.months.map((m) => {
                        const isHighlight = m.events.some((e) => e.highlight);
                        return (
                          <li key={m.month} className="relative">
                            <span
                              aria-hidden
                              className={`absolute -left-[calc(2rem+6px)] top-1.5 rounded-full ring-4 ring-sand-light ${
                                isHighlight ? "h-4 w-4" : "h-3 w-3"
                              }`}
                              style={{
                                background: phase.accent,
                                boxShadow: isHighlight
                                  ? `0 0 0 4px color-mix(in srgb, ${phase.accent} 22%, transparent)`
                                  : undefined,
                              }}
                            />
                            <h4 className="font-display text-lg font-semibold text-ink">{m.month}</h4>
                            <div className="mt-2">
                              {m.events.map((e) => (
                                <EventRow key={e.title} event={e} />
                              ))}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
