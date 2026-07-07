import type { Event } from "@/lib/data";
import { dateParts, formatDateRange } from "@/lib/format";

export default function EventCard({ event }: { event: Event }) {
  const { weekday, day, month } = dateParts(event.date);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white shadow-[0_1px_0_rgba(46,45,41,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-cardinal/30 hover:shadow-[0_16px_40px_-24px_rgba(140,21,21,0.5)]">
      <div className="flex items-stretch gap-4 border-b border-ink/8 p-5">
        {/* calendar block */}
        <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-md bg-cardinal py-2 text-white">
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
        <p className="pretty flex-1 text-sm leading-relaxed text-stone">{event.summary}</p>

        <dl className="mt-4 space-y-1.5 text-xs text-stone">
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 font-mono uppercase tracking-wide text-ink/50">When</dt>
            <dd className="font-medium text-ink">{formatDateRange(event.date, event.endDate)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 font-mono uppercase tracking-wide text-ink/50">Where</dt>
            <dd className="font-medium text-ink">{event.location}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 font-mono uppercase tracking-wide text-ink/50">Led by</dt>
            <dd className="font-medium text-ink">{event.host}</dd>
          </div>
        </dl>

        {event.registerUrl && (
          <a
            href={event.registerUrl}
            className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-cardinal transition-colors hover:text-cardinal-bright"
          >
            Register
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        )}
      </div>
    </article>
  );
}
