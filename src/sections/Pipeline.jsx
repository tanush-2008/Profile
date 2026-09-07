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
      className="border-t border-white/08 bg-carbon px-6 py-28 text-bone lg:px-12 lg:py-40 overflow-hidden"
    >
      {/* Section header — editorial asymmetric */}
      <div className="grid grid-cols-12 gap-x-4 gap-y-8 mb-16 lg:mb-24">
        <div className="col-span-12 lg:col-span-6">
          <span className="section-label">The scientific journey</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-balance">
            From molecular<br />
            <span className="text-copper">structure</span> to product.
          </h2>
        </div>
        <Reveal delay={0.2} className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
          <p className="text-sm leading-relaxed text-dust sm:text-base max-w-sm">
            Seven interconnected disciplines transform an active molecule into a stable, manufacturable pharmaceutical product — from in-silico solid-form prediction to plant validation and US-DMF filing.
          </p>
          <Link to="/innovation" className="btn-ghost mt-8 inline-flex self-start">
            See the full pipeline →
          </Link>
        </Reveal>
      </div>

      {/* Pipeline steps — visual progression */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-white/06 lg:left-[3.2rem]" />
        <motion.div
          className="absolute left-5 top-0 w-px bg-gradient-to-b from-copper via-copper/60 to-transparent origin-top lg:left-[3.2rem]"
          style={{ scaleY: lineScale, height: "100%" }}
        />

        <div className="space-y-0">
          {PIPELINE.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.06}>
              <div
                data-testid={`pipeline-step-${step.id}`}
                className="group relative grid grid-cols-12 gap-x-4 gap-y-2 border-b border-white/06 py-8 lg:py-10"
              >
                {/* Step number — larger, more prominent */}
                <div className="col-span-2 lg:col-span-1 flex items-start">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-white/12 bg-carbon group-hover:border-copper/60 transition-all duration-500">
                    <span className="font-display text-sm font-bold text-dust group-hover:text-copper transition-colors duration-500">
                      {step.n}
                    </span>
                  </div>
                </div>

                {/* Content — title more prominent */}
                <div className="col-span-10 lg:col-span-5">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight group-hover:text-copper transition-colors duration-500 sm:text-2xl">
                    {step.title}
                  </h3>
                  <span className="eyebrow text-dust/50 mt-1 block">{step.sub}</span>
                </div>

                {/* Description — visible on desktop */}
                <div className="col-span-10 col-start-3 lg:col-span-5 lg:col-start-7">
                  <motion.p
                    className="text-sm leading-relaxed text-dust/60 max-w-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.8, ease: EASE }}
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
    </section>
  );
};
