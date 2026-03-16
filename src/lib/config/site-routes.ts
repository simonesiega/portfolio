import {projectsText} from "@/lib/config/text/projects";
import {workText} from "@/lib/config/text/work";

const staticAppRouteFiles = {
  "/": "src/app/page.tsx",
  "/projects": "src/app/projects/page.tsx",
  "/work": "src/app/work/page.tsx",
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
