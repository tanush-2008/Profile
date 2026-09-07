import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitLines, Rule, EASE } from "@/components/motion";
import { DOMAINS } from "@/lib/data";
import { NodeField } from "@/components/NodeField";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const DomainAccordion = ({ d, i, open, onToggle }) => (
  <Reveal delay={i * 0.04} data-testid={`research-domain-${d.id}`} id={d.id} className="scroll-mt-24 border-b border-white/08">
    <button
      onClick={() => onToggle(d.id)}
      aria-expanded={open}
      aria-controls={`domain-content-${d.id}`}
      data-testid={`domain-toggle-${d.id}`}
      className="group w-full grid grid-cols-12 gap-x-4 gap-y-4 py-10 text-left lg:py-12"
    >
      <span className="col-span-12 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-dust lg:col-span-1">
        <span>{d.index}</span>
        <span className="h-px w-8 bg-white/15" />
      </span>
      <h3 className={cn(
        "col-span-12 font-display font-bold uppercase leading-[0.88] tracking-[-0.04em] transition-colors duration-600",
        "text-[clamp(2.2rem,6.5vw,7.6rem)]",
        open ? "text-copper" : "text-bone group-hover:text-bone/75",
        "lg:col-span-8"
      )}>
        {d.title}
      </h3>
      <div className="col-span-12 flex items-center justify-between lg:col-span-3 lg:flex-col lg:items-end lg:justify-center gap-4">
        <span className="label-tag">{d.tag}</span>
        <span className={cn(
          "relative block h-4 w-4 transition-transform duration-500 flex-shrink-0",
          open && "rotate-45"
        )}>
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bone" />
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-bone" />
        </span>
      </div>
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`domain-content-${d.id}`}
          data-testid={`domain-drawer-${d.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-x-4 gap-y-10 border-t border-white/08 py-10">
            {/* Serif lede + body text */}
            <div className="col-span-12 lg:col-span-6">
              <p className="font-serif text-lg italic leading-relaxed text-bone/50 mb-5 lg:text-xl">
                {d.lede}
              </p>
              <p className="text-sm leading-relaxed text-dust sm:text-base max-w-prose">{d.body}</p>
            </div>
            {/* Key areas */}
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="eyebrow text-dust mb-5">Key Areas</div>
              <ul className="space-y-3">
                {d.keyAreas.map((a) => (
                  <li key={a} className="flex items-baseline gap-3 text-sm text-bone/80">
                    <span className="h-px w-4 bg-copper/60 flex-shrink-0 translate-y-[-2px]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </Reveal>
);

export default function Research() {
  const [openId, setOpenId] = useState("polymorphism");
  const toggle = (id) => setOpenId((v) => (v === id ? null : id));

  return (
    <main data-testid="page-research">
      <SEO
        title="Solid-State Research"
        description="Eight interconnected disciplines — polymorphism, pharmaceutical co-crystals, crystallisation, particle engineering, amorphous systems, solid-state characterisation, crystal structure prediction and IP strategy."
        path="/research"
      />
      {/* Header — asymmetric with watermark */}
      <section className="relative min-h-[70svh] overflow-hidden bg-ink px-6 pb-0 pt-36 text-bone lg:px-12 lg:pt-48">
        {/* Large watermark numeral */}
        <div className="absolute right-6 top-24 font-display text-[clamp(10rem,30vw,28rem)] font-bold leading-none text-white/[0.02] pointer-events-none select-none lg:right-12" aria-hidden>
          8
        </div>

        {/* Crystal lattice panel */}
        <div className="absolute right-0 top-0 h-full w-[45%] hidden lg:block opacity-30">
          <div className="corner-marks relative h-full border-l border-white/06">
            <span className="cm" />
            <NodeField mode="polymorphism" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 eyebrow text-dust">
              <div className="flex justify-between">
                <span>Crystal lattice / monoclinic P</span>
                <span>Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bone">Unit cell visualisation</span>
                <span>300+ structures</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title — full width for impact */}
        <div className="relative z-10">
          <span className="section-label">Eight scientific disciplines</span>
          <SplitLines
            as="h1"
            lines={["The solid-state", "sciences."]}
            delay={0.3}
            data-testid="page-research-title"
            className="mt-4 font-display text-[clamp(3rem,9vw,10.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              Pharmaceutical solid-state science spans eight interconnected disciplines — from crystal engineering and polymorph screening to PAT-enabled crystallisation and particle engineering at plant scale. Together they determine whether a drug can be manufactured, stabilised, protected and filed.
            </p>
          </Reveal>
        </div>

        {/* Stats bar */}
        <Reveal delay={0.6}>
          <div className="relative z-10 mt-16 grid grid-cols-4 gap-x-4 gap-y-8 border-t border-white/08 pt-6 sm:grid-cols-4 eyebrow text-dust">
            {[
              ["300+", "Crystal structures solved & refined"],
              [">200", "Solid forms assessed for novelty"],
              ["200+", "Solid forms on ICH stability"],
              ["40+", "Client programmes delivered"],
            ].map(([v, l]) => (
              <div key={l} className="col-span-2 sm:col-span-1">
                <div className="font-display text-xl font-bold text-bone sm:text-2xl">{v}</div>
                <div className="mt-1">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Domain accordions */}
      <section className="bg-ink px-6 py-16 text-bone lg:px-12 lg:py-24">
        <Rule className="mb-0" />
        {DOMAINS.map((d, i) => (
          <DomainAccordion
            key={d.id}
            d={d}
            i={i}
            open={openId === d.id}
            onToggle={toggle}
          />
        ))}
      </section>
    </main>
  );
}
