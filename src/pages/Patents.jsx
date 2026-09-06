import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PATENTS, PAT_STATUSES, PAT_TOPICS } from "@/lib/patents";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const slug = (s) => String(s).toLowerCase().replace(/[\s/]+/g, "-");

const StatusBadge = ({ status }) => {
  const colors = {
    Granted: "copper",
    "PCT/US": "teal",
    Indian: "",
  };
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

const PatentRow = ({ p, i }) => {
  const [open, setOpen] = useState(false);
  const patentUrl = p.number
    ? p.jurisdiction === "US"
      ? `https://patents.google.com/patent/${p.number.replace(/[,\s]/g, "")}/en`
      : p.jurisdiction === "PCT"
        ? `https://patentscope.wipo.int/search/en/detail.jsf?docId=${p.number.replace("/", "")}`
        : null
    : null;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: EASE, delay: i * 0.015 }}
      data-testid={`patent-row-${p.id}`}
      className="border-b border-white/08 archive-row"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full py-6 text-left grid grid-cols-12 gap-x-4 gap-y-2"
      >
        <span className="col-span-3 font-mono text-[10px] text-dust lg:col-span-1">
          {p.year}
        </span>
        <span className="col-span-9 flex items-center gap-3 lg:col-span-2">
          <StatusBadge status={p.status} />
        </span>
        <h3 className="col-span-12 font-display text-base font-semibold leading-snug tracking-tight transition-colors duration-300 hover:text-copper sm:text-lg lg:col-span-6 lg:text-xl">
          {p.title}
        </h3>
        <span className="col-span-8 font-mono text-[9px] uppercase tracking-[0.12em] text-dust lg:col-span-2">
          {p.number}
        </span>
        <span className="col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.15em] text-dust lg:col-span-1">
          {p.topic}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 grid grid-cols-12 gap-x-4 gap-y-3">
              <div className="col-span-12 lg:col-span-3 lg:col-start-2">
                <div className="eyebrow text-dust mb-2">Patent number</div>
                <p className="font-mono text-xs text-bone/80">{p.number}</p>
              </div>
              <div className="col-span-12 lg:col-span-3">
                <div className="eyebrow text-dust mb-2">Topic</div>
                <p className="font-mono text-xs text-bone/80">{p.topic}</p>
              </div>
              {patentUrl && (
                <div className="col-span-12 lg:col-span-4">
                  <a
                    href={patentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-copper"
                  >
                    View patent →
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

// Enhanced status summary with larger numbers
const StatusSummary = () => {
  const counts = PAT_STATUSES.map((s) => ({
    status: s,
    count: PATENTS.filter((p) => p.status === s).length,
  }));
  return (
    <Reveal>
      <div className="flex flex-wrap gap-x-12 gap-y-6 border-b border-white/08 pb-10 mb-10">
        {counts.map(({ status, count }) => (
          <div key={status} className="flex items-baseline gap-4">
            <span className="font-display text-4xl font-bold text-bone lg:text-5xl">{count}</span>
            <StatusBadge status={status} />
          </div>
        ))}
        <div className="flex items-baseline gap-4 ml-auto">
          <span className="font-display text-4xl font-bold text-copper lg:text-5xl">79</span>
          <span className="eyebrow text-dust">Total Filings</span>
        </div>
      </div>
    </Reveal>
  );
};

export default function Patents() {
  const [status, setStatus] = useState("All");
  const [topic, setTopic]   = useState("All");
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PATENTS.filter((p) =>
      (status === "All" || p.status === status) &&
      (topic === "All" || p.topic === topic) &&
      (!q || p.title.toLowerCase().includes(q) || p.number.toLowerCase().includes(q))
    );
  }, [status, topic, search]);

  const hasFilter = status !== "All" || topic !== "All" || search;

  return (
    <main data-testid="page-patents">
      <SEO 
        title="Patents & Intellectual Property" 
        description="79 patent filings spanning polymorphic forms, cocrystals, salts, amorphous dispersions and particle engineering processes." 
      />
      {/* Header */}
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
              Fourteen granted patents and a portfolio of PCT/US and Indian applications spanning polymorphic forms, cocrystals, salts, amorphous dispersions and particle engineering processes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Archive — kept on dark for differentiation from Publications */}
      <section className="bg-ink px-6 py-16 text-bone lg:px-12 lg:py-24">
        <StatusSummary />

        {/* Search */}
        <Reveal className="mb-8">
          <div className="relative max-w-lg">
            <input
              type="search"
              placeholder="Search patents by title or number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="patent-search"
              className="field"
            />
            <span className="absolute right-0 bottom-3 font-mono text-[10px] text-dust pointer-events-none">
              SEARCH
            </span>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal className="flex flex-wrap gap-x-10 gap-y-4 border-b border-white/08 pb-8 mb-4">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="eyebrow w-16 text-dust">Status</span>
            {["All", ...PAT_STATUSES].map((s) => (
              <FilterChip
                key={s}
                label={s}
                active={status === s}
                onClick={() => setStatus(s)}
                testid={`pat-filter-status-${slug(s)}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="eyebrow w-16 text-dust">Topic</span>
            {["All", ...PAT_TOPICS].map((t) => (
              <FilterChip
                key={t}
                label={t}
                active={topic === t}
                onClick={() => setTopic(t)}
                testid={`pat-filter-topic-${slug(t)}`}
              />
            ))}
          </div>
        </Reveal>

        {/* Results header */}
        <div className="flex items-baseline justify-between eyebrow text-dust mb-2">
          <span data-testid="patent-results-count">
            {results.length} {results.length === 1 ? "filing" : "filings"}
          </span>
          {hasFilter && (
            <button
              data-testid="patent-filter-reset"
              onClick={() => { setStatus("All"); setTopic("All"); setSearch(""); }}
              className="link-underline text-copper font-mono text-[10px] uppercase tracking-[0.2em]"
            >
              Clear all
            </button>
          )}
        </div>

        {/* List */}
        <motion.ul layout className="border-t border-white/08">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p, i) => <PatentRow key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </motion.ul>

        {results.length === 0 && (
          <div
            data-testid="patent-empty"
            className="py-20 font-display text-2xl uppercase tracking-tight text-dust"
          >
            No patents match.
          </div>
        )}
      </section>
    </main>
  );
}
