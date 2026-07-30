import type {WorkPageExperience} from "../types";

export const novaideaExperience = {
  id: "novaidea",
  sortStart: "2026-02",
  logoSrc: "/work/logos/NewArtVanguard.webp",
  logoAlt: "New Art Vanguard logo",
  dateRange: "Feb 2026 — Jul 2026",
  role: "Full-Stack Developer — Contract",
  company: "New Art Vanguard",
  location: "Miami, FL (Remote)",
  description:
    "Modernized 5+ pages and delivered 3 new responsive pages within a three-developer team. Containerized local development and deployment workflows with Docker, reducing setup and release preparation time by 25%.",
  tags: [
    {label: "Contract"},
    {label: "Remote"},
    {label: "HTML/CSS/JS"},
    {label: "PHP"},
    {label: "Docker"},
    {label: "Live site ↗", href: "https://www.newartvanguard.com/"},
  ],
} as const satisfies WorkPageExperience;
