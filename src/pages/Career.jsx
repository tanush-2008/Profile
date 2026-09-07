import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { CAREER, CAREER_ERAS, LEADERSHIP } from "@/lib/data";
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
          "relative grid grid-cols-12 gap-x-4 gap-y-4 scroll-mt-28",
          isCurrent ? "py-16 lg:py-24" : "py-12 lg:py-16",
          !isLast && "border-b border-white/06"
        )}
      >
        <div className="absolute left-0 top-12 hidden -translate-x-1/2 lg:top-16 lg:block">
          <div className={cn("border bg-ink", isCurrent ? "h-4 w-4 border-copper bg-copper/20" : "h-3 w-3 border-white/25")} />
        </div>

        <div className="col-span-12 lg:col-span-2">
          <span className={cn("font-mono tracking-[0.15em] text-dust", isCurrent ? "text-sm" : "text-[11px]")}>{entry.period}</span>
        </div>

        <div className="col-span-12 lg:col-span-9 lg:col-start-4">
          <div className="mb-4 flex flex-wrap items-baseline gap-3">
            <span className={cn("label-tag", typeColors[entry.type])}>{typeLabels[entry.type]}</span>
            {isCurrent && (
              <span className="eyebrow flex items-center gap-1.5 text-copper">
                <span className="pulse-dot h-1.5 w-1.5 bg-copper" />Present
              </span>
            )}
          </div>

          <h3 className={cn(
            "font-display font-bold uppercase leading-[0.95] tracking-tight text-balance",
            isCurrent ? "text-3xl text-copper sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl lg:text-4xl"
          )}>
            {entry.role}
          </h3>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className={cn("font-display font-medium text-bone/85", isCurrent ? "text-xl" : "text-lg")}>{entry.org}</span>
            {entry.orgNote && <span className="text-sm italic text-dust">{entry.orgNote}</span>}
            <span className="eyebrow text-dust">{entry.location}</span>
          </div>

          <motion.p
            className={cn("mt-6 max-w-prose leading-relaxed text-dust", isCurrent ? "text-base" : "text-sm sm:text-base")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.8, ease: EASE }}
          >
            {entry.detail}
          </motion.p>

          <ul className="mt-6 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2" data-testid={`career-highlights-${entry.id}`}>
            {entry.highlights.map((h) => (
              <li key={h} className="flex items-baseline gap-3 text-sm leading-relaxed text-bone/75">
                <span className="h-px w-4 flex-shrink-0 translate-y-[-2px] bg-copper/60" />{h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
};

export default function Career() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start end", "end end"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main data-testid="page-career">
      <SEO
        title="Scientific Trajectory"
        description="From a PhD in polymorphism and crystal engineering at the University of Hyderabad and post-doctoral research at the University of South Florida, to Senior Director & Head of Particle Science & Engineering at Sai Life Sciences."
        path="/career"
      />
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
              Doctoral research in polymorphism and crystal engineering at the University of Hyderabad, post-doctoral research in the United States, and ~20 years of pharmaceutical R&amp;D — generic API development, CDMO operations and innovator drug discovery.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.6}>
          <div className="mt-16 border-t border-white/08 pt-8">
            <div className="flex flex-wrap gap-0" data-testid="career-eras">
              {CAREER_ERAS.map((e) => (
                <div key={e.era} className={cn("mr-1 min-w-[100px] flex-1 border-t-2 pt-4 last:mr-0", e.accent ? "border-copper" : "border-white/15")}>
                  <div className={cn("font-display text-sm font-bold uppercase tracking-tight", e.accent ? "text-copper" : "text-bone/60")}>{e.era}</div>
                  <div className="mt-1 font-mono text-[10px] text-dust">{e.years}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-ink px-6 py-8 text-bone lg:px-12">
        <div ref={timelineRef} className="relative lg:pl-16">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/05 lg:block" />
          <motion.div className="absolute left-0 top-0 hidden w-px origin-top bg-copper lg:block" style={{ height: lineHeight }} />
          {CAREER.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} i={i} isLast={i === CAREER.length - 1} />
          ))}
        </div>
      </section>

      <section className="border-t border-black/06 bg-parchment px-6 py-20 text-onyx lg:px-12 lg:py-28" data-testid="leadership-section">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <span className="section-label" style={{ color: "var(--graphite)" }}>People, culture &amp; execution</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-balance">Leadership<br />at a glance</h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-graphite sm:text-base">
              Full performance-management cycles — KRAs, reviews, ratings, succession — Lean Daily Management and Kaizen initiatives, and project execution in Concerto. Trained Safety Auditor through DuPont safety programmes.
            </p>
            <Link to="/recognition" data-testid="career-recognition-link" className="btn-primary on-light mt-8 inline-flex">Awards &amp; talks →</Link>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-6 lg:col-start-7">
            {LEADERSHIP.map((l) => (
              <div key={l.label} className="border-t border-black/10 pt-5">
                <div className="font-display text-5xl font-bold leading-none tracking-[-0.04em] lg:text-6xl">{l.value}</div>
                <div className="eyebrow mt-3 text-graphite">{l.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
