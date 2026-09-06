import { Hero } from "@/sections/Hero";
import { ScientificDomains } from "@/sections/Positioning";
import { Metrics } from "@/sections/Scale";
import { Pipeline } from "@/sections/Pipeline";
import { SelectedWork } from "@/sections/CaseStudy";
import { Statement } from "@/sections/Philosophy";
import { FinalCTA } from "@/sections/FinalCTA";
import { SEO } from "@/components/SEO";

export default function Home() {
  return (
    <main data-testid="home-page">
      <SEO title="Home" />
      <Hero />
      <ScientificDomains />
      <Metrics />
      <Pipeline />
      <SelectedWork />
      <Statement />
      <FinalCTA />
    </main>
  );
}
