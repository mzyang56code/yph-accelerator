import type { Workshop } from "@/lib/data";
import { formatDate } from "@/lib/format";

// Neutral fallback for a category whose color couldn't be resolved (e.g. deleted).
const FALLBACK_COLOR = "#5a5750";

export default function WorkshopCard({ workshop, color }: { workshop: Workshop; color?: string }) {
  const dotColor = color ?? FALLBACK_COLOR;

  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(140,21,21,0.5)]">
      <span className="eyebrow flex items-center gap-2" style={{ color: dotColor }}>
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: dotColor }} />
        {workshop.category}
      </span>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
        {workshop.title}
      </h3>
      <p className="pretty mt-2.5 flex-1 text-sm leading-relaxed text-stone">
        {workshop.summary}
      </p>

      <div className="mt-5 flex items-center gap-3 text-xs text-ink/50">
        <span className="font-mono uppercase tracking-wide">{workshop.fileKind}</span>
        <span aria-hidden>·</span>
        <span>{workshop.durationMin} min</span>
        <span aria-hidden>·</span>
        <span>{formatDate(workshop.released)}</span>
      </div>

      <a
        href={workshop.driveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 self-start rounded-sm bg-cardinal/8 px-3 py-2 text-sm font-semibold text-cardinal transition-colors hover:bg-cardinal hover:text-white"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden className="shrink-0">
          <path fill="currentColor" d="M8.4 2.5 1.4 14.6l3.5 6 7-12.1-3.5-6Zm7.2 0H8.8l7 12.1h6.9L15.6 2.5ZM7 15.6l-3.4 5.9h13.9l3.4-5.9H7Z" />
        </svg>
        Open in Drive
        <span aria-hidden className="text-cardinal/50 transition-colors group-hover:text-white/70">↗</span>
      </a>
    </article>
  );
}
