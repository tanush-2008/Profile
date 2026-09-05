import { useEffect, useState } from "react";
import "@/App.css";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { EASE } from "@/components/motion";
import { RequestAccessProvider } from "@/components/RequestAccess";
import Home from "@/pages/Home";
import Subpage from "@/pages/Subpage";
import Research from "@/pages/Research";
import Inbox from "@/pages/Inbox";

const LABELS = { "/": "Index", "/technology": "Technology", "/applications": "Applications", "/research": "Research", "/company": "Company", "/inbox": "Inbox" };
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
  <motion.div data-testid="page-curtain" data-state={covering ? "covering" : "idle"} aria-hidden
    className="pointer-events-none fixed inset-0 z-[80] flex items-end justify-between bg-ink px-6 pb-8 text-bone lg:px-12 lg:pb-10"
    style={{ transformOrigin: covering ? "bottom" : "top" }}
    initial={false}
    animate={{ scaleY: covering ? 1 : 0 }}
    transition={{ duration: COVER_MS / 1000, ease: EASE }}>
    <motion.span className="eyebrow" animate={{ opacity: covering ? 1 : 0 }} transition={{ duration: 0.3, delay: covering ? 0.3 : 0 }}>→ {label}</motion.span>
    <motion.span className="font-display text-sm font-bold tracking-[0.22em]" animate={{ opacity: covering ? 1 : 0 }} transition={{ duration: 0.3, delay: covering ? 0.3 : 0 }}>AURELIS</motion.span>
  </motion.div>
);

const PageShell = ({ children }) => (
  <div>
    {children}
    <Footer />
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
      <Routes location={displayed}>
        <Route path="/" element={<PageShell><Home /></PageShell>} />
        <Route path="/technology" element={<PageShell><Subpage id="technology" /></PageShell>} />
        <Route path="/applications" element={<PageShell><Subpage id="applications" /></PageShell>} />
        <Route path="/research" element={<PageShell><Research /></PageShell>} />
        <Route path="/company" element={<PageShell><Subpage id="company" /></PageShell>} />
        <Route path="/inbox" element={<PageShell><Inbox /></PageShell>} />
      </Routes>
      <Curtain covering={covering} label={LABELS[location.pathname] || "Index"} />
    </>
  );
};

function App() {
  useLenis();
  return (
    <div className="App bg-ink" id="top">
      <BrowserRouter>
        <RequestAccessProvider>
          <Nav />
          <AnimatedRoutes />
          <Cursor />
          <Toaster theme="dark" position="bottom-right" toastOptions={{ className: "rounded-none border-white/15 bg-ink-2 text-bone font-sans" }} />
        </RequestAccessProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
