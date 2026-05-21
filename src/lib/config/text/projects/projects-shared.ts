import type {ProjectsText} from "./types";

export const projectsHero = {
  sectionId: "projects-heading",
  eyebrow: "",
  title: "Selected Projects",
  subtitle:
    "A curated selection of software projects focused on systems, developer tools, and practical engineering.",
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
  githubLinkLabel: "GitHub",
  askLinkLabel: "Ask",
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
  githubLabel: "View on GitHub",
  demoLabel: "Demo",
  projectSummaryAriaLabel: "Project summary",
  linksFallbackHeading: "Links",
} as const satisfies ProjectsText["caseStudyPage"];
