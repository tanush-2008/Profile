import { useEffect, useRef } from "react";

const GAP = 26;
const noise = (x, y, t) =>
  Math.sin(x * 0.9 + t * 0.6) * Math.cos(y * 1.15 - t * 0.4) +
  Math.sin((x + y) * 0.55 + t * 0.22) * 0.5 +
  Math.cos(x * 0.35 - y * 0.6 + t * 0.15) * 0.35;

export const GenerativeCanvas = ({ className }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, cols = 0, rows = 0, raf = 0, t = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
    };

    const draw = () => {
      t += 0.0055;
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const ar = w / Math.max(h, 1);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * GAP, y = j * GAP;
          const nx = (x / w) * 5.5 * ar * 0.6, ny = (y / h) * 4;
          const n = noise(nx, ny, t);
          let a = n * Math.PI;
          const dx = x - mouse.x, dy = y - mouse.y;
          const d = Math.hypot(dx, dy);
          const inf = Math.max(0, 1 - d / 260);
          if (inf > 0) a = a * (1 - inf) + (Math.atan2(dy, dx) + Math.PI / 2) * inf;
          const len = 5 + Math.abs(n) * 7 + inf * 14;
          const alpha = 0.10 + Math.abs(n) * 0.16 + inf * 0.45;
          ctx.strokeStyle = inf > 0.55 ? `rgba(224,109,59,${alpha})` : `rgba(245,245,247,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
          ctx.stroke();
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} data-testid="hero-generative-canvas" className={className} aria-hidden="true" />;
};
