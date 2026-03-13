import type {Metadata} from "next";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {animationTimings} from "@/lib/animation/animation-timings";
import {contentPageSeo} from "@/lib/config/site-routes";
import {projectsText} from "@/lib/config/text/projects";
import {createContentPageMetadata} from "@/lib/metadata";

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

const projectsSeo = contentPageSeo["/projects"];

export const metadata: Metadata = createContentPageMetadata({
  route: "/projects",
  title: projectsSeo.title,
  description: projectsSeo.description,
});
