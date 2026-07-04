import type {ComponentType} from "react";

export type ProjectCaseStudyGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  thumbnailDescription?: string;
  href?: string | null;
  renderingMode?: "auto" | "dark-source";
};

export type ProjectDemoLink = {
  label: string;
  href: string;
};

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
    readTimeMinutes: number;
    quickFacts: readonly {
      label: string;
      value: string;
    }[];
    gallery?: readonly ProjectCaseStudyGalleryItem[];
    Content: ComponentType;
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
  };
  projects: readonly ProjectsPageProject[];
};
