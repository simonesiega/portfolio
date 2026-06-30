import type {WorkPageExperience} from "../types";

export const dacosSrlExperience = {
  id: "dacos-srl",
  sortStart: "2025-05",
  logoSrc: "/work/logos/Dacos.png",
  logoAlt: "Dacos S.r.l. logo",
  dateRange: "May 2025 — Jun 2025",
  role: "Software Developer Intern",
  company: "Dacos S.r.l.",
  companyUrl: null,
  companyType: "Internship",
  location: "Venice, Italy",
  description:
    "Developed a Vue.js e-commerce prototype for 100+ technology products, using reusable components, routing, state management, and structured data integration. Tested core shopping flows for up to 20 concurrent users and added rate-limited data handling to reduce repeated requests during product interactions.",
  tags: [
    {label: "Internship"},
    {label: "Venice, Italy"},
    {label: "E-commerce app"},
    {label: "Frontend/backend"},
    {label: "Internal prototype"},
  ],
} as const satisfies WorkPageExperience;
