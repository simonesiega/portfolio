export const appConfig = {
  metadata: {
    title: {
      default: "Simone Siega | Software Engineer",
      template: "%s | Simone Siega",
    },
    description:
      "Personal portfolio of Simone Siega, showcasing software engineering projects, skills, and experience.",
    iconPath: "/icon.svg",
  },

  owner: {
    name: "Simone Siega",
    copyrightName: "SIMONE SIEGA",
    tagline: "Design · Code · Clarity.",
  },

  navigation: {
    headerLinks: [
      { href: "/projects", label: "projects" },
      { href: "/work", label: "work" },
    ],
    ariaLabel: "Primary navigation",
  },

  social: {
    githubUrl: "https://github.com/simonesiega",
    linkedinUrl: "https://linkedin.com/in/simonesiega",
    labels: {
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },

  contact: {
    email: "simonesiega1@gmail.com",
  },

  theme: {
    storageKey: "portfolio-theme",
    prefersLightMediaQuery: "(prefers-color-scheme: light)",
    labels: {
      useSystem: "Use system color theme",
      toggleTheme: "Toggle color theme",
    },
  },
} as const;

export type HeaderLink = (typeof appConfig.navigation.headerLinks)[number];
