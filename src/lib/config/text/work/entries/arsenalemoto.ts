import type {WorkPageExperience} from "../types";

export const arsenalemotoExperience = {
  id: "arsenalemoto",
  sortStart: "2026-05",
  logoSrc: "/work/logos/Arsenale.png",
  logoAlt: "Arsenale Moto logo",
  dateRange: "May 2026 — Present",
  role: "Full-Stack Developer",
  company: "Arsenale Moto",
  companyUrl: "https://arsenale-moto.simonesiega.dev/",
  companyType: "Contractor",
  location: "Remote",
  description:
    "Built and deployed a custom client website from scratch, including 6 public pages, a Strapi CMS, and a private admin workflow for managing 30+ motorcycle listings. Integrated a Resend-powered valuation form and handled production deployment on a client VPS, including domain setup, environment variables, and server-side services.",
  tags: [
    {label: "Contractor"},
    {label: "Remote"},
    {label: "Client website"},
    {label: "Strapi CMS"},
    {label: "Resend"},
    {label: "Website ↗", href: "https://arsenale-moto.simonesiega.dev/"},
  ],
} as const satisfies WorkPageExperience;
