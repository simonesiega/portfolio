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
  keyPhrase:
    "Designed and built a full-stack e-commerce application as a hands-on exploration of Vue.js and structured application architecture.",
  description:
    "Developed a full-stack e-commerce application from scratch, implementing the frontend in Vue.js and integrating backend services to support product catalog management and core logic. Focused on building a clear and maintainable architecture from the ground up, with structured routing, modular components, and consistent state handling across the application.",
  technologies: ["Vue.js", "JavaScript", "HTML", "CSS", "Node.js"],
} as const satisfies WorkPageExperience;
