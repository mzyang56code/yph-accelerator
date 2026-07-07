"use client";

import { useMemo, useState } from "react";
import type { Workshop } from "@/lib/data";
import { workshopCategories } from "@/lib/data";
import WorkshopCard from "@/components/WorkshopCard";

export default function WorkshopBrowser({ workshops }: { workshops: Workshop[] }) {
  const [active, setActive] = useState<string>("All");

  const filters = ["All", ...workshopCategories];
  const shown = useMemo(
    () => (active === "All" ? workshops : workshops.filter((w) => w.category === active)),
    [active, workshops],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter workshops by category">
        {filters.map((f) => {
          const on = f === active;
          const count = f === "All" ? workshops.length : workshops.filter((w) => w.category === f).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                on
                  ? "bg-cardinal text-white"
                  : "bg-white text-stone ring-1 ring-inset ring-ink/12 hover:ring-cardinal/40 hover:text-cardinal"
              }`}
            >
              {f}
              <span className={`ml-2 text-xs ${on ? "text-white/60" : "text-ink/35"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w) => (
          <li key={w.id}>
            <WorkshopCard workshop={w} />
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="mt-10 text-center text-stone">No workshops in this category yet — check back soon.</p>
      )}
    </div>
  );
}
