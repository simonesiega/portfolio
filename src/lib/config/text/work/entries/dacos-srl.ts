import type {WorkPageExperience} from "../types";

export const dacosSrlExperience = {
  id: "dacos-srl",
  sortStart: "2025-05",
  logoSrc: "/work/logos/Dacos.png",
  logoAlt: "Dacos SRL logo",
  dateRange: "May 2025 — Jun 2025",
  role: "Software Developer Intern",
  company: "Dacos SRL",
  companyUrl: null,
  companyType: "Internship",
  location: "Venice, Italy",
  description:
    "Built a Vue.js e-commerce prototype for technology products during my internship, with a focus on structured frontend development, reusable components, routing, state management, and basic backend integration.",
  tags: [
    {label: "Internship"},
    {label: "Venice, Italy"},
    {label: "E-commerce app"},
    {label: "Frontend/backend"},
    {label: "Internal prototype"},
  ],
} as const satisfies WorkPageExperience;
