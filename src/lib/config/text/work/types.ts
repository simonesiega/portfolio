type WorkPageExperienceTag = {
  label: string;
  href?: string;
};

type WorkLandingPageVisibility =
  | {
      showOnLandingPage: true;
      landingPageDescription: string;
      logoSrc: string;
    }
  | {
      showOnLandingPage: false;
      landingPageDescription?: never;
      logoSrc: string | null;
    };

export type WorkPageExperience = WorkLandingPageVisibility & {
  id: string;
  sortStart: string;
  dateRange: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: readonly WorkPageExperienceTag[];
};

export type WorkText = {
  hero: {
    sectionId: string;
    title: string;
    subtitle: string;
  };
  sections: {
    experienceAriaLabel: string;
    tagsAriaLabel: string;
  };
  footer: {
    legalDisclaimerLine: string;
  };
  experiences: readonly WorkPageExperience[];
};
