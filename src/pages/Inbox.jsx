import { Reveal, SplitLines } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { CONTACT } from "@/lib/data";

const ContactItem = ({ label, value, href, arrow, testid, sub, plain }) => (
  <Reveal>
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      data-testid={testid}
      className="group block border-b border-white/08 py-8 transition-colors duration-300 hover:border-copper/40 lg:py-10"
    >
      <div className="grid grid-cols-12 items-baseline gap-x-4">
        <span className="eyebrow col-span-12 mb-3 text-dust lg:col-span-2 lg:mb-0">{label}</span>
        <span className={`col-span-12 break-all font-display text-lg font-medium tracking-tight transition-colors duration-400 group-hover:text-copper sm:text-2xl lg:col-span-8 lg:text-3xl ${plain ? "normal-case" : "uppercase"}`}>
          {value}
          {sub && <span className="mt-1 block font-sans text-xs normal-case tracking-normal text-dust sm:text-sm">{sub}</span>}
        </span>
        <span className="col-span-2 hidden text-right font-mono text-[10px] text-dust transition-colors duration-400 group-hover:text-copper lg:block">{arrow}</span>
      </div>
    </a>
  </Reveal>
);

export default function Contact() {
  return (
    <main data-testid="page-contact">
      <SEO
        title="Contact & Collaboration"
        description="Contact Dr. Vishweshwar Peddy for collaboration on solid-form science, crystallisation, particle engineering and pharmaceutical IP."
        path="/contact"
      />
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
              Research collaboration, solid-form and crystallisation development, particle engineering, IP evaluation and regulatory enquiries welcome.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-8 text-bone lg:px-12 lg:py-12">
        <div className="border-t border-white/08">
          <ContactItem label="Email" arrow="✉ →" value={CONTACT.emailPrimary} href={`mailto:${CONTACT.emailPrimary}`} testid="contact-email" plain />
          <ContactItem label="Work email" arrow="✉ →" value={CONTACT.emailWork} href={`mailto:${CONTACT.emailWork}`} testid="contact-email-work" sub="Sai Life Sciences" plain />
          <ContactItem label="Phone" arrow="☏ →" value={CONTACT.phone} href={CONTACT.phoneHref} testid="contact-phone" />
          <ContactItem label="LinkedIn" arrow="↗" value={CONTACT.linkedinLabel} href={CONTACT.linkedin} testid="contact-linkedin" plain />
          <ContactItem label="Google Scholar" arrow="↗" value="40 Publications · >6,700 Citations" href={CONTACT.scholar} testid="contact-scholar" sub="h-index 24 · i10-index 37" />
        </div>
      </section>

      <section className="border-t border-white/08 bg-carbon px-6 py-20 text-bone lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-4">
            <div className="eyebrow mb-6 text-dust">Current Position</div>
            <div className="mb-4 flex items-center gap-3">
              <span className="relative flex h-5 w-5 items-center justify-center border border-copper/50"><span className="pulse-dot h-1 w-1 bg-copper" /></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper">Active</span>
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Senior Director &amp; Head,<br />Particle Science &amp; Engineering
            </h3>
            <p className="mt-4 text-sm text-dust">Sai Life Sciences Ltd. · {CONTACT.location}</p>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-6">
            <div className="eyebrow mb-6 text-dust">Areas of Collaboration</div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                "Polymorph, salt & cocrystal screening",
                "Pharmaceutical co-crystal design",
                "Crystallisation process development & PAT",
                "Particle engineering — PSD, milling, filtration",
                "Amorphous forms & solid dispersions",
                "Novelty & non-infringement evaluation",
                "Crystal structure prediction & modelling",
                "DMF deficiency resolution on polymorphism",
              ].map((area) => (
                <li key={area} className="flex items-baseline gap-3 text-sm text-bone/70">
                  <span className="h-px w-3 flex-shrink-0 translate-y-[-2px] bg-copper/50" />{area}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="col-span-12 self-end lg:col-span-2 lg:col-start-11">
            <div className="flex gap-8 lg:flex-col lg:gap-6">
              <div><div className="font-display text-3xl font-bold text-bone lg:text-4xl">~20</div><div className="eyebrow mt-1 text-dust">Years R&amp;D</div></div>
              <div><div className="font-display text-3xl font-bold text-bone lg:text-4xl">24</div><div className="eyebrow mt-1 text-dust">H-Index</div></div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
