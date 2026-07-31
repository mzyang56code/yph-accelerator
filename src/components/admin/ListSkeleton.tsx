/** Pulsing placeholder rows shown via loading.tsx while a list page's data query resolves, matching the divide-y row layout used by Events/Workshops/Team/Categories. */
export default function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2.5">
          <div className="h-3 w-20 animate-pulse rounded bg-ink/10" />
          <div className="h-8 w-40 animate-pulse rounded bg-ink/10" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-md bg-ink/10" />
      </div>

      <div className="mt-6 divide-y divide-ink/8 overflow-hidden rounded-xl border border-ink/10 bg-white">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-ink/10" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-ink/5" />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="h-8 w-14 animate-pulse rounded-md bg-ink/5" />
              <div className="h-8 w-16 animate-pulse rounded-md bg-ink/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
