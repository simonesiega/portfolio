export const homeSkillIconKeys = [
  "openai",
  "oracle",
  "python",
  "react",
  "typescript",
  "postgresql",
  "rust",
  "flutter",
  "docker",
] as const;

export type HomeSkillIconKey = (typeof homeSkillIconKeys)[number];

type HomeHeroSkill = {
  label: string;
  iconKey: HomeSkillIconKey;
  color: string;
};

const homeHeroSkills = [
  {label: "AI / ML", iconKey: "openai", color: "#10a37f"},
  {label: "Java", iconKey: "oracle", color: "#f89820"},
  {label: "Python", iconKey: "python", color: "#3776ab"},
  {label: "React / Next.js", iconKey: "react", color: "#61dafb"},
  {label: "Database Systems", iconKey: "postgresql", color: "#336791"},
  {label: "Rust", iconKey: "rust", color: "#dea584"},
  {label: "Flutter", iconKey: "flutter", color: "#02569b"},
] as const satisfies readonly HomeHeroSkill[];

export const homeText = {
  hero: {
    heading: "Hi, I'm Simone Siega",
    tagline: "Full-stack developer building AI-powered products",
    locationLine: "📍 Venice, Italy · CS student '26",
    bio: "I build practical software — from full-stack applications to AI-driven systems — turning complex ideas into reliable, production-ready products.",
    skills: homeHeroSkills,
    statusLine: "Open to internships & collaborations",
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
          "Voice assistant",
          "Database",
          "Ollama",
          "Speech recognition",
          "Text-to-speech",
        ],
        href: "https://github.com/simonesiega-academics/culinary-ai-assistant.git",
        ariaLabel: "View AI Culinary Assistant on GitHub",
      },
      {
        title: "AI Companion",
        description:
          "Local-first, modular AI companion for chat, voice, and document Q&A — powered by Flask + LangChain with Ollama models running on-device.",
        tags: ["Python", "Flask", "LangChain", "Ollama", "RAG", "Voice (ASR/TTS)"],
        href: "https://github.com/simonesiega-academics/hs-ai-companion-prototype",
        ariaLabel: "View AI Companion on GitHub",
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
