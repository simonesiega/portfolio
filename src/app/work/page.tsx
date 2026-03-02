import { RouteReveal } from "@/components/animation/route-reveal";
import { SecondaryPageHero } from "@/components/layout/secondary-page-hero";
import { SecondaryFooter } from "@/components/layout/secondary-footer";
import { WorkExperienceItem } from "@/components/work/work-experience-section";
import { animationTimings } from "@/lib/animation/animation-timings";
import { workText } from "@/lib/config/text/work";

function toMonthIndex(value: string) {
  const [year, month] = value.split("-").map(Number);

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return Number.NEGATIVE_INFINITY;
  }

  return year * 12 + (month - 1);
}

export default function WorkPage() {
  const orderedWorkExperience = [...workText.experiences].sort(
    (left, right) => toMonthIndex(right.sortStart) - toMonthIndex(left.sortStart)
  );

  const { hero, sections } = workText;
  const { routeReveal, workExperienceList } = animationTimings;

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

          <section aria-label={sections.experienceAriaLabel} className="pb-24 sm:pb-24">
            <ol className="relative ml-2 border-l border-[var(--card-border)]">
              {orderedWorkExperience.map((experience, index) => (
                <WorkExperienceItem
                  key={experience.id}
                  experience={experience}
                  showDivider={index > 0}
                  revealDelayMs={workExperienceList.item.delayMs}
                  revealDurationMs={workExperienceList.item.durationMs}
                  revealThreshold={workExperienceList.item.threshold}
                  technologiesAriaLabel={sections.technologiesAriaLabel}
                />
              ))}
            </ol>
          </section>
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
