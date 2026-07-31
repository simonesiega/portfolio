import {projectsText} from "@/lib/config/text/projects";
import {workText} from "@/lib/config/text/work";

const staticAppRoutes = ["/", "/projects", "/work"] as const;
const projectCaseStudyRoutes = projectsText.projects.map(
  (project) => `/projects/${project.slug}` as const
);

export const appRoutes = [...staticAppRoutes, ...projectCaseStudyRoutes];

const appContentLastModified = "2026-07-23T00:00:00.000Z";

export const appRouteLastModified = Object.fromEntries(
  appRoutes.map((route) => [route, appContentLastModified])
);

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
