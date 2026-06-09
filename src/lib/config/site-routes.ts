import {projectsText} from "@/lib/config/text/projects";
import {workText} from "@/lib/config/text/work";

const staticAppRouteFiles = {
  "/": "src/app/page.tsx",
  "/projects": "src/app/projects/page.tsx",
  "/work": "src/app/work/page.tsx",
} as const;

const staticAppRouteLastModified = {
  "/": "2026-06-09T00:00:00.000Z",
  "/projects": "2026-06-09T00:00:00.000Z",
  "/work": "2026-06-09T00:00:00.000Z",
} as const;

const projectCaseStudyRouteFiles = Object.fromEntries(
  projectsText.projects.map((project) => [
    `/projects/${project.slug}`,
    "src/app/projects/[projectSlug]/page.tsx",
  ])
);

export const appRouteFiles = {
  ...staticAppRouteFiles,
  ...projectCaseStudyRouteFiles,
} as const;

const projectCaseStudyRouteLastModified = Object.fromEntries(
  projectsText.projects.map((project) => [`/projects/${project.slug}`, "2026-06-09T00:00:00.000Z"])
);

export const appRouteLastModified = {
  ...staticAppRouteLastModified,
  ...projectCaseStudyRouteLastModified,
} as const;

export const contentPageSeo = {
  "/projects": {
    title: projectsText.seo.projectsPageTitle,
    description: projectsText.hero.subtitle,
  },
  "/work": {
    title: "Work",
    description: workText.hero.subtitle,
  },
} as const;

export type ContentPageRoute = keyof typeof contentPageSeo | `/projects/${string}`;
