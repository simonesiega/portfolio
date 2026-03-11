export const workText = {
  hero: {
    sectionId: "work-heading",
    eyebrow: "WORK",
    title: "Professional Experience",
    subtitle: "Internships and roles completed during my academic journey.",
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
      id: "dacos-srl",
      sortStart: "2025-05",
      logoSrc: "/work/logos/Dacos.png",
      logoAlt: "Dacos SRL logo",
      dateRange: "May 2025 - June 2025",
      role: "Software Engineering",
      company: "Dacos SRL",
      companyType: "Internship",
      location: "📍 Venice, Italy",
      description:
        "Designed a full-stack e-commerce platform for electronics and hardware components, building a modular Vue.js storefront with dynamic routing and state management, and implementing RESTful backend services for product catalog operations and core business logic within a three-week timeframe.",
      technologies: ["Vue.js", "JavaScript", "HTML", "CSS", "Node.js"],
    },
  ],
} as const;

export type WorkPageExperience = (typeof workText.experiences)[number];
