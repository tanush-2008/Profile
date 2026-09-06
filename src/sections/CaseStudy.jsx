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
      className="bg-bone text-onyx"
    >
      {/* Section header */}
      <div className="border-t border-black/08 px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow text-graphite mb-8">Selected Drug Programs</div>
            <SplitLines
              as="h2"
              lines={["Science", "applied to", "real drugs."]}
              className="font-display text-[clamp(2rem,5vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em]"
            />
            <Reveal delay={0.3}>
              <p className="mt-8 text-sm leading-relaxed text-graphite sm:text-base max-w-xs">
                Solid-form science applied to documented pharmaceutical development programmes — from molecular analysis to IP protection.
              </p>
              <Link to="/innovation#case-studies" className="btn-primary on-light mt-8 inline-flex">
                Full case studies →
              </Link>
            </Reveal>
          </div>

          {/* Drug selector */}
          <div className="col-span-12 lg:col-span-8 lg:pl-12">
            <div className="border-t border-black/08">
              {CASE_STUDIES.map((cs, i) => (
                <button
                  key={cs.id}
                  data-testid={`drug-item-${cs.id}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "group w-full grid grid-cols-12 items-baseline gap-x-4 border-b border-black/08 py-6 text-left transition-colors duration-300",
                    active === i ? "bg-black/[0.025]" : ""
                  )}
                >
                  <span className="col-span-1 font-mono text-[10px] text-graphite">
                    0{i + 1}
                  </span>
                  <span className={cn(
                    "col-span-7 font-display text-[clamp(1.4rem,3.2vw,3rem)] uppercase tracking-tight leading-none transition-colors duration-400",
                    active === i ? "text-onyx" : "text-onyx/40"
                  )}>
                    {cs.drug}
                  </span>
                  <span className={cn(
                    "col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.15em] transition-colors duration-400",
                    active === i ? "text-copper" : "text-graphite/50"
                  )}>
                    {cs.tag}
                  </span>
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
