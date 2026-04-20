export const homeSkillIconKeys = [
  "openai",
  "server",
  "terminal",
  "python",
  "postgresql",
  "rust",
] as const;

export type HomeSkillIconKey = (typeof homeSkillIconKeys)[number];

type HomeHeroSkill = {
  label: string;
  iconKey: HomeSkillIconKey;
  color: string;
};

type HomeHeroLineSegment = {
  text: string;
  href?: string;
};

const homeHeroSkills = [
  {label: "AI Systems", iconKey: "openai", color: "#10a37f"},
  {label: "Backend", iconKey: "server", color: "#94a3b8"},
  {label: "Developer Tools", iconKey: "terminal", color: "#94a3b8"},
  {label: "Databases", iconKey: "postgresql", color: "#336791"},
  {label: "Python", iconKey: "python", color: "#3776ab"},
  {label: "Rust", iconKey: "rust", color: "#dea584"},
] as const satisfies readonly HomeHeroSkill[];

export const homeText = {
  hero: {
    heading: "Hi, I'm Simone Siega",
    tagline: "Building AI systems, backend software, and developer tools",
    locationLine: "📍 Venice, Italy",
    educationLine: [
      {text: "Final-year IT student at "},
      {text: "Zuccante", href: "https://www.zuccante.it/"},
      {text: ", starting Computer Engineering at the "},
      {text: "University of Padua", href: "https://www.unipd.it/"},
      {text: " next year."},
    ] as const satisfies readonly HomeHeroLineSegment[],
    bio: "I work on practical software with a focus on clean architecture, reliable backend systems, and thoughtful developer tooling.",
    skills: homeHeroSkills,
    statusLine: "Open to internships and collaborations",
    primaryCtaLabel: "Let's Talk",
    secondaryCtaLabel: "View Projects",
    secondaryCtaHref: "/projects",
  },

  currentlyBuilding: {
    id: "currently-building",
    title: "Currently building",
    subtitle: "Projects and experiments I'm actively shipping.",
    projects: [
      {
        title: "AI Culinary Assistant",
        description:
          "Voice-first cooking assistant that turns recipes into structured data, transcribes in real time, and reads steps back while you cook.",
        tags: [
          "Python",
          "Voice Assistant",
          "Database",
          "Ollama",
          "Speech Recognition",
          "Text-to-speech",
        ],
        href: "https://github.com/simonesiega-academics/culinary-ai-assistant",
        ariaLabel: "View AI Culinary Assistant on GitHub",
      },
      {
        title: "TapTune",
        description:
          "Android companion app for instant Spotify handoff between nearby devices — built to share Spotify content in seconds, without links, contacts, or setup.",
        tags: ["Kotlin", "Android", "Jetpack Compose", "Spotify", "Nearby Sharing"],
        href: "https://github.com/simonesiega/taptune",
        ariaLabel: "View TapTune on GitHub",
      },
    ],
  },

  contactSection: {
    id: "contact",
    eyebrow: "Interested in building AI products?",
    title: "Let's build something great together.",
    description:
      "Have an idea, a product to improve, or a team that needs design and engineering working side by side? I'd love to hear from you.",
    statusLine: "Open to internships, collaborations, and selected freelance work.",
    responseTime: "I usually reply within 24–48 hours.",
  },
} as const;

export type HomeHero = (typeof homeText)["hero"];
export type HomeCurrentlyBuilding = (typeof homeText)["currentlyBuilding"];
export type HomeContactSection = (typeof homeText)["contactSection"];
