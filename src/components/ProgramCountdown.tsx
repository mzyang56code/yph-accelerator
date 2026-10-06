"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Fixed annual date, like the /program timeline — a dev updates this yearly.
const APPLICATION_OPEN_DATE = new Date("2026-09-07T00:00:00-07:00");

function getDaysRemaining(target: Date): number | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/** Hero status card: a translucent panel on the cardinal field. Three states, driven by the two admin fields — open (Apply CTA), closed (a cycle has ended: the email-list CTA, no countdown), and upcoming (counts down in days to the application-open date). */
export default function ProgramCountdown({
  applyOpen,
  applyUrl,
}: {
  applyOpen: boolean;
  applyUrl: string | null;
}) {
  // Toggle off but a URL still set = applications have closed, and the URL is
  // the email-list form. Toggle off with no URL = the cycle hasn't opened yet.
  const closed = !applyOpen && applyUrl !== null;
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    if (!applyOpen && !closed) setDays(getDaysRemaining(APPLICATION_OPEN_DATE));
  }, [applyOpen, closed]);

  return (
    <div className="mx-auto rounded-lg bg-black/20 p-8 text-center text-white ring-1 ring-inset ring-white/10">
      {/* No nowrap: the card is capped at max-w-sm by its parent, so a long
          heading has to wrap rather than push past the padding. */}
      <p className="display text-balance text-xl leading-snug">
        2026 Cohort{" "}
        {applyOpen
          ? "Applications Are Open."
          : closed
            ? "Applications Are Closed."
            : "Applications Open in"}
      </p>

      {closed && (
        <p className="pretty mt-3 text-sm leading-relaxed text-white/75">
          We&rsquo;ll email you when the next cohort opens.
        </p>
      )}

      {!applyOpen && !closed && (
        <p className="mt-5 flex items-baseline justify-center gap-2">
          <span className="font-display text-7xl font-semibold tabular-nums text-sandstone">
            {days !== null ? days : "--"}
          </span>
          <span className="text-xs uppercase tracking-wide text-white/70">
            {days === 1 ? "day" : "days"}
          </span>
        </p>
      )}

      {applyOpen || closed ? (
        <Link
          href={applyUrl ?? "#"}
          target={applyUrl ? "_blank" : undefined}
          rel={applyUrl ? "noopener noreferrer" : undefined}
          className={`${closed ? "mt-6" : "mt-8"} inline-block rounded-sm bg-white px-7 py-3.5 font-semibold text-cardinal transition-colors hover:bg-sandstone`}
        >
          {applyOpen ? "Apply to the 2026 cohort" : "Join our email list"}
        </Link>
      ) : (
        <span className="mt-8 inline-block rounded-sm px-7 py-3.5 font-semibold text-white ring-1 ring-inset ring-white/40">
          Available Sep. 7th, 2026
        </span>
      )}
    </div>
  );
}
