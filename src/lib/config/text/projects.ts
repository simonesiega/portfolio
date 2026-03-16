export type ProjectCaseStudySection = {
  id: string;
  heading: string;
  content: string;
  points?: readonly string[];
  urls?: readonly string[];
};

export type ProjectsPageProject = {
  id: string;
  slug: string;
  title: string;
  githubUrl: string;
  demoUrl?: string;
  status: string;
  developmentPeriod: string;
  keyPhrase: string;
  technologies: readonly string[];
  caseStudy: {
    summary: string;
    readTimeMinutes: number;
    quickFacts: readonly {
      label: string;
      value: string;
    }[];
    diagramAlt: string;
    sections: readonly ProjectCaseStudySection[];
  };
};

type ProjectsText = {
  hero: {
    sectionId: string;
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  sections: {
    projectsAriaLabel: string;
    technologiesAriaLabel: string;
    openCaseStudyLabel: string;
    statusLabel: string;
    mailSubjectPrefix: string;
    mailAriaLabelPrefix: string;
    githubAriaLabelPrefix: string;
    githubAriaLabelSuffix: string;
  };
  seo: {
    projectsPageTitle: string;
    caseStudyTitleSuffix: string;
    caseStudyFallbackTitle: string;
    caseStudyFallbackDescription: string;
  };
  caseStudyPage: {
    eyebrow: string;
    minReadSuffix: string;
    backToProjectsLabel: string;
    githubLabel: string;
    demoLabel: string;
  };
  projects: readonly ProjectsPageProject[];
};

export const projectsText = {
  hero: {
    sectionId: "projects-heading",
    eyebrow: "PROJECTS",
    title: "Personal Projects",
    subtitle: "Independent and academic software projects built alongside my studies.",
  },

  sections: {
    projectsAriaLabel: "Selected personal projects",
    technologiesAriaLabel: "Technologies used",
    openCaseStudyLabel: "Open case study",
    statusLabel: "Status",
    mailSubjectPrefix: "Info request",
    mailAriaLabelPrefix: "Send email for",
    githubAriaLabelPrefix: "Open",
    githubAriaLabelSuffix: "repository on GitHub",
  },

  seo: {
    projectsPageTitle: "Projects",
    caseStudyTitleSuffix: "case study",
    caseStudyFallbackTitle: "Project case study",
    caseStudyFallbackDescription:
      "Detailed progress notes for selected project work, including implementation steps and outcomes.",
  },

  caseStudyPage: {
    eyebrow: "CASE STUDY",
    minReadSuffix: "min read",
    backToProjectsLabel: "Back to projects",
    githubLabel: "GitHub",
    demoLabel: "Demo",
  },

  projects: [
    {
      id: "cfg-parser",
      slug: "cfg-parser",
      title: "CFG Parser",
      githubUrl: "https://github.com/simonesiega-academics/cfg-parser.git",
      status: "Completed",
      developmentPeriod: "2025",
      keyPhrase:
        "Command-line parser for evaluating arithmetic expressions using a context-free grammar.",
      technologies: ["Rust", "CLI", "Parsing", "Context-Free Grammar", "Tokenization"],
      caseStudy: {
        summary:
          "Grammar-based CLI parser that converts arithmetic expressions into a structured parsing pipeline with validation and clear error reporting.",
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
            label: "Focus",
            value: "Deterministic grammar parsing",
          },
        ],
        diagramAlt: "CFG Parser architecture diagram",
        sections: [
          {
            id: "overview",
            heading: "Overview",
            content:
              "CFG Parser is a command-line project that parses and evaluates arithmetic expressions using a context-free grammar.\n\nThe project was developed as my first hands-on exploration of both Rust and context-free grammars. Rust was chosen for its strong guarantees around memory safety, performance, and low-level control, making it well suited for building reliable systems-oriented tooling.",
          },
          {
            id: "goal",
            heading: "Goal",
            content:
              "The objective was to transform raw user input into well-structured arithmetic expressions while preserving operator precedence and providing clear feedback for invalid syntax. The project focuses on building a predictable parsing flow where each stage of the pipeline has a clear responsibility.",
          },
          {
            id: "technical-approach",
            heading: "Technical Approach",
            content:
              "The system separates tokenization from parsing so each stage remains testable, predictable, and easy to reason about. Input expressions are first converted into a stream of tokens, which are then consumed by grammar-driven parsing rules that evaluate the expression in a controlled and deterministic manner.",
          },
          {
            id: "architecture",
            heading: "Architecture",
            content:
              "The application follows a simple linear pipeline: input handling, tokenization, parsing, evaluation, and formatted output. Each component operates independently, which keeps dependencies minimal and allows individual stages to be debugged or extended without affecting the rest of the system.",
          },
          {
            id: "key-decisions",
            heading: "Key Decisions",
            content:
              "The implementation prioritizes explicit parsing stages and readability over compact abstractions. This approach makes the system easier to debug, reason about, and extend when introducing new grammar rules or expression features.",
            points: [
              "Keep tokenizer and parser isolated with clear input/output boundaries.",
              "Represent grammar behavior explicitly to simplify edge-case analysis.",
              "Design CLI output to provide concise and actionable parser diagnostics.",
            ],
          },
          {
            id: "challenges",
            heading: "Challenges",
            content:
              "One of the main challenges was handling malformed expressions without triggering cascading parser failures. The solution involved introducing guard checks and controlled fallback branches within the parsing flow to keep evaluation stable even when encountering unexpected input.",
            points: [
              "Recover gracefully from missing tokens and unexpected symbols.",
              "Prevent invalid intermediate states from propagating into evaluation.",
              "Keep diagnostics readable without exposing internal parser complexity.",
            ],
          },
          {
            id: "what-i-learned",
            heading: "What I Learned",
            content:
              "Building this project provided a practical introduction to Rust and reinforced core concepts of grammar-driven software design. It also highlighted how explicit parsing stages and clear module boundaries significantly improve maintainability, testing, and debugging in systems-oriented applications.",
          },
          {
            id: "future-improvements",
            heading: "Future Improvements",
            content:
              "Future iterations could extend the grammar to support more advanced mathematical expressions and improve developer ergonomics through richer diagnostics and additional testing strategies.",
            points: [
              "Introduce support for trigonometric functions such as sin, cos, and tan within the grammar.",
              "Allow expressions containing symbolic variables and unknowns rather than only numeric inputs.",
              "Add equation validation and evaluation capabilities to support expressions like linear equations.",
            ],
          },
          {
            id: "links",
            heading: "Links",
            content:
              "Additional resources for exploring the project, including the source repository and detailed technical documentation.",
            points: [
              "GitHub Repository — Full source code and project history.",
              "Technical Documentation — Architecture explanations and grammar specifications.",
              "Project README — Project overview, usage examples, and setup instructions.",
            ],
            urls: [
              "https://github.com/simonesiega-academics/cfg-parser",
              "https://github.com/simonesiega-academics/cfg-parser/tree/master/docs",
              "https://github.com/simonesiega-academics/cfg-parser/blob/master/README.md",
            ],
          },
        ],
      },
    },
  ],
} as const satisfies ProjectsText;

export function getProjectBySlug(projectSlug: string): ProjectsPageProject | undefined {
  return (projectsText.projects as readonly ProjectsPageProject[]).find(
    (project) => project.slug === projectSlug
  );
}

export function getProjectCaseStudyHref(projectSlug: string) {
  return `/projects/${projectSlug}`;
}

export function getProjectCaseStudyDiagramSrc(projectSlug: string) {
  return `/projects/${projectSlug}/diagram.svg`;
}

export function getProjectCaseStudySeo(projectSlug: string) {
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    return {
      title: projectsText.seo.caseStudyFallbackTitle,
      description: projectsText.seo.caseStudyFallbackDescription,
    };
  }

  return {
    title: `${project.title} ${projectsText.seo.caseStudyTitleSuffix}`,
    description: project.caseStudy.summary,
  };
}
