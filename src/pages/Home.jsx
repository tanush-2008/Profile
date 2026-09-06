import { Hero } from "@/sections/Hero";
import { ScientificDomains } from "@/sections/Positioning";
import { Metrics } from "@/sections/Scale";
import { Pipeline } from "@/sections/Pipeline";
import { SelectedWork } from "@/sections/CaseStudy";
import { Statement } from "@/sections/Philosophy";
import { Marquee } from "@/sections/Marquee";
import { FinalCTA } from "@/sections/FinalCTA";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <ScientificDomains />
      <Metrics />
      <Pipeline />
      <SelectedWork />
      <Statement />
      <Marquee />
      <FinalCTA />
    </main>
  );
}
