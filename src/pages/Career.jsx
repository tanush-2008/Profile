import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { CAREER } from "@/lib/data";
import { cn } from "@/lib/utils";

const typeColors = {
  education: "text-dust border-dust/30",
  postdoc:   "text-teal border-teal/40",
  industry:  "text-copper border-copper/40",
  current:   "text-copper border-copper",
};

const typeLabels = {
  education: "Education",
  postdoc:   "Postdoctoral Research",
  industry:  "Industry",
  current:   "Current Position",
};

const TimelineEntry = ({ entry, i, isLast }) => (
  <Reveal delay={i * 0.08} data-testid={`career-entry-${entry.id}`}>
    <div
      id={entry.id}
      className={cn(
        "relative grid grid-cols-12 gap-x-4 gap-y-4 py-14 lg:py-20",
        !isLast && "border-b border-white/06"
      )}
    >
      {/* Timeline node */}
      <div className="absolute left-0 top-14 lg:top-20 -translate-x-1/2 hidden lg:block">
        <div className={cn(
          "h-3 w-3 border bg-ink",
          entry.type === "current" ? "border-copper bg-copper/20" : "border-white/30"
        )} />
      </div>

      {/* Period */}
      <div className="col-span-12 lg:col-span-2">
        <span className="font-mono text-[11px] tracking-[0.15em] text-dust">{entry.period}</span>
      </div>

      {/* Content */}
      <div className="col-span-12 lg:col-span-9 lg:col-start-4">
        <div className="flex flex-wrap items-baseline gap-3 mb-3">
          <span className={cn("label-tag", typeColors[entry.type] || "")}>
            {typeLabels[entry.type]}
          </span>
          {entry.type === "current" && (
            <span className="flex items-center gap-1.5 eyebrow text-copper">
              <span className="h-1.5 w-1.5 bg-copper pulse-dot" />
              Present
            </span>
          )}
        </div>

        <h3 className={cn(
          "font-display text-2xl font-bold uppercase tracking-tight leading-tight sm:text-3xl lg:text-4xl",
          entry.type === "current" && "text-copper"
        )}>
          {entry.role}
        </h3>

        <div className="mt-3 flex flex-wrap items-baseline gap-3">
          <span className="font-display text-lg font-medium text-bone/80">{entry.org}</span>
          <span className="eyebrow text-dust">{entry.location}</span>
        </div>

        <motion.p
          className="mt-6 text-sm leading-relaxed text-dust max-w-prose sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.05, duration: 0.8, ease: EASE }}
        >
          {entry.detail}
        </motion.p>
      </div>
    </div>
  </Reveal>
);

export default function Career() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main data-testid="page-career">
      {/* Header */}
      <section className="min-h-[55svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 eyebrow text-dust lg:col-span-2">Scientific Career</div>
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SplitLines
              as="h1"
              lines={["Two decades", "of discovery."]}
              delay={0.3}
              data-testid="page-career-title"
              className="font-display text-[clamp(3rem,9vw,10rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
            />
          </div>
          <Reveal delay={0.5} className="col-span-12 lg:col-span-5 lg:col-start-7">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              From doctoral research in solid-state chemistry at the University of Hyderabad, through post-doctoral work in the United States, to nearly two decades of pharmaceutical R&amp;D leadership in India.
            </p>
          </Reveal>
        </div>

        {/* Summary stats */}
        <Reveal delay={0.6}>
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/08 pt-6 eyebrow text-dust sm:grid-cols-5 lg:grid-cols-5">
            {[
              ["~20", "Years R&D"],
              ["Hyderabad", "Current base"],
              ["2 Countries", "India & USA"],
              ["3 Companies", "Industry experience"],
              ["Ph.D.", "University of Hyderabad"],
            ].map(([v, l]) => (
              <div key={l} className="col-span-1 sm:col-span-1">
                <div className="font-display text-base font-bold text-bone sm:text-lg">{v}</div>
                <div className="mt-1 text-[9px]">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="bg-ink px-6 py-8 text-bone lg:px-12">
        {/* Scroll-animated timeline line */}
        <div ref={timelineRef} className="relative lg:pl-16">
          {/* Static background line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/05 hidden lg:block" />
          {/* Animated copper fill */}
          <motion.div
            className="absolute left-0 top-0 w-px bg-copper origin-top hidden lg:block"
            style={{ height: lineHeight }}
          />

          {CAREER.map((entry, i) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              i={i}
              isLast={i === CAREER.length - 1}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
