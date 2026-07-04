import CaseStudyContent, {galleryCaptions, keyPhrase} from "../content/cfg-parser.mdx";
import type {ProjectsPageProject} from "../types";

export const cfgParserProject = {
  id: "cfg-parser",
  slug: "cfg-parser",
  title: "CFG Parser",
  pinned: false,
  githubUrl: "https://github.com/simonesiega/cfg-parser.git",
  developmentPeriod: "2025",
  keyPhrase,
  caseStudy: {
    readTimeMinutes: 7,
    quickFacts: [
      {
        label: "Language",
        value: "Rust",
      },
      {
        label: "Type",
        value: "CLI tool",
      },
      {
        label: "Parser",
        value: "Recursive descent",
      },
      {
        label: "Architecture",
        value: "Tokenizer -> Parser/Evaluator",
      },
      {
        label: "Supported syntax",
        value: "8 operators/forms",
      },
    ],
    gallery: [
      {
        src: "/projects/cfg-parser/diagram.svg",
        alt: "CFG Parser architecture diagram",
        caption: galleryCaptions[0],
        href: "https://github.com/simonesiega/cfg-parser",
        renderingMode: "dark-source",
      },
    ],
    contentLinks: [
      {label: "GitHub repository", href: "https://github.com/simonesiega/cfg-parser"},
      {
        label: "technical documentation",
        href: "https://github.com/simonesiega/cfg-parser/tree/master/docs",
      },
      {
        label: "project README",
        href: "https://github.com/simonesiega/cfg-parser/blob/master/README.md",
      },
    ],
    Content: CaseStudyContent,
  },
} as const satisfies ProjectsPageProject;
