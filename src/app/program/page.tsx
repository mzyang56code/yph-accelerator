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
  happens?: string[];
  outputs?: string[];
  outputsLabel?: string;
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
            happens: [
              "Meet your mentor and the cohort.",
              "Walk through every checkpoint from October to the May symposium.",
              "Get personalized feedback on the proposal you applied with. It's a starting point, and it's supposed to change.",
              "Sharpen the problem you're working on, who it affects, and who you'd need to talk to.",
              "See the path the whole year follows: problem → evidence → community input → design → implementation → evaluation → communication.",
            ],
            outputs: [
              "A sharper working problem statement.",
              "The community you're focused on.",
              "A first list of partners and stakeholders to contact.",
            ],
          },
          {
            date: "Oct 28",
            format: "Checkpoint",
            kind: "async",
            title: "Background Research Checkpoint",
            lede: "Find out what's already known before you commit to a design.",
            outputs: [
              "A background review of the problem, with 5–10 sources or resources you found useful.",
              "A summary of what's already known.",
              "Examples of what others have already tried.",
              "The questions reading alone can't answer.",
              "2–3 possible community partners.",
            ],
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
            happens: [
              "A Stanford faculty member or practitioner presents on their public-health work.",
              "How research methods connect to what a community needs.",
              "How to approach a community partner and hold a conversation that's worth their time.",
              "The difference between checking whether people agree with your idea and listening to what they need.",
              "We workshop your outreach emails and interview questions together.",
            ],
            outputs: [
              "Specific people and organizations you're going to contact, and the next three weeks to do it.",
            ],
          },
          {
            date: "Nov 29",
            format: "Checkpoint",
            kind: "async",
            title: "Community Discovery Checkpoint",
            lede: "Put the reading and the conversations together, before you design anything.",
            outputs: [
              "A short synthesis of your background research.",
              "Evidence that you reached partners or stakeholders. One or two substantive conversations is the goal, though partner timelines vary and we know it.",
              "The needs and priorities the community named themselves.",
              "What you assumed going in, and what changed.",
              "Where the project is headed now, and what role your partner plays in it.",
            ],
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
            happens: [
              "Defining what the project is for.",
              "Picking activities you can realistically pull off.",
              "Getting clear on what your community partner's role is.",
              "Building a target population and an implementation plan.",
              "Setting your December, February, and April milestones.",
              "Deciding what counts as success, and how you'd know.",
              "Naming the ethical, logistical, and feasibility problems before they find you.",
            ],
            outputs: [
              "A near-final project design, ready for your mentor and your partner to react to.",
            ],
          },
          {
            date: "Dec 23",
            format: "Checkpoint",
            kind: "async",
            title: "Fall Project Plan",
            lede:
              "Lock the plan before implementation starts. By the end of fall you should have either a confirmed community partner, or an active relationship with an organization and a plan to keep it going.",
            outputs: [
              "A finalized proposal and implementation timeline.",
              "Your December, February, and April milestones.",
              "Your community partner's role.",
              "How you'll measure whether it worked.",
              "Your first implementation steps for January.",
              "Anything still blocked, so your mentor can help.",
            ],
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
            date: "Jan 17",
            format: "Hybrid (Stanford/Zoom)",
            kind: "live",
            title: "YPHA Project Exchange Forum",
            lede:
              "Share what happened when you started putting the plan into practice, and get unstuck. Nobody is grading you here, so bring the problems.",
            happens: [
              "You give a short update: the problem, what you've tried, what happened, what you learned, your biggest obstacle, and what kind of help would move you forward.",
              "Faculty and mentors suggest fixes and connect you to people, tools, and resources.",
              "We help you narrow the scope if it needs narrowing.",
              "Methods and implementation problems come out early, while there's still time to fix them.",
              "Breakouts by theme: community engagement, scope, data and evaluation, logistics, methods, outreach, partnerships and funding.",
            ],
            outputs: ["One to three next steps, chosen with your mentor."],
          },
          {
            date: "Jan 31",
            format: "Checkpoint",
            kind: "async",
            title: "Putting Your Plan into Action",
            lede: "Act on the feedback you got at the Forum.",
            outputs: [
              "The feedback you received, and what you changed because of it.",
              "Evidence that the project is moving.",
              "Your priorities for February.",
              "Whatever's blocking you now.",
            ],
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
            happens: [
              "Troubleshooting whatever has gone sideways.",
              "Partner engagement, recruitment, logistics, and collecting data.",
              "Mentor and peer support on live problems.",
              "Adjusting the plan to match what you're seeing in practice.",
              "Sometimes a short mini-health workshop led by two or three fellows.",
            ],
          },
          {
            date: "Feb 21",
            format: "Checkpoint",
            kind: "async",
            title: "Pilot Checkpoint",
            lede: "Shift from plans to evidence. What have you built so far?",
            outputs: [
              "What's been implemented or tested so far.",
              "Where your partner outreach stands.",
              "People reached or data collected, where that applies.",
              "Early feedback or first results.",
              "What's working, what isn't, and anything you want to pivot.",
            ],
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
            happens: [
              "Where you stand against the milestones you set in December.",
              "Early findings, and what your partner is telling you.",
              "The barriers that are still barriers.",
              "Whether the project should narrow, grow, or turn.",
              "The difference between activities, outputs, and outcomes, and why it matters.",
              "What counts as evidence of progress or impact.",
              "Whether the project is reaching the community you meant to reach.",
              "Reading qualitative and quantitative feedback.",
              "Drawing conclusions your evidence can hold up, and saying where the limits are.",
              "Sometimes a short mini-health workshop led by fellows.",
            ],
            outputs: [
              "Clear priorities for March and April.",
              "Any pivots agreed on.",
              "A plan for the evidence you still need to collect, and the weeks to collect it in.",
              "An updated path to a finished project.",
            ],
          },
          {
            date: "Mar 21",
            format: "Checkpoint",
            kind: "async",
            title: "Evaluating Your Impact",
            lede: "Start the turn from running the project to evaluating it.",
            outputs: [
              "A draft outline of your final deliverable.",
              "What you've completed so far, and what you've found.",
              "The evidence you already have.",
              "The evidence you still need.",
              "Your final implementation tasks for April.",
            ],
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
            happens: [
              "Structuring the final presentation: problem, community need, approach, methods, findings, limitations, and what comes next.",
              "Designing a poster and slides.",
              "Explaining technical work to people who don't share your background.",
              "Describing impact without overstating it.",
              "Most of the session is practice: groups of three or four, a three-to-five-minute pitch each, structured feedback from peers and mentors, then a second run at it.",
            ],
          },
          {
            date: "Apr 18",
            format: "Checkpoint",
            kind: "async",
            title: "Final Implementation Checkpoint",
            lede: "The building is done. Now you find out what it added up to.",
            outputs: [
              "Core implementation substantially complete.",
              "Your results, data, and feedback as they stand.",
              "Anything left to analyze.",
              "Any last follow-up with your community partner.",
              "Where your final deliverable is.",
            ],
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
            outputs: [
              "A final or near-final poster and slides.",
              "Your final results.",
              "A draft of your pitch.",
              "Any remaining questions, and symposium logistics confirmed.",
            ],
          },
          {
            date: "May 16",
            format: "Hybrid (Stanford/Zoom)",
            kind: "live",
            title: "YPHA Annual Symposium & Showcase",
            lede:
              "You present the year's work as a poster and a short talk, in front of the people who helped you get there.",
            happens: [
              "Student poster presentations and short project talks.",
              "Stanford faculty, staff, and mentors in the room.",
              "Your community partners, your family, and your peers.",
              "The focus is what you learned and what it meant for your community. There is no ranking and no prize.",
            ],
            highlight: true,
          },
          {
            date: "May 23–26",
            format: "Checkpoint",
            kind: "async",
            title: "Final Reflection",
            lede: "Close out the year, and decide what happens to the project next.",
            outputsLabel: "What you'll think through",
            outputs: [
              "What changed because of your project, and what didn't work the way you expected.",
              "What you learned from your community partner.",
              "What you'd do differently.",
              "What happens to the project now, and whether there's a handoff or a plan to keep it going.",
              "Whether you want to stay with YPHA as an alum or a future mentor.",
            ],
          },
        ],
      },
    ],
  },
];

// A single event in the rail. Expands only when there's more to show.
function EventRow({ event }: { event: CohortEvent }) {
  const meta = (
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
  );

  const title = (
    <h5
      className={`font-display mt-1.5 text-base font-semibold leading-snug ${
        event.highlight ? "text-cardinal" : "text-ink"
      }`}
    >
      {event.title}
    </h5>
  );

  const lede = (
    <p className="pretty mt-1 max-w-[62ch] text-sm leading-relaxed text-ink/80">{event.lede}</p>
  );

  const wrap = (children: React.ReactNode) =>
    event.highlight ? (
      <div className="my-3 rounded-md border border-cardinal-bright/30 bg-cardinal-bright/5 px-4 py-3">
        {children}
      </div>
    ) : (
      <div className="border-t border-ink/10 py-4">{children}</div>
    );

  // Nothing to expand into — a quiet, non-interactive row.
  if (!event.happens && !event.outputs) {
    return wrap(
      <>
        {meta}
        {title}
        {lede}
      </>,
    );
  }

  return wrap(
    <details>
      <summary className="group/row block cursor-pointer list-none rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cardinal-bright [&::-webkit-details-marker]:hidden">
        {meta}
        <span className="group-hover/row:text-cardinal block transition-colors">{title}</span>
        {lede}
      </summary>

      <div className="mt-4 space-y-4 border-l border-ink/10 pl-4">
        {event.happens && (
          <ul className="space-y-2">
            {event.happens.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                <span className="pretty max-w-[62ch] text-sm leading-relaxed text-ink/80">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {event.outputs && (
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink/60">
              {event.outputsLabel ?? "You'll finish with"}
            </p>
            <ul className="mt-2.5 space-y-2">
              {event.outputs.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-palo-alto-bright"
                  />
                  <span className="pretty max-w-[62ch] text-sm leading-relaxed text-ink/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>,
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
              partner are part of the work the whole way through. Open any date to
              see what happens and what you&apos;ll walk away with.
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
