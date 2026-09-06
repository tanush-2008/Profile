import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { CASE_STUDIES } from "@/lib/data";
import { cn } from "@/lib/utils";

export const SelectedWork = () => {
  const [active, setActive] = useState(0);
  const cs = CASE_STUDIES[active];

  return (
    <section
      data-testid="selected-work-section"
      className="bg-parchment text-onyx"
    >
      {/* Section header */}
      <div className="border-t border-black/06 px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <span className="section-label" style={{ color: "var(--graphite)" }}>Applied pharmaceutical science</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-balance">
              Documented<br />Drug Programmes
            </h2>
            <Reveal delay={0.3}>
              <p className="mt-8 text-sm leading-relaxed text-graphite sm:text-base max-w-xs">
                Solid-form science applied to documented pharmaceutical development — from molecular analysis to IP protection.
              </p>
              <Link to="/innovation#case-studies" className="btn-primary on-light mt-8 inline-flex">
                Full case studies →
              </Link>
            </Reveal>
          </div>

          {/* Drug selector */}
          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <div className="relative border-t border-black/10">
              {/* Architectural Crosshair */}
              <div className="absolute -top-[5px] left-6 h-2.5 w-2.5 pointer-events-none z-20">
                <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-black/40" />
                <div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-black/40" />
              </div>

              {CASE_STUDIES.map((c, i) => (
                <button
                  key={c.id}
                  data-testid={`drug-item-${c.id}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group relative w-full flex flex-col justify-center overflow-hidden border-b border-black/10 py-8 lg:py-10 text-left transition-colors duration-300 hover:bg-black/[0.015]"
                >
                  {/* Massive background watermark letter per row */}
                  <div className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 font-display text-[clamp(10rem,20vw,24rem)] font-bold leading-none text-black/[0.025] select-none">
                    {["C", "A", "S", "E", "S"][i]}
                  </div>

                  <div className="relative z-10 flex items-center justify-between w-full pl-6">
                    <div className="flex items-center gap-8 md:gap-16">
                      {/* Precisely aligned small index number */}
                      <span className="font-mono text-[11px] text-graphite/40 w-6 flex-shrink-0 mt-1">
                        0{i + 1}
                      </span>
                      {/* Massive typographic title */}
                      <span className={cn(
                        "font-display text-[clamp(2.5rem,6vw,6rem)] uppercase tracking-[-0.03em] leading-[0.85] transition-colors duration-400",
                        active === i ? "text-onyx" : "text-onyx/20 group-hover:text-onyx/40"
                      )}>
                        {c.drug}
                      </span>
                    </div>
                    {/* Tag */}
                    <span className={cn(
                      "hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-400 text-right pr-4",
                      active === i ? "text-copper" : "text-graphite/30"
                    )}>
                      {c.tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8 grid grid-cols-12 gap-x-4 gap-y-4"
              >
                <div className="col-span-12 sm:col-span-4">
                  <div className="eyebrow text-graphite mb-2">Indication</div>
                  <p className="text-sm text-onyx/80">{cs.indication}</p>
                </div>
                <div className="col-span-12 sm:col-span-8">
                  <div className="eyebrow text-graphite mb-2">Solid-Form Context</div>
                  <p className="text-sm leading-relaxed text-graphite">{cs.context}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
