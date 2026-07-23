import {projectsText} from "@/lib/config/text/projects";
import {workText} from "@/lib/config/text/work";

const staticAppRouteFiles = {
  "/": "src/app/page.tsx",
  "/projects": "src/app/projects/page.tsx",
  "/work": "src/app/work/page.tsx",
} as const;

const appContentLastModified = "2026-07-23T00:00:00.000Z";

const staticAppRouteLastModified = {
  "/": appContentLastModified,
  "/projects": appContentLastModified,
  "/work": appContentLastModified,
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
  projectsText.projects.map((project) => [`/projects/${project.slug}`, appContentLastModified])
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
