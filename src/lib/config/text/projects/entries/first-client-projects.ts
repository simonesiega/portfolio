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
    {label: "Arsenale Moto", href: "https://arsenalemoto.it/"},
  ],
  developmentPeriod: "2026",
  keyPhrase,
  caseStudy: {
    readTimeMinutes: 5,
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
        src: "/projects/first-client-projects/NewArtVanguard.webp",
        alt: "New Art Vanguard coming soon page",
        caption: galleryCaptions[0],
        thumbnailDescription: galleryThumbnailDescriptions?.[0],
        href: "https://www.newartvanguard.com/",
      },
      {
        src: "/projects/first-client-projects/ArsenaleMoto.webp",
        alt: "Arsenale Moto landing page",
        caption: galleryCaptions[1],
        thumbnailDescription: galleryThumbnailDescriptions?.[1],
        href: "https://arsenalemoto.it/",
      },
    ],
    Content: CaseStudyContent,
  },
} as const satisfies ProjectsPageProject;
