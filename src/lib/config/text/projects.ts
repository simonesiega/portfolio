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
  return (projectsText.projects as readonly ProjectsPageProject[]).find(
    (project) => project.slug === projectSlug
  );
}

export function getProjectCaseStudyHref(projectSlug: string) {
  return `/projects/${projectSlug}`;
}

export function getProjectCaseStudySeo(projectSlug: string) {
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    return {
      title: projectsText.seo.caseStudyFallbackTitle,
      description: projectsText.seo.caseStudyFallbackDescription,
    };
  }

  return {
    title: `${project.title} ${projectsText.seo.caseStudyTitleSuffix}`,
    description: project.keyPhrase,
  };
}
