import { Reveal, SplitLines, Rule } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import {
  AWARDS, FELLOWSHIPS, TALKS, INTERNAL_ENGAGEMENTS, POSTERS, CONFERENCES, PEER_REVIEW, COLLABORATIONS,
} from "@/lib/recognition";

const SectionHead = ({ id, label, title, count }) => (
  <div id={id} className="mb-10 grid grid-cols-12 gap-x-4 items-end lg:mb-14">
    <div className="col-span-12 lg:col-span-8">
      <span className="section-label">{label}</span>
      <h2 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em]">{title}</h2>
    </div>
    {count != null && (
      <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:text-right">
        <span className="font-display text-4xl font-bold text-copper lg:text-5xl">{count}</span>
      </div>
    )}
  </div>
);

const AwardRow = ({ a, i }) => (
  <Reveal delay={i * 0.04} data-testid={`award-${a.id}`}>
    <div className="grid grid-cols-12 gap-x-4 gap-y-3 border-b border-white/08 py-8 lg:py-10">
      <span className="col-span-3 font-mono text-[11px] tracking-[0.15em] text-dust lg:col-span-1">{a.year}</span>
      <div className="col-span-9 lg:col-span-6">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl lg:text-2xl">{a.title}</h3>
        <p className="mt-2 text-sm text-bone/60">{a.org}</p>
        {a.date && <p className="mt-1 eyebrow text-dust">{a.date}</p>}
      </div>
      {a.detail && (
        <p className="col-span-12 col-start-1 text-sm leading-relaxed text-dust lg:col-span-4 lg:col-start-9">{a.detail}</p>
      )}
    </div>
  </Reveal>
);

const TalkRow = ({ t, i }) => (
  <Reveal delay={i * 0.04} data-testid={`talk-${t.id}`}>
    <div className="grid grid-cols-12 gap-x-4 gap-y-3 border-b border-black/10 py-8 lg:py-10">
      <div className="col-span-12 lg:col-span-2">
        <span className="font-mono text-[11px] tracking-[0.15em] text-graphite">{t.date}</span>
        {t.place && <p className="mt-2 eyebrow text-graphite">{t.place}</p>}
      </div>
      <div className="col-span-12 lg:col-span-9 lg:col-start-4">
        <span className="label-tag copper mb-3 inline-flex">{t.role}</span>
        {t.talk && (
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-onyx sm:text-xl lg:text-2xl">“{t.talk}”</h3>
        )}
        <p className={cn("text-sm leading-relaxed text-graphite max-w-2xl", t.talk ? "mt-3" : "font-display text-lg font-semibold text-onyx sm:text-xl")}>{t.event}</p>
        {t.host && <p className="mt-2 text-sm text-graphite/80">{t.host}</p>}
      </div>
    </div>
  </Reveal>
);

const CompactRow = ({ date, title, sub, testid }) => (
  <li data-testid={testid} className="grid grid-cols-12 gap-x-4 gap-y-1 border-b border-white/08 py-5">
    <span className="col-span-12 font-mono text-[10px] tracking-[0.15em] text-dust lg:col-span-2">{date}</span>
    <div className="col-span-12 lg:col-span-9 lg:col-start-4">
      <p className="text-sm font-medium text-bone/90 sm:text-base">{title}</p>
      <p className="mt-1 text-sm text-dust">{sub}</p>
    </div>
  </li>
);

export default function Recognition() {
  return (
    <main data-testid="page-recognition">
      <SEO
        title="Awards, Talks & Scientific Service"
        description="Awards and recognitions at Dr. Reddy's Laboratories, invited talks at IUCr-PPXRD and Indo-US bilateral meetings, peer review for ACS and RSC journals, and academic collaborations."
        path="/recognition"
      />

      <section className="min-h-[55svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="relative z-10">
          <span className="section-label">Awards, talks & scientific service</span>
          <SplitLines
            as="h1"
            lines={["Recognised", "contribution."]}
            delay={0.3}
            data-testid="page-recognition-title"
            className="mt-4 font-display text-[clamp(3rem,9vw,10rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl lg:ml-auto lg:max-w-xl">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              Multiple innovation and excellence awards at Dr. Reddy's Laboratories, invited lectures at IUCr–PPXRD and two Indo-US bilateral meetings, and more than 100 manuscripts reviewed for ACS and RSC journals.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.6}>
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/08 pt-8 sm:grid-cols-4 eyebrow text-dust">
            {[[AWARDS.length, "Awards & recognitions"], [TALKS.length, "Invited talks"], ["100+", "Manuscripts reviewed"], [COLLABORATIONS.length, "Academic collaborations"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold text-bone sm:text-3xl">{v}</div>
                <div className="mt-2">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Awards */}
      <section className="bg-ink px-6 py-20 text-bone lg:px-12 lg:py-28">
        <SectionHead id="awards" label="Innovation & excellence" title="Awards & Recognitions" count={AWARDS.length} />
        <Rule />
        {AWARDS.map((a, i) => <AwardRow key={a.id} a={a} i={i} />)}

        <div className="mt-20 grid grid-cols-12 gap-x-4 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <span className="section-label">Early career</span>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">Fellowships &amp; national qualifications</h3>
          </div>
          <ul className="col-span-12 border-t border-white/08 lg:col-span-7 lg:col-start-6">
            {FELLOWSHIPS.map((f) => <CompactRow key={f.id} date={f.year} title={f.title} sub={f.org} testid={`fellowship-${f.id}`} />)}
          </ul>
        </div>
      </section>

      {/* Talks */}
      <section className="border-t border-black/06 bg-parchment px-6 py-20 text-onyx lg:px-12 lg:py-28">
        <div id="talks" className="mb-10 grid grid-cols-12 gap-x-4 items-end lg:mb-14">
          <div className="col-span-12 lg:col-span-8">
            <span className="section-label" style={{ color: "var(--graphite)" }}>Invited &amp; plenary</span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em]">Invited Talks</h2>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:text-right">
            <span className="font-display text-4xl font-bold text-copper lg:text-5xl">{TALKS.length}</span>
          </div>
        </div>
        <Rule light />
        {TALKS.map((t, i) => <TalkRow key={t.id} t={t} i={i} />)}

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow text-graphite mb-4">Industry &amp; internal engagements</div>
            <ul className="space-y-4">
              {INTERNAL_ENGAGEMENTS.map((e) => (
                <li key={e.id} className="text-sm leading-relaxed text-graphite" data-testid={`engagement-${e.id}`}>
                  <span className="font-mono text-[10px] text-graphite/70 mr-3">{e.year}</span>
                  <span className="text-onyx">{e.title}</span> — {e.org}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="eyebrow text-graphite mb-4">Poster presentations</div>
            <ul className="border-t border-black/10">
              {POSTERS.map((p) => (
                <li key={p.id} data-testid={`poster-${p.id}`} className="grid grid-cols-12 gap-x-4 gap-y-1 border-b border-black/10 py-4">
                  <span className="col-span-12 font-mono text-[10px] tracking-[0.15em] text-graphite lg:col-span-3">{p.date}</span>
                  <div className="col-span-12 lg:col-span-9">
                    <p className="text-sm font-medium text-onyx sm:text-base">{p.title}</p>
                    <p className="mt-1 text-sm text-graphite">{p.event}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="border-t border-white/08 bg-carbon px-6 py-20 text-bone lg:px-12 lg:py-28">
        <SectionHead id="service" label="Scientific service" title="Peer Review & Collaboration" />
        <div className="grid grid-cols-12 gap-x-4 gap-y-12 border-t border-white/08 pt-12">
          <Reveal className="col-span-12 lg:col-span-5" data-testid="peer-review-block">
            <div className="eyebrow text-copper mb-5">Peer reviewer</div>
            <p className="text-sm leading-relaxed text-dust sm:text-base max-w-prose">{PEER_REVIEW.summary}</p>
            <ul className="mt-6 space-y-3">
              {PEER_REVIEW.journals.map((j) => (
                <li key={j.name} className="flex items-baseline gap-4 text-sm text-bone/85">
                  <span className="label-tag w-12 justify-center">{j.publisher}</span>{j.name}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-serif text-lg italic leading-relaxed text-bone/50">{PEER_REVIEW.cover}</p>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-8" data-testid="collaborations-block">
            <div className="eyebrow text-copper mb-5">Academic &amp; scientific collaborations</div>
            <p className="text-sm leading-relaxed text-dust sm:text-base">
              Strategic collaborations initiated and led under Confidential Disclosure Agreements with leading national and international institutions to advance innovation in materials science.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-8">
              {COLLABORATIONS.map((c) => (
                <li key={c} className="flex items-baseline gap-3 text-sm text-bone/85">
                  <span className="h-px w-4 bg-copper/60 flex-shrink-0 translate-y-[-2px]" />{c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20">
          <div className="eyebrow text-dust mb-6">Conference participation &amp; specialised training</div>
          <ul className="border-t border-white/08">
            {CONFERENCES.map((c) => <CompactRow key={c.id} date={c.date} title={c.title} sub={c.event} testid={`conference-${c.id}`} />)}
          </ul>
        </div>
      </section>
    </main>
  );
}
