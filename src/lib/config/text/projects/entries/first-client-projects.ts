import CaseStudyContent, {
  galleryCaptions,
  galleryThumbnailDescriptions,
  keyPhrase,
} from "../content/first-client-projects.mdx";
import type {ProjectsPageProject} from "../types";

export const firstClientProjects = {
  slug: "first-client-projects",
  title: "Client Web Delivery",
  pinned: true,
  showOnLandingPage: true,
  demoUrls: [
    {label: "New Art Vanguard", href: "https://www.newartvanguard.com/"},
    {label: "Arsenale Moto", href: "https://arsenalemoto.it/"},
  ],
  showcaseAction: {
    kind: "contact",
    label: "Contact",
  },
  developmentPeriod: "2026",
  keyPhrase,
  caseStudy: {
    readTimeMinutes: 7,
    quickFacts: [
      {
        label: "Context",
        value: "First paid contracts during high school",
      },
      {
        label: "Delivery",
        value: "Existing codebase + sole-developer build",
      },
      {
        label: "Production use",
        value: "30+ listings and 10–20 daily requests",
      },
      {
        label: "Ownership",
        value: "Requirements, CMS, backend, VPS, handoff",
      },
      {
        label: "Code",
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
