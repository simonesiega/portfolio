import CaseStudyContent, {
  galleryCaptions,
  galleryThumbnailDescriptions,
  keyPhrase,
} from "../content/codex-limits.mdx";
import type {ProjectsPageProject} from "../types";

export const codexLimitsProject = {
  slug: "codex-limits",
  title: "Codex Limits",
  pinned: false,
  githubUrl: "https://github.com/simonesiega/codex-limits.git",
  demoUrls: [
    {
      label: "npm Package",
      href: "https://www.npmjs.com/package/@simonesiega/codex-limits",
    },
  ],
  showcaseAction: {
    kind: "external",
    label: "npm",
    href: "https://www.npmjs.com/package/@simonesiega/codex-limits",
  },
  developmentPeriod: "2026",
  keyPhrase,
  caseStudy: {
    readTimeMinutes: 6,
    quickFacts: [
      {
        label: "Distribution",
        value: "First public npm package",
      },
      {
        label: "Interfaces",
        value: "Responsive TUI, text, and JSON",
      },
      {
        label: "Architecture",
        value: "Shared core with thin adapters",
      },
      {
        label: "Integrations",
        value: "OpenCode, pi, and Copilot CLI",
      },
      {
        label: "Release",
        value: "Trusted Publishing with provenance",
      },
    ],
    gallery: [
      {
        src: "/projects/codex-limits/final_result_large.webp",
        alt: "Codex Limits terminal dashboard showing usage windows and reset-credit coupons",
        caption: galleryCaptions[0],
        thumbnailDescription: galleryThumbnailDescriptions?.[0],
        href: "https://github.com/simonesiega/codex-limits",
      },
      {
        src: "/projects/codex-limits/opencode_result.webp",
        alt: "Codex Limits read-only dashboard opened inside OpenCode",
        caption: galleryCaptions[1],
        thumbnailDescription: galleryThumbnailDescriptions?.[1],
        href: "https://github.com/simonesiega/codex-limits#agent-integrations",
      },
      {
        src: "/projects/codex-limits/npm_package.webp",
        alt: "Public npm page for the @simonesiega/codex-limits package",
        caption: galleryCaptions[2],
        thumbnailDescription: galleryThumbnailDescriptions?.[2],
        href: "https://www.npmjs.com/package/@simonesiega/codex-limits",
      },
      {
        src: "/projects/codex-limits/publish_workflow.webp",
        alt: "Successful GitHub Actions workflow publishing Codex Limits to npm",
        caption: galleryCaptions[3],
        thumbnailDescription: galleryThumbnailDescriptions?.[3],
        href: "https://github.com/simonesiega/codex-limits/actions/workflows/publish.yml",
      },
    ],
    Content: CaseStudyContent,
  },
} as const satisfies ProjectsPageProject;
