import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV } from "@/lib/data";
import { EASE } from "@/components/motion";

const MobileMenu = ({ onClose }) => (
  <motion.div
    data-testid="mobile-menu"
    className="fixed inset-0 z-40 bg-ink text-bone flex flex-col px-6 pt-28 pb-10"
    initial={{ clipPath: "inset(0 0 100% 0)" }}
    animate={{ clipPath: "inset(0 0 0% 0)" }}
    exit={{ clipPath: "inset(0 0 100% 0)" }}
    transition={{ duration: 0.7, ease: EASE }}
  >
    <nav className="flex flex-col border-t border-white/10">
      {NAV.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: EASE }}
        >
          <NavLink
            to={n.path}
            onClick={onClose}
            data-testid={`mobile-nav-link-${n.id}`}
            className="flex items-baseline justify-between border-b border-white/10 py-5 font-display text-3xl uppercase tracking-tight"
          >
            {n.label}
            <span className="font-mono text-[10px] text-dust">0{i + 1}</span>
          </NavLink>
        </motion.div>
      ))}
    </nav>
    <div className="mt-auto flex items-end justify-between">
      <Link
        to="/contact"
        onClick={onClose}
        className="btn-primary"
      >
        Collaborate
      </Link>
      <span className="eyebrow text-dust text-right">
        Sai Life Sciences<br />Hyderabad, India
      </span>
    </div>
  </motion.div>
);

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        data-testid="site-nav"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b text-bone transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "bg-ink/90 backdrop-blur-md border-white/08"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 lg:h-20 lg:px-12">
          {/* Logo mark */}
          <Link
            to="/"
            data-testid="nav-logo"
            className="flex items-center gap-3"
          >
            <span
              className="relative flex h-6 w-6 items-center justify-center border border-copper/60"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 bg-copper" />
            </span>
            <span className="font-display text-xs font-bold tracking-[0.25em] uppercase">
              V. Peddy
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.id}
                to={n.path}
                data-testid={`nav-link-${n.id}`}
                className={({ isActive }) =>
                  cn(
                    "group relative font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 hover:text-bone pb-1",
                    isActive ? "text-bone is-active" : "text-dust"
                  )
                }
              >
                {n.label}
                {/* Active indicator */}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[1.5px] w-full bg-copper origin-left transition-transform duration-500",
                  "scale-x-0 group-hover:scale-x-100 group-[.is-active]:scale-x-100"
                )} />
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            {/* Status indicator — reduced weight */}
            <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-dust md:flex">
              <span className="h-1 w-1 bg-copper pulse-dot" />
              Hyderabad
            </span>
            {/* Collaborate CTA */}
            <Link
              to="/contact"
              data-testid="nav-collaborate"
              className="hidden font-mono text-[10px] uppercase tracking-[0.22em] border border-white/20 px-4 py-2.5 transition-colors duration-300 hover:border-copper hover:text-copper sm:inline-flex"
            >
              Collaborate
            </Link>
            {/* Mobile toggle */}
            <button
              data-testid="nav-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="group flex h-10 w-10 flex-col items-end justify-center gap-1.5 lg:hidden"
            >
              <span className={cn("h-px bg-bone transition-all duration-500", open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6")} />
              <span className={cn("h-px bg-bone transition-all duration-500", open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4 group-hover:w-6")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
