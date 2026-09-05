import { Link } from "react-router-dom";
import { Reveal, SplitLines } from "@/components/motion";
import { SUBPAGES } from "@/lib/data";
import { useRequestAccess } from "@/components/RequestAccess";

export default function Subpage({ id }) {
  const p = SUBPAGES[id];
  const { open } = useRequestAccess();
  return (
    <main data-testid={`page-${id}`}>
      <section className="min-h-[70svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 flex justify-between eyebrow text-dust lg:col-span-2 lg:block">
            <span>{p.n} — {id}</span>
          </div>
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <SplitLines as="h1" lines={p.title} delay={0.3} data-testid={`page-${id}-title`}
              className="font-display text-[clamp(2.6rem,8vw,9rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]" />
          </div>
          <Reveal delay={0.5} className="col-span-12 lg:col-span-5 lg:col-start-7">
            <p className="text-base leading-relaxed text-dust sm:text-lg">{p.lede}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone px-6 py-24 text-onyx lg:px-12 lg:py-36">
        <div className="flex justify-between eyebrow text-graphite"><span>Index</span><span>{p.rows.length} entries</span></div>
        <div className="mt-8 border-t border-black/15">
          {p.rows.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.05} data-testid={`page-${id}-row-${i + 1}`} className="group grid grid-cols-12 gap-x-4 gap-y-3 border-b border-black/10 py-8 lg:py-10">
              <span className="col-span-12 font-mono text-[10px] text-graphite lg:col-span-1">0{i + 1}</span>
              <h2 className="col-span-12 font-display text-xl font-semibold uppercase leading-tight tracking-tight sm:text-2xl lg:col-span-4 lg:text-3xl">{k}</h2>
              <p className="col-span-12 text-sm leading-relaxed text-graphite sm:text-base lg:col-span-5 lg:col-start-7">{v}</p>
              <span className="col-span-12 text-right font-mono text-[10px] text-graphite opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:col-span-1">→</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20 flex flex-wrap items-center justify-between gap-6">
          <span className="eyebrow text-graphite">Full section in development — Q4 2026</span>
          <div className="flex items-center gap-8">
            <Link to="/" data-testid={`page-${id}-back`} className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-onyx">← Back to index</Link>
            <button onClick={open} data-testid={`page-${id}-request-access`} className="btn-primary on-light">Request Access</button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
