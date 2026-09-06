import { useEffect, useRef } from "react";

// Crystal lattice visualisation — unit cell grid with animated bond vibration
// Replaces the AURELIS network graph with a pharmaceutical crystal lattice

const UNIT_A = 7, UNIT_B = 6;

const buildLattice = (w, h) => {
  const pad = Math.min(w, h) * 0.08;
  const nodes = [];
  for (let j = 0; j < UNIT_B; j++) {
    for (let i = 0; i < UNIT_A; i++) {
      // slight jitter to simulate thermal ellipsoids
      const jx = (Math.sin(i * 11.7 + j * 73.4) * 0.5) * 0.18;
      const jy = (Math.cos(i * 39.2 + j * 11.1) * 0.5) * 0.18;
      nodes.push({
        x: pad + ((i + 0.5 + jx) / UNIT_A) * (w - pad * 2),
        y: pad + ((j + 0.5 + jy) / UNIT_B) * (h - pad * 2),
        phase: Math.random() * Math.PI * 2,
        type: (i + j) % 3 === 0 ? "heavy" : (i + j) % 3 === 1 ? "light" : "mid",
      });
    }
  }
  const bonds = [];
  nodes.forEach((n, idx) => {
    const i = idx % UNIT_A, j = Math.floor(idx / UNIT_A);
    if (i < UNIT_A - 1) bonds.push([idx, idx + 1, "short"]);
    if (j < UNIT_B - 1) bonds.push([idx, idx + UNIT_A, "long"]);
    if (i < UNIT_A - 1 && j < UNIT_B - 1 && (i + j) % 2 === 0) {
      bonds.push([idx, idx + UNIT_A + 1, "diagonal"]);
    }
    if (i > 0 && j < UNIT_B - 1 && (i + j) % 3 === 0) {
      bonds.push([idx, idx + UNIT_A - 1, "diagonal"]);
    }
  });
  return { nodes, bonds };
};

export const NodeField = ({ mode = "polymorphism" }) => {
  const ref = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, t = 0, lattice = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lattice = buildLattice(w, h);
    };

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const { nodes, bonds } = lattice;

      // Background grid — crystal paper
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      for (let x = 0; x < w; x += 20) {
        for (let y = 0; y < h; y += 20) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Bonds
      bonds.forEach(([a, b, type]) => {
        const A = nodes[a], B = nodes[b];
        const phase = (A.phase + B.phase) / 2;
        const vibrate = Math.sin(t * 1.4 + phase) * 0.5 + 0.5;
        let alpha, dash, width;
        if (type === "diagonal") {
          alpha = 0.04 + vibrate * 0.04;
          dash = [2, 4]; width = 0.5;
        } else if (type === "long") {
          alpha = 0.08 + vibrate * 0.06;
          dash = []; width = 0.8;
        } else {
          alpha = 0.12 + vibrate * 0.08;
          dash = []; width = 1;
        }
        ctx.setLineDash(dash);
        ctx.lineWidth = width;
        ctx.strokeStyle = `rgba(245,245,247,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Atoms / nodes
      nodes.forEach((n) => {
        const vibAmp = 1.8;
        const vx = Math.sin(t * 2.1 + n.phase) * vibAmp;
        const vy = Math.cos(t * 1.8 + n.phase * 1.3) * vibAmp;
        const ax = n.x + vx, ay = n.y + vy;

        // Thermal ellipsoid glow
        const ellipsoidR = n.type === "heavy" ? 9 : n.type === "mid" ? 6 : 4;
        const glow = ctx.createRadialGradient(ax, ay, 0, ax, ay, ellipsoidR);
        const glowAlpha = n.type === "heavy" ? 0.15 : 0.08;
        glow.addColorStop(0, `rgba(200, 96, 58, ${glowAlpha})`);
        glow.addColorStop(1, "rgba(200, 96, 58, 0)");
        ctx.beginPath();
        ctx.arc(ax, ay, ellipsoidR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Atom centre
        const atomR = n.type === "heavy" ? 3 : n.type === "mid" ? 2 : 1.5;
        const atomAlpha = n.type === "heavy" ? 0.9 : n.type === "mid" ? 0.7 : 0.55;
        ctx.beginPath();
        ctx.arc(ax, ay, atomR, 0, Math.PI * 2);
        ctx.fillStyle = n.type === "heavy"
          ? `rgba(200, 96, 58, ${atomAlpha})`
          : `rgba(245, 245, 247, ${atomAlpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      data-testid="crystal-lattice-field"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
