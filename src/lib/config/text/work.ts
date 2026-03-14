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
  keyPhrase: string;
  description: string;
  technologies: readonly string[];
};

type WorkText = {
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

export const workText = {
  hero: {
    sectionId: "work-heading",
    eyebrow: "WORK",
    title: "Professional Experience",
    subtitle: "Internships and professional roles across real-world software projects.",
  },

  sections: {
    experienceAriaLabel: "Selected experience",
    technologiesAriaLabel: "Technologies used",
  },

  footer: {
    legalDisclaimerLine: "Logos and trademarks are the property of their respective owners.",
  },

  experiences: [
    {
      id: "novaidea",
      sortStart: "2026-02",
      logoSrc: "/work/logos/Novaidea.jpg",
      logoAlt: "Novaidea logo",
      dateRange: "Feb 2026 – Present",
      role: "Full-Stack Developer",
      company: "Novaidea",
      companyType: "Contractor",
      location: "🌍 Remote",
      keyPhrase:
        "Maintaining and extending the company’s web platform through feature development, content improvements, and codebase maintenance.",
      description:
        "Improved and expanded the company website by reorganizing content, refining page structure, and creating a more consistent user experience across sections. Developed new features and integrated additional content areas while maintaining and extending the existing codebase to support the platform’s ongoing development.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "Docker"],
    },
    {
      id: "dacos-srl",
      sortStart: "2025-05",
      logoSrc: "/work/logos/Dacos.png",
      logoAlt: "Dacos SRL logo",
      dateRange: "May 2025 – Jun 2025",
      role: "Software Developer Intern",
      company: "Dacos SRL",
      companyType: "Internship",
      location: "📍 Venice, Italy",
      keyPhrase: "Built a full-stack e-commerce platform for electronics and hardware products.",
      description:
        "Developed an e-commerce application using Vue.js, with dynamic routing and structured state management for a well-organized frontend architecture. Implemented RESTful backend services to handle product catalog management and core business logic.",
      technologies: ["Vue.js", "JavaScript", "HTML", "CSS", "Node.js"],
    },
  ],
} as const satisfies WorkText;
