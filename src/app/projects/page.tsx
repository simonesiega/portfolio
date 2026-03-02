import { RouteReveal } from "@/components/animation/route-reveal";
import { SecondaryPageHero } from "@/components/layout/secondary-page-hero";
import { SecondaryFooter } from "@/components/layout/secondary-footer";
import { animationTimings } from "@/lib/animation/animation-timings";
import { projectsText } from "@/lib/config/text/projects";

export default function ProjectsPage() {
  const { hero } = projectsText;
  const { routeReveal } = animationTimings;

  return (
    <div className="overflow-x-clip bg-[var(--ui-bg)]">
      <div className="mx-auto flex min-h-[calc(100vh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <main className="mx-auto max-w-5xl px-6">
          <SecondaryPageHero
            sectionId={hero.sectionId}
            eyebrow={hero.eyebrow}
            title={hero.title}
            subtitle={hero.subtitle}
          />
        </main>

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
