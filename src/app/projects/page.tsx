import type { Metadata } from "next";
import { RouteReveal } from "@/components/animation/route-reveal";
import { SecondaryPageHero } from "@/components/layout/secondary-page-hero";
import { SecondaryFooter } from "@/components/layout/secondary-footer";
import { animationTimings } from "@/lib/animation/animation-timings";
import { projectsText } from "@/lib/config/text/projects";
import { sharedOpenGraph, sharedTwitter } from "@/lib/metadata";

export default function ProjectsPage() {
  const { hero } = projectsText;
  const { routeReveal } = animationTimings;

  return (
    <div className="overflow-x-clip">
      <div className="mx-auto flex min-h-[calc(100vh-var(--app-header-height,6rem))] min-h-[calc(100svh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <div className="mx-auto max-w-5xl px-6">
          <SecondaryPageHero
            sectionId={hero.sectionId}
            eyebrow={hero.eyebrow}
            title={hero.title}
            subtitle={hero.subtitle}
          />
        </div>

        <RouteReveal
          variant="fade-in"
          duration={routeReveal.durationMs}
          threshold={routeReveal.threshold}
          className="mt-auto"
        >
          <SecondaryFooter />
        </RouteReveal>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Projects",
  description: projectsText.hero.subtitle,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    ...sharedOpenGraph,
    url: "/projects",
    title: "Projects | Simone Siega",
    description: projectsText.hero.subtitle,
  },
  twitter: {
    ...sharedTwitter,
    title: "Projects | Simone Siega",
    description: projectsText.hero.subtitle,
  },
};
