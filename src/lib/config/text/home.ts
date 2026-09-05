import {appConfig} from "@/lib/config/app-config";
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
};

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
  {
    icon: "linkedin",
    label: appConfig.social.labels.linkedin,
    href: appConfig.social.linkedinUrl,
  },
  {icon: "github", label: appConfig.social.labels.github, href: appConfig.social.githubUrl},
  {icon: "x", label: appConfig.social.labels.x, href: appConfig.social.xUrl},
] as const;

export type HomeIntroSocialIconKey = (typeof homeIntroSocialLinks)[number]["icon"];

const homeIntroProjectItems = projectsText.projects
  .filter((project) => project.showOnLandingPage)
  .map((project) => ({
    title: project.title,
    href: getProjectCaseStudyHref(project.slug),
    description: project.landingPageDescription,
  })) satisfies readonly HomeIntroProjectItem[];

const homeIntroWorkItems = workText.experiences
  .filter((experience) => experience.showOnLandingPage)
  .map((experience) => ({
    title: experience.company,
    description: experience.landingPageDescription,
    dateRange: experience.dateRange,
    imageSrc: experience.logoSrc,
  })) satisfies readonly HomeIntroWorkItem[];

export const homeText = {
  intro: {
    profileImage: {
      src: "/landing/profile.webp",
      alt: "Portrait of Simone Siega",
    },
    name: appConfig.owner.name,

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
