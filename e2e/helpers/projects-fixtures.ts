import {appConfig} from "../../src/lib/config/app-config";
import {
  isProjectCaseStudyLinksSection,
  projectsText,
  type ProjectCaseStudyLinksSection,
  type ProjectsPageProject,
} from "../../src/lib/config/text/projects";

type ProjectWithLinksSection = {
  project: ProjectsPageProject;
  linksSection: ProjectCaseStudyLinksSection;
};

export const themeStorageKey = appConfig.theme.storageKey;

export const appRoutes = [
  "/",
  "/projects",
  ...projectsText.projects.map((project) => getProjectCaseStudyRoute(project.slug)),
];

export const projectsWithLinksSections = projectsText.projects.flatMap((project) => {
  const linksSection = project.caseStudy.sections.find(isProjectCaseStudyLinksSection);

  if (!linksSection) {
    return [];
  }

  return [{project, linksSection}] as ProjectWithLinksSection[];
});

export const allProjectsHaveLinksSection =
  projectsWithLinksSections.length === projectsText.projects.length;

export function getProjectCaseStudyRoute(projectSlug: string) {
  return `/projects/${projectSlug}`;
}
