import CaseStudyContent, {
  galleryCaptions,
  galleryThumbnailDescriptions,
  keyPhrase,
} from "../content/first-client-projects.mdx";
import type {ProjectsPageProject} from "../types";

export const firstClientProjects = {
  id: "first-client-projects",
  slug: "first-client-projects",
  title: "Client Web Delivery",
  pinned: true,
  githubUrl: "",
  demoUrls: [
    {label: "New Art Vanguard", href: "https://www.newartvanguard.com/"},
    {label: "Arsenale Moto", href: "https://arsenale-moto.simonesiega.dev/"},
  ],
  developmentPeriod: "2026",
  keyPhrase,
  caseStudy: {
    readTimeMinutes: 8,
    quickFacts: [
      {
        label: "Context",
        value: "Real client work developed during studies",
      },
      {
        label: "Project type",
        value: "Existing site + new build",
      },
      {
        label: "Delivery",
        value: "Live production websites",
      },
      {
        label: "Responsibilities",
        value: "Requests, CMS, backend, deployment, maintenance",
      },
      {
        label: "Codebase",
        value: "Private client repositories",
      },
    ],
    gallery: [
      {
        src: "/projects/first-client-projects/NewArtVanguard.png",
        alt: "New Art Vanguard coming soon page",
        caption: galleryCaptions[0],
        thumbnailDescription: galleryThumbnailDescriptions?.[0],
        href: "https://www.newartvanguard.com/",
      },
      {
        src: "/projects/first-client-projects/ArsenaleMoto.png",
        alt: "Arsenale Moto landing page",
        caption: galleryCaptions[1],
        thumbnailDescription: galleryThumbnailDescriptions?.[1],
        href: "https://arsenale-moto.simonesiega.dev/",
      },
    ],
    contentLinks: [
      {label: "New Art Vanguard", href: "https://www.newartvanguard.com/"},
      {label: "Arsenale Moto", href: "https://arsenale-moto.simonesiega.dev/"},
    ],
    Content: CaseStudyContent,
  },
} as const satisfies ProjectsPageProject;
