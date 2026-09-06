import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PUBLICATIONS, PUB_TOPICS, PUB_YEARS, PUB_TYPES } from "@/lib/publications";
import { cn } from "@/lib/utils";

const slug = (s) => String(s).toLowerCase().replace(/\s+/g, "-");

const FilterChip = ({ label, active, onClick, testid }) => (
  <button
    data-testid={testid}
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "relative font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 pb-1",
      active ? "text-copper" : "text-graphite hover:text-onyx"
    )}
  >
    {label}
    <span className={cn(
      "absolute -bottom-0.5 left-0 h-px w-full bg-copper origin-left transition-transform duration-400",
      active ? "scale-x-100" : "scale-x-0"
    )} />
  </button>
);

const FilterGroup = ({ label, options, value, onChange, prefix }) => (
  <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
    <span className="eyebrow w-16 text-graphite">{label}</span>
    {["All", ...options].map((o) => (
      <FilterChip
        key={o}
        label={o}
        active={value === o}
        onClick={() => onChange(o)}
        testid={`pub-filter-${prefix}-${slug(o)}`}
      />
    ))}
  </div>
);

const PubRow = ({ p, i, showYearDivider, year }) => {
  const [open, setOpen] = useState(false);
  const doiUrl = p.doi ? `https://doi.org/${p.doi}` : null;

  return (
    <>
      {/* Year divider */}
      {showYearDivider && (
        <li className="border-b border-black/06 py-4 flex items-center gap-4" aria-hidden>
          <span className="font-display text-2xl font-bold text-onyx/15 sm:text-3xl">{year}</span>
          <span className="flex-1 h-px bg-black/06" />
        </li>
      )}
      <motion.li
        layout
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: EASE, delay: i * 0.02 }}
        data-testid={`pub-row-${p.id}`}
        className="border-b border-black/08 archive-row"
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full py-6 lg:py-8 text-left grid grid-cols-12 gap-x-4 gap-y-2"
        >
          <span className="col-span-3 font-mono text-[11px] text-graphite lg:col-span-1">
            {p.year}
          </span>
          <span className="col-span-9 font-mono text-[9px] uppercase tracking-[0.2em] text-graphite lg:col-span-2">
            {p.type}
          </span>
          <h3 className="col-span-12 font-display text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 hover:text-copper sm:text-xl lg:col-span-6 lg:text-2xl">
            {p.title}
          </h3>
          <span className="col-span-8 text-sm text-graphite lg:col-span-2">
            {p.authors}
          </span>
          <span className="col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.15em] text-onyx lg:col-span-1">
            {p.topic}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pb-6 grid grid-cols-12 gap-x-4">
                <div className="col-span-12 lg:col-span-4 lg:col-start-3 space-y-3">
                  <div className="eyebrow text-graphite">Journal</div>
                  <p className="text-sm text-onyx">{p.journal}</p>
                </div>
                {doiUrl && (
                  <div className="col-span-12 lg:col-span-4 lg:col-start-8">
                    <a
                      href={doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-copper hover:text-copper"
                    >
                      DOI: {p.doi} →
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    </>
  );
};

export default function Publications() {
  const [year, setYear]   = useState("All");
  const [topic, setTopic] = useState("All");
  const [type, setType]   = useState("All");
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PUBLICATIONS.filter((p) =>
      (year === "All" || p.year === year) &&
      (topic === "All" || p.topic === topic) &&
      (type === "All" || p.type === type) &&
      (!q || p.title.toLowerCase().includes(q) || p.journal.toLowerCase().includes(q))
    );
  }, [year, topic, type, search]);

  const hasFilter = year !== "All" || topic !== "All" || type !== "All" || search;

  // Compute year dividers
  const yearDividers = useMemo(() => {
    const seen = new Set();
    return results.map((p) => {
      if (!seen.has(p.year) && year === "All") {
        seen.add(p.year);
        return true;
      }
      return false;
    });
  }, [results, year]);

  return (
    <main data-testid="page-publications">
      {/* Header */}
      <section className="min-h-[50svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="relative z-10">
          <span className="section-label">Peer-reviewed research</span>
          <SplitLines
            as="h1"
            lines={["40 peer-reviewed", "publications."]}
            delay={0.3}
            data-testid="page-publications-title"
            className="mt-4 font-display text-[clamp(2.6rem,8vw,9.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl lg:ml-auto lg:max-w-xl">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              Research spanning polymorphism, crystal engineering, pharmaceutical cocrystals, amorphous systems and solid-state characterisation.
            </p>
          </Reveal>
        </div>

        {/* Dramatic stat line */}
        <Reveal delay={0.6}>
          <div className="mt-16 border-t border-white/08 pt-8 flex flex-wrap gap-x-12 gap-y-4 items-baseline">
            <div>
              <span className="font-display text-4xl font-bold text-bone lg:text-5xl">40</span>
              <span className="eyebrow text-dust ml-3">Publications</span>
            </div>
            <div>
              <span className="font-display text-4xl font-bold text-copper lg:text-5xl">&gt;6,700</span>
              <span className="eyebrow text-dust ml-3">Citations</span>
            </div>
            <div>
              <span className="font-display text-4xl font-bold text-bone lg:text-5xl">24</span>
              <span className="eyebrow text-dust ml-3">H-index</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Archive */}
      <section className="bg-bone px-6 py-16 text-onyx lg:px-12 lg:py-24">
        {/* Search */}
        <Reveal className="mb-10">
          <div className="relative max-w-lg">
            <input
              type="search"
              placeholder="Search publications…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="pub-search"
              className="field pr-10 text-onyx placeholder:text-graphite"
              style={{ color: "var(--onyx)", borderBottomColor: "rgba(0,0,0,0.2)" }}
            />
            <span className="absolute right-0 bottom-3 font-mono text-[10px] text-graphite pointer-events-none">
              SEARCH
            </span>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal className="space-y-5 border-b border-black/10 pb-8">
          <FilterGroup label="Year"  prefix="year"  options={PUB_YEARS}  value={year}  onChange={setYear} />
          <FilterGroup label="Topic" prefix="topic" options={PUB_TOPICS} value={topic} onChange={setTopic} />
          <FilterGroup label="Type"  prefix="type"  options={PUB_TYPES}  value={type}  onChange={setType} />
        </Reveal>

        {/* Results header */}
        <div className="mt-6 flex items-baseline justify-between eyebrow text-graphite">
          <span data-testid="pub-results-count">
            {results.length} {results.length === 1 ? "publication" : "publications"}
          </span>
          {hasFilter && (
            <button
              data-testid="pub-filter-reset"
              onClick={() => { setYear("All"); setTopic("All"); setType("All"); setSearch(""); }}
              className="link-underline text-copper font-mono text-[10px] uppercase tracking-[0.2em]"
            >
              Clear all
            </button>
          )}
        </div>

        {/* List */}
        <motion.ul layout className="mt-4 border-t border-black/10">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p, i) => (
              <PubRow key={p.id} p={p} i={i} showYearDivider={yearDividers[i]} year={p.year} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {results.length === 0 && (
          <div
            data-testid="pub-empty"
            className="py-20 font-display text-2xl uppercase tracking-tight text-graphite"
          >
            No publications match.
          </div>
        )}
      </section>
    </main>
  );
}
