import { Link, NavLink } from "react-router-dom";
import { FOOTER_COLUMNS } from "@/lib/data";

export const Footer = () => {
  return (
    <footer
      data-testid="footer-section"
      className="relative overflow-hidden border-t border-white/08 bg-ink px-6 pt-20 text-bone lg:px-12 lg:pt-28"
    >
      <div className="grid grid-cols-12 gap-x-4 gap-y-14">
        {/* Identity column */}
        <div className="col-span-12 lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-6 w-6 items-center justify-center border border-copper/50" aria-hidden>
              <span className="h-1.5 w-1.5 bg-copper" />
            </span>
            <span className="font-display text-xs font-bold tracking-[0.25em] uppercase">
              Dr. Vishweshwar Peddy
            </span>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-dust">
            Pharmaceutical scientist, researcher and inventor. Senior Director &amp; Head, Particle Science &amp; Engineering, Sai Life Sciences.
          </p>
          <div className="mt-8 space-y-2">
            <div className="eyebrow text-dust flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-copper pulse-dot" />
              Hyderabad, India
            </div>
            <div className="eyebrow text-dust">
              ~20 years pharmaceutical R&amp;D
            </div>
          </div>
          <div className="mt-8 flex gap-5">
            <a
              href="https://www.linkedin.com/in/vishweshwar-peddy"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.22em] text-dust hover:text-bone"
              data-testid="footer-linkedin"
            >
              LinkedIn
            </a>
            <a
              href="https://scholar.google.com/citations?user=vishweshwar-peddy"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.22em] text-dust hover:text-bone"
              data-testid="footer-scholar"
            >
              Google Scholar
            </a>
          </div>
        </div>

        {/* Nav columns */}
        <div className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((c) => (
            <div key={c.id} data-testid={`footer-nav-${c.id}`}>
              <div className="eyebrow text-dust">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-sm text-bone/70 transition-colors hover:text-bone"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <NavLink
                        to={l.path}
                        className="link-underline text-sm text-bone/70 transition-colors hover:text-bone"
                      >
                        {l.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div className="mt-24 select-none overflow-hidden lg:mt-32" aria-hidden>
        <div className="font-display text-[clamp(3.5rem,14vw,17rem)] font-bold leading-[0.78] tracking-[-0.04em] text-bone/[0.035] translate-y-[0.1em]">
          PEDDY
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-y-4 border-t border-white/08 py-6 eyebrow text-dust">
        <span>© 2026 Dr. Vishweshwar Peddy</span>
        <div className="flex gap-6">
          <span className="text-dust/60">40 Publications · &gt;6,700 Citations · H-index 24 · 79 Patent Filings</span>
        </div>
      </div>
    </footer>
  );
};
