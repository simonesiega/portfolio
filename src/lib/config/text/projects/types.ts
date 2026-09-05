import type {ComponentType} from "react";

export type ProjectCaseStudyGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  thumbnailDescription?: string;
  href?: string;
  invertInLightTheme?: boolean;
};

type ProjectDemoLink = {
  label: string;
  href: string;
};

type ProjectShowcaseAction =
  | {
      kind: "contact";
      label: string;
    }
  | {
      kind: "external";
      label: string;
      href: string;
    };

type ProjectLandingPageVisibility =
  | {
      showOnLandingPage: true;
      landingPageDescription: string;
    }
  | {
      showOnLandingPage: false;
      landingPageDescription?: never;
    };

export type ProjectsPageProject = ProjectLandingPageVisibility & {
  slug: string;
  title: string;
  pinned: boolean;
  githubUrl?: string;
  demoUrls?: readonly ProjectDemoLink[];
  showcaseAction?: ProjectShowcaseAction;
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
    pinnedLabel: string;
  };
  seo: {
    projectsPageTitle: string;
    caseStudyTitleSuffix: string;
  };
  caseStudyPage: {
    minReadSuffix: string;
    githubLabel: string;
    projectSummaryAriaLabel: string;
  };
  projects: readonly ProjectsPageProject[];
};
