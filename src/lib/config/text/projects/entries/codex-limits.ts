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
  showOnLandingPage: true,
  landingPageDescription:
    "Cross-platform CLI for monitoring Codex usage, published as a public npm package",
  githubUrl: "https://github.com/simonesiega/codex-limits",
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
        value: "Cross-platform npm CLI",
      },
      {
        label: "Early adoption",
        value: "1,500 downloads in 20 days",
      },
      {
        label: "Interfaces",
        value: "Responsive TUI, text, and JSON",
      },
      {
        label: "Integrations",
        value: "OpenCode, pi, and Copilot CLI",
      },
      {
        label: "Verification",
        value: "180+ tests and packed-artifact checks",
      },
    ],
    gallery: [
      {
        src: "/projects/codex-limits/final-result-large.webp",
        alt: "Codex Limits terminal dashboard showing usage windows and reset-credit coupons",
        caption: galleryCaptions[0],
        thumbnailDescription: galleryThumbnailDescriptions?.[0],
        href: "https://github.com/simonesiega/codex-limits",
      },
      {
        src: "/projects/codex-limits/opencode-result.webp",
        alt: "Codex Limits read-only dashboard opened inside OpenCode",
        caption: galleryCaptions[1],
        thumbnailDescription: galleryThumbnailDescriptions?.[1],
        href: "https://github.com/simonesiega/codex-limits#agent-integrations",
      },
      {
        src: "/projects/codex-limits/npm-package.webp",
        alt: "Public npm page for the @simonesiega/codex-limits package",
        caption: galleryCaptions[2],
        thumbnailDescription: galleryThumbnailDescriptions?.[2],
        href: "https://www.npmjs.com/package/@simonesiega/codex-limits",
      },
      {
        src: "/projects/codex-limits/publish-workflow.webp",
        alt: "Successful GitHub Actions workflow publishing Codex Limits to npm",
        caption: galleryCaptions[3],
        thumbnailDescription: galleryThumbnailDescriptions?.[3],
        href: "https://github.com/simonesiega/codex-limits/actions/workflows/publish.yml",
      },
    ],
    Content: CaseStudyContent,
  },
} as const satisfies ProjectsPageProject;
