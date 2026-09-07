import { Helmet } from "react-helmet-async";
import { CONTACT } from "@/lib/data";

const SITE = "https://drpeddy.vercel.app";
const NAME = "Dr. Vishweshwar Peddy";
const OG_IMAGE = `${SITE}/og-image.jpg`;
const DEFAULT_DESC =
  "Dr. Vishweshwar Peddy — pharmaceutical scientist and inventor in polymorphism, pharmaceutical co-crystals, crystallisation and particle engineering. Senior Director & Head, Particle Science & Engineering, Sai Life Sciences. 40 publications, >6,700 citations, h-index 24, 79 patent filings.";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  honorificPrefix: "Dr.",
  jobTitle: "Senior Director & Head – Particle Science & Engineering",
  worksFor: { "@type": "Organization", name: "Sai Life Sciences Ltd." },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Hyderabad" },
    { "@type": "CollegeOrUniversity", name: "University of South Florida" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
  email: `mailto:${CONTACT.emailPrimary}`,
  telephone: "+91-9177003929",
  url: SITE,
  sameAs: [CONTACT.linkedin, CONTACT.scholar],
  knowsAbout: ["Polymorphism", "Pharmaceutical cocrystals", "Crystallization", "Particle engineering", "Crystal engineering", "Solid-state characterization"],
};

export const SEO = ({ title, description = DEFAULT_DESC, path = "/", type = "website" }) => {
  const fullTitle = title ? `${title} | ${NAME}` : `${NAME} — Pharmaceutical Scientist & Inventor`;
  const url = `${SITE}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${NAME} — Pharmaceutical Scientist & Inventor`} />
      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {path === "/" && <script type="application/ld+json">{JSON.stringify(PERSON_SCHEMA)}</script>}
    </Helmet>
  );
};
