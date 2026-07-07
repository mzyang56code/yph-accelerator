import type { TeamMember } from "@/lib/data";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

const KIND_STYLE: Record<TeamMember["kind"], string> = {
  Staff: "bg-cardinal text-white",
  Mentor: "bg-palo-alto text-white",
  Student: "bg-sandstone-deep text-ink",
};

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-ink/10 bg-white p-6 transition-colors hover:border-cardinal/25">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-paper font-display text-lg font-semibold text-cardinal ring-1 ring-ink/10">
          {initials(member.name)}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-tight text-ink">{member.name}</h3>
          <p className="mt-0.5 text-sm text-stone">{member.role}</p>
        </div>
      </div>

      <span className={`mt-4 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider ${KIND_STYLE[member.kind]}`}>
        {member.kind}
      </span>

      <p className="pretty mt-3 flex-1 text-sm leading-relaxed text-stone">{member.bio}</p>
      <p className="mt-4 border-t border-ink/8 pt-3 text-xs text-ink/50">{member.affiliation}</p>
    </article>
  );
}
