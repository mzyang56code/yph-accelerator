/**
 * A field of scattered plotted points, of varying size — the recurring motif.
 * Positions are seeded so server and client agree (no hydration drift), and
 * kept inside a 3–97% band so no dot is ever clipped at an edge.
 *
 * Rendered as absolutely-positioned dots; drop it into any `relative` parent
 * (e.g. `className="absolute inset-0"`). Two tints: `light` for the red fields,
 * `cardinal` for the light sections as you scroll.
 */

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export default function ScatterField({
  count = 70,
  tint = "light",
  seed = 1,
  className = "",
}: {
  count?: number;
  tint?: "light" | "cardinal";
  seed?: number;
  className?: string;
}) {
  const rng = makeRng(seed);
  const isLight = tint === "light";

  const dots = Array.from({ length: count }, () => {
    // bias toward small dots, with a few large ones
    const size = 2 + Math.pow(rng(), 2.2) * 11;
    const o = isLight ? 0.14 + rng() * 0.5 : 0.05 + rng() * 0.15;
    return {
      x: 3 + rng() * 94,
      y: 2 + rng() * 96,
      size: Number(size.toFixed(2)),
      o: Number(o.toFixed(3)),
    };
  });

  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.o,
            background: isLight ? "#ffffff" : "var(--color-cardinal)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
