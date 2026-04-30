import type {Metadata} from "next";
import {ParticleNetwork} from "@/components/animation/particle-network";
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
          footerLegalDisclaimerLine={footer.legalDisclaimerLine}
          compactHero
        >
          <section aria-label={sections.experienceAriaLabel} className="pb-20">
            <ol className="relative ml-2 border-l border-[var(--card-border)]">
              {orderedWorkExperience.map((experience) => (
                <WorkExperienceItem
                  key={experience.id}
                  experience={experience}
                  revealDelayMs={workExperienceList.item.delayMs}
                  revealDurationMs={workExperienceList.item.durationMs}
                  revealThreshold={workExperienceList.item.threshold}
                  technologiesAriaLabel={sections.technologiesAriaLabel}
                />
              ))}
            </ol>
          </section>
        </SecondaryPageLayout>
      </div>
    </div>
  );
}

const workSeo = contentPageSeo["/work"];

export const metadata: Metadata = createContentPageMetadata({
  route: "/work",
  title: workSeo.title,
  description: workSeo.description,
});
