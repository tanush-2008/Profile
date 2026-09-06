import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PIPELINE, CASE_STUDIES } from "@/lib/data";
import { cn } from "@/lib/utils";

// Animated pipeline diagram
const PipelineDiagram = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="relative py-20">
      {/* Connecting track */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-white/06 lg:left-1/2" />
      <motion.div
        className="absolute left-6 top-0 w-px bg-copper origin-top lg:left-1/2"
        style={{
          scaleY: useTransform(scrollYProgress, [0.1, 0.9], [0, 1]),
          height: "100%",
        }}
      />

      <div className="space-y-0 relative">
        {PIPELINE.map((step, i) => {
          const isRight = i % 2 === 0;
          return (
            <Reveal key={step.id} delay={i * 0.06}>
              <div
                data-testid={`pipeline-step-${step.id}`}
                className="grid grid-cols-12 gap-x-4 items-center py-10 lg:py-14"
              >
                {/* Left content (alternating on desktop) */}
                <div className={cn(
                  "col-span-10 col-start-3 lg:col-span-5",
                  isRight ? "lg:col-start-1 lg:text-right lg:pr-12" : "lg:col-start-7 lg:pl-12"
                )}>
                  <motion.div
                    initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                  >
                    <div className="eyebrow text-copper mb-3">{step.sub}</div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-dust max-w-sm">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Centre node */}
                <div className="col-span-2 col-start-1 flex justify-start lg:col-span-2 lg:col-start-6 lg:justify-center">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-copper/50 bg-ink">
                    <span className="font-display text-base font-bold text-copper">{step.n}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

const CaseStudyCard = ({ cs, i }) => (
  <Reveal delay={i * 0.06} data-testid={`case-study-${cs.id}`}>
    <div className="group border border-white/08 bg-ink-2 p-8 hover:border-copper/30 transition-colors duration-500">
      <div className="flex items-start justify-between gap-4 mb-6">
        <span className="label-tag copper">{cs.tag}</span>
        <span className="font-mono text-[9px] text-dust tracking-[0.15em]">0{i + 1}</span>
      </div>
      <h3 className="font-display text-2xl font-bold uppercase tracking-tight group-hover:text-copper transition-colors duration-500 sm:text-3xl">
        {cs.drug}
      </h3>
      <div className="mt-3 eyebrow text-dust">{cs.indication}</div>
      <p className="mt-6 text-sm leading-relaxed text-dust/70">{cs.context}</p>
    </div>
  </Reveal>
);

export default function Innovation() {
  return (
    <main data-testid="page-innovation">
      {/* Header */}
      <section className="min-h-[60svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 eyebrow text-dust lg:col-span-2">Scientific Pipeline</div>
          <div className="col-span-12 lg:col-span-9 lg:col-start-3">
            <SplitLines
              as="h1"
              lines={["From molecule", "to medicine."]}
              delay={0.3}
              data-testid="page-innovation-title"
              className="font-display text-[clamp(3rem,9vw,10rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
            />
          </div>
          <Reveal delay={0.5} className="col-span-12 lg:col-span-5 lg:col-start-7">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              Seven interconnected disciplines transform an active molecule into a stable, manufacturable pharmaceutical product. This is the scientific and engineering journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pipeline diagram */}
      <section className="border-t border-white/08 bg-ink px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <PipelineDiagram />
        </div>
      </section>

      {/* Case studies */}
      <section
        id="case-studies"
        className="border-t border-white/08 bg-slate px-6 py-24 text-bone lg:px-12 lg:py-36"
      >
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 mb-16">
          <div className="col-span-12 eyebrow text-dust lg:col-span-2">Selected Work</div>
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SplitLines
              as="h2"
              lines={["Documented", "drug programmes."]}
              delay={0.2}
              className="font-display text-[clamp(2.4rem,7vw,8rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]"
            />
          </div>
          <Reveal delay={0.4} className="col-span-12 lg:col-span-5 lg:col-start-3">
            <p className="text-sm leading-relaxed text-dust sm:text-base">
              Solid-form science applied to real pharmaceutical development programmes — characterisation, IP evaluation and crystal engineering for globally marketed drugs.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
              <CaseStudyCard cs={cs} i={i} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
