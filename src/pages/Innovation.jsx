import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PIPELINE, CASE_STUDIES } from "@/lib/data";
import { cn } from "@/lib/utils";

// Animated pipeline diagram — differentiated from homepage version
const PipelineDiagram = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="relative py-16 lg:py-24">
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
                className="grid grid-cols-12 gap-x-4 items-start py-10 lg:py-14"
              >
                {/* Content (alternating on desktop) */}
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

const CaseStudyRow = ({ cs, i }) => (
  <Reveal delay={i * 0.06} data-testid={`case-study-${cs.id}`}>
    <div className="group grid grid-cols-12 gap-x-4 gap-y-4 border-b border-white/06 py-10 lg:py-12">
      {/* Large number */}
      <div className="col-span-2 lg:col-span-1">
        <span className="font-display text-4xl font-bold text-white/10 group-hover:text-copper/30 transition-colors duration-500 lg:text-5xl">
          0{i + 1}
        </span>
      </div>

      {/* Drug name + tag */}
      <div className="col-span-10 lg:col-span-4">
        <span className="label-tag copper mb-3 inline-flex">{cs.tag}</span>
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight group-hover:text-copper transition-colors duration-500 sm:text-3xl lg:text-4xl">
          {cs.drug}
        </h3>
      </div>

      {/* Details */}
      <div className="col-span-12 lg:col-span-3 lg:col-start-6">
        <div className="eyebrow text-dust mb-2">Indication</div>
        <p className="text-sm text-bone/70">{cs.indication}</p>
      </div>
      <div className="col-span-12 lg:col-span-4 lg:col-start-9">
        <div className="eyebrow text-dust mb-2">Solid-Form Context</div>
        <p className="text-sm leading-relaxed text-dust/70">{cs.context}</p>
      </div>
    </div>
  </Reveal>
);

export default function Innovation() {
  return (
    <main data-testid="page-innovation">
      {/* Header */}
      <section className="min-h-[60svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="relative z-10">
          <span className="section-label">Seven-stage pipeline</span>
          <SplitLines
            as="h1"
            lines={["From molecule", "to medicine."]}
            delay={0.3}
            data-testid="page-innovation-title"
            className="mt-4 font-display text-[clamp(3rem,9vw,10rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl lg:ml-auto lg:max-w-xl">
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

      {/* Case studies — editorial row layout instead of cards */}
      <section
        id="case-studies"
        className="border-t border-white/08 bg-carbon px-6 py-24 text-bone lg:px-12 lg:py-36"
      >
        <div className="mb-16 lg:mb-20">
          <span className="section-label">Applied to real drugs</span>
          <SplitLines
            as="h2"
            lines={["Documented", "drug programmes."]}
            delay={0.2}
            className="mt-4 font-display text-[clamp(2.4rem,7vw,8rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]"
          />
          <Reveal delay={0.4} className="mt-8 max-w-xl">
            <p className="text-sm leading-relaxed text-dust sm:text-base">
              Solid-form science applied to real pharmaceutical development programmes — characterisation, IP evaluation and crystal engineering for globally marketed drugs.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-white/08">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyRow key={cs.id} cs={cs} i={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
