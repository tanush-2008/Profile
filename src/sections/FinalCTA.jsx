import { Reveal, SplitLines } from "@/components/motion";
import { CONTACT } from "@/lib/data";

export const FinalCTA = () => (
  <section data-testid="final-cta-section" className="relative bg-ink px-6 py-32 text-bone lg:px-12 lg:py-48 overflow-hidden">
    {/* Subtle crystal grid for depth */}
    <div className="absolute inset-0 crystal-bg opacity-15 pointer-events-none" />

    <div className="relative z-10 grid grid-cols-12 items-end gap-x-4 gap-y-14">
      <div className="col-span-12 lg:col-span-8">
        <span className="section-label">Open to collaboration</span>
        <SplitLines
          as="h2"
          lines={["Let\u2019s work on", "the hard problems."]}
          stagger={0.14}
          className="mt-6 font-display text-[clamp(2.5rem,8vw,9.6rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em]"
        />
      </div>
      <Reveal delay={0.3} className="col-span-12 lg:col-span-3 lg:col-start-10">
        <p className="text-sm leading-relaxed text-dust sm:text-base">
          Solid-form development, crystallisation, particle science, IP strategy — research and industry collaboration welcome.
        </p>
        <div className="mt-8 space-y-4">
          <a
            href={`mailto:${CONTACT.emailPrimary}`}
            data-testid="cta-email"
            className="group flex items-center justify-between border border-white/15 px-6 py-4 transition-colors duration-500 hover:border-copper/60"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80 group-hover:text-copper transition-colors duration-500">
              Send an email
            </span>
            <span className="font-mono text-[11px] text-dust group-hover:text-copper transition-colors duration-500">→</span>
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-linkedin"
            className="group flex items-center justify-between border border-white/10 px-6 py-4 transition-colors duration-500 hover:border-copper/40"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60 group-hover:text-copper transition-colors duration-500">
              Connect on LinkedIn
            </span>
            <span className="font-mono text-[11px] text-dust group-hover:text-copper transition-colors duration-500">↗</span>
          </a>
        </div>
        <div className="mt-8 eyebrow text-dust">
          Sai Life Sciences Ltd. · Hyderabad, India
        </div>
      </Reveal>
    </div>
  </section>
);
