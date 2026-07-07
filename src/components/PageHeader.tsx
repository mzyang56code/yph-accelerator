/** Compact cardinal header for interior pages. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cardinal text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #8c1515 0%, #7a1212 60%, #560c0c 100%)",
        }}
      />
      <div className="shell relative pb-14 pt-28 md:pb-20 md:pt-32">
        <p className="eyebrow text-sandstone">{eyebrow}</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro && (
          <p className="pretty mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
