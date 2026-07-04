import type {ProjectsText} from "./types";

export const projectsHero = {
  sectionId: "projects-heading",
  title: "Selected Projects",
  subtitle:
    "A curated selection of systems work, client delivery, and practical engineering projects.",
} as const satisfies ProjectsText["hero"];

export const projectsSections = {
  projectsAriaLabel: "Selected personal projects",
  openCaseStudyLabel: "Open case study",
  mailSubjectPrefix: "Info request",
  mailAriaLabelPrefix: "Send email for",
  githubAriaLabelPrefix: "Open",
  githubAriaLabelSuffix: "repository on GitHub",
  githubLinkLabel: "GitHub",
  askLinkLabel: "Contact",
  pinnedLabel: "Featured",
} as const satisfies ProjectsText["sections"];

export const projectsSeo = {
  projectsPageTitle: "Projects",
  caseStudyTitleSuffix: "case study",
  caseStudyFallbackTitle: "Project case study",
  caseStudyFallbackDescription:
    "Detailed progress notes for selected project work, including implementation steps and outcomes.",
} as const satisfies ProjectsText["seo"];

export const projectsCaseStudyPage = {
  minReadSuffix: "min read",
  backToProjectsLabel: "Back to projects",
  githubLabel: "View on GitHub",
  projectSummaryAriaLabel: "Project summary",
} as const satisfies ProjectsText["caseStudyPage"];
