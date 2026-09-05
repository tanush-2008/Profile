const ITEMS = ["Autonomous computing", "Scientific precision at scale", "Deployed across aerospace & materials labs", "Zürich — Pasadena", "Intelligence at the edge of possibility"];

const Run = () => (
  <div className="flex shrink-0 items-center gap-12 pr-12">
    {ITEMS.map((t) => (
      <span key={t} className="flex items-center gap-12 font-display text-xs uppercase tracking-[0.32em] text-bone/70 sm:text-sm">
        {t}<span className="h-1.5 w-1.5 bg-copper" aria-hidden />
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div data-testid="marquee-ticker" className="overflow-hidden border-y border-white/10 bg-ink py-6" aria-hidden="true">
    <div className="marquee-track"><Run /><Run /></div>
  </div>
);
