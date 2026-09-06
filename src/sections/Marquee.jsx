import { MARQUEE_ITEMS } from "@/lib/data";

export const Marquee = () => (
  <div
    data-testid="marquee-section"
    className="border-t border-b border-white/08 bg-ink py-5 overflow-hidden"
    aria-hidden="true"
  >
    <div className="marquee-track">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span
          key={i}
          className="mx-8 font-display text-sm uppercase tracking-[0.18em] text-bone/25 whitespace-nowrap"
        >
          {item}
          <span className="ml-8 inline-block h-px w-4 bg-copper/40 translate-y-[-2px]" />
        </span>
      ))}
    </div>
  </div>
);
