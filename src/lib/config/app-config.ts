export const appConfig = {
  metadata: {
    language: "en",
    locale: "en_US",
    title: {
      default: "Simone Siega | Computer Engineer",
      template: "%s | Simone Siega",
    },
    description:
      "Portfolio of Simone Siega, a Computer Engineering student building developer tools, backend systems, and production software.",
    iconPath: "/icon.svg",
    socialPreview: {
      domain: "simonesiega.com",
      role: "Computer Engineer",
      supportingLine: "Venice, Italy",
      description: "Selected projects, engineering work, and systems experiments.",
      highlights: ["Projects", "Work", "About"],
      footerLabel: "Portfolio",
    },
  },

  owner: {
    name: "Simone Siega",
  },

  navigation: {
    homeHref: "/",
    headerLinks: [
      {href: "/projects", label: "projects"},
      {href: "/work", label: "work"},
    ],
    ariaLabel: "Primary navigation",
    skipToContentLabel: "Skip to content",
  },

  social: {
    githubUrl: "https://github.com/simonesiega",
    linkedinUrl: "https://linkedin.com/in/simonesiega",
    xUrl: "https://x.com/simonesiega_",
    xHandle: "@simonesiega_",
    labels: {
      github: "GitHub",
      linkedin: "LinkedIn",
      x: "X / Twitter",
    },
  },

  analytics: {
    umami: {
      enabled: process.env.NEXT_PUBLIC_UMAMI_ENABLED === "true",
      scriptSrc: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC?.trim(),
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim(),
    },
  },

  contact: {
    email: "simonesiega1@gmail.com",
    availabilityLine: "Available for internships & collaborations",
  },

  theme: {
    attributeName: "data-theme",
    storageKey: "portfolio-theme",
    prefersLightMediaQuery: "(prefers-color-scheme: light)",
    labels: {
      useSystem: "Use system color theme",
      toggleTheme: "Toggle color theme",
      controls: "Theme controls",
      currentModePrefix: "Current mode",
      statusPrefix: "Theme mode",
    },
  },
} as const;

export type HeaderLink = (typeof appConfig.navigation.headerLinks)[number];
