import { Helmet } from "react-helmet-async";

export const SEO = ({
  title,
  description = "Dr. Vishweshwar Peddy — Pharmaceutical scientist, researcher and inventor. Senior Director & Head, Particle Science & Engineering, Sai Life Sciences. 40 publications, >6,700 citations, H-index 24, 79 patent filings.",
  name = "Dr. Vishweshwar Peddy",
  type = "website",
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | ${name}` : name}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph metadata tags */}
      <meta property="og:title" content={title ? `${title} | ${name}` : name} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      
      {/* Twitter metadata tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | ${name}` : name} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
