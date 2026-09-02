import CaseStudyContent, {galleryCaptions, keyPhrase} from "../content/cfg-parser.mdx";
import type {ProjectsPageProject} from "../types";

export const cfgParserProject = {
  slug: "cfg-parser",
  title: "CFG Parser",
  pinned: false,
  showOnLandingPage: false,
  githubUrl: "https://github.com/simonesiega/cfg-parser",
  developmentPeriod: "2024",
  keyPhrase,
  caseStudy: {
    readTimeMinutes: 5,
    quickFacts: [
      {
        label: "Context",
        value: "First Rust project",
      },
      {
        label: "Type",
        value: "Arithmetic CLI",
      },
      {
        label: "Parser",
        value: "Hand-written recursive descent",
      },
      {
        label: "Evaluation",
        value: "Grammar-driven, without an AST",
      },
      {
        label: "Runtime",
        value: "Cargo or Docker",
      },
    ],
    gallery: [
      {
        src: "/projects/cfg-parser/diagram.svg",
        alt: "CFG Parser architecture diagram",
        caption: galleryCaptions[0],
        href: "https://github.com/simonesiega/cfg-parser",
        invertInLightTheme: true,
      },
    ],
    Content: CaseStudyContent,
  },
} as const satisfies ProjectsPageProject;
