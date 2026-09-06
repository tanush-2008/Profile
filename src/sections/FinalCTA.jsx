import { Reveal, SplitLines } from "@/components/motion";
import { Link } from "react-router-dom";

export const FinalCTA = () => (
  <section data-testid="final-cta-section" className="bg-ink px-6 py-32 text-bone lg:px-12 lg:py-52">
    <div className="grid grid-cols-12 items-end gap-x-4 gap-y-14">
      <div className="col-span-12 lg:col-span-8">
        <div className="eyebrow text-dust">Collaboration</div>
        <SplitLines
          as="h2"
          lines={["Let's work on", "the hard problems."]}
          stagger={0.14}
          className="mt-10 font-display text-[clamp(2.5rem,8vw,9.6rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em]"
        />
      </div>
      <Reveal delay={0.3} className="col-span-12 lg:col-span-3 lg:col-start-10">
        <p className="text-sm leading-relaxed text-dust sm:text-base">
          Solid-form development, crystallisation, particle science, IP strategy — research and industry collaboration welcome.
        </p>
        <div className="mt-8 space-y-4">
          <a
            href="mailto:vishweshwar.peddy@sailifesciences.com"
            data-testid="cta-email"
            className="btn-primary block text-center"
          >
            Send an email →
          </a>
          <a
            href="https://www.linkedin.com/in/vishweshwar-peddy"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-linkedin"
            className="btn-ghost block text-center"
          >
            Connect on LinkedIn
          </a>
        </div>
        <div className="mt-8 eyebrow text-dust">
          Sai Life Sciences, Hyderabad
        </div>
      </Reveal>
    </div>
  </section>
);
