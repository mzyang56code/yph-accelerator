"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow text-cardinal">Something went wrong</p>
      <h1 className="display mt-3 text-4xl text-ink sm:text-5xl">This page hit a snag</h1>
      <p className="pretty mt-4 max-w-md text-lg leading-relaxed text-stone">
        Nothing was lost. Try again, or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={reset}
          className="rounded-sm bg-cardinal px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-cardinal-bright"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-sm px-6 py-3 font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-colors hover:bg-paper"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
