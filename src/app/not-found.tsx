import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow text-cardinal">404</p>
      <h1 className="display mt-3 text-4xl text-ink sm:text-5xl">Page not found</h1>
      <p className="pretty mt-4 max-w-md text-lg leading-relaxed text-stone">
        That page doesn&apos;t exist, or it moved. Try the homepage, or browse events and workshops.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-sm bg-cardinal px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-cardinal-bright"
        >
          Back to homepage
        </Link>
        <Link
          href="/events"
          className="rounded-sm px-6 py-3 font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-colors hover:bg-paper"
        >
          See events
        </Link>
      </div>
    </div>
  );
}
