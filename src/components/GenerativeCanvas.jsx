import { useEffect, useRef } from "react";

// Crystallographic diffraction field — concentric Bragg rings with radial intensity variation
// Evolves the AURELIS flow-field canvas to a scientific visual metaphor for XRPD

const RINGS = [0.09, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86];
const RING_INTENSITIES = [0.9, 0.55, 0.8, 0.45, 0.7, 0.35, 0.55, 0.25];

const noise = (x, y, t) =>
  Math.sin(x * 0.9 + t * 0.5) * Math.cos(y * 1.1 - t * 0.3) +
  Math.sin((x + y) * 0.5 + t * 0.18) * 0.4 +
  Math.cos(x * 0.3 - y * 0.5 + t * 0.12) * 0.3;

export const GenerativeCanvas = ({ className }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      t += reduced ? 0 : 0.0045;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h * 0.46;
      const maxR = Math.max(w, h) * 0.62;
      const mDist = Math.hypot(mouse.x - cx, mouse.y - cy);
      const mInf = Math.max(0, 1 - mDist / (maxR * 0.7));

      // Draw Bragg diffraction rings
      RINGS.forEach((fr, ri) => {
        const r = fr * maxR;
        const intensity = RING_INTENSITIES[ri];
        const noiseMod = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 0.6 + ri * 0.9));
        const alpha = (0.04 + intensity * 0.09 + mInf * 0.12) * noiseMod;
        const segments = 120 + ri * 30;

        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const nx = Math.cos(angle) * 2 + ri * 0.8;
          const ny = Math.sin(angle) * 2 + ri * 0.4;
          const n = noise(nx, ny, t);
          const wobble = 1 + n * (0.02 + mInf * 0.04);
          const px = cx + Math.cos(angle) * r * wobble;
          const py = cy + Math.sin(angle) * r * wobble;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const useCopper = mInf > 0.3 && ri < 4;
        const ringColor = useCopper
          ? `rgba(200, 96, 58, ${alpha * (0.8 + mInf * 0.6)})`
          : `rgba(245, 245, 247, ${alpha})`;
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = ri === 0 ? 1.5 : ri < 3 ? 1 : 0.6;
        ctx.stroke();
      });

      // Radial intensity spokes (lattice planes)
      const spokeCount = 24;
      for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * Math.PI * 2 + t * 0.04;
        const n = 0.5 + 0.5 * Math.sin(i * 2.3 + t * 0.3);
        const dx = Math.cos(angle), dy = Math.sin(angle);
        const spokeAlpha = (0.015 + n * 0.025 + mInf * 0.04);
        const spokeLen = maxR * (0.3 + n * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + dx * spokeLen, cy + dy * spokeLen);
        ctx.strokeStyle = `rgba(245, 245, 247, ${spokeAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Central beam stop (occludes the primary beam)
      const beamGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.07);
      beamGrad.addColorStop(0, "rgba(11, 11, 12, 0.95)");
      beamGrad.addColorStop(0.5, "rgba(11, 11, 12, 0.5)");
      beamGrad.addColorStop(1, "rgba(11, 11, 12, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = beamGrad;
      ctx.fill();

      // Mouse proximity: copper glow
      if (mInf > 0.1) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        glow.addColorStop(0, `rgba(200, 96, 58, ${0.06 * mInf})`);
        glow.addColorStop(1, "rgba(200, 96, 58, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
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

  return (
    <canvas
      ref={ref}
      data-testid="hero-generative-canvas"
      className={className}
      aria-hidden="true"
    />
  );
};
