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

const MetricBlock = ({ m, className, huge }) => (
  <Reveal data-testid={`metric-${m.id}`} className={cn("group", className)}>
    <div className={cn(
      "font-display font-bold leading-[0.82] tracking-[-0.055em]",
      huge ? "text-[clamp(5rem,16vw,20rem)]" : "text-[clamp(4rem,12vw,15rem)]"
    )}>
      {m.id === "citations" ? (
        <span>&gt;<span className="text-copper">6,700</span></span>
      ) : (
        <CountUp to={m.value} />
      )}
      {m.suffix && <span className="text-copper">{m.suffix}</span>}
    </div>
    <div className="mt-5 flex items-start gap-6 border-t border-black/12 pt-4">
      <div className="font-display text-sm uppercase tracking-wide sm:text-base">{m.label}</div>
      <div className="ml-auto hidden max-w-[18rem] text-right text-xs leading-relaxed text-graphite sm:block">
        {m.note}
      </div>
    </div>
  </Reveal>
);

export const Metrics = () => (
  <section
    data-testid="metrics-section"
    className="overflow-hidden border-t border-black/08 bg-bone px-6 py-28 text-onyx lg:px-12 lg:py-40"
  >
    <div className="flex items-baseline justify-between eyebrow text-graphite mb-16">
      <span>Impact at Scale</span>
      <span>Verified · Google Scholar</span>
    </div>
    <div className="grid grid-cols-12 gap-x-4 gap-y-20 lg:gap-y-28">
      <MetricBlock
        m={METRICS[0]}
        className="col-span-12 lg:col-span-6"
      />
      <MetricBlock
        m={METRICS[1]}
        className="col-span-12 lg:col-span-6 lg:mt-32"
      />
      <MetricBlock
        m={METRICS[2]}
        className="col-span-12 lg:col-span-5"
      />
      <MetricBlock
        m={METRICS[3]}
        className="col-span-12 lg:col-span-7 lg:col-start-6 lg:mt-16"
        huge
      />
    </div>
  </section>
);
