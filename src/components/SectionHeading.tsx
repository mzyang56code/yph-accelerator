import Link from "next/link";
import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="eyebrow flex items-center gap-2 text-cardinal">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cardinal" />
            {eyebrow}
          </p>
        )}
        <h2 className="display mt-3 text-3xl text-ink sm:text-4xl">{title}</h2>
        {intro && (
          <p className="pretty mt-4 text-base leading-relaxed text-stone">{intro}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start border-b-2 border-cardinal/30 pb-1 text-sm font-semibold text-cardinal transition-colors hover:border-cardinal md:self-end"
        >
          {link.label}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}
