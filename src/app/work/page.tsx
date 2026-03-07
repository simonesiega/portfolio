import { RouteReveal } from "@/components/animation/route-reveal";
import { SecondaryPageHero } from "@/components/layout/secondary-page-hero";
import { SecondaryFooter } from "@/components/layout/secondary-footer";
import { WorkExperienceItem } from "@/components/work/work-experience-section";
import { animationTimings } from "@/lib/animation/animation-timings";
import { workText } from "@/lib/config/text/work";

function toMonthIndex(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return null;
  }

  return year * 12 + (month - 1);
}

export default function WorkPage() {
  const orderedWorkExperience = [...workText.experiences].sort(
    (left, right) => {
      const leftMonthIndex = toMonthIndex(left.sortStart);
      const rightMonthIndex = toMonthIndex(right.sortStart);

      if (leftMonthIndex === null && rightMonthIndex === null) {
        return left.id.localeCompare(right.id);
      }

      if (leftMonthIndex === null) {
        return 1;
      }

      if (rightMonthIndex === null) {
        return -1;
      }

      return rightMonthIndex - leftMonthIndex;
    }
  );

  const { hero, sections, footer } = workText;
  const { routeReveal, workExperienceList } = animationTimings;

  return (
    <div className="overflow-x-clip bg-[var(--ui-bg)]">
      <div className="mx-auto flex min-h-[calc(100vh-var(--app-header-height,6rem))] min-h-[calc(100svh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <div className="mx-auto max-w-5xl px-6">
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
        </div>

        <RouteReveal
          variant="fade-in"
          duration={routeReveal.durationMs}
          threshold={routeReveal.threshold}
          className="mt-auto"
        >
          <SecondaryFooter legalDisclaimerLine={footer.legalDisclaimerLine} />
        </RouteReveal>
      </div>
    </div>
  );
}
