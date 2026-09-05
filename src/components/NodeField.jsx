import { useEffect, useRef } from "react";

const COLS = 9, ROWS = 6;

const buildGraph = (w, h) => {
  const pad = Math.min(w, h) * 0.1;
  const nodes = [];
  for (let j = 0; j < ROWS; j++)
    for (let i = 0; i < COLS; i++) {
      const jx = (Math.sin(i * 12.9 + j * 78.2) * 0.5) * 0.35;
      const jy = (Math.cos(i * 43.1 + j * 9.7) * 0.5) * 0.35;
      nodes.push({
        x: pad + ((i + 0.5 + jx) / COLS) * (w - pad * 2),
        y: pad + ((j + 0.5 + jy) / ROWS) * (h - pad * 2),
        heat: Math.random(),
        phase: Math.random() * Math.PI * 2,
      });
    }
  const edges = [];
  nodes.forEach((n, idx) => {
    const i = idx % COLS, j = Math.floor(idx / COLS);
    if (i < COLS - 1) edges.push([idx, idx + 1]);
    if (j < ROWS - 1) edges.push([idx, idx + COLS]);
    if (i < COLS - 1 && j < ROWS - 1 && (i + j) % 3 === 0) edges.push([idx, idx + COLS + 1]);
  });
  return { nodes, edges };
};

export const NodeField = ({ mode = "cluster-mesh" }) => {
  const ref = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, t = 0, graph = null, packets = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      graph = buildGraph(w, h);
      packets = Array.from({ length: 28 }, () => ({
        e: Math.floor(Math.random() * graph.edges.length),
        p: Math.random(),
        v: 0.004 + Math.random() * 0.006,
        dir: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const draw = () => {
      t += 0.016;
      const m = modeRef.current;
      ctx.clearRect(0, 0, w, h);
      const { nodes, edges } = graph;

      // faint dot grid
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      for (let x = 0; x < w; x += 24) for (let y = 0; y < h; y += 24) ctx.fillRect(x, y, 1, 1);

      // edges
      ctx.lineWidth = 1;
      edges.forEach(([a, b], k) => {
        const A = nodes[a], B = nodes[b];
        let alpha = 0.12;
        if (m === "cluster-mesh") alpha = 0.10 + 0.08 * (0.5 + 0.5 * Math.sin(t * 0.8 + k * 0.4));
        if (m === "thermal-dynamics") alpha = 0.06;
        if (m === "data-movement") alpha = 0.16;
        ctx.strokeStyle = `rgba(245,245,247,${alpha})`;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      });

      // packets
      const speed = m === "data-movement" ? 2.2 : m === "cluster-mesh" ? 1 : 0.5;
      packets.forEach((pk) => {
        pk.p += pk.v * speed * pk.dir;
        if (pk.p > 1 || pk.p < 0) {
          pk.e = Math.floor(Math.random() * edges.length);
          pk.p = pk.dir > 0 ? 0 : 1;
        }
        const [a, b] = edges[pk.e];
        const A = nodes[a], B = nodes[b];
        const x = A.x + (B.x - A.x) * pk.p, y = A.y + (B.y - A.y) * pk.p;
        ctx.fillStyle = m === "data-movement" ? "rgba(224,109,59,0.9)" : "rgba(245,245,247,0.8)";
        ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      });

      // nodes
      nodes.forEach((n, i) => {
        if (m === "thermal-dynamics") {
          n.heat += (0.5 + 0.5 * Math.sin(t * 0.6 + n.phase) - n.heat) * 0.02;
          const r = 3 + n.heat * 9;
          ctx.fillStyle = `rgba(224,109,59,${0.08 + n.heat * 0.35})`;
          ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);
          ctx.fillStyle = `rgba(245,245,247,${0.5 + n.heat * 0.5})`;
          ctx.fillRect(n.x - 1.5, n.y - 1.5, 3, 3);
        } else {
          const active = m === "cluster-mesh" && (Math.sin(t * 1.4 + i * 0.7) > 0.93);
          ctx.fillStyle = active ? "rgba(224,109,59,1)" : "rgba(245,245,247,0.85)";
          const s = active ? 5 : 3;
          ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s);
          if (active) {
            ctx.strokeStyle = "rgba(224,109,59,0.5)";
            ctx.strokeRect(n.x - 9, n.y - 9, 18, 18);
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} data-testid="technology-node-field" className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};
