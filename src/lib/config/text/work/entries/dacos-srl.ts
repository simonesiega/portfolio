import type {WorkPageExperience} from "../types";

export const dacosSrlExperience = {
  id: "dacos-srl",
  sortStart: "2025-05",
  logoSrc: "/work/logos/Dacos.png",
  logoAlt: "Dacos SRL logo",
  dateRange: "May 2025 – Jun 2025",
  role: "Software Developer Intern",
  company: "Dacos SRL",
  companyType: "Internship",
  location: "📍 Venice, Italy",
  description:
    "Designed and built a full-stack e-commerce application from scratch, implementing a Vue.js frontend and integrating backend services for product catalog management and core business logic. Focused on structured routing, modular components, consistent state handling, and a maintainable application architecture.",
  technologies: ["Vue.js", "JavaScript", "HTML", "CSS", "Node.js"],
} as const satisfies WorkPageExperience;
