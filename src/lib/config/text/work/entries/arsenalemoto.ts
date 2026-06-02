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
    "Built and deployed the website from scratch as the sole developer, covering the TypeScript frontend, Strapi CMS configuration, admin panel deployment, and Resend-powered motorcycle valuation form. Worked from design references provided by the design team while implementing additional pages and interface refinements.",
  tags: [
    {label: "Contractor"},
    {label: "Remote"},
    {label: "Client website"},
    {label: "Strapi CMS"},
    {label: "Resend"},
    {label: "Website ↗", href: "https://arsenale-moto.simonesiega.dev/"},
  ],
} as const satisfies WorkPageExperience;
