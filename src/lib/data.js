// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV = [
  { id: "research",     label: "Research",     path: "/research" },
  { id: "innovation",   label: "Innovation",   path: "/innovation" },
  { id: "publications", label: "Publications", path: "/publications" },
  { id: "patents",      label: "Patents",      path: "/patents" },
  { id: "career",       label: "Career",       path: "/career" },
  { id: "contact",      label: "Contact",      path: "/contact" },
];

// ─── Impact Metrics ───────────────────────────────────────────────────────────

export const METRICS = [
  { id: "publications", value: 40,   suffix: "",   label: "Peer-Reviewed Publications", note: "Across crystallography, solid-state chemistry and pharmaceutical science journals." },
  { id: "citations",    value: 6700, suffix: "+",  label: "Citations", note: "Google Scholar. H-index 24." },
  { id: "hindex",       value: 24,   suffix: "",   label: "H-Index", note: "Sustained citation impact across two decades of research." },
  { id: "patents",      value: 79,   suffix: "",   label: "Patent Filings", note: "14 granted patents across solid-form innovation and pharmaceutical IP." },
];

// ─── Scientific Domains ───────────────────────────────────────────────────────

export const DOMAINS = [
  {
    id: "polymorphism",
    index: "01",
    title: "Polymorphism",
    tag: "Solid-Form Science",
    lede: "Controlling the crystal form of an active pharmaceutical ingredient.",
    body: "Different polymorphic forms of the same molecule can exhibit dramatically different solubility, stability, bioavailability and manufacturability. Identifying, characterising and controlling polymorphic forms is foundational to pharmaceutical development. Research spans XRPD, DSC, solid-state NMR, hot-stage microscopy and single-crystal X-ray diffraction.",
    keyAreas: ["Polymorph screening", "Solvate/hydrate characterisation", "Thermodynamic stability ranking", "Scale-up crystallisation control"],
  },
  {
    id: "cocrystals",
    index: "02",
    title: "Pharmaceutical Cocrystals",
    tag: "Crystal Engineering",
    lede: "Designing multicomponent crystalline solids to tune drug properties.",
    body: "Pharmaceutical cocrystals combine an API with a GRAS coformer in a defined stoichiometric ratio, exploiting hydrogen bonding and other non-covalent interactions. This approach offers a powerful intellectual-property and formulation strategy — modifying physicochemical properties without altering the API covalent structure.",
    keyAreas: ["Coformer selection & screening", "Crystal structure determination", "IP novelty assessment", "Regulatory classification"],
  },
  {
    id: "crystallisation",
    index: "03",
    title: "Crystallisation",
    tag: "Process Science",
    lede: "From solution to defined crystalline solid — design and control.",
    body: "Crystallisation is the primary purification and solid-form generation process in pharmaceutical manufacturing. Research encompasses nucleation kinetics, supersaturation control, anti-solvent addition, seeding strategies, temperature cycling and scale-up from laboratory to manufacturing. Process Analytical Technology (PAT) — FBRM, PVM, in-situ Raman — underpins real-time monitoring.",
    keyAreas: ["Nucleation & growth kinetics", "Seeding strategies", "Anti-solvent & cooling crystallisation", "PAT integration"],
  },
  {
    id: "particle-science",
    index: "04",
    title: "Particle Science & Engineering",
    tag: "Physical Pharmacy",
    lede: "Controlling particle size, shape, surface and flow for downstream manufacturing.",
    body: "Particle attributes — size distribution, morphology, surface energy, flow and bulk density — directly determine blend uniformity, compressibility, dissolution rate and inhalation performance. Research applies milling, micronisation, spray-drying, hot-melt extrusion and precision crystallisation to engineer particles fit for purpose.",
    keyAreas: ["Particle size & shape engineering", "Laser diffraction & image analysis", "Surface energy characterisation", "Inhalation particle design"],
  },
  {
    id: "asd",
    index: "05",
    title: "Amorphous Systems & ASDs",
    tag: "Solubility Enhancement",
    lede: "Stabilising the amorphous state to unlock bioavailability.",
    body: "Amorphous solid dispersions (ASDs) present the drug in a high-energy amorphous state within a polymer matrix, dramatically improving apparent solubility for BCS Class II and IV compounds. Research covers miscibility, glass transition, physical stability prediction, hot-melt extrusion and spray-drying process development.",
    keyAreas: ["ASD screening & development", "Glass transition & miscibility", "Physical stability assessment", "HME & spray-drying process"],
  },
  {
    id: "characterisation",
    index: "06",
    title: "Solid-State Characterisation",
    tag: "Analytical Science",
    lede: "A complete analytical toolkit for understanding crystalline and amorphous matter.",
    body: "Definitive characterisation requires orthogonal techniques. The toolkit includes powder X-ray diffraction (PXRD), differential scanning calorimetry (DSC), thermogravimetric analysis (TGA), solid-state NMR, Raman/IR spectroscopy, hot-stage microscopy, dynamic vapour sorption (DVS) and single-crystal X-ray diffraction. Over 300 crystal structures solved and refined.",
    keyAreas: ["XRPD pattern analysis", "DSC/TGA thermal analysis", "Solid-state NMR", "Single-crystal X-ray diffraction"],
  },
  {
    id: "csp",
    index: "07",
    title: "Crystal Structure Prediction",
    tag: "Computational Science",
    lede: "Predicting the crystal landscape before synthesis.",
    body: "Crystal Structure Prediction (CSP) maps the energy landscape of possible crystal packings using force-field and DFT calculations, enabling risk assessment of undiscovered polymorphs and guiding experimental screening. Research applies CSP in IP strategy (demonstrating prior art or distinguishing novel forms) and regulatory solid-form assessment.",
    keyAreas: ["Energy landscape mapping", "CSP for IP strategy", "CSD structure analysis", "Polymorphic risk assessment"],
  },
  {
    id: "ip-regulatory",
    index: "08",
    title: "IP & Regulatory Strategy",
    tag: "Pharmaceutical IP",
    lede: "Translating solid-form science into durable intellectual property.",
    body: "Solid-form IP is a critical element of pharmaceutical lifecycle management. Research applies to 79 patent filings spanning novel polymorphs, cocrystals, salts and processes. Regulatory expertise covers ICH Q6A solid-form classification, non-infringement evaluations, Orange Book strategy and solid-form sections of CTD submissions.",
    keyAreas: ["Novel solid-form filing strategy", "Non-infringement evaluation", "ICH Q6A classification", "Orange Book & CTD strategy"],
  },
];

// ─── Scientific Pipeline ──────────────────────────────────────────────────────

export const PIPELINE = [
  {
    id: "molecular",
    n: "01",
    title: "Molecular Structure",
    sub: "API Chemistry",
    desc: "Understanding the molecular architecture — functional groups, H-bond donors/acceptors, conformational flexibility, ionisation state — that governs solid-form behaviour.",
  },
  {
    id: "solid-form",
    n: "02",
    title: "Solid Form",
    sub: "Polymorphs · Salts · Cocrystals · Amorphous",
    desc: "Systematically discovering, characterising and selecting the optimal solid form — polymorph, salt, cocrystal or amorphous dispersion — for the development candidate.",
  },
  {
    id: "crystallisation",
    n: "03",
    title: "Crystallisation",
    sub: "Process Design & Control",
    desc: "Designing a robust, scalable crystallisation process with defined nucleation, growth and isolation conditions. PAT tools provide real-time insight.",
  },
  {
    id: "particle-eng",
    n: "04",
    title: "Particle Engineering",
    sub: "Size · Shape · Surface",
    desc: "Engineering particle attributes — size distribution, morphology, surface energy — to deliver compressibility, flowability and dissolution performance.",
  },
  {
    id: "scale-up",
    n: "05",
    title: "Scale-Up",
    sub: "Pilot → Manufacturing",
    desc: "Translating laboratory-optimised processes to pilot and commercial scale, preserving critical quality attributes and crystallographic purity.",
  },
  {
    id: "ip-reg",
    n: "06",
    title: "IP / Regulatory",
    sub: "Patent Filing · CTD Strategy",
    desc: "Filing and prosecuting solid-form patents. Generating regulatory data packages for CTD solid-form sections. Non-infringement and freedom-to-operate analysis.",
  },
  {
    id: "product",
    n: "07",
    title: "Pharmaceutical Product",
    sub: "Formulation → Market",
    desc: "A drug product with defined, reproducible solid-form characteristics — the culmination of science, engineering and regulatory strategy working in concert.",
  },
];

// ─── Selected Case Studies ────────────────────────────────────────────────────

export const CASE_STUDIES = [
  {
    id: "tafamidis",
    drug: "Tafamidis",
    tag: "Polymorph & Cocrystal",
    indication: "Transthyretin amyloid cardiomyopathy",
    context: "Solid-form characterisation and crystal structure analysis of tafamidis polymorphic forms, supporting solid-form IP evaluation and differentiation strategy.",
  },
  {
    id: "roxadustat",
    drug: "Roxadustat",
    tag: "Solid Form IP",
    indication: "Anaemia of chronic kidney disease",
    context: "Solid-form screening, characterisation and IP novelty evaluation for the HIF-PH inhibitor roxadustat. Crystal structure determination and solid-form differentiation.",
  },
  {
    id: "lenvatinib",
    drug: "Lenvatinib",
    tag: "Polymorphism",
    indication: "Thyroid and hepatocellular carcinoma",
    context: "Polymorph screening and solid-state characterisation of lenvatinib mesylate, including crystal structure analysis and stability evaluation of solid forms.",
  },
  {
    id: "mirabegron",
    drug: "Mirabegron",
    tag: "Crystallisation & Particle Science",
    indication: "Overactive bladder",
    context: "Crystallisation process development and particle engineering for mirabegron, targeting defined particle size distribution and polymorphic purity for formulation.",
  },
  {
    id: "nilotinib",
    drug: "Nilotinib",
    tag: "Salt & Cocrystal Screening",
    indication: "Chronic myelogenous leukaemia",
    context: "Salt and cocrystal screening for nilotinib — a BCS Class II compound with challenging solubility — to identify solid forms with improved physicochemical properties.",
  },
  {
    id: "vilazodone",
    drug: "Vilazodone",
    tag: "Solid Form & IP",
    indication: "Major depressive disorder",
    context: "Solid-form assessment and IP evaluation for vilazodone hydrochloride polymorphs and solvates. Non-infringement analysis and crystallographic characterisation.",
  },
];

// ─── Career Timeline ──────────────────────────────────────────────────────────

export const CAREER = [
  {
    id: "uoh",
    period: "1998 – 2003",
    role: "M.Sc. & Ph.D., Chemistry",
    org: "University of Hyderabad",
    location: "Hyderabad, India",
    type: "education",
    detail: "Doctoral research in crystallography and solid-state chemistry. Foundation in X-ray diffraction, crystal growth and structural analysis.",
  },
  {
    id: "usf",
    period: "2003 – 2006",
    role: "Postdoctoral Research Associate",
    org: "University of South Florida",
    location: "Tampa, Florida, USA",
    type: "postdoc",
    detail: "Postdoctoral research in crystal engineering and pharmaceutical cocrystals. Developed expertise in pharmaceutical solid-form science and Cambridge Structural Database analysis.",
  },
  {
    id: "drl",
    period: "2006 – 2016",
    role: "Pharmaceutical Scientist → Senior Scientist",
    org: "Dr. Reddy's Laboratories",
    location: "Hyderabad, India",
    type: "industry",
    detail: "~10 years in pharmaceutical solid-form R&D. Led polymorph screening, salt selection, cocrystal development and solid-state characterisation for global generics and innovation pipeline. Built IP and regulatory solid-form strategy capabilities.",
  },
  {
    id: "glenmark",
    period: "2016 – 2023",
    role: "Head, Solid-State Chemistry & Particle Science",
    org: "Glenmark Life Sciences",
    location: "Navi Mumbai, India",
    type: "industry",
    detail: "Led the solid-state chemistry and particle science function. Managed teams across polymorph/cocrystal R&D, particle engineering and analytical characterisation. Expanded patent portfolio and supported global API development programmes.",
  },
  {
    id: "sai",
    period: "2023 – Present",
    role: "Senior Director & Head, Particle Science & Engineering",
    org: "Sai Life Sciences",
    location: "Hyderabad, India",
    type: "current",
    detail: "Executive leadership of the Particle Science & Engineering department. Responsible for solid-form development, crystallisation, particle engineering, characterisation, CSP and IP/regulatory strategy across 40+ client programmes.",
  },
];

// ─── Manifesto Lines (scroll-driven) ─────────────────────────────────────────

export const STATEMENT_LINES = [
  "Molecular structure determines",
  "everything in medicine.",
  "We engineer it precisely.",
];

// ─── Marquee Keywords ─────────────────────────────────────────────────────────

export const MARQUEE_ITEMS = [
  "Polymorphism",
  "Crystal Engineering",
  "Pharmaceutical Cocrystals",
  "Particle Science",
  "XRPD",
  "DSC",
  "Solid-State NMR",
  "Crystal Structure Prediction",
  "Amorphous Dispersions",
  "PAT",
  "Crystallisation",
  "IP Strategy",
  "Solid-Form Screening",
  "Regulatory Science",
  "Single-Crystal XRD",
  "Hot-Melt Extrusion",
  "Spray Drying",
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_COLUMNS = [
  {
    id: "research",
    title: "Research",
    links: [
      { label: "Polymorphism",        path: "/research#polymorphism" },
      { label: "Cocrystals",          path: "/research#cocrystals" },
      { label: "Crystallisation",     path: "/research#crystallisation" },
      { label: "Particle Science",    path: "/research#particle-science" },
      { label: "Amorphous Systems",   path: "/research#asd" },
    ],
  },
  {
    id: "innovation",
    title: "Innovation",
    links: [
      { label: "Scientific Pipeline", path: "/innovation" },
      { label: "Case Studies",        path: "/innovation#case-studies" },
      { label: "Publications",        path: "/publications" },
      { label: "Patents",             path: "/patents" },
    ],
  },
  {
    id: "career",
    title: "Career",
    links: [
      { label: "Sai Life Sciences",  path: "/career#sai" },
      { label: "Glenmark",           path: "/career#glenmark" },
      { label: "Dr. Reddy's",        path: "/career#drl" },
      { label: "Academic",           path: "/career#uoh" },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    links: [
      { label: "Collaborate",        path: "/contact" },
      { label: "LinkedIn",           path: "https://www.linkedin.com/in/vishweshwar-peddy", external: true },
    ],
  },
];
