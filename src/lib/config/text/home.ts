import {getProjectCaseStudyHref, projectsText} from "./projects";
import {workText} from "./work";

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

type LandingPageProject = Extract<
  (typeof projectsText.projects)[number],
  {showOnLandingPage: true}
>;
type LandingPageProjectSlug = LandingPageProject["slug"];

export type HomeIntroAboutImage = {
  label: string;
  src: string;
  alt: string;
};

const homeIntroSocialLinks = [
  {
    icon: "resume",
    label: "Download résumé",
    href: "/simone-siega-resume.pdf",
    download: "Simone-Siega-Resume.pdf",
  },
  {icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/simonesiega"},
  {icon: "github", label: "GitHub", href: "https://github.com/simonesiega"},
  {icon: "x", label: "X / Twitter", href: "https://x.com/simonesiega_"},
] as const;

export type HomeIntroSocialIconKey = (typeof homeIntroSocialLinks)[number]["icon"];

const homeProjectDescriptions = {
  "first-client-projects": "Two production websites delivered during high school",
  "european-tech-opportunities-2027":
    "Open-source directory for European internships and New Grad positions",
  "codex-limits":
    "Cross-platform CLI for monitoring Codex usage, published as a public npm package",
} as const satisfies Record<LandingPageProjectSlug, string>;

const homeIntroProjectItems = projectsText.projects
  .filter((project) => project.showOnLandingPage)
  .map((project) => ({
    title: project.title,
    href: getProjectCaseStudyHref(project.slug),
    description: homeProjectDescriptions[project.slug],
  })) satisfies readonly HomeIntroProjectItem[];

const homeIntroWorkItems = workText.experiences
  .filter((experience) => experience.showOnLandingPage)
  .map((experience) => ({
    title: experience.company,
    description: experience.role.replace(/ — Contract$/, ""),
    dateRange: experience.dateRange,
    imageSrc: experience.logoSrc,
    imageAlt: experience.logoAlt,
  })) satisfies readonly HomeIntroWorkItem[];

export const homeText = {
  intro: {
    profileImage: {
      src: "/landing/pfp.webp",
      alt: "Portrait of Simone Siega",
    },
    name: "Simone Siega",

    bioLines: [
      "Computer Engineering student in Venice, Italy.",
      "Building developer tools, backend systems, and production software designed for real use.",
    ],

    socialLinks: homeIntroSocialLinks,

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
          description: "Technical Diploma in Computer Science, 100/100 with honors",
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
        "Outside of coding, I enjoy strength training, hiking, and spending time outdoors. I like challenging myself, learning new things, and working toward goals that take time and consistency.",
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
