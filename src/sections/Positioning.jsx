import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, EASE } from "@/components/motion";
import { DOMAINS } from "@/lib/data";
import { cn } from "@/lib/utils";

export const ScientificDomains = () => {
  const [active, setActive] = useState(0);
  const a = DOMAINS[active];

  return (
    <section
      data-testid="domains-section"
      className="border-t border-white/08 bg-ink px-6 py-28 text-bone lg:px-12 lg:py-40"
    >
      {/* Section header — uses serif label for variety */}
      <div className="grid grid-cols-12 gap-x-4 mb-16 lg:mb-24">
        <div className="col-span-12 lg:col-span-6">
          <span className="section-label">Eight interconnected disciplines</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-balance">
            Research<br />Domains
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
          <p className="text-sm leading-relaxed text-dust max-w-xs">
            Pharmaceutical solid-state science — from crystal engineering and polymorph screening to PAT-enabled crystallisation and particle engineering at plant scale.
          </p>
        </div>
      </div>

      {/* Domain index — left list, right detail */}
      <div className="grid grid-cols-12 gap-x-4 gap-y-10">
        {/* Domain list */}
        <div className="col-span-12 lg:col-span-7">
          <Reveal className="border-t border-white/08">
            <ul>
              {DOMAINS.map((d, i) => (
                <li key={d.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    data-testid={`domain-item-${d.id}`}
                    className="group w-full flex items-baseline gap-x-6 border-b border-white/08 py-5 lg:py-7 text-left"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-dust w-8 flex-shrink-0">
                      {d.index}
                    </span>
                    <span className={cn(
                      "flex-1 font-display text-[clamp(1.3rem,3vw,2.8rem)] uppercase leading-[1.05] tracking-[-0.02em] transition-colors duration-500",
                      active === i ? "text-bone" : "text-bone/25"
                    )}>
                      {d.title}
                    </span>
                    <span className={cn(
                      "hidden sm:block font-mono text-[9px] tracking-[0.15em] transition-colors duration-500 flex-shrink-0",
                      active === i ? "text-copper" : "text-dust/40"
                    )}>
                      {d.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Detail panel — text only, no decorative art */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={`detail-${active}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="space-y-5"
              >
                <div className="eyebrow text-copper">{a.tag}</div>
                <p className="font-serif text-lg italic leading-relaxed text-bone/60 lg:text-xl">
                  {a.lede}
                </p>
                <p
                  data-testid="domain-active-body"
                  className="text-sm leading-relaxed text-dust max-w-sm"
                >
                  {a.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <Link
              to="/research"
              className="btn-ghost mt-8 inline-flex"
            >
              Full research overview →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
