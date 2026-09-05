import {
  projectsCaseStudyPage,
  projectsHero,
  projectsSections,
  projectsSeo,
} from "./projects/projects-shared";
import {projects} from "./projects/project-entries";
import type {ProjectsPageProject, ProjectsText} from "./projects/types";
export {type ProjectCaseStudyGalleryItem, type ProjectsPageProject} from "./projects/types";

export const projectsText = {
  hero: projectsHero,
  sections: projectsSections,
  seo: projectsSeo,
  caseStudyPage: projectsCaseStudyPage,
  projects,
} as const satisfies ProjectsText;

export function getProjectBySlug(projectSlug: string): ProjectsPageProject | undefined {
  return projectsText.projects.find((project) => project.slug === projectSlug);
}

export function getProjectCaseStudyHref(projectSlug: string) {
  return `/projects/${projectSlug}`;
}
