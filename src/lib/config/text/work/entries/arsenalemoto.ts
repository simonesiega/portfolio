import type {WorkPageExperience} from "../types";

export const arsenalemotoExperience = {
  id: "arsenalemoto",
  sortStart: "2026-05",
  logoSrc: "/work/logos/Arsenale.webp",
  logoAlt: "Arsenale Moto logo",
  dateRange: "May 2026 — Present",
  role: "Full-Stack Developer",
  company: "Arsenale Moto",
  companyUrl: "https://arsenale-moto.simonesiega.dev/",
  companyType: "Contractor",
  location: "Remote",
  description:
    "Designed, built, and deployed a custom client website as the sole developer, including 6 public pages, a Strapi CMS, and a private admin workflow for 30+ motorcycle listings. Integrated Resend-powered transactional emails handling roughly 5–20 valuation requests per day and managed production deployment on the client VPS.",
  tags: [
    {label: "Contractor"},
    {label: "Remote"},
    {label: "Client website"},
    {label: "Strapi CMS"},
    {label: "Resend"},
    {label: "Website ↗", href: "https://arsenale-moto.simonesiega.dev/"},
  ],
} as const satisfies WorkPageExperience;
