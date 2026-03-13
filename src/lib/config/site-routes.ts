import {projectsText} from "@/lib/config/text/projects";
import {workText} from "@/lib/config/text/work";

export const appRouteFiles = {
  "/": "src/app/page.tsx",
  "/projects": "src/app/projects/page.tsx",
  "/work": "src/app/work/page.tsx",
} as const;

export const contentPageSeo = {
  "/projects": {
    title: "Projects",
    description: projectsText.hero.subtitle,
  },
  "/work": {
    title: "Work",
    description: workText.hero.subtitle,
  },
} as const;

export type ContentPageRoute = keyof typeof contentPageSeo;
