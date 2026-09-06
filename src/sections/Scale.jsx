import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { METRICS } from "@/lib/data";

const CountUp = ({ to, decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (x) => setV(decimals > 0 ? x.toFixed(decimals) : Math.round(x)),
    });
    return () => c.stop();
  }, [inView, to, decimals]);
  return <span ref={ref}>{typeof v === "number" ? v.toLocaleString() : v}</span>;
};

const MetricBlock = ({ m, className, size = "lg" }) => (
  <Reveal data-testid={`metric-${m.id}`} className={cn("group", className)}>
    <div className={cn(
      "font-display font-bold leading-[0.82] tracking-[-0.055em]",
      size === "xl" ? "text-[clamp(5rem,16vw,18rem)]" :
      size === "lg" ? "text-[clamp(3.5rem,10vw,12rem)]" :
      "text-[clamp(2.8rem,8vw,8rem)]"
    )}>
      {m.id === "citations" ? (
        <span>&gt;<span className="text-copper">6,700</span></span>
      ) : (
        <CountUp to={m.value} />
      )}
      {m.suffix && <span className="text-copper">{m.suffix}</span>}
    </div>
    <div className="mt-4 flex items-start gap-6 border-t border-black/10 pt-4">
      <div className="font-display text-sm uppercase tracking-wide sm:text-base">{m.label}</div>
      <div className="ml-auto hidden max-w-[16rem] text-right text-xs leading-relaxed text-graphite sm:block">
        {m.note}
      </div>
    </div>
  </Reveal>
);

export const Metrics = () => (
  <section
    data-testid="metrics-section"
    className="overflow-hidden border-t border-black/08 bg-parchment px-6 py-28 text-onyx lg:px-12 lg:py-40"
  >
    {/* Editorial framing */}
    <div className="grid grid-cols-12 gap-x-4 mb-20 lg:mb-28">
      <div className="col-span-12 lg:col-span-5">
        <span className="section-label" style={{ color: "var(--graphite)" }}>Evidence of impact</span>
        <div className="editorial-divider mt-6">
          <span className="diamond" />
        </div>
      </div>
      <Reveal delay={0.2} className="col-span-12 lg:col-span-5 lg:col-start-8">
        <p className="font-serif text-lg italic leading-relaxed text-graphite lg:text-xl">
          Research measured not by volume, but by the depth of its contribution to pharmaceutical science and industrial practice.
        </p>
      </Reveal>
    </div>

    {/* Asymmetric metric cascade */}
    <div className="space-y-20 lg:space-y-28">
      {/* Row 1 — Publications (large) */}
      <div className="grid grid-cols-12 gap-x-4">
        <MetricBlock
          m={METRICS[0]}
          className="col-span-12 lg:col-span-7"
          size="xl"
        />
      </div>

      {/* Row 2 — Citations (offset right) */}
      <div className="grid grid-cols-12 gap-x-4">
        <MetricBlock
          m={METRICS[1]}
          className="col-span-12 lg:col-span-6 lg:col-start-7"
          size="lg"
        />
      </div>

      {/* Row 3 — H-index + Patents side by side */}
      <div className="grid grid-cols-12 gap-x-4 gap-y-16">
        <MetricBlock
          m={METRICS[2]}
          className="col-span-12 lg:col-span-4"
          size="md"
        />
        <MetricBlock
          m={METRICS[3]}
          className="col-span-12 lg:col-span-5 lg:col-start-8"
          size="lg"
        />
      </div>
    </div>

    {/* Source line */}
    <Reveal delay={0.3}>
      <div className="mt-20 flex items-center justify-between border-t border-black/08 pt-5 eyebrow text-graphite">
        <span>Verified · Google Scholar</span>
        <span className="hidden sm:block">As of 2024</span>
      </div>
    </Reveal>
  </section>
);
