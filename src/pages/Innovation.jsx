import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitLines, EASE } from "@/components/motion";
import { PIPELINE, PRODUCTS, PRODUCT_GROUPS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const PipelineDiagram = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div ref={ref} className="relative py-16 lg:py-24">
      <div className="absolute bottom-0 left-6 top-0 w-px bg-white/06 lg:left-1/2" />
      <motion.div className="absolute left-6 top-0 w-px origin-top bg-copper lg:left-1/2" style={{ scaleY, height: "100%" }} />

      <div className="relative space-y-0">
        {PIPELINE.map((step, i) => {
          const isRight = i % 2 === 0;
          return (
            <Reveal key={step.id} delay={i * 0.06}>
              <div data-testid={`pipeline-step-${step.id}`} className="grid grid-cols-12 items-start gap-x-4 py-10 lg:py-14">
                <div className={cn("col-span-10 col-start-3 lg:col-span-5", isRight ? "lg:col-start-1 lg:pr-12 lg:text-right" : "lg:col-start-7 lg:pl-12")}>
                  <motion.div
                    initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                  >
                    <div className="eyebrow mb-3 text-copper">{step.sub}</div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">{step.title}</h3>
                    <p className={cn("mt-4 max-w-sm text-sm leading-relaxed text-dust", isRight && "lg:ml-auto")}>{step.desc}</p>
                  </motion.div>
                </div>
                <div className="col-span-2 col-start-1 flex justify-start lg:col-span-2 lg:col-start-6 lg:justify-center">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-copper/50 bg-ink">
                    <span className="font-display text-base font-bold text-copper">{step.n}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

const ProductRow = ({ p, i }) => (
  <Reveal delay={Math.min(i * 0.05, 0.3)} data-testid={`product-${p.id}`}>
    <div className="group grid grid-cols-12 gap-x-4 gap-y-4 border-b border-white/06 py-8 lg:py-10">
      <div className="col-span-2 lg:col-span-1">
        <span className="font-display text-3xl font-bold text-white/10 transition-colors duration-500 group-hover:text-copper/30 lg:text-4xl">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="col-span-10 lg:col-span-4">
        <span className="label-tag copper mb-3 inline-flex">{p.tag}</span>
        <h3 className="font-display text-xl font-bold uppercase tracking-tight transition-colors duration-500 group-hover:text-copper sm:text-2xl lg:text-3xl">{p.drug}</h3>
        <p className="mt-2 text-sm text-bone/60">{p.form}</p>
      </div>
      <div className="col-span-12 lg:col-span-3 lg:col-start-6">
        <div className="eyebrow mb-2 text-dust">Patents</div>
        <p className="font-mono text-[11px] leading-relaxed text-bone/75">{p.patents}</p>
      </div>
      <div className="col-span-12 lg:col-span-4 lg:col-start-9">
        <div className="eyebrow mb-2 text-dust">Regulatory filing</div>
        <p className="text-sm text-bone/85">{p.filing}</p>
        {p.note && <p className="mt-2 font-serif text-base italic leading-relaxed text-bone/50">{p.note}</p>}
      </div>
    </div>
  </Reveal>
);

export default function Innovation() {
  let counter = 0;
  return (
    <main data-testid="page-innovation">
      <SEO
        title="Drug Development & Filed Products"
        description="From molecule to medicine: the solid-form, crystallisation and particle-engineering pipeline, applied to novel solid forms of Roxadustat, Lenvatinib, Tafamidis, Mirabegron, Nilotinib and more — Para-IV ANDAs and US-DMF filings."
        path="/innovation"
      />
      <section className="min-h-[60svh] bg-ink px-6 pb-20 pt-36 text-bone lg:px-12 lg:pt-48">
        <div className="relative z-10">
          <span className="section-label">Seven-stage pipeline</span>
          <SplitLines
            as="h1"
            lines={["From molecule", "to medicine."]}
            delay={0.3}
            data-testid="page-innovation-title"
            className="mt-4 font-display text-[clamp(3rem,9vw,10rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
          />
          <Reveal delay={0.5} className="mt-10 max-w-2xl lg:ml-auto lg:max-w-xl">
            <p className="text-base leading-relaxed text-dust sm:text-lg">
              Seven interconnected disciplines transform an active molecule into a stable, manufacturable pharmaceutical product — and the same pipeline has carried novel solid forms through to US-DMF filings and commercial supply.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/08 bg-ink px-6 lg:px-12">
        <div className="mx-auto max-w-4xl"><PipelineDiagram /></div>
      </section>

      <section id="products" className="border-t border-white/08 bg-carbon px-6 py-24 text-bone lg:px-12 lg:py-36">
        <div className="mb-16 grid grid-cols-12 gap-x-4 gap-y-8 lg:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <span className="section-label">Public-domain product information</span>
            <SplitLines
              as="h2"
              lines={["Filed", "products."]}
              delay={0.2}
              className="mt-4 font-display text-[clamp(2.4rem,7vw,8rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]"
            />
          </div>
          <Reveal delay={0.4} className="col-span-12 flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-dust sm:text-base">
              Novel solid forms of APIs filed as Para-IV ANDAs and US Drug Master Files, together with new-product and cost-improvement programmes. Product information restricted to what is available in the public domain.
            </p>
            <div className="mt-6 flex gap-10">
              <div><div className="font-display text-3xl font-bold text-copper">8</div><div className="eyebrow mt-1 text-dust">US-DMFs from novel forms</div></div>
              <div><div className="font-display text-3xl font-bold text-bone">{PRODUCTS.length}</div><div className="eyebrow mt-1 text-dust">Programmes listed</div></div>
            </div>
          </Reveal>
        </div>

        {PRODUCT_GROUPS.map((g) => {
          const items = PRODUCTS.filter((p) => p.group === g.id);
          return (
            <div key={g.id} className="mb-16 last:mb-0" data-testid={`product-group-${g.id}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-white/12 pt-6">
                <h3 className="font-display text-base font-bold uppercase tracking-wide sm:text-lg">{g.title}</h3>
                <span className="eyebrow text-dust">{g.note}</span>
              </div>
              <div className="mt-2">
                {items.map((p) => <ProductRow key={p.id} p={p} i={counter++} />)}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
