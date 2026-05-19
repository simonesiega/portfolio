import type {WorkPageExperience} from "../types";

export const novaideaExperience = {
  id: "novaidea",
  sortStart: "2026-02",
  imageSrc: "/work/sites/NewArtVanguard.png",
  imageAlt: "Novaidea website preview",
  imageCaption: "Novaidea coming soon page — built as part of my work on the production website.",
  imageZoom: 1.25,
  imagePosition: "top center",
  logoSrc: "/work/logos/Novaidea.jpg",
  logoAlt: "Novaidea logo",
  dateRange: "Feb 2026 — May 2026",
  role: "Full-Stack Developer",
  company: "Novaidea",
  companyUrl: "https://www.newartvanguard.com/",
  companyType: "Contractor",
  location: "Remote",
  description:
    "Owned the end-to-end delivery of requested updates for Novaidea’s production website, implementing new pages and content changes across the frontend and backend while improving codebase structure and maintainability.",
  tags: [
    {label: "Contractor"},
    {label: "Remote"},
    {label: "Production website"},
    {label: "Frontend/backend"},
    {label: "Website ↗", href: "https://www.newartvanguard.com/"},
  ],
} as const satisfies WorkPageExperience;
