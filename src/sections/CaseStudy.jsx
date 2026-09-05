import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitLines } from "@/components/motion";
import { IMG } from "@/lib/data";

const META = [
  ["Client", "Undisclosed aerospace consortium"],
  ["Domain", "Ni-superalloy microstructure"],
  ["Substrate", "AURELIS A-Series, 128 nodes"],
  ["Duration", "6 days (est. 18 weeks conventional)"],
];

const Stat = ({ v, l, testid }) => (
  <div data-testid={testid}>
    <div className="font-display text-5xl font-bold leading-none tracking-[-0.04em] sm:text-6xl">{v}</div>
    <div className="mt-3 eyebrow text-dust">{l}</div>
  </div>
);

export const CaseStudy = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="helios" data-testid="case-study-helios" className="bg-ink text-bone">
      <div ref={ref} className="relative h-[72vh] overflow-hidden lg:h-screen">
        <motion.img src={IMG.helios} alt="Crystalline alloy lattice — Project Helios" style={{ y }}
          className="absolute inset-0 h-[124%] w-full -translate-y-[12%] object-cover" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />

        <div className="absolute inset-x-0 top-0 flex justify-between px-6 pt-24 eyebrow text-bone/80 lg:px-12 lg:pt-32">
          <span>06 — Case study</span><span>Project Helios / 2026</span>
        </div>
        <div className="absolute bottom-8 left-6 right-6 lg:bottom-14 lg:left-12">
          <SplitLines as="h2" lines={["Project", "Helios"]} stagger={0.15}
            className="font-display text-[clamp(3.6rem,12vw,14rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em]" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-4 gap-y-14 border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <Reveal className="col-span-12 lg:col-span-5">
          <h3 className="font-display text-2xl font-medium leading-tight sm:text-3xl lg:text-4xl">“Mapping the behavior of next-generation materials.”</h3>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-dust sm:text-base">
            Helios resolved the grain-boundary dynamics of a nickel superalloy that had never been manufactured — 1.2 billion particles, coupled to a thermal model, running as a single continuously rebalanced workload. The alloy went to casting three weeks later.
          </p>
          <Link to="/research" data-testid="helios-paper-btn" className="btn-ghost mt-10">Read the technical brief <span aria-hidden>→</span></Link>
        </Reveal>

        <Reveal delay={0.15} className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          <Stat testid="helios-metric-particles" v={<>1.2<span className="text-copper">B</span></>} l="Particles simulated" />
          <Stat testid="helios-metric-latency" v={<>0.4<span className="text-copper">ms</span></>} l="p99 step latency" />
          <Stat testid="helios-metric-time" v={<>21<span className="text-copper">×</span></>} l="Faster than conventional" />
          <dl className="col-span-2 mt-4 grid grid-cols-1 gap-y-4 border-t border-white/10 pt-6 sm:col-span-3 sm:grid-cols-2 sm:gap-x-8">
            {META.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-white/10 pb-3 text-xs">
                <dt className="eyebrow text-dust">{k}</dt><dd className="text-right font-mono text-bone/90">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};
