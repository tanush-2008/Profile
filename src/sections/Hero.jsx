import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GenerativeCanvas } from "@/components/GenerativeCanvas";
import { SplitLines, EASE } from "@/components/motion";
import { useRequestAccess } from "@/components/RequestAccess";

export const Hero = () => {
  const ref = useRef(null);
  const { open } = useRequestAccess();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const scrollToHelios = (e) => {
    e.preventDefault();
    document.getElementById("helios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} data-testid="hero-section" className="relative min-h-[100svh] overflow-hidden bg-ink text-bone">
      <motion.div style={{ y: canvasY, opacity: canvasOpacity }} className="absolute inset-0">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }} className="h-full w-full">
          <GenerativeCanvas className="hero-canvas h-full w-full" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pb-8 pt-28 lg:px-12 lg:pb-10 lg:pt-36">
        <motion.div style={{ opacity: metaOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
          className="grid grid-cols-12 gap-4 eyebrow text-dust">
          <div className="col-span-6 lg:col-span-3">Autonomous computing systems</div>
          <div className="hidden lg:col-span-3 lg:block">For science, simulation &amp; engineering</div>
          <div className="col-span-6 text-right lg:col-span-3 lg:text-left">Zürich — Pasadena</div>
          <div className="hidden lg:col-span-3 lg:block lg:text-right">001 / 010</div>
        </motion.div>

        <motion.div style={{ y: titleY }} className="mt-auto grid grid-cols-12 items-end gap-x-4 pt-20">
          <div className="col-span-12 lg:col-span-9">
            <SplitLines
              as="h1"
              data-testid="hero-headline"
              lines={["Intelligence", "at the edge", "of possibility."]}
              delay={0.55}
              className="font-display text-[clamp(2.4rem,8.3vw,9.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em]"
            />
          </div>
          <div className="col-span-12 mt-12 max-w-sm lg:col-span-3 lg:mt-0 lg:pb-3 lg:pl-4">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 1, ease: EASE }}
              data-testid="hero-supporting-text" className="text-sm leading-relaxed text-dust sm:text-base">
              AURELIS builds autonomous computing systems that reason about their own work — accelerating simulation, discovery and engineering beyond the limits of conventional architecture.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 1, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button data-testid="cta-deploy-cluster" onClick={open} className="btn-primary">Request Access</button>
              <a href="#helios" onClick={scrollToHelios} data-testid="cta-view-helios" className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80 hover:text-bone">
                View Project Helios
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="mt-16 flex items-center justify-between border-t border-white/15 pt-4 eyebrow text-dust lg:mt-24">
          <span>47.3769° N / 8.5417° E</span>
          <span className="hidden items-center gap-2 sm:flex"><span className="h-1.5 w-1.5 bg-copper pulse-dot" />Field: active</span>
          <span className="flex items-center gap-3">Scroll <span className="scroll-line block h-px w-10 bg-bone/50" /></span>
        </motion.div>
      </div>
    </section>
  );
};
