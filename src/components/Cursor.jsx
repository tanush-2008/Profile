import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = { default: 18, link: 44, image: 64, canvas: 30 };

const modeFor = (t) => {
  if (!(t instanceof Element)) return "default";
  if (t.closest("a,button,[role=button],select,input,textarea,label,summary")) return "link";
  if (t.closest("img,[data-cursor=image]")) return "image";
  if (t.closest("canvas")) return "canvas";
  return "default";
};

export const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default");
  const [down, setDown] = useState(false);
  const x = useMotionValue(-200), y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setMode(modeFor(e.target));
    const dn = () => setDown(true), up = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;
  const s = SIZE[mode];
  const ring = mode === "link" || mode === "image";

  return (
    <motion.div data-testid="custom-cursor" data-mode={mode} aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference" style={{ x: sx, y: sy }}>
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div className="relative flex items-center justify-center"
          animate={{ width: s, height: s, scale: down ? 0.8 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}>
          <motion.span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white" animate={{ opacity: mode === "image" ? 0 : 1, scaleY: mode === "link" ? 0.35 : 1 }} />
          <motion.span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white" animate={{ opacity: mode === "image" ? 0 : 1, scaleX: mode === "link" ? 0.35 : 1 }} />
          <motion.span className="absolute inset-0 border border-white" animate={{ opacity: ring ? 1 : 0, rotate: mode === "link" ? 45 : 0 }} transition={{ duration: 0.4 }} />
          <motion.span className="absolute font-mono text-[9px] tracking-[0.25em] text-white" animate={{ opacity: mode === "image" ? 1 : 0 }}>VIEW</motion.span>
          <motion.span className="absolute h-1 w-1 bg-white" animate={{ opacity: mode === "canvas" ? 0 : 1 }} />
        </motion.div>
      </div>
    </motion.div>
  );
};
