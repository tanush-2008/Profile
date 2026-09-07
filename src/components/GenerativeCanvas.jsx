import { useEffect, useRef } from "react";

// Abstract, diffraction-inspired rings—not measured data or a simulated experiment.
const RINGS = [0.09, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86];
const RING_INTENSITIES = [0.9, 0.55, 0.8, 0.45, 0.7, 0.35, 0.55, 0.25];
const noise = (x, y, t) =>
  Math.sin(x * 0.9 + t * 0.5) * Math.cos(y * 1.1 - t * 0.3) +
  Math.sin((x + y) * 0.5 + t * 0.18) * 0.4 + Math.cos(x * 0.3 - y * 0.5 + t * 0.12) * 0.3;

const drawRings = (ctx, w, h, t, mouse) => {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h * 0.46;
  const maxR = Math.max(w, h) * 0.62;
  const mInf = Math.max(0, 1 - Math.hypot(mouse.x - cx, mouse.y - cy) / (maxR * 0.7));
  RINGS.forEach((fr, ri) => {
    const r = fr * maxR;
    const modulation = 0.82 + 0.18 * Math.sin(t * 0.6 + ri * 0.9);
    const alpha = (0.045 + RING_INTENSITIES[ri] * 0.085 + mInf * 0.055) * modulation;
    const segments = 96 + ri * 18;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const variation = noise(Math.cos(angle) * 2 + ri * 0.8, Math.sin(angle) * 2 + ri * 0.4, t);
      const wobble = 1 + variation * (0.009 + mInf * 0.012);
      const px = cx + Math.cos(angle) * r * wobble, py = cy + Math.sin(angle) * r * wobble;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = mInf > 0.3 && ri < 4
      ? `rgba(200,96,58,${alpha * (0.8 + mInf * 0.6)})`
      : `rgba(245,245,247,${alpha})`;
    ctx.lineWidth = ri === 0 ? 1.5 : ri < 3 ? 1 : 0.6;
    ctx.stroke();
  });
  // Retain the quiet radial detail without assigning physical meaning to it.
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2 + t * 0.04;
    const n = 0.5 + 0.5 * Math.sin(i * 2.3 + t * 0.3);
    const length = maxR * (0.3 + n * 0.5);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
    ctx.strokeStyle = `rgba(245,245,247,${0.012 + n * 0.022 + mInf * 0.025})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
  const center = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.07);
  center.addColorStop(0, "rgba(11,11,12,.95)");
  center.addColorStop(0.5, "rgba(11,11,12,.5)");
  center.addColorStop(1, "rgba(11,11,12,0)");
  ctx.beginPath(); ctx.arc(cx, cy, maxR * 0.07, 0, Math.PI * 2); ctx.fillStyle = center; ctx.fill();
  if (mInf > 0.1) {
    const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
    glow.addColorStop(0, `rgba(200,96,58,${0.045 * mInf})`);
    glow.addColorStop(1, "rgba(200,96,58,0)");
    ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
  }
};

export const GenerativeCanvas = ({ className }) => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.closest('[data-testid="hero-section"]') || canvas;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let reduced = preference.matches, visible = false, disposed = false;
    let w = 0, h = 0, raf = 0, t = 0, lastFrame = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const render = () => drawRings(ctx, w, h, t, mouse);
    const frame = now => {
      if (disposed || reduced || !visible || document.hidden) { raf = 0; return; }
      if (!lastFrame || now - lastFrame >= 1000 / 30) {
        t += lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) * 0.27 : 0;
        lastFrame = now;
        mouse.x += (mouse.tx - mouse.x) * 0.12;
        mouse.y += (mouse.ty - mouse.y) * 0.12;
        render();
      }
      raf = requestAnimationFrame(frame);
    };
    const updatePlayback = () => {
      cancelAnimationFrame(raf); raf = 0; lastFrame = 0;
      const active = visible && !document.hidden;
      canvas.dataset.animationState = reduced ? "static" : active ? "running" : "paused";
      if (active) { render(); if (!reduced) raf = requestAnimationFrame(frame); }
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };
    const onMove = event => {
      if (reduced || !visible || !finePointer.matches) return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = event.clientX - rect.left; mouse.ty = event.clientY - rect.top;
    };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };
    const onPreference = event => {
      reduced = event.matches;
      if (reduced) { mouse.x = mouse.y = mouse.tx = mouse.ty = -9999; }
      updatePlayback();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updatePlayback(); });
    const resizeObserver = new ResizeObserver(resize);
    resize(); observer.observe(host); resizeObserver.observe(canvas);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", updatePlayback);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      disposed = true; cancelAnimationFrame(raf); observer.disconnect(); resizeObserver.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", updatePlayback);
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return <canvas ref={ref} data-testid="hero-generative-canvas" data-illustration="abstract-not-measured-data" className={className} aria-hidden="true" />;
};