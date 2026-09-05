import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, EASE } from "@/components/motion";
import { APPLICATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Applications = () => {
  const [active, setActive] = useState(0);
  const a = APPLICATIONS[active];

  return (
    <section data-testid="applications-section" className="border-t border-white/10 bg-ink px-6 py-28 text-bone lg:px-12 lg:py-40">
      <div className="grid grid-cols-12 gap-x-4 gap-y-14">
        <div className="col-span-12 order-2 lg:order-1 lg:col-span-7">
          <div className="flex justify-between eyebrow text-dust"><span>05 — Applications</span><span>Six domains</span></div>
          <Reveal className="mt-10 border-t border-white/10">
            <ul>
              {APPLICATIONS.map((app, i) => (
                <li key={app.id}>
                  <Link to="/applications" data-testid={`app-item-${app.id}`}
                    onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                    className="group grid grid-cols-12 items-baseline gap-x-4 border-b border-white/10 py-6 lg:py-7">
                    <span className="col-span-2 font-mono text-[10px] tracking-[0.2em] text-dust sm:col-span-1">0{i + 1}</span>
                    <span className={cn("col-span-10 font-display text-[clamp(1.6rem,3.6vw,3.6rem)] uppercase leading-none tracking-[-0.02em] transition-colors duration-500 sm:col-span-8", active === i ? "text-bone" : "text-bone/30")}>
                      {app.title}
                    </span>
                    <span className={cn("col-span-3 hidden text-right font-mono text-[10px] tracking-[0.15em] transition-colors duration-500 sm:block", active === i ? "text-copper" : "text-dust")}>{app.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="col-span-12 order-1 lg:order-2 lg:col-span-5 lg:pl-8">
          <Reveal className="lg:sticky lg:top-28">
            <div data-testid="applications-image-frame" className="relative aspect-[16/10] overflow-hidden border border-white/10 lg:aspect-[4/5]">
              {APPLICATIONS.map((app, i) => (
                <motion.img key={app.id} src={app.img} alt={app.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.06 }}
                  transition={{ duration: 0.9, ease: EASE }} />
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 eyebrow text-bone/80">
                <span className="bg-ink/70 px-2 py-1">{a.title} — {a.tag}</span>
                <span className="bg-ink/70 px-2 py-1">0{active + 1} / 06</span>
              </div>
            </div>
            <p data-testid="applications-active-note" className="mt-5 max-w-sm text-sm leading-relaxed text-dust">{a.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
