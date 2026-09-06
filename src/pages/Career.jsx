import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { CAREER } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

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

const TimelineEntry = ({ entry, i, isLast }) => {
  const isCurrent = entry.type === "current";

  return (
    <Reveal delay={i * 0.08} data-testid={`career-entry-${entry.id}`}>
      <div
        id={entry.id}
        className={cn(
          "relative grid grid-cols-12 gap-x-4 gap-y-4",
          isCurrent ? "py-16 lg:py-24" : "py-12 lg:py-16",
          !isLast && "border-b border-white/06"
        )}
      >
        {/* Timeline node */}
        <div className="absolute left-0 top-12 lg:top-16 -translate-x-1/2 hidden lg:block">
          <div className={cn(
            "border bg-ink transition-all duration-500",
            isCurrent ? "h-4 w-4 border-copper bg-copper/20" : "h-3 w-3 border-white/25"
          )} />
        </div>

        {/* Period */}
        <div className="col-span-12 lg:col-span-2">
          <span className={cn(
            "font-mono tracking-[0.15em] text-dust",
            isCurrent ? "text-sm" : "text-[11px]"
          )}>{entry.period}</span>
        </div>

        {/* Content */}
        <div className="col-span-12 lg:col-span-9 lg:col-start-4">
          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <span className={cn("label-tag", typeColors[entry.type] || "")}>
              {typeLabels[entry.type]}
            </span>
            {isCurrent && (
              <span className="flex items-center gap-1.5 eyebrow text-copper">
                <span className="h-1.5 w-1.5 bg-copper pulse-dot" />
                Present
              </span>
            )}
          </div>

          <h3 className={cn(
            "font-display font-bold uppercase tracking-tight leading-tight",
            isCurrent
              ? "text-3xl text-copper sm:text-4xl lg:text-5xl"
              : "text-2xl sm:text-3xl lg:text-4xl"
          )}>
            {entry.role}
          </h3>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <span className={cn(
              "font-display font-medium text-bone/80",
              isCurrent ? "text-xl" : "text-lg"
            )}>{entry.org}</span>
            <span className="eyebrow text-dust">{entry.location}</span>
          </div>

          <motion.p
            className={cn(
              "mt-6 leading-relaxed text-dust max-w-prose",
              isCurrent ? "text-base" : "text-sm sm:text-base"
            )}
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
};

export default function Career() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main data-testid="page-career">
      <SEO 
        title="Scientific Trajectory" 
        description="Two decades of pharmaceutical R&D leadership, from doctoral research to Senior Director of Particle Science & Engineering." 
      />
      {/* Header — era progression preview */}
      <section className="min-h-[55svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="relative z-10">
          <span className="section-label">A scientific trajectory</span>
          <SplitLines
            as="h1"
            lines={["Two decades", "of discovery."]}
            delay={0.3}
            data-testid="page-career-title"
            className="mt-4 font-display text-[clamp(3rem,9vw,10rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              From doctoral research in solid-state chemistry at the University of Hyderabad, through post-doctoral work in the United States, to nearly two decades of pharmaceutical R&amp;D leadership in India.
            </p>
          </Reveal>
        </div>

        {/* Era progression — visual timeline preview */}
        <Reveal delay={0.6}>
          <div className="mt-16 border-t border-white/08 pt-8">
            <div className="flex flex-wrap gap-0">
              {[
                { era: "Education", years: "1996\u20132004", accent: false },
                { era: "Postdoctoral", years: "2004\u20132007", accent: false },
                { era: "Industry", years: "2007\u20132024", accent: false },
                { era: "Current", years: "2024\u2013", accent: true },
              ].map((e, i) => (
                <div
                  key={e.era}
                  className={cn(
                    "flex-1 min-w-[100px] border-t-2 pt-4 mr-1 last:mr-0",
                    e.accent ? "border-copper" : "border-white/15"
                  )}
                >
                  <div className={cn(
                    "font-display text-sm font-bold uppercase tracking-tight",
                    e.accent ? "text-copper" : "text-bone/60"
                  )}>{e.era}</div>
                  <div className="font-mono text-[10px] text-dust mt-1">{e.years}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="bg-ink px-6 py-8 text-bone lg:px-12">
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
