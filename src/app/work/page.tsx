import type {Metadata} from "next";
import {ParticleNetwork} from "@/components/animation/particle-network";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {WorkExperienceCard} from "@/components/work/work-experience-section";
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
          hero={{
            ...hero,
            className: "mx-auto w-full max-w-[36rem] pr-3 sm:pr-5",
            titleClassName:
              "text-[0.5rem] leading-tight font-bold tracking-[0.14em] text-[var(--ui-fg)]/95",
            subtitleClassName:
              "max-w-full text-[0.9rem] leading-relaxed font-normal tracking-normal text-[var(--header-item-color)] sm:text-[0.94rem]",
          }}
          routeRevealDurationMs={routeReveal.durationMs}
          routeRevealThreshold={routeReveal.threshold}
          footerLegalDisclaimerLine={footer.legalDisclaimerLine}
          compactHero
        >
          <section
            aria-label={sections.experienceAriaLabel}
            className="mx-auto w-full max-w-[36rem] pt-5 pr-3 pb-20 sm:pt-7 sm:pr-5"
          >
            <ol className="space-y-16 sm:space-y-20">
              {orderedWorkExperience.map((experience) => (
                <WorkExperienceCard
                  key={experience.id}
                  experience={experience}
                  revealDelayMs={workExperienceList.item.delayMs}
                  revealDurationMs={workExperienceList.item.durationMs}
                  revealThreshold={workExperienceList.item.threshold}
                  tagsAriaLabel={sections.tagsAriaLabel}
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
