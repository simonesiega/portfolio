import type {WorkPageExperience} from "../types";

export const novaideaExperience = {
  id: "novaidea",
  sortStart: "2026-02",
  logoSrc: "/work/logos/Novaidea.jpg",
  logoAlt: "Novaidea logo",
  dateRange: "Feb 2026 – Present",
  role: "Full-Stack Developer",
  company: "Novaidea",
  companyType: "Contractor",
  location: "🌍 Remote",
  keyPhrase:
    "Contributing to the evolution of the company’s web platform through feature development, structural improvements, and ongoing product-facing work.",
  description:
    "Improved and extended the company’s web platform by restructuring existing pages, refining content organization, and implementing new sections and features. Worked across the stack within an established production codebase to support long-term maintainability, enhance platform consistency, and deliver a more polished and effective user experience.",
  technologies: ["HTML", "CSS", "JavaScript", "PHP", "Docker"],
} as const satisfies WorkPageExperience;