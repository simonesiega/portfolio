import type {Metadata} from "next";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {animationTimings} from "@/lib/animation/animation-timings";
import {projectsText} from "@/lib/config/text/projects";
import {sharedOpenGraph, sharedTwitter} from "@/lib/metadata";

export default function ProjectsPage() {
  const {hero} = projectsText;
  const {routeReveal} = animationTimings;

  return (
    <SecondaryPageLayout
      hero={hero}
      routeRevealDurationMs={routeReveal.durationMs}
      routeRevealThreshold={routeReveal.threshold}
    />
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
