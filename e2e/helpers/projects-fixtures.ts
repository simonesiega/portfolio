import {appConfig} from "../../src/lib/config/app-config";

export const projectFixtures = [
  {
    slug: "first-client-projects",
  },
  {
    slug: "cfg-parser",
  },
] as const;

export const themeStorageKey = appConfig.theme.storageKey;

export const appRoutes = [
  "/",
  "/projects",
  "/work",
  ...projectFixtures.map((project) => getProjectCaseStudyRoute(project.slug)),
];

export const projectContentLinksHeading = "Links";

export function getProjectCaseStudyRoute(projectSlug: string) {
  return `/projects/${projectSlug}`;
}
