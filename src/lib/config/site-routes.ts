import {appConfig} from "@/lib/config/app-config";
import {projectsText} from "@/lib/config/text/projects";
import {workText} from "@/lib/config/text/work";

const staticAppRoutes = [
  appConfig.navigation.homeHref,
  ...appConfig.navigation.headerLinks.map((link) => link.href),
] as const;
const projectCaseStudyRoutes = projectsText.projects.map(
  (project) => `/projects/${project.slug}` as const
);

export const appRoutes = [...staticAppRoutes, ...projectCaseStudyRoutes];

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
