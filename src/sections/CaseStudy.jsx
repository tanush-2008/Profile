import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, EASE } from "@/components/motion";
import { PRODUCTS, HOME_PRODUCT_IDS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ITEMS = HOME_PRODUCT_IDS.map((id) => PRODUCTS.find((p) => p.id === id));

export const SelectedWork = () => {
  const [active, setActive] = useState(0);
  const cs = ITEMS[active];

  return (
    <section data-testid="selected-work-section" className="bg-parchment text-onyx">
      <div className="border-t border-black/06 px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <span className="section-label" style={{ color: "var(--graphite)" }}>Applied pharmaceutical science</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-balance">
              Filed<br />Products
            </h2>
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-xs text-sm leading-relaxed text-graphite sm:text-base">
                Novel solid forms invented, patented and carried through to Para-IV ANDAs and US Drug Master Files — including the first API co-crystal DMF from India.
              </p>
              <Link to="/innovation#products" data-testid="home-products-link" className="btn-primary on-light mt-8 inline-flex">
                All filed products →
              </Link>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <div className="relative border-t border-black/10">
              <div className="pointer-events-none absolute -top-[5px] left-6 z-20 h-2.5 w-2.5">
                <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-black/40" />
                <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-black/40" />
              </div>

              {ITEMS.map((c, i) => (
                <button
                  key={c.id}
                  data-testid={`drug-item-${c.id}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group relative flex w-full flex-col justify-center overflow-hidden border-b border-black/10 py-7 text-left transition-colors duration-300 hover:bg-black/[0.015] lg:py-9"
                >
                  <div className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,20vw,24rem)] font-bold leading-none text-black/[0.025]">
                    {c.drug[0]}
                  </div>
                  <div className="relative z-10 flex w-full items-center justify-between pl-6">
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="mt-1 w-6 flex-shrink-0 font-mono text-[11px] text-graphite/40">{String(i + 1).padStart(2, "0")}</span>
                      <span className={cn(
                        "font-display text-[clamp(2rem,5vw,5rem)] uppercase leading-[0.85] tracking-[-0.03em] transition-colors duration-400",
                        active === i ? "text-onyx" : "text-onyx/20 group-hover:text-onyx/40"
                      )}>
                        {c.drug.split(" ")[0]}
                      </span>
                    </div>
                    <span className={cn(
                      "hidden pr-4 text-right font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-400 sm:block",
                      active === i ? "text-copper" : "text-graphite/30"
                    )}>
                      {c.tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8 grid grid-cols-12 gap-x-4 gap-y-5"
                data-testid="home-product-detail"
              >
                <div className="col-span-12 sm:col-span-4">
                  <div className="eyebrow mb-2 text-graphite">Solid form</div>
                  <p className="text-sm text-onyx/85">{cs.drug} — {cs.form}</p>
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <div className="eyebrow mb-2 text-graphite">Patents</div>
                  <p className="font-mono text-[11px] leading-relaxed text-graphite">{cs.patents}</p>
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <div className="eyebrow mb-2 text-graphite">Regulatory filing</div>
                  <p className="text-sm text-onyx/85">{cs.filing}</p>
                  {cs.note && <p className="mt-2 font-serif text-base italic leading-relaxed text-graphite">{cs.note}</p>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
