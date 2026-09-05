import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { cn } from "@/lib/utils";

const FILTERS = ["all", "new", "reviewed"];
const fmt = (iso) => new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const Row = ({ r, onToggle }) => {
  const [open, setOpen] = useState(false);
  const reviewed = r.status === "reviewed";
  return (
    <motion.li layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}
      data-testid={`inbox-row-${r.id}`} className={cn("border-b border-white/10 transition-colors duration-500", reviewed && "text-dust")}>
      <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-6 lg:py-7">
        <button onClick={() => setOpen((v) => !v)} data-testid={`inbox-expand-${r.id}`} className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 text-left lg:col-span-10">
          <span className="col-span-4 font-mono text-[11px] tracking-[0.15em] text-copper sm:col-span-2 lg:col-span-1">{r.reference}</span>
          <span className="col-span-8 flex items-center gap-3 sm:col-span-4 lg:col-span-3">
            <span className={cn("h-1.5 w-1.5 shrink-0", reviewed ? "bg-white/20" : "bg-copper pulse-dot")} />
            <span className="font-display text-base uppercase tracking-tight sm:text-lg">{r.full_name}</span>
          </span>
          <span className="col-span-12 truncate text-sm sm:col-span-6 lg:col-span-3">{r.work_email}</span>
          <span className="col-span-6 font-mono text-[10px] uppercase tracking-[0.15em] lg:col-span-3">{r.organization_type}{r.compute_pflops != null && ` · ${r.compute_pflops} PFLOPS`}</span>
          <span className="col-span-6 text-right font-mono text-[10px] text-dust lg:col-span-2 lg:text-left">{fmt(r.created_at)}</span>
        </button>
        <div className="col-span-12 flex justify-end lg:col-span-2">
          <button data-testid={`inbox-status-toggle-${r.id}`} onClick={() => onToggle(r)}
            className={cn("font-mono text-[10px] uppercase tracking-[0.2em] border px-3 py-2 transition-colors duration-300", reviewed ? "border-white/15 text-dust hover:text-bone" : "border-copper text-copper hover:bg-copper hover:text-ink")}>
            {reviewed ? "Reopen" : "Mark reviewed"}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
            <div className="grid grid-cols-12 gap-x-4 pb-8">
              <span className="col-span-12 eyebrow text-dust lg:col-span-1">Use case</span>
              <p data-testid={`inbox-usecase-${r.id}`} className="col-span-12 max-w-2xl text-sm leading-relaxed text-bone/85 lg:col-span-8 lg:col-start-2">{r.use_case || "—"}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default function Inbox() {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get(`${API}/access-requests`).then(({ data }) => setItems(data)).catch(() => { setItems([]); toast.error("Could not load inbox"); });
  }, []);

  const toggle = async (r) => {
    const status = r.status === "reviewed" ? "new" : "reviewed";
    try {
      const { data } = await axios.patch(`${API}/access-requests/${r.id}`, { status });
      setItems((list) => list.map((x) => (x.id === r.id ? data : x)));
    } catch {
      toast.error("Update failed");
    }
  };

  const shown = (items || []).filter((r) => filter === "all" || r.status === filter);
  const newCount = (items || []).filter((r) => r.status === "new").length;

  return (
    <main data-testid="page-inbox" className="min-h-screen bg-ink px-6 pb-32 pt-36 text-bone lg:px-12 lg:pt-48">
      <div className="grid grid-cols-12 gap-x-4 gap-y-10">
        <div className="col-span-12 eyebrow text-dust lg:col-span-2">Internal — Inbox</div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-3">
          <SplitLines as="h1" lines={["Access", "requests."]} delay={0.2} className="font-display text-[clamp(2.6rem,7vw,7.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]" />
        </div>
        <Reveal delay={0.4} className="col-span-12 lg:col-span-3 lg:self-end lg:text-right">
          <div data-testid="inbox-count" className="font-display text-6xl font-bold leading-none tracking-tight">{items ? newCount : "—"}<span className="text-copper">*</span></div>
          <div className="mt-3 eyebrow text-dust">Awaiting review</div>
        </Reveal>
      </div>

      <Reveal delay={0.5} className="mt-20 flex items-baseline justify-between border-b border-white/10 pb-5">
        <div className="flex gap-8">
          {FILTERS.map((f) => (
            <button key={f} data-testid={`inbox-filter-${f}`} onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={cn("font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300", filter === f ? "text-copper" : "text-dust hover:text-bone")}>{f}</button>
          ))}
        </div>
        <span className="eyebrow text-dust">{items ? `${shown.length} shown` : "Loading"}</span>
      </Reveal>

      {items && shown.length === 0 && (
        <div data-testid="inbox-empty" className="py-24 font-display text-2xl uppercase tracking-tight text-dust">Nothing here yet.</div>
      )}
      <motion.ul layout data-testid="inbox-list">
        <AnimatePresence initial={false}>
          {shown.map((r) => <Row key={r.id} r={r} onToggle={toggle} />)}
        </AnimatePresence>
      </motion.ul>
    </main>
  );
}
