import { useEffect, useState } from "react";
import "@/App.css";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { EASE } from "@/components/motion";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const Research = lazy(() => import("@/pages/Research"));
const Innovation = lazy(() => import("@/pages/Innovation"));
const Publications = lazy(() => import("@/pages/Publications"));
const Patents = lazy(() => import("@/pages/Patents"));
const Career = lazy(() => import("@/pages/Career"));
const Contact = lazy(() => import("@/pages/Inbox"));

const LABELS = {
  "/":             "Home",
  "/research":     "Research",
  "/innovation":   "Innovation",
  "/publications": "Publications",
  "/patents":      "Patents",
  "/career":       "Career",
  "/contact":      "Contact",
};

const COVER_MS = 700;

const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
};

const Curtain = ({ covering, label }) => (
  <motion.div
    data-testid="page-curtain"
    data-state={covering ? "covering" : "idle"}
    aria-hidden
    className="pointer-events-none fixed inset-0 z-[80] flex items-end justify-between bg-ink px-6 pb-8 text-bone lg:px-12 lg:pb-10"
    style={{ transformOrigin: covering ? "bottom" : "top" }}
    initial={false}
    animate={{ scaleY: covering ? 1 : 0 }}
    transition={{ duration: COVER_MS / 1000, ease: EASE }}
  >
    <motion.span
      className="eyebrow"
      animate={{ opacity: covering ? 1 : 0 }}
      transition={{ duration: 0.3, delay: covering ? 0.3 : 0 }}
    >
      → {label}
    </motion.span>
    <motion.span
      className="font-display text-sm font-bold tracking-[0.22em]"
      animate={{ opacity: covering ? 1 : 0 }}
      transition={{ duration: 0.3, delay: covering ? 0.3 : 0 }}
    >
      V. PEDDY
    </motion.span>
  </motion.div>
);

const PageShell = ({ children }) => (
  <div>
    {children}
    <Footer />
  </div>
);

// Minimal loading indicator during code-split chunk fetch
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink">
    <div className="flex flex-col items-center gap-4">
      <span className="relative flex h-5 w-5 items-center justify-center border border-copper/50">
        <span className="h-1 w-1 bg-copper pulse-dot" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dust">
        Loading Component
      </span>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  const [covering, setCovering] = useState(false);

  useEffect(() => {
    if (location.pathname === displayed.pathname) return;
    setCovering(true);
    const t = setTimeout(() => {
      window.scrollTo(0, 0);
      setDisplayed(location);
      requestAnimationFrame(() => setCovering(false));
    }, COVER_MS);
    return () => clearTimeout(t);
  }, [location, displayed.pathname]);

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes location={displayed}>
          <Route path="/"             element={<PageShell><Home /></PageShell>} />
          <Route path="/research"     element={<PageShell><Research /></PageShell>} />
          <Route path="/innovation"   element={<PageShell><Innovation /></PageShell>} />
          <Route path="/publications" element={<PageShell><Publications /></PageShell>} />
          <Route path="/patents"      element={<PageShell><Patents /></PageShell>} />
          <Route path="/career"       element={<PageShell><Career /></PageShell>} />
          <Route path="/contact"      element={<PageShell><Contact /></PageShell>} />
        </Routes>
      </Suspense>
      <Curtain covering={covering} label={LABELS[location.pathname] || "Home"} />
    </>
  );
};

function App() {
  useLenis();
  return (
    <div className="App bg-ink" id="top">
      <BrowserRouter>
        <Nav />
        <AnimatedRoutes />
        <Cursor />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            className: "rounded-none border-white/15 bg-ink-2 text-bone font-sans",
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
