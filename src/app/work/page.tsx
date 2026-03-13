import type {Metadata} from "next";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {WorkExperienceItem} from "@/components/work/work-experience-section";
import {animationTimings} from "@/lib/animation/animation-timings";
import {workText} from "@/lib/config/text/work";
import {sharedOpenGraph, sharedTwitter} from "@/lib/metadata";

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
  const orderedWorkExperience = [...workText.experiences].sort((left, right) => {
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
  });

  const {hero, sections, footer} = workText;
  const {routeReveal, workExperienceList} = animationTimings;

  return (
    <SecondaryPageLayout
      hero={hero}
      routeRevealDurationMs={routeReveal.durationMs}
      routeRevealThreshold={routeReveal.threshold}
      footerLegalDisclaimerLine={footer.legalDisclaimerLine}
    >
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
    </SecondaryPageLayout>
  );
}

export const metadata: Metadata = {
  title: "Work",
  description: workText.hero.subtitle,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    ...sharedOpenGraph,
    url: "/work",
    title: "Work | Simone Siega",
    description: workText.hero.subtitle,
  },
  twitter: {
    ...sharedTwitter,
    title: "Work | Simone Siega",
    description: workText.hero.subtitle,
  },
};
