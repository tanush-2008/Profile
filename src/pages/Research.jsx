import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PUBLICATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

const slug = (s) => String(s).toLowerCase().replace(/\s+/g, "-");
const YEARS = [...new Set(PUBLICATIONS.map((p) => p.year))].sort((a, b) => b - a);
const DOMAINS = [...new Set(PUBLICATIONS.map((p) => p.domain))].sort();

const FilterGroup = ({ label, options, value, onChange, prefix }) => (
  <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
    <span className="eyebrow w-16 text-graphite">{label}</span>
    {["All", ...options].map((o) => {
      const on = value === o;
      return (
        <button key={o} data-testid={`research-filter-${prefix}-${slug(o)}`} onClick={() => onChange(o)} aria-pressed={on}
          className={cn("relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300", on ? "text-copper" : "text-graphite hover:text-onyx")}>
          {o}
          <span className={cn("absolute -bottom-1 left-0 h-px w-full bg-copper origin-left transition-transform duration-500", on ? "scale-x-100" : "scale-x-0")} />
        </button>
      );
    })}
  </div>
);

const Row = ({ p, i }) => (
  <motion.li layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.03 }}
    data-testid={`research-row-${p.id}`} className="group grid grid-cols-12 gap-x-4 gap-y-3 border-b border-black/10 py-7 lg:py-9">
    <span className="col-span-3 font-mono text-[11px] text-graphite lg:col-span-1">{p.year}</span>
    <span className="col-span-9 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite lg:col-span-2">{p.type} / {p.ref}</span>
    <h2 className="col-span-12 font-display text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-copper sm:text-xl lg:col-span-6 lg:text-2xl">{p.title}</h2>
    <span className="col-span-8 text-sm text-graphite lg:col-span-2">{p.authors}</span>
    <span className="col-span-4 text-right font-mono text-[10px] uppercase tracking-[0.15em] text-onyx lg:col-span-1">{p.domain}</span>
  </motion.li>
);

export default function Research() {
  const [year, setYear] = useState("All");
  const [domain, setDomain] = useState("All");
  const results = useMemo(
    () => PUBLICATIONS.filter((p) => (year === "All" || p.year === year) && (domain === "All" || p.domain === domain)),
    [year, domain]
  );

  return (
    <main data-testid="page-research">
      <section className="min-h-[60svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 eyebrow text-dust lg:col-span-2">08 — Research</div>
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <SplitLines as="h1" lines={["Publications", "& Preprints."]} delay={0.3} data-testid="page-research-title"
              className="font-display text-[clamp(2.6rem,8vw,9rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]" />
          </div>
          <Reveal delay={0.5} className="col-span-12 lg:col-span-5 lg:col-start-7">
            <p className="text-base leading-relaxed text-dust sm:text-lg">We publish what we learn. Research from AURELIS laboratories and partner institutions, in the order it was released.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone px-6 py-20 text-onyx lg:px-12 lg:py-32">
        <Reveal className="space-y-5 border-b border-black/15 pb-10">
          <FilterGroup label="Year" prefix="year" options={YEARS} value={year} onChange={setYear} />
          <FilterGroup label="Domain" prefix="domain" options={DOMAINS} value={domain} onChange={setDomain} />
        </Reveal>

        <div className="mt-8 flex items-baseline justify-between eyebrow text-graphite">
          <span data-testid="research-results-count">{results.length} {results.length === 1 ? "entry" : "entries"}</span>
          {(year !== "All" || domain !== "All") && (
            <button data-testid="research-filter-reset" onClick={() => { setYear("All"); setDomain("All"); }} className="link-underline text-copper">Reset filters</button>
          )}
        </div>

        <motion.ul layout className="mt-6 border-t border-black/15">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p, i) => <Row key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </motion.ul>
        {results.length === 0 && (
          <div data-testid="research-empty" className="py-20 font-display text-2xl uppercase tracking-tight text-graphite">No publications match.</div>
        )}
      </section>
    </main>
  );
}
