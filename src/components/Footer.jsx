import { Link } from "react-router-dom";
import { FOOTER_COLUMNS } from "@/lib/data";
import { useRequestAccess } from "@/components/RequestAccess";

const SOCIAL = ["X", "LinkedIn", "GitHub"];
const LEGAL = ["Privacy", "Terms", "Responsible Use", "Export Compliance"];

export const Footer = () => {
  const { open } = useRequestAccess();
  return (
    <footer data-testid="footer-section" className="relative overflow-hidden border-t border-white/10 bg-ink px-6 pt-20 text-bone lg:px-12 lg:pt-28">
      <div className="grid grid-cols-12 gap-x-4 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <div className="flex items-center gap-4 font-display text-sm font-bold tracking-[0.22em]"><span className="h-2 w-2 bg-copper" />AURELIS</div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-dust">Autonomous computing systems for scientific research, simulation and advanced engineering.</p>
          <div data-testid="footer-status-indicator" className="mt-10 flex items-center gap-3 eyebrow text-dust">
            <span className="h-1.5 w-1.5 bg-copper pulse-dot" />All systems nominal — 99.998% uptime
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((c) => (
            <div key={c.id} data-testid={`footer-nav-${c.id}`}>
              <div className="eyebrow text-dust">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    {l === "Request Access" ? (
                      <button onClick={open} data-testid="footer-request-access" className="link-underline text-sm text-bone/80 transition-colors hover:text-bone">{l}</button>
                    ) : (
                      <Link to={c.id === "contact" ? "/company" : `/${c.id === "tech" ? "technology" : c.id}`} className="link-underline text-sm text-bone/80 transition-colors hover:text-bone">{l}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 select-none overflow-hidden lg:mt-32" aria-hidden>
        <div className="font-display text-[clamp(4.5rem,17.6vw,21rem)] font-bold leading-[0.78] tracking-[-0.04em] text-bone/[0.05] translate-y-[0.1em]">AURELIS</div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-y-4 border-t border-white/10 py-6 eyebrow text-dust">
        <span>© 2026 AURELIS Systems AG</span>
        <div className="flex gap-6">
          {LEGAL.map((l) => <a key={l} href="#top" className="link-underline hover:text-bone">{l}</a>)}
          <Link to="/inbox" data-testid="footer-inbox-link" className="link-underline hover:text-bone">Inbox</Link>
        </div>
        <div className="flex gap-6">
          {SOCIAL.map((s) => <a key={s} href="#top" data-testid={`footer-social-${s.toLowerCase()}`} className="link-underline hover:text-bone">{s}</a>)}
        </div>
      </div>
    </footer>
  );
};
