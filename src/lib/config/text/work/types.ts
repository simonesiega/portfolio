export type WorkPageExperienceTag = {
  label: string;
  href?: string;
};

export type WorkPageExperience = {
  id: string;
  sortStart: string;
  imageSrc: string | null;
  imageAlt: string;
  imageCaption: string | null;
  imageZoom: number;
  imagePosition: string;
  logoSrc: string | null;
  logoAlt: string;
  dateRange: string;
  role: string;
  company: string;
  companyUrl: string | null;
  companyType: string;
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
