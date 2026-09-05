import { Reveal, SplitLines, Rule } from "@/components/motion";
import { CHAPTERS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ChapterRow = ({ c, i }) => (
  <Reveal delay={i * 0.08} data-testid={`manifesto-chapter-${i + 1}`}
    className={cn("group relative grid grid-cols-12 gap-x-4 gap-y-4 border-b border-black/10 py-10 lg:py-14", i === 1 && "lg:bg-black/[0.025]")}>
    <span className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-copper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
    <span className="col-span-2 font-mono text-[11px] text-graphite lg:col-span-1 lg:pl-6">{c.n}</span>
    <h3 className={cn("col-span-10 font-display text-3xl font-semibold uppercase leading-none tracking-tight sm:text-4xl lg:col-span-4 lg:text-5xl", i === 0 && "lg:col-start-2", i === 1 && "lg:col-start-4", i === 2 && "lg:col-start-3")}>
      {c.title}
    </h3>
    <p className={cn("col-span-12 max-w-sm text-sm leading-relaxed text-graphite sm:text-base lg:col-span-4", i === 0 && "lg:col-start-8", i === 1 && "lg:col-start-9", i === 2 && "lg:col-start-8")}>
      {c.text}
    </p>
  </Reveal>
);

export const Positioning = () => (
  <section data-testid="positioning-section" className="bg-bone px-6 py-28 text-onyx lg:px-12 lg:py-44">
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-12 mb-10 eyebrow text-graphite lg:col-span-2 lg:mb-0">01 — Positioning</div>
      <div className="col-span-12 lg:col-span-10 lg:col-start-3">
        <SplitLines as="h2" lines={["Conventional computing", "is approaching its", "fundamental limits."]}
          className="font-display text-[clamp(2rem,5.7vw,6.6rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]" lineClassName="last:text-graphite" />
      </div>
      <Reveal delay={0.2} className="col-span-12 mt-16 space-y-6 text-base leading-relaxed text-graphite sm:text-lg lg:col-span-4 lg:col-start-7 lg:mt-28">
        <p>Transistor density, memory bandwidth, energy per operation — every axis the industry has scaled for fifty years is flattening. Adding more of the same now yields less.</p>
        <p className="text-onyx">AURELIS approaches computation differently. Not as a faster calculator, but as a system that understands the structure of the problem it is solving — and reorganises itself around it.</p>
      </Reveal>
      <Reveal delay={0.35} className="col-span-12 mt-10 lg:col-span-2 lg:col-start-11 lg:mt-28">
        <div className="eyebrow text-graphite">Manifesto</div>
        <div className="mt-2 font-mono text-[11px] text-onyx">3 chapters / 2026</div>
      </Reveal>
    </div>

    <div className="mt-28 lg:mt-40">
      <Rule light />
      {CHAPTERS.map((c, i) => <ChapterRow key={c.n} c={c} i={i} />)}
    </div>
  </section>
);
