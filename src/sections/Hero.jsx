import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { GenerativeCanvas } from "@/components/GenerativeCanvas";
import { SplitLines, EASE } from "@/components/motion";
import { METRICS } from "@/lib/data";

const MetricBadge = ({ m, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: EASE }}
    className="flex flex-col gap-1 border-l border-white/15 pl-4"
  >
    <span className="font-display text-xl font-bold leading-none tracking-tight sm:text-2xl">
      {m.id === "citations" ? ">6,700" : m.value}
      {m.suffix && <span className="text-copper">{m.suffix}</span>}
    </span>
    <span className="eyebrow text-dust leading-tight">{m.label}</span>
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden bg-ink text-bone"
    >
      {/* Diffraction canvas background */}
      <motion.div style={{ y: canvasY, opacity: canvasOpacity }} className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="h-full w-full"
        >
          <GenerativeCanvas className="hero-canvas h-full w-full" />
        </motion.div>
      </motion.div>

      {/* Subtle crystal grid overlay */}
      <div className="absolute inset-0 crystal-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pb-8 pt-28 lg:px-12 lg:pb-10 lg:pt-36">
        {/* Top meta row */}
        <motion.div
          style={{ opacity: metaOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="grid grid-cols-12 gap-4 eyebrow text-dust"
        >
          <div className="col-span-6 lg:col-span-3">Pharmaceutical Scientist</div>
          <div className="hidden lg:col-span-3 lg:block">Researcher · Inventor</div>
          <div className="col-span-6 text-right lg:col-span-3 lg:text-left">Hyderabad, India</div>
          <div className="hidden lg:col-span-3 lg:block lg:text-right">Two Decades in R&amp;D</div>
        </motion.div>

        {/* Main headline */}
        <motion.div style={{ y: titleY }} className="mt-auto grid grid-cols-12 items-end gap-x-4 pt-20">
          <div className="col-span-12 lg:col-span-9">
            {/* Eyebrow title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="relative flex h-5 w-5 items-center justify-center border border-copper/50">
                <span className="h-1 w-1 bg-copper" />
              </span>
              <span className="eyebrow text-copper tracking-[0.3em]">
                Dr. Vishweshwar Peddy
              </span>
            </motion.div>

            <SplitLines
              as="h1"
              data-testid="hero-headline"
              lines={["Engineering", "the solid state", "of medicines."]}
              delay={0.55}
              className="font-display text-[clamp(2.6rem,8.8vw,10rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]"
            />
          </div>

          {/* Right column — descriptor + CTA */}
          <div className="col-span-12 mt-12 max-w-[22rem] lg:col-span-3 lg:mt-0 lg:pb-3 lg:pl-4">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1, ease: EASE }}
              data-testid="hero-supporting-text"
              className="text-sm leading-relaxed text-dust sm:text-base"
            >
              Turning molecular structure into defined crystalline solid — and crystalline solid into safe, manufacturable pharmaceutical products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link to="/research" data-testid="cta-explore-research" className="btn-primary">
                Explore Research
              </Link>
              <Link
                to="/publications"
                data-testid="cta-view-publications"
                className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 hover:text-bone"
              >
                Publications →
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom bar — metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-10 lg:mt-14"
        >
          <div className="border-t border-white/12 pt-5 flex flex-wrap items-start gap-6 sm:gap-10">
            {METRICS.map((m, i) => (
              <MetricBadge key={m.id} m={m} delay={1.8 + i * 0.08} />
            ))}
            <div className="ml-auto hidden items-center gap-3 sm:flex eyebrow text-dust self-center">
              Scroll <span className="scroll-line block h-px w-10 bg-bone/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
