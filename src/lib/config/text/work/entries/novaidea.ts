import type {WorkPageExperience} from "../types";

export const novaideaExperience = {
  id: "novaidea",
  sortStart: "2026-02",
  logoSrc: "/work/logos/NewArtVanguard.webp",
  logoAlt: "New Art Vanguard logo",
  dateRange: "Feb 2026 — Present",
  role: "Full-Stack Developer",
  company: "New Art Vanguard",
  companyUrl: "https://www.newartvanguard.com/",
  companyType: "Contractor",
  location: "Remote",
  description:
    "Maintained and expanded an existing production website, updating 5+ pages and delivering 3 new pages while improving responsive structure, navigation flow, and maintainability. Helped introduce Docker-based workflows that reduced repeated setup and deployment preparation time by ~25%.",
  tags: [
    {label: "Contractor"},
    {label: "Remote"},
    {label: "Client website"},
    {label: "Frontend/backend"},
    {label: "Website ↗", href: "https://www.newartvanguard.com/"},
  ],
} as const satisfies WorkPageExperience;
