/**
 * The hero motif: a community network. Nodes are people; thin links connect
 * nearby people, and a few hubs tie the web together. Links draw themselves in
 * on load; nodes pop in. Deterministic (seeded) so server and client agree.
 * Reduced-motion is honored by the global stylesheet (animations snap to end).
 */

const WIDTH = 600;
const HEIGHT = 460;
const M = 42; // inset margin so no node is clipped

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

type Node = { x: number; y: number; hub: boolean; r: number };
type Edge = { x1: number; y1: number; x2: number; y2: number; len: number };

function build() {
  const rng = makeRng(7);
  const N = 32;
  const nodes: Node[] = [];
  for (let i = 0; i < N; i++) {
    nodes.push({
      x: M + rng() * (WIDTH - 2 * M),
      y: M + rng() * (HEIGHT - 2 * M),
      hub: false,
      r: 2.6 + rng() * 1.8,
    });
  }

  // hubs: the node nearest each spread-out anchor, so they're distributed
  const anchors = [
    [0.24, 0.34], [0.72, 0.24], [0.42, 0.66], [0.82, 0.72],
  ].map(([fx, fy]) => [fx * WIDTH, fy * HEIGHT]);
  const dist = (a: Node, b: Node) => Math.hypot(a.x - b.x, a.y - b.y);
  const hubIdx: number[] = [];
  for (const [ax, ay] of anchors) {
    let best = -1;
    let bd = Infinity;
    nodes.forEach((n, i) => {
      if (n.hub) return;
      const d = Math.hypot(n.x - ax, n.y - ay);
      if (d < bd) { bd = d; best = i; }
    });
    if (best >= 0) { nodes[best].hub = true; nodes[best].r = 7; hubIdx.push(best); }
  }

  const seen = new Set<string>();
  const edges: Edge[] = [];
  const addEdge = (i: number, j: number) => {
    const key = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, len: dist(nodes[i], nodes[j]) });
  };

  // spokes radiating outward: each person links to their nearest hub,
  // and sometimes a second hub, weaving the communities together
  nodes.forEach((n, i) => {
    if (n.hub) return;
    const byHub = hubIdx.map((h) => ({ h, d: dist(n, nodes[h]) })).sort((a, b) => a.d - b.d);
    addEdge(i, byHub[0].h);
    if (byHub[1] && rng() < 0.4) addEdge(i, byHub[1].h);
  });

  // backbone: hubs connected to one another
  for (let a = 0; a < hubIdx.length; a++) {
    for (let b = a + 1; b < hubIdx.length; b++) addEdge(hubIdx[a], hubIdx[b]);
  }

  return { nodes, edges };
}

const { nodes: NODES, edges: EDGES } = build();

export default function Network({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      role="img"
      aria-label="A network of people connected by lines: a community, linked together."
      preserveAspectRatio="xMidYMid meet"
    >
      {/* links draw in first, behind the nodes */}
      {EDGES.map((e, i) => (
        <line
          key={i}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="var(--color-sandstone)"
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.4}
          style={{
            strokeDasharray: e.len,
            strokeDashoffset: e.len,
            animation: `draw 0.9s cubic-bezier(0.65,0,0.35,1) ${(0.25 + i * 0.045).toFixed(2)}s forwards`,
          }}
        />
      ))}

      {/* people */}
      {NODES.map((n, i) => (
        <g key={i}>
          {n.hub && (
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r + 6}
              fill="none"
              stroke="#fff"
              strokeWidth={1.5}
              opacity={0.5}
              className="dot"
              style={{ ["--o" as string]: "0.5", animationDelay: `${(0.9 + i * 0.03).toFixed(2)}s` }}
            />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.hub ? "#fff" : "var(--color-sandstone)"}
            className="dot"
            style={{ ["--o" as string]: n.hub ? "1" : "0.9", animationDelay: `${(0.15 + i * 0.035).toFixed(2)}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
