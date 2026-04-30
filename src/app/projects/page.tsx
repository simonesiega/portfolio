import type {Metadata} from "next";
import {ParticleNetwork} from "@/components/animation/particle-network";
import {ProjectsShowcaseSection} from "@/components/projects/projects-showcase-section";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {animationTimings} from "@/lib/animation/animation-timings";
import {contentPageSeo} from "@/lib/config/site-routes";
import {projectsText} from "@/lib/config/text/projects";
import {createContentPageMetadata} from "@/lib/metadata";

export default function ProjectsPage() {
  const {hero, sections, projects} = projectsText;
  const {routeReveal} = animationTimings;

  return (
    <div className="relative overflow-x-clip">
      <ParticleNetwork
        className="pointer-events-none absolute inset-0 hidden [mask-image:linear-gradient(to_right,black_0%,black_16%,rgba(0,0,0,0.3)_32%,rgba(0,0,0,0.3)_68%,black_84%,black_100%)] opacity-25 xl:block"
        motionScale={0.2}
        disablePointer
      />

      <div className="relative z-10">
        <SecondaryPageLayout
          hero={hero}
          routeRevealDurationMs={routeReveal.durationMs}
          routeRevealThreshold={routeReveal.threshold}
          compactHero
        >
          <ProjectsShowcaseSection
            projects={projects}
            projectsAriaLabel={sections.projectsAriaLabel}
            technologiesAriaLabel={sections.technologiesAriaLabel}
            openCaseStudyLabel={sections.openCaseStudyLabel}
            statusLabel={sections.statusLabel}
            mailSubjectPrefix={sections.mailSubjectPrefix}
            mailAriaLabelPrefix={sections.mailAriaLabelPrefix}
            githubAriaLabelPrefix={sections.githubAriaLabelPrefix}
            githubAriaLabelSuffix={sections.githubAriaLabelSuffix}
          />
        </SecondaryPageLayout>
      </div>
    </div>
  );
}

const projectsSeo = contentPageSeo["/projects"];

export const metadata: Metadata = createContentPageMetadata({
  route: "/projects",
  title: projectsSeo.title,
  description: projectsSeo.description,
});
