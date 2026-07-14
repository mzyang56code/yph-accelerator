"use client";

import { useEffect, useRef, useState } from "react";
import type { Workshop } from "@/lib/data";

// Google Slides / Drive first-slide thumbnail. Works when the deck is shared
// "anyone with the link". Returns null for placeholders or unrecognized URLs.
function slideThumb(url: string): string | null {
  if (!url || url === "#") return null;
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1600` : null;
}

function SlidePreview({ url, title }: { url: string; title: string }) {
  const src = slideThumb(url);
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-cardinal/8 p-5 text-center">
        <span className="font-display text-sm font-semibold leading-snug text-cardinal/70">{title}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`First slide of “${title}”`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setErrored(true)}
      className="h-full w-full object-cover"
    />
  );
}

function Arrow({ dir, disabled, onClick }: { dir: "left" | "right"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous workshops" : "Next workshops"}
      className={`absolute top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-cardinal ring-1 ring-ink/10 transition-all hover:bg-cardinal hover:text-white disabled:pointer-events-none disabled:opacity-0 ${
        dir === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function WorkshopCarousel({
  workshops,
  colorByLabel,
}: {
  workshops: Workshop[];
  colorByLabel: Record<string, string>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (workshops.length === 0) return null;
  const color = (w: Workshop) => colorByLabel[w.category] ?? "#5a5750";

  const page = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative mt-10">
      <Arrow dir="left" disabled={atStart} onClick={() => page(-1)} />
      <Arrow dir="right" disabled={atEnd} onClick={() => page(1)} />

      <div
        ref={ref}
        onScroll={update}
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth px-1 py-2"
      >
        {workshops.map((w) => (
          <a
            key={w.id}
            href={w.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/card block w-64 shrink-0 snap-start sm:w-72"
          >
            {/* one box (no nested card): flush preview on top, meta below */}
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-[#f1efeb] transition-shadow group-hover/card:shadow-[0_16px_40px_-28px_rgba(140,21,21,0.5)]">
              <div className="relative aspect-video bg-white">
                <SlidePreview url={w.driveUrl} title={w.title} />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color(w) }} />
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/70">{w.category}</span>
                </div>
                <h3 className="mt-1 line-clamp-2 min-h-[2.6rem] font-display text-base font-semibold leading-snug text-ink transition-colors group-hover/card:text-cardinal">
                  {w.title}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
