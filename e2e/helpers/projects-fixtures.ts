import {appConfig} from "../../src/lib/config/app-config";
import {
  projectsText,
  type ProjectCaseStudyContentLink,
  type ProjectsPageProject,
} from "../../src/lib/config/text/projects";

type ProjectWithContentLinks = {
  project: ProjectsPageProject;
  contentLinks: readonly ProjectCaseStudyContentLink[];
};

export const themeStorageKey = appConfig.theme.storageKey;

export const appRoutes = [
  "/",
  "/projects",
  "/work",
  ...projectsText.projects.map((project) => getProjectCaseStudyRoute(project.slug)),
];

export const projectContentLinksHeading = projectsText.caseStudyPage.linksFallbackHeading;

export const projectsWithContentLinks = projectsText.projects.flatMap((project) => {
  const {contentLinks} = project.caseStudy;

  if (!contentLinks.length) {
    return [];
  }

  return [{project, contentLinks}] as ProjectWithContentLinks[];
});

export const allProjectsHaveContentLinks =
  projectsWithContentLinks.length === projectsText.projects.length;

export function getProjectCaseStudyRoute(projectSlug: string) {
  return `/projects/${projectSlug}`;
}
