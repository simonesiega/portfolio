import type {WorkPageExperience} from "../types";

export const newArtVanguardExperience = {
  id: "new-art-vanguard",
  sortStart: "2026-02",
  showOnLandingPage: true,
  landingPageDescription: "Full-Stack Developer",
  logoSrc: "/work/logos/new-art-vanguard.webp",
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
