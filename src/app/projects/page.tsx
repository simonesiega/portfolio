import type {Metadata} from "next";
import {ParticleNetwork} from "@/components/animation/particle-network";
import {ProjectsShowcaseSection} from "@/components/projects/projects-showcase-section";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {animationTimings} from "@/lib/animation/animation-timings";
import {contentPageSeo} from "@/lib/config/site-routes";
import {projectsText} from "@/lib/config/text/projects";
import {pageColumnClassName} from "@/lib/layout-classes";
import {createContentPageMetadata} from "@/lib/metadata";

export default function ProjectsPage() {
  const {hero, sections, projects} = projectsText;
  const {routeReveal} = animationTimings;

  return (
    <div className="relative overflow-x-clip">
      <ParticleNetwork className="pointer-events-none absolute inset-0 hidden [mask-image:linear-gradient(to_right,black_0%,black_16%,rgba(0,0,0,0.3)_32%,rgba(0,0,0,0.3)_68%,black_84%,black_100%)] opacity-25 xl:block" />

      <div className="relative z-10">
        <SecondaryPageLayout
          hero={{
            ...hero,
            className: pageColumnClassName,
            titleClassName:
              "text-[clamp(1.35rem,8vw,2rem)] leading-tight font-bold tracking-[0.08em] text-[var(--ui-fg)]/95 sm:text-[2.25rem]",
            subtitleClassName:
              "max-w-full text-[0.9rem] leading-relaxed font-normal tracking-normal text-[var(--header-item-color)] sm:text-[0.94rem]",
          }}
          routeRevealDurationMs={routeReveal.durationMs}
          routeRevealThreshold={routeReveal.threshold}
          compactHero
        >
          <ProjectsShowcaseSection
            projects={projects}
            projectsAriaLabel={sections.projectsAriaLabel}
            openCaseStudyLabel={sections.openCaseStudyLabel}
            mailSubjectPrefix={sections.mailSubjectPrefix}
            mailAriaLabelPrefix={sections.mailAriaLabelPrefix}
            githubAriaLabelPrefix={sections.githubAriaLabelPrefix}
            githubAriaLabelSuffix={sections.githubAriaLabelSuffix}
            githubLinkLabel={sections.githubLinkLabel}
            askLinkLabel={sections.askLinkLabel}
            pinnedLabel={sections.pinnedLabel}
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
