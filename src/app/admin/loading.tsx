export default function Loading() {
  return (
    <div>
      <div className="space-y-2.5">
        <div className="h-3 w-24 animate-pulse rounded bg-ink/10" />
        <div className="h-8 w-56 animate-pulse rounded bg-ink/10" />
        <div className="h-4 w-40 animate-pulse rounded bg-ink/5" />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-ink/10 bg-white p-6">
            <div className="flex items-baseline justify-between">
              <div className="h-6 w-24 animate-pulse rounded bg-ink/10" />
              <div className="h-6 w-6 animate-pulse rounded bg-ink/10" />
            </div>
            <div className="h-3 w-full animate-pulse rounded bg-ink/5" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-ink/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
