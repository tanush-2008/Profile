import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { DOMAINS } from "@/lib/data";
import { cn } from "@/lib/utils";

// SVG icons — abstract geometric representations of each domain
const DomainIcon = ({ id, active }) => {
  const c = active ? "#c8603a" : "rgba(245,245,247,0.3)";
  const icons = {
    polymorphism: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="8" y="8" width="10" height="10" stroke={c} strokeWidth="0.8" />
        <rect x="22" y="8" width="10" height="10" stroke={c} strokeWidth="0.8" transform="rotate(12 27 13)" />
        <rect x="8" y="22" width="10" height="10" stroke={c} strokeWidth="0.8" transform="rotate(-8 13 27)" />
        <rect x="22" y="22" width="10" height="10" stroke={c} strokeWidth="0.8" transform="rotate(20 27 27)" />
        <circle cx="20" cy="20" r="1.5" fill={c} />
      </svg>
    ),
    cocrystals: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="14" cy="20" r="7" stroke={c} strokeWidth="0.8" />
        <circle cx="26" cy="20" r="7" stroke={c} strokeWidth="0.8" />
        <line x1="14" y1="13" x2="26" y2="13" stroke={c} strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="14" y1="27" x2="26" y2="27" stroke={c} strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    ),
    crystallisation: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M20 6 L34 14 L34 26 L20 34 L6 26 L6 14 Z" stroke={c} strokeWidth="0.8" />
        <path d="M20 12 L28 17 L28 23 L20 28 L12 23 L12 17 Z" stroke={c} strokeWidth="0.5" />
        <circle cx="20" cy="20" r="2" fill={c} opacity="0.6" />
      </svg>
    ),
    "particle-science": (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="6" stroke={c} strokeWidth="0.8" />
        <circle cx="10" cy="14" r="3" stroke={c} strokeWidth="0.6" />
        <circle cx="30" cy="14" r="4" stroke={c} strokeWidth="0.6" />
        <circle cx="10" cy="28" r="4.5" stroke={c} strokeWidth="0.6" />
        <circle cx="30" cy="28" r="2.5" stroke={c} strokeWidth="0.6" />
      </svg>
    ),
    asd: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M6 34 Q12 10 20 20 Q28 30 34 6" stroke={c} strokeWidth="1" fill="none" />
        <rect x="8" y="30" width="24" height="2" fill={c} opacity="0.2" />
        <circle cx="20" cy="20" r="1.5" fill={c} />
        <circle cx="14" cy="26" r="1" fill={c} opacity="0.5" />
        <circle cx="26" cy="14" r="1" fill={c} opacity="0.5" />
      </svg>
    ),
    characterisation: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        {[0.12, 0.22, 0.35, 0.52, 0.65, 0.78].map((x, i) => (
          <rect key={i} x={x * 40 - 2} y={40 - (i % 2 === 0 ? 18 : 10) - 8} width="3"
            height={i % 2 === 0 ? 18 : 10} fill={c} opacity={0.5 + i * 0.08} />
        ))}
        <line x1="4" y1="32" x2="36" y2="32" stroke={c} strokeWidth="0.6" />
      </svg>
    ),
    csp: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M8 32 L14 18 L20 24 L24 14 L30 20 L34 10" stroke={c} strokeWidth="1" fill="none" />
        {[8, 14, 20, 24, 30, 34].map((x, i) => {
          const ys = [32, 18, 24, 14, 20, 10];
          return <circle key={i} cx={x} cy={ys[i]} r="1.5" fill={c} opacity="0.8" />;
        })}
      </svg>
    ),
    "ip-regulatory": (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="8" y="8" width="24" height="30" stroke={c} strokeWidth="0.8" />
        <line x1="12" y1="16" x2="28" y2="16" stroke={c} strokeWidth="0.5" />
        <line x1="12" y1="22" x2="28" y2="22" stroke={c} strokeWidth="0.5" />
        <line x1="12" y1="28" x2="22" y2="28" stroke={c} strokeWidth="0.5" />
        <circle cx="28" cy="30" r="5" stroke={c} strokeWidth="0.8" fill="none" />
        <text x="25.5" y="33" fontFamily="monospace" fontSize="7" fill={c} opacity="0.8">P</text>
      </svg>
    ),
  };
  return icons[id] || null;
};

export const ScientificDomains = () => {
  const [active, setActive] = useState(0);
  const a = DOMAINS[active];

  return (
    <section
      data-testid="domains-section"
      className="border-t border-white/08 bg-ink px-6 py-28 text-bone lg:px-12 lg:py-40"
    >
      <div className="grid grid-cols-12 gap-x-4 gap-y-14">
        {/* Domain list */}
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
          <div className="flex items-baseline justify-between eyebrow text-dust mb-10">
            <span>Research Domains</span>
            <span>Eight Areas</span>
          </div>
          <Reveal className="border-t border-white/08">
            <ul>
              {DOMAINS.map((d, i) => (
                <li key={d.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    data-testid={`domain-item-${d.id}`}
                    className="group w-full grid grid-cols-12 items-baseline gap-x-4 border-b border-white/08 py-5 lg:py-6 text-left"
                  >
                    <span className="col-span-2 font-mono text-[10px] tracking-[0.2em] text-dust sm:col-span-1">
                      {d.index}
                    </span>
                    <span className={cn(
                      "col-span-8 font-display text-[clamp(1.2rem,2.8vw,2.6rem)] uppercase leading-none tracking-[-0.01em] transition-colors duration-400 sm:col-span-8",
                      active === i ? "text-bone" : "text-bone/30"
                    )}>
                      {d.title}
                    </span>
                    <span className={cn(
                      "col-span-3 hidden text-right font-mono text-[9px] tracking-[0.15em] transition-colors duration-400 sm:block",
                      active === i ? "text-copper" : "text-dust/50"
                    )}>
                      {d.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Detail panel */}
        <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 lg:pl-8">
          <Reveal className="lg:sticky lg:top-28">
            <div
              data-testid="domain-detail-panel"
              className="relative aspect-square border border-white/08 bg-ink-2 overflow-hidden max-w-[420px]"
            >
              {/* Corner marks */}
              <div className="corner-marks absolute inset-0">
                <span className="cm" />
              </div>
              {/* Animated icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex items-center justify-center"
                  >
                    <div className="relative">
                      {/* Magnified icon */}
                      <svg viewBox="0 0 40 40" fill="none" style={{ width: 160, height: 160, transform: "scale(1)" }}>
                        {/* Crystal lattice background pattern */}
                        {Array.from({ length: 6 }, (_, i) => (
                          Array.from({ length: 6 }, (_, j) => (
                            <circle
                              key={`${i}-${j}`}
                              cx={4 + i * 7}
                              cy={4 + j * 7}
                              r="0.4"
                              fill="rgba(245,245,247,0.12)"
                            />
                          ))
                        ))}
                        {/* H-bond lines */}
                        {Array.from({ length: 5 }, (_, i) => (
                          <line
                            key={`h${i}`}
                            x1={4 + i * 7} y1={4}
                            x2={4 + i * 7} y2={36}
                            stroke="rgba(245,245,247,0.04)"
                            strokeWidth="0.3"
                          />
                        ))}
                      </svg>
                      {/* Domain-specific icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <DomainIcon id={a.id} active />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Overlay text */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink-2/95 to-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${active}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="eyebrow text-copper mb-2">{a.tag}</div>
                    <p className="text-xs leading-relaxed text-bone/70 max-w-[28ch]">{a.lede}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`detail-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-6 space-y-3"
              >
                <p
                  data-testid="domain-active-body"
                  className="text-sm leading-relaxed text-dust max-w-sm"
                >
                  {a.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <Link
              to="/research"
              className="btn-ghost mt-6 inline-flex"
            >
              Full research overview →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
