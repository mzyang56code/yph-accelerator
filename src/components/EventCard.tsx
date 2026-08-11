"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Event } from "@/lib/data";
import {
  SITE_TZ,
  dateParts,
  formatDateRange,
  formatZonedTimeRange,
  viewerTimeZone,
  zonedWallTimeToInstant,
  zonesDifferAt,
} from "@/lib/format";

/**
 * One voice for the card's meta list: quiet mono labels against larger
 * display-face values. `pt-1` optically drops the 12px label onto the same
 * baseline as the 16px value beside it (24px line box vs 16px).
 */
const metaLabel = "w-16 shrink-0 pt-1 font-mono uppercase tracking-wide text-ink/70";
const metaValue = "font-display text-base font-medium leading-6 text-ink";
const modalLabel = "font-mono text-xs uppercase tracking-wide text-ink/70";
const modalValue = "font-display text-base font-medium leading-snug text-ink";

/**
 * `venueRange` is the clock at the venue — what the admin typed, true for
 * everyone, and therefore server-renderable.
 *
 * A viewer in another zone additionally gets their own time on a quiet third
 * line. That one is browser-only (the zone isn't knowable during SSR), so it
 * appears after mount; rendering it on the server would be a hydration
 * mismatch.
 */
function useEventTimes(event: Event) {
  const [viewerTz, setViewerTz] = useState<string | null>(null);
  useEffect(() => setViewerTz(viewerTimeZone()), []);

  const anchorHhmm = event.startTime ?? event.endTime;
  if (!anchorHhmm) return { venueRange: "", viewerRange: "" };

  const anchor = zonedWallTimeToInstant(event.date, anchorHhmm);
  const differs = Boolean(viewerTz && anchor && zonesDifferAt(anchor, viewerTz));
  return {
    venueRange: formatZonedTimeRange(event.date, event.startTime, event.endTime, SITE_TZ),
    viewerRange: differs
      ? formatZonedTimeRange(event.date, event.startTime, event.endTime, viewerTz!)
      : "",
  };
}

export default function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
  const { weekday, day, month } = dateParts(event.date);
  const { venueRange, viewerRange } = useEventTimes(event);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape-to-close + lock page scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function openModal() {
    setOpen(true);
  }

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal();
          }
        }}
        className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-ink/10 bg-white shadow-[0_1px_0_rgba(46,45,41,0.04)] transition-all duration-300 ${
          past ? "opacity-70" : "hover:-translate-y-1 hover:border-cardinal/30 hover:shadow-[0_16px_40px_-24px_rgba(140,21,21,0.5)]"
        }`}
      >
        <div className="flex items-stretch gap-4 border-b border-ink/8 p-5">
          {/* calendar block */}
          <div className={`flex w-16 shrink-0 flex-col items-center justify-center rounded-md py-2 text-white ${past ? "bg-stone" : "bg-cardinal"}`}>
            <span className="eyebrow text-[0.58rem] text-sandstone/90">{month}</span>
            <span className="font-display text-2xl font-semibold leading-none">{day}</span>
            <span className="mt-0.5 text-[0.62rem] uppercase tracking-wider text-white/70">{weekday}</span>
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <span className="eyebrow text-palo-alto">{event.tag}</span>
            <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">
              {event.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          {event.summary && (
            <p className="pretty text-sm leading-relaxed text-stone">{event.summary}</p>
          )}

          {/* Date and time read as one line in one format. Each half is
              nowrap so a narrow card breaks between them rather than mid-date. */}
          <dl className={`space-y-2.5 text-xs text-stone ${event.summary ? "mt-4" : ""}`}>
            <div className="flex gap-2">
              <dt className={metaLabel}>When</dt>
              <dd className={`min-w-0 ${metaValue} tabular-nums`}>
                <span className="whitespace-nowrap">
                  {formatDateRange(event.date, event.endDate)}
                </span>
                {venueRange && (
                  <span className="whitespace-nowrap">
                    <span aria-hidden className="px-1.5 text-stone/50">·</span>
                    {venueRange}
                  </span>
                )}
                {viewerRange && (
                  <span className="mt-1 block text-xs font-normal leading-5 text-stone">
                    {viewerRange} your time
                  </span>
                )}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className={metaLabel}>Where</dt>
              <dd className={`min-w-0 ${metaValue}`}>{event.location}</dd>
            </div>
            {event.host && (
              <div className="flex gap-2">
                <dt className={metaLabel}>Led by</dt>
                <dd className={`min-w-0 ${metaValue}`}>{event.host}</dd>
              </div>
            )}
          </dl>

          {/* mt-auto, not a flex-1 summary: an event with no summary shouldn't
              reserve a blank band, but the footer still aligns across cards. */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            {!past && event.registerUrl && (
              <a
                href={event.registerUrl}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-cardinal transition-colors hover:text-cardinal-bright"
              >
                Register
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            )}
            <span className="ml-auto text-xs font-semibold text-cardinal/70">View details ↗</span>
          </div>
        </div>
      </article>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div aria-hidden className="absolute inset-0 bg-ink/70" onClick={() => setOpen(false)} />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`event-modal-title-${event.id}`}
              className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl"
            >
              {event.photoUrl && (
                <div className="relative aspect-[16/10] w-full bg-paper">
                  <Image src={event.photoUrl} alt="" fill className="object-cover" />
                </div>
              )}

              <div className={`flex items-start justify-between gap-4 p-6 text-white ${past ? "bg-stone" : "bg-cardinal"}`}>
                <div className="min-w-0">
                  <span className="eyebrow text-sandstone/90">{event.tag}</span>
                  <h2 id={`event-modal-title-${event.id}`} className="display mt-1.5 text-2xl leading-tight">
                    {event.title}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/80 ring-1 ring-white/30 transition-colors hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <dl className="grid grid-cols-1 gap-4 border-b border-ink/8 pb-5 text-sm sm:grid-cols-3">
                  {/* Same mono-label / display-value system as the card. Date
                      and time stack here rather than sharing a line: the
                      three-column grid is too narrow to hold both. */}
                  <div>
                    <dt className={modalLabel}>When</dt>
                    <dd className={`mt-1 ${modalValue}`}>
                      <span className="block">{formatDateRange(event.date, event.endDate)}</span>
                      {venueRange && (
                        <span className="block tabular-nums">{venueRange}</span>
                      )}
                      {viewerRange && (
                        <span className="mt-1 block text-xs font-normal leading-5 text-stone tabular-nums">
                          {viewerRange} your time
                        </span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className={modalLabel}>Where</dt>
                    <dd className={`mt-1 ${modalValue}`}>{event.location}</dd>
                  </div>
                  {event.host && (
                    <div>
                      <dt className={modalLabel}>Led by</dt>
                      <dd className={`mt-1 ${modalValue}`}>{event.host}</dd>
                    </div>
                  )}
                </dl>

                <p className="pretty mt-5 whitespace-pre-line text-sm leading-relaxed text-stone">
                  {event.details || event.summary}
                </p>

                {!past && event.registerUrl && (
                  <a
                    href={event.registerUrl}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-sm bg-cardinal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cardinal-bright"
                  >
                    Register
                    <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
