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

/** Hero status card: a translucent panel on the cardinal field. Counts down in days to the application-open date, then its button becomes the real Apply CTA once the admin toggle flips. */
export default function ProgramCountdown({
  applyOpen,
  applyUrl,
}: {
  applyOpen: boolean;
  applyUrl: string | null;
}) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    if (!applyOpen) setDays(getDaysRemaining(APPLICATION_OPEN_DATE));
  }, [applyOpen]);

  return (
    <div className="mx-auto max-w-md rounded-lg bg-black/20 p-10 text-center text-white ring-1 ring-inset ring-white/10">
      <p className="display whitespace-nowrap text-xl leading-snug">
        2026 Cohort {applyOpen ? "Applications Are Open." : "Applications Open in"}
      </p>

      {!applyOpen && (
        <p className="mt-5 flex items-baseline justify-center gap-2">
          <span className="font-display text-7xl font-semibold tabular-nums text-sandstone">
            {days !== null ? days : "--"}
          </span>
          <span className="text-xs uppercase tracking-wide text-white/70">
            {days === 1 ? "day" : "days"}
          </span>
        </p>
      )}

      {applyOpen ? (
        <Link
          href={applyUrl ?? "#"}
          target={applyUrl ? "_blank" : undefined}
          rel={applyUrl ? "noopener noreferrer" : undefined}
          className="mt-8 inline-block rounded-sm bg-white px-7 py-3.5 font-semibold text-cardinal transition-colors hover:bg-sandstone"
        >
          Apply to the 2026 cohort
        </Link>
      ) : (
        <span className="mt-8 inline-block rounded-sm px-7 py-3.5 font-semibold text-white ring-1 ring-inset ring-white/40">
          Available Sep. 7th, 2026
        </span>
      )}
    </div>
  );
}
