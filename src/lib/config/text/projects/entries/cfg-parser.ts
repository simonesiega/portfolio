import cfgParserContent from "../content/cfg-parser.json";
import type {ProjectsPageProject} from "../types";

type CfgParserContent = {
  keyPhrase: string;
  caseStudy: {
    summary: string;
    sections: {
      overview: {
        heading: string;
        content: string;
      };
      goal: {
        heading: string;
        content: string;
      };
      technicalApproach: {
        heading: string;
        content: string;
      };
      architecture: {
        heading: string;
        content: string;
      };
      keyDecisions: {
        heading: string;
        content: string;
        points: string[];
      };
      challenges: {
        heading: string;
        content: string;
        points: string[];
      };
      proof: {
        heading: string;
        content: string;
        points: string[];
      };
      whatILearned: {
        heading: string;
        content: string;
      };
      futureImprovements: {
        heading: string;
        content: string;
        points: string[];
      };
      links: {
        heading: string;
        content: string;
        labels: [string, string, string];
      };
    };
  };
};

const content = cfgParserContent as CfgParserContent;

export const cfgParserProject = {
  id: "cfg-parser",
  slug: "cfg-parser",
  title: "CFG Parser",
  githubUrl: "https://github.com/simonesiega/cfg-parser.git",
  status: "Completed",
  developmentPeriod: "2025",
  keyPhrase: content.keyPhrase,
  technologies: ["Rust", "CLI", "Parsing", "Context-Free Grammar", "Tokenization"],
  caseStudy: {
    summary: content.caseStudy.summary,
    readTimeMinutes: 5,
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
        value: "Tokenizer -> Parser -> Evaluator",
      },
      {
        label: "Expression Support",
        value: "8 operator/forms",
      },
    ],
    diagramAlt: "CFG Parser architecture diagram",
    diagramRenderingMode: "dark-source",
    sections: [
      {
        kind: "content",
        id: "overview",
        heading: content.caseStudy.sections.overview.heading,
        content: content.caseStudy.sections.overview.content,
      },
      {
        kind: "content",
        id: "goal",
        heading: content.caseStudy.sections.goal.heading,
        content: content.caseStudy.sections.goal.content,
      },
      {
        kind: "content",
        id: "technical-approach",
        heading: content.caseStudy.sections.technicalApproach.heading,
        content: content.caseStudy.sections.technicalApproach.content,
      },
      {
        kind: "content",
        id: "architecture",
        heading: content.caseStudy.sections.architecture.heading,
        content: content.caseStudy.sections.architecture.content,
      },
      {
        kind: "content",
        id: "key-decisions",
        heading: content.caseStudy.sections.keyDecisions.heading,
        content: content.caseStudy.sections.keyDecisions.content,
        points: content.caseStudy.sections.keyDecisions.points,
      },
      {
        kind: "content",
        id: "challenges",
        heading: content.caseStudy.sections.challenges.heading,
        content: content.caseStudy.sections.challenges.content,
        points: content.caseStudy.sections.challenges.points,
      },
      {
        kind: "content",
        id: "proof",
        heading: content.caseStudy.sections.proof.heading,
        content: content.caseStudy.sections.proof.content,
        points: content.caseStudy.sections.proof.points,
      },
      {
        kind: "content",
        id: "what-i-learned",
        heading: content.caseStudy.sections.whatILearned.heading,
        content: content.caseStudy.sections.whatILearned.content,
      },
      {
        kind: "content",
        id: "future-improvements",
        heading: content.caseStudy.sections.futureImprovements.heading,
        content: content.caseStudy.sections.futureImprovements.content,
        points: content.caseStudy.sections.futureImprovements.points,
      },
      {
        kind: "links",
        id: "links",
        heading: content.caseStudy.sections.links.heading,
        content: content.caseStudy.sections.links.content,
        links: [
          {
            label: content.caseStudy.sections.links.labels[0],
            url: "https://github.com/simonesiega/cfg-parser",
          },
          {
            label: content.caseStudy.sections.links.labels[1],
            url: "https://github.com/simonesiega/cfg-parser/tree/master/docs",
          },
          {
            label: content.caseStudy.sections.links.labels[2],
            url: "https://github.com/simonesiega/cfg-parser/blob/master/README.md",
          },
        ],
      },
    ],
  },
} as const satisfies ProjectsPageProject;
