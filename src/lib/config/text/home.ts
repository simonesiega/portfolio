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

type HomeIntroAboutImage = {
  label: string;
  src: string;
  alt: string;
};

export const homeText = {
  intro: {
    profileImage: {
      src: "/landing/pfp.png",
      alt: "Simone Siega",
    },
    name: "Simone Siega",

    bioLines: [
      "Final-year IT student based in Venice, Italy.",
      "Building AI systems, backend software, and developer tools.",
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
          school: "I.T.I.S. C. Zuccante",
          href: "https://www.itiszuccante.edu.it/",
          description: "Final-year IT student",
        },
        {
          school: "University of Padua",
          href: "https://www.unipd.it/",
          description: "Incoming Computer Engineering student",
        },
      ] as const satisfies readonly HomeIntroEducationItem[],
    },
    projects: {
      label: "PROJECTS",
      linkLabel: "PROJECTS →",
      seeAllHref: "/projects",
      items: [
        {
          title: "CFG Parser",
          href: "/projects/cfg-parser",
          description: "Rust library for parsing context-free grammars",
        },
      ] as const satisfies readonly HomeIntroProjectItem[],
    },
    works: {
      label: "WORKS",
      linkLabel: "WORKS →",
      seeAllHref: "/work",
      items: [
        {
          title: "Arsenale Moto",
          description: "Full-stack web development",
          dateRange: "2026",
          imageSrc: "/work/logos/Arsenale.png",
          imageAlt: "Arsenale Moto logo",
        },
        {
          title: "New Art Vanguard",
          description: "Full-stack web development",
          dateRange: "2026",
          imageSrc: "/work/logos/NewArtVanguard.webp",
          imageAlt: "New Art Vanguard logo",
        },
        {
          title: "Dacos S.r.l.",
          description: "Software development internship",
          dateRange: "2025",
          imageSrc: "/work/logos/Dacos.png",
          imageAlt: "Dacos logo",
        },
      ] as const satisfies readonly HomeIntroWorkItem[],
    },
    about: {
      label: "ABOUT ME",
      description:
        "Beyond software engineering, I split my time between mountain trails, strength training, and deepening my knowledge of computer science and mathematics.",
      images: [
        {
          label: "Mountain",
          src: "/landing/about/snow.jpg",
          alt: "Mountain trails in the Dolomites",
        },
        {
          label: "Gym",
          src: "/landing/about/gym.png",
          alt: "Minimal gym training illustration",
        },
        {
          label: "CS & Math",
          src: "/landing/about/cs-math.png",
          alt: "Minimal computer science and mathematics illustration",
        },
      ] as const satisfies readonly HomeIntroAboutImage[],
      closingLine: "A quiet balance of nature, discipline, and technical curiosity.",
    },
  },
} as const;

export type HomeIntro = (typeof homeText)["intro"];
