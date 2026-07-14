"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
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
  Director: "bg-cardinal text-white",
  Mentor: "bg-palo-alto text-white",
  Student: "bg-sandstone-deep text-ink",
};

function Avatar({ member, size }: { member: TeamMember; size: number }) {
  return member.photoUrl ? (
    <Image
      src={member.photoUrl}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover ring-1 ring-ink/10"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="grid shrink-0 place-items-center rounded-full bg-paper font-display font-semibold text-cardinal ring-1 ring-ink/10"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {initials(member.name)}
    </div>
  );
}

export default function TeamCard({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex h-full cursor-pointer flex-col rounded-lg border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-cardinal/25 hover:shadow-[0_16px_40px_-28px_rgba(140,21,21,0.5)]"
      >
        <div className="flex items-center gap-4">
          <Avatar member={member} size={56} />
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">{member.name}</h3>
            <p className="mt-0.5 text-sm text-stone">{member.role}</p>
          </div>
        </div>

        <span
          className={`mt-4 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider ${KIND_STYLE[member.kind]}`}
        >
          {member.kind}
        </span>

        {/* Affiliation stays visible on the collapsed card, in grey. */}
        {member.affiliation && (
          <p className="mt-3 text-sm leading-snug text-stone">{member.affiliation}</p>
        )}
      </article>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div aria-hidden className="absolute inset-0 bg-ink/70" onClick={() => setOpen(false)} />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`team-modal-${member.id}`}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
            >
              <div className="flex items-start gap-4 border-b border-ink/8 p-6">
                <Avatar member={member} size={64} />
                <div className="min-w-0 flex-1">
                  <h2 id={`team-modal-${member.id}`} className="font-display text-xl font-semibold leading-tight text-ink">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-sm text-stone">{member.role}</p>
                  <span
                    className={`mt-2.5 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider ${KIND_STYLE[member.kind]}`}
                  >
                    {member.kind}
                  </span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/60 ring-1 ring-ink/15 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {member.affiliation && (
                  <p className="text-sm text-stone">{member.affiliation}</p>
                )}
                <p className="pretty mt-3 text-sm leading-relaxed text-ink/85">{member.bio}</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
