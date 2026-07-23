import {getProjectCaseStudyHref, projectsText} from "./projects";
import {workText} from "./work";

export const homeIntroSocialIconKeys = ["x", "instagram", "github", "linkedin"] as const;

export type HomeIntroSocialIconKey = (typeof homeIntroSocialIconKeys)[number];

type HomeIntroSocialLink = {
  icon: HomeIntroSocialIconKey;
  label: string;
  href: string;
};

type HomeIntroEducationItem = {
  school: string;
  href: string;
  description: string;
};

type HomeIntroProjectItem = {
  title: string;
  href: string;
  description: string;
};

type HomeIntroWorkItem = {
  title: string;
  description: string;
  dateRange: string;
  imageSrc: string;
  imageAlt: string;
};

type HomeFeaturedProjectSlug = (typeof projectsText.projects)[number]["slug"];
type HomeFeaturedWorkId = (typeof workText.experiences)[number]["id"];

export type HomeIntroAboutImage = {
  label: string;
  src: string;
  alt: string;
};

const homeFeaturedProjectSlugs = [
  "first-client-projects",
  "cfg-parser",
] as const satisfies readonly HomeFeaturedProjectSlug[];

const homeFeaturedProjectDescriptions = {
  "first-client-projects": "Two production client websites delivered during high school",
  "cfg-parser": "Rust CLI tool for grammar-driven expression parsing and evaluation",
} as const satisfies Record<(typeof homeFeaturedProjectSlugs)[number], string>;

const homeFeaturedWorkIds = [
  "arsenalemoto",
  "novaidea",
  "dacos-srl",
] as const satisfies readonly HomeFeaturedWorkId[];

function getHomeFeaturedProject(projectSlug: HomeFeaturedProjectSlug) {
  const project = projectsText.projects.find((candidate) => candidate.slug === projectSlug);

  if (!project) {
    throw new Error(`Missing home featured project: ${projectSlug}`);
  }

  return project;
}

function getHomeFeaturedWork(workId: HomeFeaturedWorkId) {
  const experience = workText.experiences.find((candidate) => candidate.id === workId);

  if (!experience) {
    throw new Error(`Missing home featured work experience: ${workId}`);
  }

  if (!experience.logoSrc) {
    throw new Error(`Missing logo for home featured work experience: ${workId}`);
  }

  return experience;
}

const homeIntroProjectItems = homeFeaturedProjectSlugs.map((projectSlug) => {
  const project = getHomeFeaturedProject(projectSlug);

  return {
    title: project.title,
    href: getProjectCaseStudyHref(project.slug),
    description: homeFeaturedProjectDescriptions[projectSlug],
  };
}) satisfies readonly HomeIntroProjectItem[];

const homeIntroWorkItems = homeFeaturedWorkIds.map((workId) => {
  const experience = getHomeFeaturedWork(workId);

  return {
    title: experience.company,
    description: experience.role,
    dateRange: experience.sortStart.slice(0, 4),
    imageSrc: experience.logoSrc,
    imageAlt: experience.logoAlt,
  };
}) satisfies readonly HomeIntroWorkItem[];

export const homeText = {
  intro: {
    profileImage: {
      src: "/landing/pfp.webp",
      alt: "Portrait of Simone Siega",
    },
    name: "Simone Siega",

    bioLines: [
      "Computer Engineering student in Venice, Italy.",
      "Building backend software and production-ready web systems, with a growing interest in AI engineering.",
    ],

    socialLinks: [
      {icon: "x", label: "X / Twitter", href: "https://x.com/simonesiega_"},
      {icon: "instagram", label: "Instagram", href: "https://www.instagram.com/_simonesiiega_/"},
      {icon: "github", label: "GitHub", href: "https://github.com/simonesiega"},
      {icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/simonesiega"},
    ] as const satisfies readonly HomeIntroSocialLink[],

    education: {
      label: "EDUCATION",
      items: [
        {
          school: "University of Padua",
          href: "https://www.unipd.it/",
          description: "First-year B.Sc. Computer Engineering student",
        },
        {
          school: "I.T.I.S. C. Zuccante",
          href: "https://www.itiszuccante.edu.it/",
          description: "Technical Diploma in Computer Science, 2026, 100/100 with honors",
        },
      ] as const satisfies readonly HomeIntroEducationItem[],
    },
    projects: {
      linkLabel: "PROJECTS →",
      seeAllHref: "/projects",
      items: homeIntroProjectItems,
    },
    works: {
      linkLabel: "WORK →",
      seeAllHref: "/work",
      items: homeIntroWorkItems,
    },
    about: {
      label: "ABOUT ME",
      description:
        "Outside software development, I spend time on mountain trails, strength training, and studying computer science and mathematics. I’m drawn to activities that require patience, discipline, and long-term improvement.",
      images: [
        {
          label: "Mountain",
          src: "/landing/about/snow.webp",
          alt: "Mountain trails in the Dolomites",
        },
        {
          label: "Gym",
          src: "/landing/about/gym.webp",
          alt: "Minimal gym training illustration",
        },
        {
          label: "CS & Math",
          src: "/landing/about/cs-math.webp",
          alt: "Minimal computer science and mathematics illustration",
        },
      ] as const satisfies readonly HomeIntroAboutImage[],
    },
  },
} as const;
