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

export type ProjectCaseStudyGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  href?: string | null;
  renderingMode?: "auto" | "dark-source";
};

export type ProjectDemoLink = {
  label: string;
  href: string;
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
  pinned: boolean;
  githubUrl: string;
  demoUrls?: readonly ProjectDemoLink[];
  developmentPeriod: string;
  keyPhrase: string;
  caseStudy: {
    summary: string;
    readTimeMinutes: number;
    quickFacts: readonly {
      label: string;
      value: string;
    }[];
    gallery?: readonly ProjectCaseStudyGalleryItem[];
    sections: readonly ProjectCaseStudySection[];
  };
};

export type ProjectsText = {
  hero: {
    sectionId: string;
    title: string;
    subtitle: string;
  };
  sections: {
    projectsAriaLabel: string;
    openCaseStudyLabel: string;
    mailSubjectPrefix: string;
    mailAriaLabelPrefix: string;
    githubAriaLabelPrefix: string;
    githubAriaLabelSuffix: string;
    githubLinkLabel: string;
    askLinkLabel: string;
    pinnedLabel: string;
  };
  seo: {
    projectsPageTitle: string;
    caseStudyTitleSuffix: string;
    caseStudyFallbackTitle: string;
    caseStudyFallbackDescription: string;
  };
  caseStudyPage: {
    minReadSuffix: string;
    backToProjectsLabel: string;
    githubLabel: string;
    projectSummaryAriaLabel: string;
    linksFallbackHeading: string;
  };
  projects: readonly ProjectsPageProject[];
};
