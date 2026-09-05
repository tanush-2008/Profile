import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const CountUp = ({ to, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}<span className="text-copper">{suffix}</span></span>;
};

const Metric = ({ testid, value, suffix, label, note, className, huge }) => (
  <Reveal data-testid={testid} className={cn("grid grid-cols-12 gap-x-4", className)}>
    <div className={cn("col-span-12 font-display font-bold leading-[0.82] tracking-[-0.05em]", huge ? "text-[clamp(6rem,19vw,22rem)]" : "text-[clamp(5rem,15vw,17rem)]")}>
      {typeof value === "number" ? <CountUp to={value} suffix={suffix} /> : <span className="text-copper">{value}</span>}
    </div>
    <div className="col-span-12 mt-6 flex items-start gap-6 border-t border-black/15 pt-4 sm:col-span-10">
      <div className="font-display text-base uppercase tracking-wide sm:text-lg">{label}</div>
      <div className="ml-auto hidden max-w-[16rem] text-right text-xs leading-relaxed text-graphite sm:block">{note}</div>
    </div>
  </Reveal>
);

export const Scale = () => (
  <section data-testid="scale-section" className="overflow-hidden border-t border-black/10 bg-bone px-6 py-28 text-onyx lg:px-12 lg:py-40">
    <div className="flex items-baseline justify-between eyebrow text-graphite">
      <span>04 — Scale</span><span>Conceptual figures</span>
    </div>
    <div className="mt-20 grid grid-cols-12 gap-x-4 gap-y-24 lg:gap-y-32">
      <Metric testid="metric-acceleration" value={10} suffix="×" label="Faster iteration" note="Design-to-result cycles across coupled multiphysics workloads, measured end-to-end." className="col-span-12 lg:col-span-6" />
      <Metric testid="metric-efficiency" value={94} suffix="%" label="Less idle computation" note="Substrate utilisation compared with statically scheduled clusters of equivalent capacity." className="col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-40" />
      <Metric testid="metric-space" value="∞" label="Possibilities explored" note="Open-ended search across parameter spaces that cannot be enumerated." className="col-span-12 lg:col-span-8 lg:col-start-3" huge />
    </div>
  </section>
);
