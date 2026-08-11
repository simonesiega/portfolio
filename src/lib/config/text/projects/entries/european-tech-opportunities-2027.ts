import CaseStudyContent, {
  galleryCaptions,
  galleryThumbnailDescriptions,
  keyPhrase,
} from "../content/european-tech-opportunities-2027.mdx";
import type {ProjectsPageProject} from "../types";

export const europeanTechOpportunities2027Project = {
  slug: "european-tech-opportunities-2027",
  title: "European Tech Opportunities 2027",
  pinned: false,
  githubUrl: "https://github.com/simonesiega/european-tech-opportunities-2027",
  demoUrls: [
    {
      label: "Live Site",
      href: "https://opportunities2027.simonesiega.com/",
    },
  ],
  showcaseAction: {
    kind: "external",
    label: "Live Site",
    href: "https://opportunities2027.simonesiega.com",
  },
  developmentPeriod: "2026",
  keyPhrase,
  caseStudy: {
    readTimeMinutes: 7,
    quickFacts: [
      {
        label: "Scale",
        value: "700+ open European opportunities",
      },
      {
        label: "Acceptance",
        value: "Six deterministic publication rules",
      },
      {
        label: "State",
        value: "SQLite lifecycle with provenance",
      },
      {
        label: "Recovery",
        value: "Restore-tested, checksummed snapshots",
      },
      {
        label: "Quality",
        value: "89.9% critical-path coverage",
      },
    ],
    gallery: [
      {
        src: "/projects/european-tech-opportunities-2027/diagram.svg",
        alt: "European Tech Opportunities 2027 architecture diagram",
        caption: galleryCaptions[0],
        thumbnailDescription: galleryThumbnailDescriptions?.[0],
        href: "https://github.com/simonesiega/european-tech-opportunities-2027/blob/main/docs/md/development/architecture.md",
        invertInLightTheme: true,
      },
      {
        src: "/projects/european-tech-opportunities-2027/White_theme.webp",
        alt: "European Tech Opportunities 2027 directory in light mode",
        caption: galleryCaptions[1],
        thumbnailDescription: galleryThumbnailDescriptions?.[1],
        href: "https://opportunities2027.simonesiega.com/",
      },
      {
        src: "/projects/european-tech-opportunities-2027/Dark_theme.webp",
        alt: "European Tech Opportunities 2027 directory in dark mode",
        caption: galleryCaptions[2],
        thumbnailDescription: galleryThumbnailDescriptions?.[2],
        href: "https://opportunities2027.simonesiega.com/",
      },
    ],
    Content: CaseStudyContent,
  },
} as const satisfies ProjectsPageProject;
