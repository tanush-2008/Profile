import { Reveal, SplitLines } from "@/components/motion";
import { useRequestAccess } from "@/components/RequestAccess";

export const FinalCTA = () => {
  const { open } = useRequestAccess();
  return (
    <section data-testid="final-cta-section" className="bg-ink px-6 py-32 text-bone lg:px-12 lg:py-52">
      <div className="grid grid-cols-12 items-end gap-x-4 gap-y-14">
        <div className="col-span-12 lg:col-span-8">
          <div className="eyebrow text-dust">10 — Begin</div>
          <SplitLines as="h2" lines={["Build what", "computing couldn't."]} stagger={0.14}
            className="mt-10 font-display text-[clamp(2.5rem,8vw,9.6rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em]" />
        </div>
        <Reveal delay={0.3} className="col-span-12 lg:col-span-3 lg:col-start-10">
          <p className="text-sm leading-relaxed text-dust sm:text-base">Access is limited to a small number of research and engineering partners each quarter.</p>
          <button data-testid="request-access-btn" onClick={open} className="btn-primary mt-8">Request Access</button>
          <div className="mt-8 eyebrow text-dust">access@aurelis.systems</div>
        </Reveal>
      </div>
    </section>
  );
};
