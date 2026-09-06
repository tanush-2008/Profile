import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MARQUEE_ITEMS } from "@/lib/data";

const LINES = [
  "Molecular structure",
  "determines everything",
  "in medicine.",
];

export const Statement = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const o1 = useTransform(scrollYProgress, [0.02, 0.3], [0.06, 1]);
  const o2 = useTransform(scrollYProgress, [0.3, 0.58], [0.06, 1]);
  const o3 = useTransform(scrollYProgress, [0.58, 0.82], [0.06, 1]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const ops = [o1, o2, o3];

  return (
    <section
      ref={ref}
      data-testid="statement-section"
      className="relative h-[200vh] bg-ink text-bone"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 pb-0 pt-24 lg:px-12 lg:pt-28">
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

        <div className="space-y-6 pb-8 lg:pb-10">
          <div className="flex items-end justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-dust sm:text-base">
              Every physicochemical property of a drug — solubility, stability, bioavailability, manufacturability — flows from its solid-state structure. We design that structure with intention.
            </p>
            <div className="relative h-20 w-px bg-white/12 hidden sm:block">
              <motion.div style={{ scaleY: bar }} className="absolute inset-0 origin-top bg-copper" />
            </div>
          </div>

          {/* Capability ticker — merged from Marquee */}
          <div className="border-t border-white/06 pt-4 overflow-hidden" aria-hidden="true">
            <div className="marquee-track">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="mx-6 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/20 whitespace-nowrap"
                >
                  {item}
                  <span className="ml-6 inline-block h-px w-3 bg-copper/30 translate-y-[-2px]" />
                </span>
              ))}
            </div>
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
