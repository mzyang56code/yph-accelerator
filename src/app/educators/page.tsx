import type { Metadata } from "next";
import Link from "next/link";
import ScatterField from "@/components/ScatterField";
import Reveal from "@/components/Reveal";
import MailtoLink from "@/components/MailtoLink";

export const metadata: Metadata = {
  title: "For Educators",
  description:
    "Know a student who belongs in YPHA? Nominate them for the 2026 cohort — a free, year-long, Stanford-mentored public-health accelerator.",
};

// ---------------------------------------------------------------------------
// Set this once the nomination Google Form exists — the CTA below switches
// from a "coming soon" ghost state to a real link automatically. Same pattern
// as ProgramCountdown's pre-open Apply button.
// ---------------------------------------------------------------------------
const NOMINATION_FORM_URL: string | null = null;

const REASONS: { title: string; text: string }[] = [
  {
    title: "Free, Stanford-run, year-long",
    text: "Every student is paired one-on-one with a Stanford mentor for a full year — not a one-off workshop or a summer program.",
  },
  {
    title: "No prior experience required",
    text: "YPHA is built for a first spark of interest, not a resume. Curiosity about health, equity, or their own community is enough to start.",
  },
  {
    title: "Ends in something real",
    text: "A research paper, poster, community event, school-club initiative, or nonprofit — presented at our End-of-Year Symposium each May.",
  },
  {
    title: "Built for the student who doesn't think it's for them",
    text: "Reaching students from under-resourced backgrounds is central to the mission, not an add-on. Who gets mentorship is itself a public health question.",
  },
];

const KEY_DATES: { when: string; text: string }[] = [
  { when: "September 7", text: "Applications for the 2026 cohort open." },
  { when: "September 27", text: "Applicant Info Session on Zoom at 10 AM Pacific, optional. An open Q&A on the application and the year ahead." },
  { when: "October 4", text: "Application deadline." },
  { when: "October 18", text: "The cohort year begins at the YPHA Launch Lab (hybrid)." },
];

export default function EducatorsPage() {
  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* Hero — nomination is the page's one job                       */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-cardinal text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #8c1515 0%, #7a1212 60%, #560c0c 100%)",
          }}
        />
        <ScatterField tint="light" count={60} seed={17} className="absolute inset-0" />
        <div className="shell relative pb-16 pt-28 text-center md:pb-20 md:pt-32">
          <p className="eyebrow text-sandstone">For Educators</p>
          <h1 className="display mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">
            Nominate a student for the 2026 cohort.
          </h1>
          <p className="pretty mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Know someone who&apos;s curious about public health or cares about
            their community? It takes two minutes to nominate them, and
            we&apos;ll follow up directly.
          </p>
          <div className="mt-9">
            {NOMINATION_FORM_URL ? (
              <Link
                href={NOMINATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm bg-white px-8 py-4 font-semibold text-cardinal transition-colors hover:bg-sandstone"
              >
                Nominate a Student
              </Link>
            ) : (
              <span className="inline-block rounded-sm px-8 py-4 font-semibold text-white ring-1 ring-inset ring-white/40">
                Nominations Open Soon
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Why YPHA                                                       */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-paper py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <h2 className="display max-w-[16ch] text-2xl text-ink sm:text-3xl">Why nominate them</h2>
          </Reveal>
          <ul className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
            {REASONS.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 60}>
                <h3 className="font-display text-lg font-semibold text-ink">{r.title}</h3>
                <p className="pretty mt-2 max-w-[48ch] text-base leading-relaxed text-ink/80">{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Key dates + contact                                           */}
      {/* ------------------------------------------------------------- */}
      <section className="border-t border-ink/8 bg-paper py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="display text-xl text-ink sm:text-2xl">Key dates</h2>
            <ul className="mt-6 space-y-5 border-t border-ink/10 pt-6">
              {KEY_DATES.map((d) => (
                <li key={d.when}>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cardinal">{d.when}</p>
                  <p className="pretty mt-1 max-w-[48ch] text-base leading-relaxed text-ink/85">{d.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display text-xl text-ink sm:text-2xl">Have questions?</h2>
            <p className="pretty mt-3 max-w-[48ch] text-base leading-relaxed text-ink/80">
              Reach out any time. We&apos;re happy to talk through fit for a
              specific student, or coordinate a workshop for your class.
            </p>
            <MailtoLink className="mt-6 inline-block rounded-sm bg-cardinal px-7 py-3.5 font-semibold text-white transition-colors hover:bg-cardinal-bright">
              Get in touch
            </MailtoLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
