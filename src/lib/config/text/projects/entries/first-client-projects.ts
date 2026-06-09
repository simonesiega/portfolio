import firstClientProjectsContent from "../content/first-client-projects.json";
import type {ProjectsPageProject} from "../types";

type firstClientProjectsContent = {
  keyPhrase: string;
  caseStudy: {
    summary: string;
    galleryCaptions: string[];
    galleryThumbnailDescriptions: string[];
    sections: {
      overview: {
        heading: string;
        content: string;
      };
      goal: {
        heading: string;
        content: string;
      };
      technicalApproach: {
        heading: string;
        content: string;
      };
      architecture: {
        heading: string;
        content: string;
      };
      keyDecisions: {
        heading: string;
        content: string;
        points: string[];
      };
      challenges: {
        heading: string;
        content: string;
        points: string[];
      };
      proof: {
        heading: string;
        content: string;
        points: string[];
      };
      whatILearned: {
        heading: string;
        content: string;
      };
      futureImprovements: {
        heading: string;
        content: string;
        points: string[];
      };
      links: {
        heading: string;
        content: string;
        items: {title: string; description: string}[];
      };
    };
  };
};

const content = firstClientProjectsContent as firstClientProjectsContent;

export const firstClientProjects = {
  id: "first-client-projects",
  slug: "first-client-projects",
  title: "First Client Websites",
  pinned: true,
  githubUrl: "",
  demoUrls: [
    {label: "New Art Vanguard", href: "https://www.newartvanguard.com/"},
    {label: "Arsenale Moto", href: "https://arsenale-moto.simonesiega.dev/"},
  ],
  developmentPeriod: "2026",
  keyPhrase: content.keyPhrase,
  caseStudy: {
    summary: content.caseStudy.summary,
    readTimeMinutes: 7,
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
        caption: content.caseStudy.galleryCaptions[0],
        thumbnailDescription: content.caseStudy.galleryThumbnailDescriptions[0],
        href: "https://www.newartvanguard.com/",
        renderingMode: "dark-source",
      },
      {
        src: "/projects/first-client-projects/ArsenaleMoto.png",
        alt: "Arsenale Moto landing page",
        caption: content.caseStudy.galleryCaptions[1],
        thumbnailDescription: content.caseStudy.galleryThumbnailDescriptions[1],
        href: "https://arsenale-moto.simonesiega.dev/",
        renderingMode: "dark-source",
      },
    ],
    sections: [
      {
        kind: "content",
        id: "overview",
        heading: content.caseStudy.sections.overview.heading,
        content: content.caseStudy.sections.overview.content,
      },
      {
        kind: "content",
        id: "goal",
        heading: content.caseStudy.sections.goal.heading,
        content: content.caseStudy.sections.goal.content,
      },
      {
        kind: "content",
        id: "technical-approach",
        heading: content.caseStudy.sections.technicalApproach.heading,
        content: content.caseStudy.sections.technicalApproach.content,
      },
      {
        kind: "content",
        id: "architecture",
        heading: content.caseStudy.sections.architecture.heading,
        content: content.caseStudy.sections.architecture.content,
      },
      {
        kind: "content",
        id: "key-decisions",
        heading: content.caseStudy.sections.keyDecisions.heading,
        content: content.caseStudy.sections.keyDecisions.content,
        points: content.caseStudy.sections.keyDecisions.points,
      },
      {
        kind: "content",
        id: "challenges",
        heading: content.caseStudy.sections.challenges.heading,
        content: content.caseStudy.sections.challenges.content,
        points: content.caseStudy.sections.challenges.points,
      },
      {
        kind: "content",
        id: "proof",
        heading: content.caseStudy.sections.proof.heading,
        content: content.caseStudy.sections.proof.content,
        points: content.caseStudy.sections.proof.points,
      },
      {
        kind: "content",
        id: "what-i-learned",
        heading: content.caseStudy.sections.whatILearned.heading,
        content: content.caseStudy.sections.whatILearned.content,
      },
      {
        kind: "content",
        id: "future-improvements",
        heading: content.caseStudy.sections.futureImprovements.heading,
        content: content.caseStudy.sections.futureImprovements.content,
        points: content.caseStudy.sections.futureImprovements.points,
      },
      {
        kind: "links",
        id: "links",
        heading: content.caseStudy.sections.links.heading,
        content: content.caseStudy.sections.links.content,
        links: [
          {
            title: content.caseStudy.sections.links.items[0].title,
            description: content.caseStudy.sections.links.items[0].description,
            url: "https://www.newartvanguard.com/",
          },
          {
            title: content.caseStudy.sections.links.items[1].title,
            description: content.caseStudy.sections.links.items[1].description,
            url: "https://arsenale-moto.simonesiega.dev/",
          },
        ],
      },
    ],
  },
} as const satisfies ProjectsPageProject;
