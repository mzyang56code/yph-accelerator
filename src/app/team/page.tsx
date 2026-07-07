import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TeamCard from "@/components/TeamCard";
import Reveal from "@/components/Reveal";
import { getTeam } from "@/lib/data";
import type { TeamMember } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The Stanford faculty, program staff, mentors, and high-school student fellows behind the Youth Public Health Accelerator.",
};

const GROUPS: { kind: TeamMember["kind"]; label: string; blurb: string }[] = [
  { kind: "Staff", label: "Faculty & staff", blurb: "Who runs the program." },
  { kind: "Mentor", label: "Mentors", blurb: "Graduate researchers who teach and advise." },
  { kind: "Student", label: "Student fellows", blurb: "The high-schoolers doing the work." },
];

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        eyebrow="The people"
        title="Team & mentors"
        intro="A small group of Stanford researchers and staff, and the students they work alongside."
      />
      <div className="shell space-y-16 py-16">
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
