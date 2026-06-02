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
    "Built a Vue.js e-commerce prototype for technology products during my internship, using it as my first hands-on framework project with a strong focus on structured frontend development, reusable components, and basic backend integration.",
  tags: [
    {label: "Internship"},
    {label: "Venice, Italy"},
    {label: "E-commerce app"},
    {label: "Frontend/backend"},
    {label: "Private project"},
  ],
} as const satisfies WorkPageExperience;
