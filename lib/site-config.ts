export const siteConfig = {
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
    profileImage: {
      src: "/profile_placeholder.jpg",
      alt: "Simone Siega profile",
    },
  },

  navigation: {
    headerLinks: [
      { href: "/projects", label: "projects" },
      { href: "/work", label: "work" },
    ],
  },

  social: {
    githubUrl: "https://github.com/simonesiega",
    linkedinUrl: "https://linkedin.com/in/simonesiega",
  },

  contact: {
    email: "simonesiega1@email.com",
  },

  home: {
    hero: {
      heading: "Hi, I am Simone Siega",
      locationLine: "📍 Venice, Italy · Computer Science student (’26)",
      bioLines: [
        "Computer Science student (’26) focused on AI and machine learning, building practical, well-structured software projects that bring intelligent capabilities into real-world applications, including LLM-based solutions and AI-driven features.",
        "Strong background in Java through academic and personal projects, complemented by systems-level development in Rust and Android application development with Flutter.",
        "Full-stack web development with React/Next.js and TypeScript, using PHP and Python to build backend services, REST APIs, database-driven applications, and to prototype AI/ML workflows.",
      ],
      topSkillsTitle: "Top skills",
      topSkillsText:
        "AI & Machine Learning · Java · React/Next.js · REST APIs · Database Systems · Rust · Flutter",
      ctaLabel: "Say Hello",
    },
    contactSection: {
      id: "contact",
      title: "Let's build something great together.",
      description:
        "If you have an idea, a product to improve, or a project where design and engineering need to work together, I would love to hear from you.",
      copyrightLabel: "2026 SIMONE SIEGA",
      tagline: "Design · Code · Clarity.",
    },
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

export type HeaderLink = (typeof siteConfig.navigation.headerLinks)[number];
