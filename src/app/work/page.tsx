import type {Metadata} from "next";
import {ParticleNetwork} from "@/components/animation/particle-network";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {WorkExperienceCard} from "@/components/work/work-experience-section";
import {animationTimings} from "@/lib/animation/animation-timings";
import {contentPageSeo} from "@/lib/config/site-routes";
import {workText} from "@/lib/config/text/work";
import {pageColumnClassName, secondaryListingHero} from "@/lib/layout-classes";
import {createContentPageMetadata} from "@/lib/metadata";

export default function WorkPage() {
  const {hero, sections, footer, experiences} = workText;
  const {secondaryPageItem} = animationTimings;

  return (
    <div className="relative overflow-x-clip">
      <ParticleNetwork />

      <div className="relative z-10">
        <SecondaryPageLayout
          hero={{...hero, ...secondaryListingHero}}
          footerLegalDisclaimerLine={footer.legalDisclaimerLine}
        >
          <section
            aria-label={sections.experienceAriaLabel}
            className={`${pageColumnClassName} pt-5 pb-20 sm:pt-7`}
          >
            <ol className="space-y-10 sm:space-y-12">
              {experiences.map((experience, index) => (
                <WorkExperienceCard
                  key={experience.id}
                  experience={experience}
                  revealDelayMs={
                    secondaryPageItem.delayMs + (index % 2) * secondaryPageItem.stepDelayMs
                  }
                  revealInitialViewportDelayMs={
                    secondaryPageItem.delayMs + index * secondaryPageItem.stepDelayMs
                  }
                  revealDurationMs={secondaryPageItem.durationMs}
                  revealThreshold={secondaryPageItem.threshold}
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
