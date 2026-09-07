import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PUBLICATIONS, PUB_TOPICS, PUB_YEARS, PUB_TYPES, PUB_STATS, HIGHLY_CITED } from "@/lib/publications";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const slug = (s) => String(s).toLowerCase().replace(/\s+/g, "-");
const fmt = (n) => n.toLocaleString("en-US");

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
  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 sm:gap-x-8">
    <span className="eyebrow w-16 text-graphite">{label}</span>
    {["All", ...options].map((o) => (
      <FilterChip key={o} label={o} active={value === o} onClick={() => onChange(o)} testid={`pub-filter-${prefix}-${slug(o)}`} />
    ))}
  </div>
);

const Authors = ({ text, corresponding }) => {
  const parts = text.split(/(Peddy Vishweshwar\*?)/);
  return (
    <span>
      {parts.map((s, i) => /^Peddy Vishweshwar/.test(s) ? <strong key={i} className="font-semibold text-onyx">{s}</strong> : s)}
      {corresponding && <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.15em] text-copper">Corresponding author</span>}
    </span>
  );
};

const PubRow = ({ p, i, showYearDivider }) => {
  const [open, setOpen] = useState(false);
  const link = p.url || (p.doi ? `https://doi.org/${p.doi}` : null);

  return (
    <>
      {showYearDivider && (
        <li className="flex items-center gap-4 border-b border-black/06 py-4" aria-hidden>
          <span className="font-display text-2xl font-bold text-onyx/15 sm:text-3xl">{p.year}</span>
          <span className="h-px flex-1 bg-black/06" />
        </li>
      )}
      <motion.li
        layout
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: EASE, delay: Math.min(i * 0.02, 0.3) }}
        data-testid={`pub-row-${p.id}`}
        className="archive-row border-b border-black/08"
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          data-testid={`pub-toggle-${p.id}`}
          className="grid w-full grid-cols-12 gap-x-4 gap-y-2 py-6 text-left lg:py-8"
        >
          <span className="col-span-3 font-mono text-[11px] text-graphite lg:col-span-1">{p.year}</span>
          <span className="col-span-9 font-mono text-[9px] uppercase tracking-[0.2em] text-graphite lg:col-span-2">{p.type}</span>
          <h3 className={cn(
            "col-span-12 font-display text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-xl lg:col-span-6 lg:text-2xl",
            open ? "text-copper" : "hover:text-copper"
          )}>
            {p.title}
          </h3>
          <span className="col-span-8 text-sm text-graphite lg:col-span-2">{p.journal}</span>
          <span className="col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.15em] text-onyx lg:col-span-1">
            {p.citations ? <>&gt;{fmt(p.citations)} cit.</> : p.topic}
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
              data-testid={`pub-detail-${p.id}`}
            >
              <div className="grid grid-cols-12 gap-x-4 gap-y-6 pb-8 lg:pb-10">
                <div className="col-span-12 lg:col-span-6 lg:col-start-4">
                  <div className="eyebrow text-graphite mb-2">Authors</div>
                  <p className="text-sm leading-relaxed text-graphite"><Authors text={p.authors} corresponding={p.corresponding} /></p>
                  <div className="eyebrow text-graphite mb-2 mt-5">Citation</div>
                  <p className="text-sm text-onyx">{p.citation}</p>
                  {p.notes.length > 0 && (
                    <ul className="mt-5 space-y-1.5">
                      {p.notes.map((n) => (
                        <li key={n} className="flex items-baseline gap-3 text-sm text-graphite">
                          <span className="h-px w-3 flex-shrink-0 translate-y-[-2px] bg-copper/60" />{n}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="col-span-12 space-y-4 lg:col-span-3 lg:col-start-10">
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" data-testid={`pub-link-${p.id}`}
                       className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
                      {p.doi ? `DOI ${p.doi}` : "View publication"} →
                    </a>
                  )}
                  <div className="eyebrow text-graphite/70">Topic · {p.topic}</div>
                  <div className="eyebrow text-graphite/50">Source · Annexure p. {p.sourcePages.join(", ")}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    </>
  );
};

const HighlyCited = () => (
  <Reveal delay={0.6}>
    <div className="mt-16 border-t border-white/08 pt-8">
      <div className="mb-6 flex items-baseline justify-between eyebrow text-dust">
        <span>Most cited works</span>
        <span className="hidden sm:block">Google Scholar · {PUB_STATS.asOf}</span>
      </div>
      <div className="grid grid-cols-1 gap-px bg-white/08 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLY_CITED.map((p) => (
          <div key={p.id} data-testid={`highly-cited-${p.id}`} className="bg-ink p-5 lg:p-6">
            <div className="font-display text-3xl font-bold text-copper lg:text-4xl">&gt;{fmt(p.citations)}</div>
            <p className="mt-3 line-clamp-3 text-sm leading-snug text-bone/80">{p.title}</p>
            <p className="mt-2 eyebrow text-dust">{p.journal} · {p.year}</p>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

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
      (!q || p.title.toLowerCase().includes(q) || p.journal.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q))
    );
  }, [year, topic, type, search]);

  const hasFilter = year !== "All" || topic !== "All" || type !== "All" || search;

  const yearDividers = useMemo(() => {
    const seen = new Set();
    return results.map((p) => {
      if (year !== "All" || seen.has(p.year)) return false;
      seen.add(p.year);
      return true;
    });
  }, [results, year]);

  return (
    <main data-testid="page-publications">
      <SEO
        title="Peer-Reviewed Publications"
        description="40 peer-reviewed publications — 38 research articles, a book chapter and a review — on polymorphism, crystal engineering and pharmaceutical co-crystals. >6,700 citations, h-index 24."
        path="/publications"
      />
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
              {PUB_STATS.articles} original research articles, {PUB_STATS.bookChapters} book chapter and {PUB_STATS.reviews} comprehensive review — spanning polymorphism, crystal engineering, pharmaceutical co-crystals and solid-state structural characterisation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.6}>
          <div className="mt-16 flex flex-wrap items-baseline gap-x-12 gap-y-6 border-t border-white/08 pt-8">
            {[
              [PUB_STATS.citations, "Citations", true],
              [PUB_STATS.hIndex, "H-index"],
              [PUB_STATS.i10Index, "i10-index"],
              [PUB_STATS.over50, "Papers with >50 citations"],
            ].map(([v, l, accent]) => (
              <div key={l} data-testid={`pub-stat-${slug(l)}`}>
                <span className={cn("font-display text-4xl font-bold lg:text-5xl", accent ? "text-copper" : "text-bone")}>{v}</span>
                <span className="eyebrow text-dust ml-3">{l}</span>
              </div>
            ))}
            <a href={CONTACT.scholar} target="_blank" rel="noopener noreferrer" data-testid="pub-scholar-link"
               className="link-underline ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-dust hover:text-bone">
              Google Scholar ↗
            </a>
          </div>
        </Reveal>

        <HighlyCited />
      </section>

      <section className="bg-bone px-6 py-16 text-onyx lg:px-12 lg:py-24">
        <Reveal className="mb-10">
          <div className="relative max-w-lg">
            <label htmlFor="pub-search" className="sr-only">Search publications</label>
            <input
              id="pub-search"
              type="search"
              placeholder="Search by title, journal or author…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="pub-search"
              className="field pr-16 text-onyx placeholder:text-graphite"
              style={{ color: "var(--onyx)", borderBottomColor: "rgba(0,0,0,0.2)" }}
            />
            <span className="pointer-events-none absolute bottom-3 right-0 font-mono text-[10px] text-graphite">SEARCH</span>
          </div>
        </Reveal>

        <Reveal className="space-y-5 border-b border-black/10 pb-8">
          <FilterGroup label="Year"  prefix="year"  options={PUB_YEARS}  value={year}  onChange={setYear} />
          <FilterGroup label="Topic" prefix="topic" options={PUB_TOPICS} value={topic} onChange={setTopic} />
          <FilterGroup label="Type"  prefix="type"  options={PUB_TYPES}  value={type}  onChange={setType} />
        </Reveal>

        <div className="mt-6 flex items-baseline justify-between eyebrow text-graphite">
          <span data-testid="pub-results-count">{results.length} {results.length === 1 ? "publication" : "publications"}</span>
          {hasFilter && (
            <button
              data-testid="pub-filter-reset"
              onClick={() => { setYear("All"); setTopic("All"); setType("All"); setSearch(""); }}
              className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-copper"
            >
              Clear all
            </button>
          )}
        </div>

        <motion.ul layout className="mt-4 border-t border-black/10">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p, i) => <PubRow key={p.id} p={p} i={i} showYearDivider={yearDividers[i]} />)}
          </AnimatePresence>
        </motion.ul>

        {results.length === 0 && (
          <div data-testid="pub-empty" className="py-20 font-display text-2xl uppercase tracking-tight text-graphite">No publications match.</div>
        )}

        <p className="mt-12 eyebrow text-graphite/60">* Bold marks Dr. Peddy's authorship. Citation counts: Google Scholar, {PUB_STATS.asOf}. Source: VP_Annexure, pp. 24–34.</p>
      </section>
    </main>
  );
}
