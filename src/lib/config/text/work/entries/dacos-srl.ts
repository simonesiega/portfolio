import type {WorkPageExperience} from "../types";

export const dacosSrlExperience = {
  id: "dacos-srl",
  sortStart: "2025-05",
  logoSrc: "/work/logos/Dacos.webp",
  logoAlt: "Dacos S.r.l. logo",
  dateRange: "May 2025 — Jun 2025",
  role: "Software Developer Intern",
  company: "Dacos S.r.l.",
  location: "Venice, Italy",
  description:
    "Built a Vue.js e-commerce prototype within a two-developer team using Git and Docker. Optimized database queries and caching for stable operation at up to 100 concurrent users, then presented and documented the completed prototype.",
  tags: [
    {label: "Internship"},
    {label: "Vue.js"},
    {label: "Docker"},
    {label: "Git"},
    {label: "E-commerce"},
  ],
} as const satisfies WorkPageExperience;
