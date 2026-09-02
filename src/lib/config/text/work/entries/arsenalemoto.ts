import type {WorkPageExperience} from "../types";

export const arsenalemotoExperience = {
  id: "arsenalemoto",
  sortStart: "2026-05",
  showOnLandingPage: true,
  logoSrc: "/work/logos/Arsenale.webp",
  logoAlt: "Arsenale Moto logo",
  dateRange: "May 2026 — Jul 2026",
  role: "Full-Stack Developer — Contract",
  company: "Arsenale Moto",
  location: "Venice, Italy (Remote)",
  description:
    "Built and launched the company’s first production website as the sole developer, covering the frontend, CMS, server-side workflows, and VPS deployment. Reduced motorcycle publishing to approximately one minute across 10 staff roles and built a secure valuation flow supporting 10–20 requests per day.",
  tags: [
    {label: "Contract"},
    {label: "Remote"},
    {label: "Next.js"},
    {label: "Strapi"},
    {label: "Resend"},
    {label: "Docker/Dokploy"},
    {label: "Live site ↗", href: "https://arsenalemoto.it/"},
  ],
} as const satisfies WorkPageExperience;
