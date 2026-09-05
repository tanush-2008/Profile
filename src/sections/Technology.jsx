import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NodeField } from "@/components/NodeField";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { TECH_MODES } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Technology = () => {
  const [mode, setMode] = useState(TECH_MODES[0].id);
  const active = TECH_MODES.find((m) => m.id === mode);

  return (
    <section data-testid="technology-section" className="border-t border-white/10 bg-ink px-6 py-28 text-bone lg:px-12 lg:py-40">
      <div className="grid grid-cols-12 gap-x-4 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <div className="eyebrow text-dust">02 — Technology</div>
          <SplitLines as="h2" lines={["A substrate", "that reasons", "about its work."]}
            className="mt-8 font-display text-[clamp(2rem,4.2vw,4.6rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-dust sm:text-base">
              Every AURELIS node observes its own workload, its neighbours and the physical state of the machine. The result is a computer that allocates itself — continuously, without a scheduler.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-14 border-t border-white/10">
            {TECH_MODES.map((m) => {
              const on = m.id === mode;
              return (
                <button key={m.id} data-testid={`tab-${m.id}`} onClick={() => setMode(m.id)} aria-pressed={on}
                  className="group relative grid w-full grid-cols-12 items-baseline border-b border-white/10 py-5 text-left transition-colors duration-300 hover:bg-white/[0.03]">
                  {on && <motion.span layoutId="tech-rule" className="absolute left-0 top-0 h-full w-px bg-copper" transition={{ duration: 0.6, ease: EASE }} />}
                  <span className="col-span-3 pl-4 font-mono text-[10px] tracking-[0.2em] text-dust sm:col-span-2">{m.index}</span>
                  <span className={cn("col-span-6 font-display text-base uppercase tracking-wide transition-colors duration-500 sm:col-span-7 sm:text-lg", on ? "text-bone" : "text-dust group-hover:text-bone/80")}>{m.label}</span>
                  <span className="col-span-3 text-right font-mono text-[10px] tracking-[0.15em] text-dust">{m.metric}</span>
                </button>
              );
            })}
          </Reveal>

          <div className="mt-8 min-h-[7rem]">
            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }}>
                <p data-testid="tech-mode-description" className="max-w-md text-sm leading-relaxed text-dust">{active.desc}</p>
                <dl className="mt-6 grid max-w-md grid-cols-2 gap-x-6">
                  {active.stats.map(([k, v]) => (
                    <div key={k} className="border-t border-white/10 pt-3">
                      <dt className="eyebrow text-dust">{k}</dt>
                      <dd className="mt-1 font-mono text-xs text-bone">{v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal delay={0.15} className="col-span-12 lg:col-span-7 lg:pl-8">
          <div className="corner-marks relative aspect-[4/3] min-h-[380px] border border-white/10 bg-ink-2 lg:aspect-auto lg:h-full lg:min-h-[640px]">
            <span className="cm" />
            <NodeField mode={mode} />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 eyebrow text-dust">
              <div className="flex justify-between"><span>Node matrix / 54 units</span><span className="hidden sm:block">Live</span></div>
              <div className="flex justify-between"><span className="text-bone">{active.label}</span><span>Rev. 4.2</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
