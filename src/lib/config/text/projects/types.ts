type ProjectCaseStudyBaseSection = {
  id: string;
  heading: string;
  content: string;
};

export type ProjectCaseStudyLink = {
  title: string;
  description: string;
  url: string;
};

export type ProjectCaseStudyContentSection = ProjectCaseStudyBaseSection & {
  kind: "content";
  points?: readonly string[];
};

export type ProjectCaseStudyLinksSection = ProjectCaseStudyBaseSection & {
  kind: "links";
  links: readonly ProjectCaseStudyLink[];
};

export type ProjectCaseStudySection = ProjectCaseStudyContentSection | ProjectCaseStudyLinksSection;

export function isProjectCaseStudyLinksSection(
  section: ProjectCaseStudySection
): section is ProjectCaseStudyLinksSection {
  return section.kind === "links";
}

export function isProjectCaseStudyContentSection(
  section: ProjectCaseStudySection
): section is ProjectCaseStudyContentSection {
  return section.kind === "content";
}

export type ProjectsPageProject = {
  id: string;
  slug: string;
  title: string;
  githubUrl: string;
  demoUrl?: string;
  status: string;
  developmentPeriod: string;
  keyPhrase: string;
  technologies: readonly string[];
  caseStudy: {
    summary: string;
    readTimeMinutes: number;
    quickFacts: readonly {
      label: string;
      value: string;
    }[];
    diagramAlt: string;
    diagramCaption: string;
    diagramRenderingMode?: "auto" | "dark-source";
    sections: readonly ProjectCaseStudySection[];
  };
};

export type ProjectsText = {
  hero: {
    sectionId: string;
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  sections: {
    projectsAriaLabel: string;
    technologiesAriaLabel: string;
    openCaseStudyLabel: string;
    statusLabel: string;
    mailSubjectPrefix: string;
    mailAriaLabelPrefix: string;
    githubAriaLabelPrefix: string;
    githubAriaLabelSuffix: string;
  };
  seo: {
    projectsPageTitle: string;
    caseStudyTitleSuffix: string;
    caseStudyFallbackTitle: string;
    caseStudyFallbackDescription: string;
  };
  caseStudyPage: {
    eyebrow: string;
    minReadSuffix: string;
    backToProjectsLabel: string;
    githubLabel: string;
    demoLabel: string;
  };
  projects: readonly ProjectsPageProject[];
};
