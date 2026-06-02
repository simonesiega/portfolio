import type {WorkPageExperience} from "../types";

export const novaideaExperience = {
  id: "novaidea",
  sortStart: "2026-02",
  logoSrc: "/work/logos/NewArtVanguard.webp",
  logoAlt: "New Art Vanguard logo",
  dateRange: "Feb 2026 — May 2026",
  role: "Full-Stack Developer",
  company: "New Art Vanguard",
  companyUrl: "https://www.newartvanguard.com/",
  companyType: "Contractor",
  location: "Remote",
  description:
    "Handled end-to-end updates for New Art Vanguard’s production website, implementing new pages and content changes across the frontend and backend while improving codebase structure and maintainability.",
  tags: [
    {label: "Contractor"},
    {label: "Remote"},
    {label: "Client website"},
    {label: "Frontend/backend"},
    {label: "Website ↗", href: "https://www.newartvanguard.com/"},
  ],
} as const satisfies WorkPageExperience;
