import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PATENTS, PAT_STATUSES, PAT_YEARS, PAT_STATS } from "@/lib/patents";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const slug = (s) => String(s).toLowerCase().replace(/[\s/]+/g, "-");

const StatusBadge = ({ status }) => {
  const colors = { Granted: "copper", "PCT/US": "teal", Indian: "" };
  return <span className={cn("label-tag", colors[status] || "")}>{status}</span>;
};

const FilterChip = ({ label, active, onClick, testid }) => (
  <button
    data-testid={testid}
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "relative font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 pb-1",
      active ? "text-copper" : "text-dust hover:text-bone"
    )}
  >
    {label}
    <span className={cn(
      "absolute -bottom-0.5 left-0 h-px w-full bg-copper origin-left transition-transform duration-400",
      active ? "scale-x-100" : "scale-x-0"
    )} />
  </button>
);

const Inventors = ({ text }) => {
  const parts = text.split(/(Vishweshwar Peddy|Peddy Vishweshwar)/);
  return <>{parts.map((s, i) => /Peddy/.test(s) ? <strong key={i} className="font-semibold text-bone">{s}</strong> : s)}</>;
};

const PatentRow = ({ p, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: EASE, delay: Math.min(i * 0.015, 0.3) }}
      data-testid={`patent-row-${p.id}`}
      className="archive-row border-b border-white/08"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid={`patent-toggle-${p.id}`}
        className="grid w-full grid-cols-12 gap-x-4 gap-y-2 py-6 text-left lg:py-7"
      >
        <span className="col-span-3 font-mono text-[10px] text-dust lg:col-span-1">{p.year ?? "—"}</span>
        <span className="col-span-9 flex items-center gap-3 lg:col-span-2"><StatusBadge status={p.status} /></span>
        <h3 className={cn(
          "col-span-12 font-display text-base font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-lg lg:col-span-6 lg:text-xl",
          open ? "text-copper" : "hover:text-copper"
        )}>
          {p.title}
        </h3>
        <span className="col-span-8 font-mono text-[9px] uppercase tracking-[0.1em] text-dust lg:col-span-2">{p.identifier}</span>
        <span className="col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.15em] text-dust lg:col-span-1">{p.jurisdiction}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
            data-testid={`patent-detail-${p.id}`}
          >
            <div className="grid grid-cols-12 gap-x-4 gap-y-6 pb-8">
              <div className="col-span-12 lg:col-span-6 lg:col-start-4">
                <div className="eyebrow text-dust mb-2">Inventors</div>
                <p className="text-sm leading-relaxed text-dust"><Inventors text={p.inventors} /></p>
                {p.documents.length > 0 && (
                  <>
                    <div className="eyebrow text-dust mb-2 mt-5">Publication family</div>
                    <p className="font-mono text-[11px] leading-relaxed text-bone/70">{p.documents.join(" ")}</p>
                  </>
                )}
              </div>
              <div className="col-span-12 space-y-4 lg:col-span-3 lg:col-start-10">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" data-testid={`patent-link-${p.id}`}
                     className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
                    Google Patents →
                  </a>
                )}
                <div className="eyebrow text-dust/50">Source · Annexure p. {p.sourcePages.join(", ")}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const PortfolioSummary = () => (
  <Reveal>
    <div className="mb-10 grid grid-cols-2 gap-x-6 gap-y-8 border-b border-white/08 pb-10 sm:grid-cols-4">
      {[
        [PAT_STATS.granted, "Granted", PAT_STATS.grantedBreakdown, "Granted"],
        [PAT_STATS.pct, "PCT/US", "Published applications, distinct families", "PCT/US"],
        [PAT_STATS.indian, "Indian", "Complete & provisional filings", "Indian"],
        [PAT_STATS.total, "Total filings", "Co-inventor on every filing", null],
      ].map(([v, l, note, badge]) => (
        <div key={l} data-testid={`patent-stat-${slug(l)}`}>
          <div className="flex items-baseline gap-4">
            <span className={cn("font-display text-4xl font-bold lg:text-5xl", badge ? "text-bone" : "text-copper")}>{v}</span>
            {badge ? <StatusBadge status={badge} /> : <span className="eyebrow text-dust">{l}</span>}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-dust">{note}</p>
        </div>
      ))}
    </div>
  </Reveal>
);

export default function Patents() {
  const [status, setStatus] = useState("All");
  const [year, setYear]     = useState("All");
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PATENTS.filter((p) =>
      (status === "All" || p.status === status) &&
      (year === "All" || p.year === year) &&
      (!q || p.title.toLowerCase().includes(q) || p.identifier.toLowerCase().includes(q) || p.inventors.toLowerCase().includes(q))
    );
  }, [status, year, search]);

  const hasFilter = status !== "All" || year !== "All" || search;

  return (
    <main data-testid="page-patents">
      <SEO
        title="Patents & Intellectual Property"
        description="79 patent filings — 14 granted, 30 PCT/US and 36 Indian applications — on novel solid forms, co-crystals, amorphous dispersions and crystallisation processes of APIs."
        path="/patents"
      />
      <section className="min-h-[50svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="relative z-10">
          <span className="section-label">Intellectual property portfolio</span>
          <SplitLines
            as="h1"
            lines={["79 patent", "filings."]}
            delay={0.3}
            data-testid="page-patents-title"
            className="mt-4 font-display text-[clamp(3rem,9.5vw,11rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl lg:ml-auto lg:max-w-xl">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              Co-inventor on 79 patents for novel solid forms of APIs and innovative crystallisation processes — 14 granted (12 in the United States, 1 in Australia, 1 in India), 30 PCT/US applications and 36 Indian filings. Novelty assessed for more than 200 solid forms; non-infringement evaluated for more than 15.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-16 text-bone lg:px-12 lg:py-24">
        <PortfolioSummary />

        <Reveal className="mb-8">
          <div className="relative max-w-lg">
            <label htmlFor="patent-search" className="sr-only">Search patents</label>
            <input
              id="patent-search"
              type="search"
              placeholder="Search by title, number or inventor…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="patent-search"
              className="field pr-16"
            />
            <span className="pointer-events-none absolute bottom-3 right-0 font-mono text-[10px] text-dust">SEARCH</span>
          </div>
        </Reveal>

        <Reveal className="mb-4 flex flex-col gap-y-4 border-b border-white/08 pb-8">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 sm:gap-x-8">
            <span className="eyebrow w-16 text-dust">Status</span>
            {["All", ...PAT_STATUSES].map((s) => (
              <FilterChip key={s} label={s} active={status === s} onClick={() => setStatus(s)} testid={`pat-filter-status-${slug(s)}`} />
            ))}
          </div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 sm:gap-x-8">
            <span className="eyebrow w-16 text-dust">Year</span>
            {["All", ...PAT_YEARS].map((y) => (
              <FilterChip key={y} label={y} active={year === y} onClick={() => setYear(y)} testid={`pat-filter-year-${slug(y)}`} />
            ))}
          </div>
        </Reveal>

        <div className="mb-2 flex items-baseline justify-between eyebrow text-dust">
          <span data-testid="patent-results-count">{results.length} {results.length === 1 ? "filing" : "filings"}</span>
          {hasFilter && (
            <button
              data-testid="patent-filter-reset"
              onClick={() => { setStatus("All"); setYear("All"); setSearch(""); }}
              className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-copper"
            >
              Clear all
            </button>
          )}
        </div>

        <motion.ul layout className="border-t border-white/08">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p, i) => <PatentRow key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </motion.ul>

        {results.length === 0 && (
          <div data-testid="patent-empty" className="py-20 font-display text-2xl uppercase tracking-tight text-dust">No patents match.</div>
        )}

        <p className="mt-12 eyebrow text-dust/60">Dates as reported in the source annexure. Filings without a reported date are shown as “—”. Source: VP_Annexure, pp. 9–23.</p>
      </section>
    </main>
  );
}
