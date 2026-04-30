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
  description:
    "Contributed to Novaidea's production web platform across frontend and backend areas, implementing new sections, improving existing pages, and refining content structure. Worked within an established codebase with a focus on maintainability, platform consistency, and a more polished user experience.",
  technologies: ["HTML", "CSS", "JavaScript", "PHP", "Docker"],
} as const satisfies WorkPageExperience;
