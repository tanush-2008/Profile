import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = ["The next computing platform", "will not simply calculate.", "It will discover."];

export const Philosophy = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const o1 = useTransform(scrollYProgress, [0.02, 0.25], [0.08, 1]);
  const o2 = useTransform(scrollYProgress, [0.3, 0.55], [0.08, 1]);
  const o3 = useTransform(scrollYProgress, [0.6, 0.85], [0.08, 1]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const ops = [o1, o2, o3];

  return (
    <section ref={ref} data-testid="philosophy-section" className="relative h-[260vh] bg-bone text-onyx">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-24 lg:px-12 lg:pb-10 lg:pt-28">
        <div className="flex justify-between eyebrow text-graphite"><span>07 — Philosophy</span><span className="hidden sm:block">Read slowly</span></div>

        <h2 className="font-display text-[clamp(2.1rem,6.4vw,7.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
          {LINES.map((l, i) => (
            <motion.span key={l} style={{ opacity: ops[i] }} className={i === 2 ? "block text-copper" : "block"} data-testid={`philosophy-line-${i + 1}`}>
              {l}
            </motion.span>
          ))}
        </h2>

        <div className="flex items-end justify-between">
          <span className="max-w-xs text-xs leading-relaxed text-graphite sm:text-sm">Computation has always been asked to answer. We are building it to ask.</span>
          <div className="relative h-24 w-px bg-black/15">
            <motion.div style={{ scaleY: bar }} className="absolute inset-0 origin-top bg-copper" />
          </div>
        </div>
      </div>
    </section>
  );
};
