import type {ProjectsText} from "./types";

export const projectsHero = {
  sectionId: "projects-heading",
  eyebrow: "PROJECTS",
  title: "Personal Projects",
  subtitle: "Independent and academic software projects built alongside my studies.",
} as const satisfies ProjectsText["hero"];

export const projectsSections = {
  projectsAriaLabel: "Selected personal projects",
  technologiesAriaLabel: "Technologies used",
  openCaseStudyLabel: "Open case study",
  statusLabel: "Status",
  mailSubjectPrefix: "Info request",
  mailAriaLabelPrefix: "Send email for",
  githubAriaLabelPrefix: "Open",
  githubAriaLabelSuffix: "repository on GitHub",
} as const satisfies ProjectsText["sections"];

export const projectsSeo = {
  projectsPageTitle: "Projects",
  caseStudyTitleSuffix: "case study",
  caseStudyFallbackTitle: "Project case study",
  caseStudyFallbackDescription:
    "Detailed progress notes for selected project work, including implementation steps and outcomes.",
} as const satisfies ProjectsText["seo"];

export const projectsCaseStudyPage = {
  eyebrow: "CASE STUDY",
  minReadSuffix: "min read",
  backToProjectsLabel: "Back to projects",
  githubLabel: "GitHub",
  demoLabel: "Demo",
} as const satisfies ProjectsText["caseStudyPage"];
