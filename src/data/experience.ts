export type ExperienceEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string; // "Present" for current role
  summary: string;
  highlights?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Strategy Associate",
    company: "Shadowfax Technologies",
    companyUrl: "https://www.shadowfax.in",
    start: "Dec 2025",
    end: "May 2026",
    summary:
      "Drove strategy and internal product initiatives at a 3PL logistics firm in Bengaluru, from network redesign to building tools that replaced legacy vendor software.",
    highlights: [
      "Led a 3-member team and reduced National Middle Mile Cost per Shipment from ₹5.52 to ₹5.17, delivering ~₹31 Cr in annualised savings through network redesign, procurement optimisation, vendor benchmarking, and elimination of operational leakages.",
      "Independently launched two internal products: a Freight Estimator used in enterprise client pricing discussions, and an expense management platform replacing Happay — improving operational flexibility while cutting software licensing costs.",
      "Designed end-to-end workflows, decision trees, and AI-driven expense validation for the expense platform, projecting ~₹50 lakh in annual administrative savings through reduced pilferage and duplicate claims.",
    ],
  },
  {
    role: "Senior Associate 1 & 2",
    company: "Boston Consulting Group",
    companyUrl: "https://www.bcg.com",
    start: "Mar 2024",
    end: "2025",
    summary:
      "Management consulting engagements spanning procurement strategy, org design, and market entry for clients in industrial goods, banking, and technology, based in Mumbai.",
    highlights: [
      "Delivered 5% direct cost savings in a key product category for an industrial goods client through technical teardown, vendor benchmarking and consolidation, and new vendor onboarding.",
      "Supported the design and setup of the org structure and operating model for a ~1,000-FTE global capability centre of a multinational commercial bank, including the initial business plan with projections and phasing.",
      "Enabled market entry for an IT client into the Middle Eastern and North American airline sector by identifying $5–6mn worth of opportunities, mapping key buying centres, and co-developing pitches.",
    ],
  },
  {
    role: "Strategy & Innovation Consultant",
    company: "Cognisphere",
    start: "2023",
    end: "Jan 2024",
    summary:
      "Designed digital tools for a carbon credit implementation firm in Noida, digitising field operations for a largely female, grassroots agricultural workforce.",
    highlights: [
      "Designed a smartphone app to digitise field operations for 400–500 users across farmer, supervisor, and director roles, replacing manual, paper-based tracking.",
      "Collaborated with engineering teams to design an intuitive interface tailored to on-ground realities, built for a workforce comprising 80% female farmers from Scheduled Caste and Scheduled Tribe communities.",
      "Initiated a drone image monitoring program to automate sapling growth and health tracking, targeting a 90% improvement in efficiency and audit-ready data for carbon credit validation.",
    ],
  },
  {
    role: "Controller Modeler",
    company: "Goldman Sachs",
    companyUrl: "https://www.goldmansachs.com",
    start: "2020",
    end: "Dec 2022",
    summary:
      "Built reconciliation and automation infrastructure for Goldman Sachs' Controllers organisation in Bengaluru, processing large-scale trade data.",
    highlights: [
      "Spearheaded development of PreCTL, a global reconciliation platform streamlining trade data validation across multiple audit systems and regions.",
      "Built data ingestion pipelines handling 100+ GB/day of trade data, with automated failsafe recourse and scalable models to consolidate raw and audited trade records.",
      "Led automation of P&L break explanations, eliminating manual workflows and delivering an estimated annual efficiency gain of 100,000+ man-hours; acted as strategic liaison between engineering and Controller teams.",
    ],
  },
];
