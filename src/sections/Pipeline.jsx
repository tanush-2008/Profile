import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, EASE } from "@/components/motion";
import { PIPELINE } from "@/lib/data";
import { Link } from "react-router-dom";

export const Pipeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      ref={ref}
      data-testid="pipeline-section"
      className="border-t border-white/08 bg-ink px-6 py-28 text-bone lg:px-12 lg:py-40 overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-x-4 gap-y-12">
        {/* Header */}
        <div className="col-span-12 lg:col-span-5">
          <div className="eyebrow text-dust mb-8">Scientific Pipeline</div>
          <h2 className="font-display text-[clamp(1.8rem,4vw,4.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
            Molecular<br />
            <span className="text-copper">structure</span><br />
            to product.
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-dust sm:text-base">
              The journey from an active molecule to a stable, manufacturable pharmaceutical product is a sequence of interconnected scientific disciplines — each one demanding expert command.
            </p>
            <Link to="/innovation" className="btn-ghost mt-8 inline-flex">
              See the full pipeline →
            </Link>
          </Reveal>
        </div>

        {/* Pipeline steps — vertical stacked on mobile, expanded grid on desktop */}
        <div className="col-span-12 lg:col-span-7 lg:pl-8">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/06 lg:hidden" />
            <motion.div
              className="absolute left-4 top-0 w-px bg-gradient-to-b from-copper to-transparent origin-top lg:hidden"
              style={{ scaleY: lineScale, height: "100%" }}
            />

            <div className="space-y-0">
              {PIPELINE.map((step, i) => (
                <Reveal key={step.id} delay={i * 0.07}>
                  <div
                    data-testid={`pipeline-step-${step.id}`}
                    className="group relative grid grid-cols-12 gap-x-4 gap-y-2 border-b border-white/06 py-7 lg:py-8"
                  >
                    {/* Step number */}
                    <div className="col-span-2 flex items-start pt-1 lg:col-span-2">
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center border border-white/15 bg-ink group-hover:border-copper transition-colors duration-500">
                        <span className="font-mono text-[9px] tracking-[0.15em] text-dust group-hover:text-copper transition-colors duration-500">
                          {step.n}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-10 lg:col-span-10">
                      <div className="flex items-baseline gap-4 flex-wrap">
                        <h3 className="font-display text-lg uppercase tracking-wide group-hover:text-copper transition-colors duration-500 sm:text-xl">
                          {step.title}
                        </h3>
                        <span className="eyebrow text-dust/60">{step.sub}</span>
                      </div>
                      <motion.p
                        className="mt-2 text-xs leading-relaxed text-dust/70 max-w-md"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.8, ease: EASE }}
                      >
                        {step.desc}
                      </motion.p>
                    </div>

                    {/* Hover accent line */}
                    <motion.span
                      className="absolute left-0 top-0 h-full w-px bg-copper origin-top"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
