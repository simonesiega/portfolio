export type WorkPageExperience = {
  id: string;
  sortStart: string;
  logoSrc: string;
  logoAlt: string;
  dateRange: string;
  role: string;
  company: string;
  companyType: string;
  location: string;
  description: string;
  technologies: readonly string[];
};

export type WorkText = {
  hero: {
    sectionId: string;
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  sections: {
    experienceAriaLabel: string;
    technologiesAriaLabel: string;
  };
  footer: {
    legalDisclaimerLine: string;
  };
  experiences: readonly WorkPageExperience[];
};
