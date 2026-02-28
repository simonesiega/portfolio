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
    email: "simonesiega1@email.com",
  },

  home: {
    hero: {
      heading: "Hi, I'm Simone Siega.",
      tagline: "Full-stack developer building AI-powered products",
      locationLine: "📍 Venice, Italy · CS student '26",
      bioLines: [
        "Practical software — from full-stack web apps to data-driven systems — with a growing focus on AI. Active experimentation with LLMs, prototyping intelligent features and integrating them into real applications.",
        "Solid foundation in Java (academic and personal projects), systems-level thinking with Rust, and mobile development with Flutter.",
      ],
      topSkillsTitle: "Top skills",
      skills: [
        { label: "AI / ML", iconKey: "openai", color: "#10a37f" },
        { label: "Java", iconKey: "oracle", color: "#f89820" },
        { label: "Python", iconKey: "python", color: "#3776ab" },
        { label: "React / Next.js", iconKey: "react", color: "#61dafb" },
        { label: "TypeScript", iconKey: "typescript", color: "#3178c6" },
        { label: "Database Systems", iconKey: "postgresql", color: "#336791" },
        { label: "Rust", iconKey: "rust", color: "#dea584" },
        { label: "Flutter", iconKey: "flutter", color: "#02569b" },
        { label: "Docker", iconKey: "docker", color: "#2496ed" },
      ],
      featuredProject: {
        label: "Currently building",
        title: "AI Culinary Assistant",
        description: "LLM-powered recipe extraction and structured outputs.",
        href: "https://github.com/simonesiega-academics/hs-ai-culinary-assistant",
        ariaLabelPrefix: "View project:",
      },
      statusLine: "Available for internships / collaborations",
      primaryCtaLabel: "Let's Talk",
      secondaryCtaLabel: "View Projects",
      secondaryCtaHref: "/projects",
    },
    contactSection: {
      id: "contact",
      title: "Let's build something great together.",
      description:
        "If you have an idea, a product to improve, or a project where design and engineering need to work together, I would love to hear from you.",
      statusLine: 
        "Open to internships, collaborations, and selected freelance projects.",
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
