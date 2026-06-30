import {appConfig} from "../../src/lib/config/app-config";

type ProjectWithContentLinks = {
  project: {
    slug: string;
  };
  contentLinks: readonly {
    label: string;
    href: string;
  }[];
};

const projectFixtures = [
  {
    slug: "first-client-projects",
    contentLinks: [
      {label: "New Art Vanguard", href: "https://www.newartvanguard.com/"},
      {label: "Arsenale Moto", href: "https://arsenale-moto.simonesiega.dev/"},
    ],
  },
  {
    slug: "cfg-parser",
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
  },
] as const;

export const themeStorageKey = appConfig.theme.storageKey;

export const appRoutes = [
  "/",
  "/projects",
  "/work",
  ...projectFixtures.map((project) => getProjectCaseStudyRoute(project.slug)),
];

export const projectContentLinksHeading = "Links";

export const projectsWithContentLinks = projectFixtures.flatMap((project) => {
  const {contentLinks} = project;

  if (!contentLinks.length) {
    return [];
  }

  return [{project, contentLinks}] as ProjectWithContentLinks[];
});

export const allProjectsHaveContentLinks =
  projectsWithContentLinks.length === projectFixtures.length;

export function getProjectCaseStudyRoute(projectSlug: string) {
  return `/projects/${projectSlug}`;
}
