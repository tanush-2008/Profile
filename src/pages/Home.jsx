import { Hero } from "@/sections/Hero";
import { Positioning } from "@/sections/Positioning";
import { Technology } from "@/sections/Technology";
import { Capabilities } from "@/sections/Capabilities";
import { Scale } from "@/sections/Scale";
import { Applications } from "@/sections/Applications";
import { CaseStudy } from "@/sections/CaseStudy";
import { Philosophy } from "@/sections/Philosophy";
import { Marquee } from "@/sections/Marquee";
import { FinalCTA } from "@/sections/FinalCTA";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <Positioning />
      <Technology />
      <Capabilities />
      <Scale />
      <Applications />
      <CaseStudy />
      <Philosophy />
      <Marquee />
      <FinalCTA />
    </main>
  );
}
