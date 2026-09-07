import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { GenerativeCanvas } from "@/components/GenerativeCanvas";
import { EASE } from "@/components/motion";
import { METRICS } from "@/lib/data";
import "./Hero.css";

const DESKTOP_LINES = ["Engineering", "the solid state", "of medicines."];
const MOBILE_LINES = ["Engineering", "the solid", "state of", "medicines."];

const HeroHeadline = ({ reduced }) => (
  <h1 className="hero-refined-headline font-display" data-testid="hero-headline" aria-label="Engineering the solid state of medicines.">
    {[DESKTOP_LINES, MOBILE_LINES].map((lines, group) => (
      <span key={group} className={group ? "hero-mobile-lines" : "hero-desktop-lines"} aria-hidden="true">
        {lines.map((line, index) => (
          <span className="hero-line-mask" key={line}>
            <motion.span
              className="hero-line"
              initial={reduced ? false : { y: "106%", rotate: 0.7 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: reduced ? 0 : 0.8, ease: EASE, delay: reduced ? 0 : 0.24 + index * 0.075 }}
            >{line}</motion.span>
          </span>
        ))}
      </span>
    ))}
  </h1>
);

const MetricBadge = ({ m, delay, reduced }) => (
  <motion.div
    initial={reduced ? false : { opacity: 0, y: 7 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.6, ease: EASE }}
    className="hero-refined-metric"
    data-testid={`hero-metric-${m.id}`}
  >
    <span className="font-display hero-metric-value">
      {m.id === "citations" ? ">6,700" : m.value}
      {m.suffix && <span className="text-copper">{m.suffix}</span>}
    </span>
    <span className="eyebrow hero-metric-label">{m.label}</span>
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 58]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.16]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const reveal = (delay, y = 9) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.7, ease: EASE },
  });

  return (
    <section ref={ref} data-testid="hero-section" className="hero-refined relative min-h-[100svh] overflow-hidden bg-ink text-bone">
      <motion.div style={reduced ? { opacity: 1 } : { y: canvasY, opacity: canvasOpacity }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 1.35, delay: reduced ? 0 : 0.1 }} className="h-full w-full">
          <GenerativeCanvas className="hero-canvas h-full w-full" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 crystal-bg opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="hero-refined-content relative z-10">
        <motion.div {...reveal(0.2, 0)} style={{ opacity: reduced ? 1 : metaOpacity }} className="hero-refined-meta grid grid-cols-12 gap-4 eyebrow text-dust" data-testid="hero-meta">
          <div className="col-span-6 lg:col-span-3">Pharmaceutical Scientist</div>
          <div className="hidden lg:col-span-3 lg:block">Researcher · Inventor</div>
          <div className="col-span-6 text-right lg:col-span-3 lg:text-left">Hyderabad, India</div>
          <div className="hidden lg:col-span-3 lg:block lg:text-right">Two Decades in R&amp;D</div>
        </motion.div>

        <motion.div style={reduced ? undefined : { y: titleY }} className="hero-refined-main grid grid-cols-12 items-end gap-x-4">
          <div className="hero-refined-title-column col-span-12 lg:col-span-9">
            <motion.div {...reveal(0.15, 6)} className="hero-refined-name flex items-center gap-3" data-testid="hero-identity">
              <span className="hero-name-mark relative flex h-5 w-5 items-center justify-center" aria-hidden="true"><span className="h-1 w-1 bg-copper" /></span>
              <span className="eyebrow text-copper">Dr. Vishweshwar Peddy</span>
            </motion.div>
            <HeroHeadline reduced={reduced} />
          </div>

          <div className="hero-refined-aside col-span-12 lg:col-span-3">
            <motion.p {...reveal(0.55)} data-testid="hero-supporting-text" className="hero-refined-description">
              Turning molecular structure into defined crystalline solid — and crystalline solid into safe, manufacturable pharmaceutical products.
            </motion.p>
            <motion.div {...reveal(0.68)} className="hero-refined-actions">
              <Link to="/research" data-testid="cta-explore-research" className="btn-primary">Explore Research</Link>
              <Link to="/publications" data-testid="cta-view-publications" className="link-underline hero-publications-link">Publications →</Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="hero-refined-bottom" data-testid="hero-metrics-strip">
          {METRICS.map((m, index) => <MetricBadge key={m.id} m={m} delay={0.86 + index * 0.045} reduced={reduced} />)}
          <div className="hero-refined-scroll eyebrow text-dust" aria-hidden="true">Scroll <span className="scroll-line block h-px w-10 bg-bone/40" /></div>
        </div>
      </div>
    </section>
  );
};