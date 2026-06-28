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
    "Developed a Vue.js e-commerce prototype for technology products during my internship, working on reusable components, routing, state management, structured product data, and basic backend integration. Added real-time data handling and overload protection to improve stability during product interactions.",
  tags: [
    {label: "Internship"},
    {label: "Venice, Italy"},
    {label: "E-commerce app"},
    {label: "Frontend/backend"},
    {label: "Internal prototype"},
  ],
} as const satisfies WorkPageExperience;
