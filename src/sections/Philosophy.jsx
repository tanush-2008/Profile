import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  "Molecular structure",
  "determines everything",
  "in medicine.",
];

export const Statement = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const o1 = useTransform(scrollYProgress, [0.02, 0.28], [0.07, 1]);
  const o2 = useTransform(scrollYProgress, [0.32, 0.58], [0.07, 1]);
  const o3 = useTransform(scrollYProgress, [0.62, 0.86], [0.07, 1]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const ops = [o1, o2, o3];

  return (
    <section
      ref={ref}
      data-testid="statement-section"
      className="relative h-[260vh] bg-ink text-bone"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-24 lg:px-12 lg:pb-10 lg:pt-28">
        <div className="flex justify-between eyebrow text-dust">
          <span>Scientific Foundation</span>
          <span className="hidden sm:block">Read slowly</span>
        </div>

        <h2 className="font-display text-[clamp(2.2rem,7vw,8.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
          {LINES.map((l, i) => (
            <motion.span
              key={l}
              style={{ opacity: ops[i] }}
              className={cn("block", i === 2 ? "text-copper" : "")}
              data-testid={`statement-line-${i + 1}`}
            >
              {l}
            </motion.span>
          ))}
        </h2>

        <div className="flex items-end justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-dust sm:text-sm">
            Every physicochemical property of a drug — solubility, stability, bioavailability, manufacturability — flows from its solid-state structure. We design that structure with intention.
          </p>
          <div className="relative h-24 w-px bg-white/12">
            <motion.div style={{ scaleY: bar }} className="absolute inset-0 origin-top bg-copper" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Local cn (avoid circular import)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
