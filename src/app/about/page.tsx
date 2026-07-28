import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TeamCard from "@/components/TeamCard";
import Reveal from "@/components/Reveal";
import { getTeam } from "@/lib/data";
import type { TeamMember } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Our mission, and the Stanford faculty, program staff, mentors, and high-school student fellows behind the Youth Public Health Accelerator.",
};

export const revalidate = 300;

// ---------------------------------------------------------------------------
// Mission statement is fixed in code (like the /program timeline): stable
// narrative copy a dev updates, not day-to-day content. See CONTENT.md.
// ---------------------------------------------------------------------------
const MISSION = [
  "YPHA turns a high schooler's curiosity about public and global health into something real: a project that serves their own community, built with the guidance of a Stanford mentor over a full year.",
  "We're founded and directed by Stanford undergraduates through the Stanford Undergraduate Global Health Club and the Stanford Journal of Public Health, with support from the Stanford Center for Innovation in Global Health.",
  "YPHA is an annual, cohort-based accelerator built around four goals: turn a student's interest into a sustained project that serves their community; build the accountability and momentum a year-long commitment takes; strengthen the public health work a community is already doing; and connect a student's idea to the Stanford mentors and experts who can help it go further.",
  "Every student in the cohort is paired with a Stanford mentor and works toward checkpoints they set for the year, with monthly meetings, regular check-ins, and mini-grants to help fund the work itself. The year closes at our End-of-Year Symposium, where students present what they built to the Stanford community and beyond.",
  "Reaching students from under-resourced backgrounds is central to that mission: who gets mentorship, and who gets a seat at the table, is itself a public health question.",
];

const GROUPS: { kind: TeamMember["kind"]; label: string; blurb: string }[] = [
  { kind: "Director", label: "Directors", blurb: "The Stanford undergraduates who run the program." },
  { kind: "Mentor", label: "Mentors", blurb: "Graduate researchers who teach and advise." },
  { kind: "Student", label: "Student fellows", blurb: "The high-schoolers doing the work." },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader title="About Us" intro="Why we exist, and the Stanford students and mentors making it happen." />

      <section className="shell py-16 md:py-20">
        <Reveal>
          <h2 className="display max-w-[16ch] text-2xl text-ink sm:text-3xl">Our mission</h2>
          <div className="pretty mt-7 space-y-5 text-lg leading-relaxed text-ink/80">
            {MISSION.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="shell space-y-16 pb-16">
        {GROUPS.map((group) => {
          const members = team.filter((m) => m.kind === group.kind);
          if (members.length === 0) return null;
          return (
            <section key={group.kind}>
              <div className="flex items-baseline gap-4">
                <h2 className="display text-2xl text-ink sm:text-3xl">{group.label}</h2>
                <span className="text-sm text-stone">{group.blurb}</span>
              </div>
              <div className="rule-tick mt-4 mb-8" />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((m, i) => (
                  <Reveal as="li" key={m.id} delay={(i % 3) * 90}>
                    <TeamCard member={m} />
                  </Reveal>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
