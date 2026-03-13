import type {Metadata} from "next";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {WorkExperienceItem} from "@/components/work/work-experience-section";
import {animationTimings} from "@/lib/animation/animation-timings";
import {getOrderedWorkExperiences} from "@/lib/config/helpers/experience-order";
import {contentPageSeo} from "@/lib/config/site-routes";
import {workText} from "@/lib/config/text/work";
import {createContentPageMetadata} from "@/lib/metadata";

export default function WorkPage() {
  const orderedWorkExperience = getOrderedWorkExperiences(workText.experiences);

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

const workSeo = contentPageSeo["/work"];

export const metadata: Metadata = createContentPageMetadata({
  route: "/work",
  title: workSeo.title,
  description: workSeo.description,
});
