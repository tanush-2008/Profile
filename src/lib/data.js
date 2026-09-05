export const IMG = {
  helios:
    "https://static.prod-images.emergentagent.com/jobs/7c386d7c-6dcd-47fb-b3f6-ee2252301563/images/f5689cb2957dbcca7a680320dad00ca8701acae7275ca79d9ef03902d60a8075.jpeg",
  aerospace:
    "https://static.prod-images.emergentagent.com/jobs/7c386d7c-6dcd-47fb-b3f6-ee2252301563/images/4168688bcef4ee24219e12789b896c92fbb244eddf52969d435a43ebb3679e69.jpeg",
  energy:
    "https://static.prod-images.emergentagent.com/jobs/7c386d7c-6dcd-47fb-b3f6-ee2252301563/images/a4bb2a7840db9524bcf586702730112a1b3c062896263f53ccd10016b569d1a9.jpeg",
  materials:
    "https://static.prod-images.emergentagent.com/jobs/7c386d7c-6dcd-47fb-b3f6-ee2252301563/images/6a7f23ce314c7e8d57bd16fd750d6167991acd455dc78ccb6e086d5b1758435c.jpeg",
  robotics:
    "https://static.prod-images.emergentagent.com/jobs/7c386d7c-6dcd-47fb-b3f6-ee2252301563/images/a7708c8df17c8ce7f24fc0c975808bd5a6817ac64328cbd2dd65dc0162df6b64.jpeg",
  drug:
    "https://static.prod-images.emergentagent.com/jobs/7c386d7c-6dcd-47fb-b3f6-ee2252301563/images/9c03a9a13f0d5d5d67ddd31a29707df0a77bc0bc1852c71d5a514c3c01f01a51.jpeg",
  climate:
    "https://static.prod-images.emergentagent.com/jobs/7c386d7c-6dcd-47fb-b3f6-ee2252301563/images/85eb2ec280d1717aeb62bf4cb7ce69dbc914c04f8fa9f8b012da0d9c003a44cf.jpeg",
};

export const NAV = [
  { id: "technology", label: "Technology", path: "/technology" },
  { id: "applications", label: "Applications", path: "/applications" },
  { id: "research", label: "Research", path: "/research" },
  { id: "company", label: "Company", path: "/company" },
];

export const CHAPTERS = [
  {
    n: "01",
    title: "Substrate",
    text: "Compute, memory and interconnect designed as a single continuous medium — not a stack of parts negotiating with one another.",
  },
  {
    n: "02",
    title: "Reasoning",
    text: "The system observes the structure of a problem while it runs, and reorganises its own execution around what it learns.",
  },
  {
    n: "03",
    title: "Boundary",
    text: "We work at the edge of what is physically computable: the regime where brute force stops scaling and understanding begins.",
  },
];

export const TECH_MODES = [
  {
    id: "cluster-mesh",
    index: "M.01",
    label: "Cluster Mesh",
    metric: "128 nodes",
    desc: "Nodes form a self-describing lattice. Topology is negotiated at runtime, so a workload is never shaped by the wiring of the machine.",
    stats: [
      ["Interconnect", "1.6 Tb/s / node"],
      ["Topology", "Adaptive lattice"],
    ],
  },
  {
    id: "thermal-dynamics",
    index: "M.02",
    label: "Thermal Dynamics",
    metric: "0.7 PUE",
    desc: "Heat is treated as a first-class signal. Work migrates away from thermal hotspots before they form, keeping the substrate in its efficient band.",
    stats: [
      ["Thermal headroom", "Predictive, 40 ms"],
      ["Idle compute", "−94%"],
    ],
  },
  {
    id: "data-movement",
    index: "M.03",
    label: "Data Movement",
    metric: "0.4 ms",
    desc: "Data does not wait for compute. Fields, tensors and particle states stream to where the next operation will happen, before it is requested.",
    stats: [
      ["Prefetch horizon", "12 steps"],
      ["Latency, p99", "0.4 ms"],
    ],
  },
];

export const CAPABILITIES = [
  {
    id: "simulation",
    index: "A",
    title: "Simulation",
    lede: "Accelerate complex simulations.",
    body: "Multiphysics, fluid dynamics, molecular systems and structural analysis run as one coordinated workload. Solvers are coupled, not queued.",
    params: [
      ["Solver coupling", "Adaptive"],
      ["Precision", "FP64 / mixed"],
      ["Mesh refinement", "Autonomous"],
      ["Typical speed-up", "10×"],
    ],
    align: "left",
  },
  {
    id: "discovery",
    index: "B",
    title: "Discovery",
    lede: "Explore computational possibilities.",
    body: "Parameter spaces too large to enumerate are searched by intent. The system proposes, tests and discards hypotheses at machine speed.",
    params: [
      ["Search strategy", "Model-guided"],
      ["Candidates / hour", "2.1 M"],
      ["Surrogate fidelity", "Self-calibrating"],
      ["Human review", "Top 0.01%"],
    ],
    align: "right",
  },
  {
    id: "autonomy",
    index: "C",
    title: "Autonomy",
    lede: "Dynamically optimise workloads.",
    body: "No scheduler. No job queue. The substrate allocates itself against the structure of the problem and rebalances continuously as it changes.",
    params: [
      ["Scheduling", "Emergent"],
      ["Rebalance interval", "Continuous"],
      ["Failure handling", "Self-healing"],
      ["Operator input", "Optional"],
    ],
    align: "center",
  },
];

export const APPLICATIONS = [
  { id: "aerospace", title: "Aerospace", tag: "Hypersonic regimes", img: IMG.aerospace, note: "Coupled thermal-structural analysis of airframes under sustained hypersonic load." },
  { id: "energy", title: "Energy", tag: "Plasma confinement", img: IMG.energy, note: "Real-time magnetic field optimisation for next-generation fusion reactors." },
  { id: "materials", title: "Materials Science", tag: "Alloy microstructure", img: IMG.materials, note: "Atom-scale simulation of alloys that do not yet exist." },
  { id: "robotics", title: "Robotics", tag: "Embodied control", img: IMG.robotics, note: "Whole-body dynamics learned in simulation, transferred to hardware without retuning." },
  { id: "drug", title: "Drug Discovery", tag: "Protein dynamics", img: IMG.drug, note: "Binding behaviour resolved over microseconds instead of nanoseconds." },
  { id: "climate", title: "Climate Modeling", tag: "Ocean-atmosphere coupling", img: IMG.climate, note: "Kilometre-scale earth-system models run inside a single planning cycle." },
];

export const FOOTER_COLUMNS = [
  { id: "tech", title: "Technology", links: ["Substrate", "Node Architecture", "Autonomy Layer", "Specifications"] },
  { id: "applications", title: "Applications", links: ["Aerospace", "Energy", "Materials", "Robotics", "Life Sciences", "Climate"] },
  { id: "research", title: "Research", links: ["Publications", "Preprints", "Project Helios", "Open Problems"] },
  { id: "company", title: "Company", links: ["About", "Leadership", "Careers", "Press"] },
  { id: "contact", title: "Contact", links: ["Request Access", "Partnerships", "Zürich", "Pasadena"] },
];

export const PUBLICATIONS = [
  { id: "p01", year: 2026, domain: "Systems", type: "Preprint", title: "Emergent Scheduling in Heterogeneous Reasoning Substrates", authors: "Vasquez, Okafor, Lind", ref: "AUR-26-04" },
  { id: "p02", year: 2026, domain: "Materials", type: "Paper", title: "Project Helios: Microstructural Mapping of Ni-Superalloys at 1.2B Particles", authors: "Lind, Sato, Brenner", ref: "AUR-26-02" },
  { id: "p03", year: 2026, domain: "Aerospace", type: "Technical brief", title: "Coupled Thermal-Structural Analysis under Sustained Hypersonic Load", authors: "Okafor, Deng", ref: "AUR-26-01" },
  { id: "p04", year: 2025, domain: "Systems", type: "Paper", title: "Predictive Thermal Migration in Dense Compute Lattices", authors: "Vasquez, Haas", ref: "AUR-25-11" },
  { id: "p05", year: 2025, domain: "Energy", type: "Preprint", title: "Real-Time Magnetic Field Optimisation for Stellarator Confinement", authors: "Moreau, Sato", ref: "AUR-25-09" },
  { id: "p06", year: 2025, domain: "Life Sciences", type: "Paper", title: "Microsecond-Scale Binding Dynamics on Autonomous Substrates", authors: "Brenner, Adeyemi, Deng", ref: "AUR-25-07" },
  { id: "p07", year: 2025, domain: "Systems", type: "Essay", title: "Beyond Brute Force: Computation as Structured Discovery", authors: "Lind", ref: "AUR-25-06" },
  { id: "p08", year: 2024, domain: "Robotics", type: "Preprint", title: "Sim-to-Hardware Transfer of Whole-Body Dynamics without Retuning", authors: "Haas, Okafor", ref: "AUR-24-10" },
  { id: "p09", year: 2024, domain: "Climate", type: "Paper", title: "Kilometre-Scale Earth-System Models within a Single Planning Cycle", authors: "Moreau, Adeyemi", ref: "AUR-24-05" },
  { id: "p10", year: 2024, domain: "Systems", type: "Technical brief", title: "The A-Series Substrate: Design Principles", authors: "AURELIS Systems", ref: "AUR-24-01" },
];

export const SUBPAGES = {
  technology: {
    n: "02",
    title: ["Node", "Architecture."],
    lede: "The A-Series substrate: a continuous computing medium in which compute, memory and interconnect are designed as one system, and the system designs its own execution.",
    rows: [
      ["A-Series Node", "Single reasoning unit. 1.6 Tb/s interconnect, unified memory, predictive thermal envelope."],
      ["Lattice Fabric", "Self-describing topology negotiated at runtime. No fixed wiring, no scheduler."],
      ["Autonomy Layer", "Runtime that observes workload structure and continuously reallocates the substrate."],
      ["Specifications", "Full technical documentation is available to partners under access agreement."],
    ],
  },
  applications: {
    n: "05",
    title: ["Scientific &", "Engineering", "Programmes."],
    lede: "AURELIS systems are deployed where conventional computation has already reached its limit — in laboratories, test ranges and design offices across six domains.",
    rows: APPLICATIONS.map((a) => [a.title, a.note]),
  },
  research: {
    n: "08",
    title: ["Publications", "& Preprints."],
    lede: "We publish what we learn. Research from AURELIS laboratories and partner institutions, in the order it was released.",
    rows: [
      ["2026 / 04", "Emergent Scheduling in Heterogeneous Reasoning Substrates — Vasquez, Okafor, Lind"],
      ["2026 / 02", "Project Helios: Microstructural Mapping of Ni-Superalloys at 1.2B Particles"],
      ["2025 / 11", "Predictive Thermal Migration in Dense Compute Lattices"],
      ["2025 / 06", "Beyond Brute Force: Computation as Structured Discovery"],
    ],
  },
  company: {
    n: "09",
    title: ["Built at the", "edge."],
    lede: "AURELIS is a team of physicists, systems engineers and designers working from Zürich and Pasadena. We build for the people whose problems will define the next century.",
    rows: [
      ["Leadership", "Founded by researchers from ETH Zürich, Caltech and the Max Planck Society."],
      ["Infrastructure", "Two substrate facilities. One design office. Zero racks of conventional hardware."],
      ["Careers", "We hire slowly and deliberately. Open roles in systems, applied physics and design."],
      ["Press", "Media enquiries: press@aurelis.systems"],
    ],
  },
};
