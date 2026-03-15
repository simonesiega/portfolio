export type ProjectsPageProject = {
  id: string;
  title: string;
  githubUrl: string;
  status: string;
  developmentYear: string;
  keyPhrase: string;
  technologies: readonly string[];
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
  },

  projects: [
    {
      id: "cfg-parser",
      title: "CFG Parser",
      githubUrl: "https://github.com/simonesiega-academics/cfg-parser.git",
      status: "Completed",
      developmentYear: "2025",
      keyPhrase:
        "Command-line parser for evaluating arithmetic expressions using a context-free grammar.",
      technologies: ["Rust", "CLI", "Parsing", "Context-Free Grammar", "Tokenization"],
    },
  ],
} as const satisfies ProjectsText;
