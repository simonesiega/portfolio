import type {ProjectsPageProject} from "../types";

export const cfgParserProject = {
  id: "cfg-parser",
  slug: "cfg-parser",
  title: "CFG Parser",
  githubUrl: "https://github.com/simonesiega-academics/cfg-parser.git",
  status: "Completed",
  developmentPeriod: "2025",
  keyPhrase:
    "Grammar-driven CLI parser in Rust that tokenizes, parses, and evaluates arithmetic expressions through a recursive-descent pipeline.",
  technologies: ["Rust", "CLI", "Parsing", "Context-Free Grammar", "Tokenization"],
  caseStudy: {
    summary:
      "Rust-based command-line parser that transforms raw arithmetic input into validated expression evaluation through a staged tokenizer-parser-evaluator pipeline with readable diagnostics.",
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
        value: "Grammar-driven expression parsing",
      },
    ],
    diagramAlt: "CFG Parser architecture diagram",
    diagramRenderingMode: "dark-source",
    sections: [
      {
        kind: "content",
        id: "overview",
        heading: "Overview",
        content:
          "CFG Parser is a command-line project built to parse and evaluate arithmetic expressions through a grammar-based pipeline. Rather than treating expression evaluation as a single operation, the project models it as a sequence of explicit stages so each transformation can be reasoned about, verified, and refined independently.\n\nIt was developed as an early hands-on exploration of both Rust and context-free grammars. Rust was chosen for the level of control it provides over program structure, memory safety, and data flow, making it a strong fit for building deterministic systems-style tooling.",
      },
      {
        kind: "content",
        id: "goal",
        heading: "Goal",
        content:
          "The goal was to transform raw user input into a valid arithmetic representation while preserving operator precedence and rejecting malformed syntax before evaluation. A central objective was to keep each stage of the pipeline responsible for a single concern, from lexical analysis to final result computation.",
      },
      {
        kind: "content",
        id: "technical-approach",
        heading: "Technical Approach",
        content:
          "The implementation separates tokenization, parsing, and evaluation into distinct stages so each part can be developed, tested, and debugged in isolation. Input is first converted into a token stream, then consumed by recursive-descent grammar rules that encode precedence and guide evaluation in a controlled and predictable way.",
      },
      {
        kind: "content",
        id: "architecture",
        heading: "Architecture",
        content:
          "The application follows a linear pipeline composed of input handling, tokenization, parsing, evaluation, and formatted output. Treating each phase as an explicit boundary made it easier to inspect intermediate states, isolate parser failures, and evolve the grammar without tightly coupling unrelated parts of the system.",
      },
      {
        kind: "content",
        id: "key-decisions",
        heading: "Key Decisions",
        content:
          "The project favors explicit parsing stages and readable control flow over compact abstractions. That decision made the parser easier to trace, adapt, and extend while keeping the grammar understandable as the implementation evolved.",
        points: [
          "Keep tokenizer and parser separate so lexical and syntactic concerns remain isolated.",
          "Represent grammar rules explicitly through recursive-descent functions to make precedence handling easier to inspect and debug.",
          "Design CLI output to surface concise diagnostics and fail early on invalid input.",
        ],
      },
      {
        kind: "content",
        id: "challenges",
        heading: "Challenges",
        content:
          "One of the main challenges was rejecting malformed expressions without allowing invalid state to propagate through the pipeline. This required defensive checks around token consumption, controlled parser branches, and error paths that remained understandable from the user side.",
        points: [
          "Handle unexpected symbols and incomplete expressions without triggering cascading parser failures.",
          "Prevent invalid parse states from reaching the evaluation stage.",
          "Keep diagnostics useful and readable without exposing unnecessary internal complexity.",
        ],
      },
      {
        kind: "content",
        id: "what-i-learned",
        heading: "What I Learned",
        content:
          "Building this project strengthened my understanding of parser construction as a design problem, not just an implementation task. It gave me practical experience with recursive-descent parsing, grammar decomposition, and Rust-based tooling where correctness, control flow, and module boundaries all play a central role.",
      },
      {
        kind: "content",
        id: "future-improvements",
        heading: "Future Improvements",
        content:
          "Future iterations could push the project beyond basic arithmetic into a richer grammar and a more expressive parsing toolchain.",
        points: [
          "Add support for functions such as sin, cos, and tan as first-class grammar constructs.",
          "Allow symbolic variables rather than limiting expressions to numeric-only input.",
          "Extend the parser toward equation handling and broader validation rules.",
        ],
      },
      {
        kind: "links",
        id: "links",
        heading: "Links",
        content:
          "Additional resources for exploring the project, including the source repository and technical documentation.",
        links: [
          {
            label: "GitHub Repository — Full source code and project history.",
            url: "https://github.com/simonesiega-academics/cfg-parser",
          },
          {
            label: "Technical Documentation — Architecture notes and grammar specifications.",
            url: "https://github.com/simonesiega-academics/cfg-parser/tree/master/docs",
          },
          {
            label: "Project README — Overview, usage examples, and setup instructions.",
            url: "https://github.com/simonesiega-academics/cfg-parser/blob/master/README.md",
          },
        ],
      },
    ],
  },
} as const satisfies ProjectsPageProject;
