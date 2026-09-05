import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, EASE } from "@/components/motion";
import { CAPABILITIES } from "@/lib/data";
import { cn } from "@/lib/utils";

const layouts = {
  left: { title: "lg:col-span-7", lede: "lg:col-span-4 lg:col-start-9", body: "lg:col-span-4 lg:col-start-9" },
  right: { title: "lg:col-span-7 lg:col-start-6 lg:text-right", lede: "lg:col-span-4 lg:col-start-1 lg:row-start-1", body: "lg:col-span-4 lg:col-start-1" },
  center: { title: "lg:col-span-6 lg:col-start-4", lede: "lg:col-span-3 lg:col-start-1 lg:row-start-1", body: "lg:col-span-3 lg:col-start-10" },
};

const CapabilityRow = ({ c, i }) => {
  const [open, setOpen] = useState(false);
  const L = layouts[c.align];
  return (
    <Reveal delay={i * 0.05} data-testid={`cap-${c.id}`} className="border-b border-white/10">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} data-testid={`cap-toggle-${c.id}`}
        className="group grid w-full grid-cols-12 gap-x-4 gap-y-6 py-12 text-left lg:py-16">
        <span className="col-span-12 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-dust lg:col-span-1">
          <span>{c.index}</span><span className="h-px w-8 bg-white/20" />
        </span>
        <h3 className={cn("col-span-12 font-display text-[clamp(2.6rem,7.4vw,8.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em] transition-colors duration-700", open ? "text-copper" : "text-bone group-hover:text-bone/70", L.title)}>
          {c.title}
        </h3>
        <p className={cn("col-span-12 self-end font-display text-base uppercase tracking-wide text-bone/80 sm:text-lg", L.lede)}>{c.lede}</p>
        <p className={cn("col-span-12 self-end text-sm leading-relaxed text-dust", L.body)}>{c.body}</p>
        <span className="col-span-12 flex items-center justify-end gap-3 eyebrow text-dust lg:col-span-12">
          <span>{open ? "Close" : "Parameters"}</span>
          <span className={cn("relative block h-3 w-3 transition-transform duration-500", open && "rotate-45")}>
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bone" /><span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-bone" />
          </span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div data-testid={`cap-drawer-${c.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="overflow-hidden">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 py-8 sm:grid-cols-4">
              {c.params.map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-dust">{k}</dt>
                  <dd className="mt-2 font-mono text-sm text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
};

export const Capabilities = () => (
  <section data-testid="capabilities-section" className="bg-ink px-6 py-28 text-bone lg:px-12 lg:py-40">
    <div className="grid grid-cols-12 gap-x-4 border-b border-white/10 pb-10">
      <div className="col-span-6 eyebrow text-dust">03 — Capabilities</div>
      <div className="col-span-6 text-right eyebrow text-dust">Index / A–C</div>
    </div>
    {CAPABILITIES.map((c, i) => <CapabilityRow key={c.id} c={c} i={i} />)}
  </section>
);
