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
      src: "/landing/pfp.webp",
      alt: "Simone Siega",
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
      label: "PROJECTS",
      linkLabel: "PROJECTS →",
      seeAllHref: "/projects",
      items: [
        {
          title: "Client Web Delivery",
          href: "/projects/first-client-projects",
          description: "Two production client websites delivered during high school",
        },
        {
          title: "CFG Parser",
          href: "/projects/cfg-parser",
          description: "Rust CLI tool for grammar-driven expression parsing and evaluation",
        },
      ] as const satisfies readonly HomeIntroProjectItem[],
    },
    works: {
      label: "WORK",
      linkLabel: "WORK →",
      seeAllHref: "/work",
      items: [
        {
          title: "Arsenale Moto",
          description: "Website & CMS development",
          dateRange: "2026",
          imageSrc: "/work/logos/Arsenale.png",
          imageAlt: "Arsenale Moto logo",
        },
        {
          title: "New Art Vanguard",
          description: "Website development & maintenance",
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
