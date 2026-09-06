import { Reveal, SplitLines } from "@/components/motion";
import { SEO } from "@/components/SEO";

const ContactItem = ({ label, value, href, arrow, testid }) => (
  <Reveal>
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      data-testid={testid}
      className="group block border-b border-white/08 py-8 lg:py-10 transition-colors duration-300 hover:border-copper/40"
    >
      <div className="grid grid-cols-12 gap-x-4 items-baseline">
        <span className="col-span-12 eyebrow text-dust mb-3 lg:col-span-2 lg:mb-0">{label}</span>
        <span className="col-span-12 font-display text-xl font-medium uppercase tracking-tight group-hover:text-copper transition-colors duration-400 sm:text-2xl lg:col-span-8 lg:text-3xl">
          {value}
        </span>
        <span className="hidden col-span-2 text-right font-mono text-[10px] text-dust group-hover:text-copper transition-colors duration-400 lg:block">
          {arrow}
        </span>
      </div>
    </a>
  </Reveal>
);

export default function Contact() {
  return (
    <main data-testid="page-contact">
      <SEO 
        title="Contact & Collaboration" 
        description="Collaborate on solid-form science, pharmaceutical consulting, and IP evaluation." 
      />
      {/* Header */}
      <section className="min-h-[55svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="relative z-10">
          <span className="section-label">Open to collaboration</span>
          <SplitLines
            as="h1"
            lines={["Collaborate on", "solid-form science."]}
            delay={0.3}
            data-testid="page-contact-title"
            className="mt-4 font-display text-[clamp(2.6rem,8vw,9.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl lg:ml-auto lg:max-w-xl">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              Research collaboration, pharmaceutical consulting, solid-form development, IP evaluation and regulatory strategy enquiries welcome.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact options */}
      <section className="bg-ink px-6 py-8 text-bone lg:px-12 lg:py-12">
        <div className="border-t border-white/08">
          <ContactItem
            label="Email"
            arrow="✉ →"
            value="vishweshwar.peddy@sailifesciences.com"
            href="mailto:vishweshwar.peddy@sailifesciences.com"
            testid="contact-email"
          />
          <ContactItem
            label="LinkedIn"
            arrow="↗"
            value="linkedin.com/in/vishweshwar-peddy"
            href="https://www.linkedin.com/in/vishweshwar-peddy"
            testid="contact-linkedin"
          />
          <ContactItem
            label="Google Scholar"
            arrow="↗"
            value="40 Publications · >6,700 Citations"
            href="https://scholar.google.com/citations?user=vishweshwar-peddy"
            testid="contact-scholar"
          />
        </div>
      </section>

      {/* Context — streamlined */}
      <section className="border-t border-white/08 bg-carbon px-6 py-20 text-bone lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-4">
            <div className="eyebrow text-dust mb-6">Current Position</div>
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-5 w-5 items-center justify-center border border-copper/50">
                <span className="h-1 w-1 bg-copper pulse-dot" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper">Active</span>
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Senior Director &amp; Head,<br />Particle Science &amp; Engineering
            </h3>
            <p className="mt-4 text-sm text-dust">Sai Life Sciences · Hyderabad, India</p>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-6">
            <div className="eyebrow text-dust mb-6">Areas of Collaboration</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Solid-form screening & development",
                "Polymorph & cocrystal characterisation",
                "Crystallisation process development",
                "Particle engineering & micronisation",
                "Amorphous solid dispersions",
                "IP solid-form strategy",
                "Crystal structure prediction",
                "Regulatory solid-form advice",
              ].map((area) => (
                <li key={area} className="flex items-baseline gap-3 text-sm text-bone/70">
                  <span className="h-px w-3 bg-copper/50 flex-shrink-0 translate-y-[-2px]" />
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="col-span-12 lg:col-span-2 lg:col-start-11 self-end">
            <div className="flex lg:flex-col gap-8 lg:gap-6">
              <div>
                <div className="font-display text-3xl font-bold text-bone lg:text-4xl">~20</div>
                <div className="eyebrow text-dust mt-1">Years R&amp;D</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-bone lg:text-4xl">24</div>
                <div className="eyebrow text-dust mt-1">H-Index</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
