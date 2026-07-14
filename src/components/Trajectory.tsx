/**
 * The hero motif: an accelerating trajectory. A curve that starts nearly flat
 * and launches steeply up and to the right; the stroke brightens as it climbs,
 * plotted points grow and light up as they ride up it, and an energetic node
 * marks the launch point. The line draws bottom-to-top on load, like a launch.
 * Reduced-motion is honored by the global stylesheet (animations snap to end).
 */

const WIDTH = 600;
const HEIGHT = 460;

// Two cubic segments: a slow, flat start that accelerates into a steep launch.
const SEG1 = { p0: [28, 428], p1: [160, 424], p2: [244, 392], p3: [316, 306] };
const SEG2 = { p0: [316, 306], p1: [384, 224], p2: [476, 118], p3: [560, 38] };
const PATH =
  `M ${SEG1.p0[0]} ${SEG1.p0[1]} C ${SEG1.p1[0]} ${SEG1.p1[1]}, ${SEG1.p2[0]} ${SEG1.p2[1]}, ${SEG1.p3[0]} ${SEG1.p3[1]}` +
  ` C ${SEG2.p1[0]} ${SEG2.p1[1]}, ${SEG2.p2[0]} ${SEG2.p2[1]}, ${SEG2.p3[0]} ${SEG2.p3[1]}`;

function cubic(seg: { p0: number[]; p1: number[]; p2: number[]; p3: number[] }, t: number) {
  const u = 1 - t;
  const x = u * u * u * seg.p0[0] + 3 * u * u * t * seg.p1[0] + 3 * u * t * t * seg.p2[0] + t * t * t * seg.p3[0];
  const y = u * u * u * seg.p0[1] + 3 * u * u * t * seg.p1[1] + 3 * u * t * t * seg.p2[1] + t * t * t * seg.p3[1];
  return [x, y];
}

// point at overall parameter s in [0,1] across both segments
function pointAt(s: number) {
  return s < 0.5 ? cubic(SEG1, s * 2) : cubic(SEG2, (s - 0.5) * 2);
}

// plotted points climbing the curve — bigger, brighter, and closer together
// toward the top: the visual grammar of acceleration.
const RIDERS = [0.12, 0.26, 0.4, 0.53, 0.65, 0.75, 0.84, 0.91, 0.96].map((s) => {
  const [x, y] = pointAt(s);
  return {
    x,
    y,
    r: 2.6 + s * 4,
    o: 0.5 + s * 0.5,
    white: s > 0.78,
    delay: 0.35 + s * 1.5,
  };
});

const END = pointAt(1);

export default function Trajectory({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={`overflow-visible ${className}`}
      role="img"
      aria-label="A curve accelerating upward from lower-left to a launch point at upper-right."
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="accelStroke" gradientUnits="userSpaceOnUse" x1={28} y1={428} x2={560} y2={38}>
          <stop offset="0%" stopColor="var(--color-sandstone)" stopOpacity={0.28} />
          <stop offset="55%" stopColor="var(--color-sandstone)" stopOpacity={0.85} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
        </linearGradient>
        <filter id="accelGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* soft glow trailing the curve */}
      <path
        d={PATH}
        className="trajectory"
        fill="none"
        stroke="var(--color-sandstone)"
        strokeWidth={9}
        strokeLinecap="round"
        opacity={0.22}
        filter="url(#accelGlow)"
      />
      {/* the accelerating line — brightens as it climbs */}
      <path
        d={PATH}
        className="trajectory"
        fill="none"
        stroke="url(#accelStroke)"
        strokeWidth={2.6}
        strokeLinecap="round"
      />

      {/* plotted points riding up the curve */}
      {RIDERS.map((d, i) => (
        <circle
          key={i}
          className="dot"
          cx={d.x}
          cy={d.y}
          r={Number(d.r.toFixed(2))}
          fill={d.white ? "#ffffff" : "var(--color-sandstone)"}
          style={{ ["--o" as string]: d.o.toFixed(2), animationDelay: `${d.delay.toFixed(2)}s` }}
        />
      ))}

      {/* ripples radiating from the launch point */}
      {[0, 1, 2].map((i) => (
        <circle
          key={`rip${i}`}
          className="ripple"
          cx={END[0]}
          cy={END[1]}
          r={46}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          style={{ animationDelay: `${(2.2 + i * 1.13).toFixed(2)}s` }}
        />
      ))}

      {/* the launch point — bright, with a halo and an emanating ring */}
      <circle cx={END[0]} cy={END[1]} r={9} fill="#fff" opacity={0.7} filter="url(#accelGlow)" className="dot" style={{ ["--o" as string]: "0.7", animationDelay: "1.95s" }} />
      <circle cx={END[0]} cy={END[1]} r={6.5} fill="#fff" className="dot" style={{ ["--o" as string]: "1", animationDelay: "2.0s" }} />
      <circle cx={END[0]} cy={END[1]} r={13} fill="none" stroke="#fff" strokeWidth={1.5} opacity={0.6} className="dot" style={{ ["--o" as string]: "0.6", animationDelay: "2.15s" }} />
      <circle cx={END[0]} cy={END[1]} r={20} fill="none" stroke="#fff" strokeWidth={1} opacity={0.28} className="dot" style={{ ["--o" as string]: "0.28", animationDelay: "2.3s" }} />
    </svg>
  );
}
