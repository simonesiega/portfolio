import type {ReactNode} from "react";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {SecondaryPageHero} from "@/components/secondary-page/secondary-page-hero";
import {animationTimings} from "@/lib/animation/animation-timings";
import {pageContentClassName, pageFrameClassName} from "@/lib/layout-classes";

type SecondaryPageLayoutProps = {
  hero: {
    sectionId: string;
    metaLabel?: string;
    metaLabelClassName?: string;
    metaLabelUppercase?: boolean;
    metaLabelDelayMs?: number;
    title: ReactNode;
    titleClassName?: string;
    subtitle?: ReactNode;
    subtitleClassName?: string;
    className?: string;
  };
  footerLegalDisclaimerLine?: string;
  animateHero?: boolean;
  animateHeroMetaLabel?: boolean;
  children?: ReactNode;
};

export function SecondaryPageLayout({
  hero,
  footerLegalDisclaimerLine,
  animateHero = true,
  animateHeroMetaLabel = animateHero,
  children,
}: SecondaryPageLayoutProps) {
  const {routeReveal} = animationTimings;

  return (
    <div className="overflow-x-clip">
      <div className={pageFrameClassName}>
        <div className={pageContentClassName}>
          <SecondaryPageHero
            sectionId={hero.sectionId}
            metaLabel={hero.metaLabel}
            metaLabelClassName={hero.metaLabelClassName}
            metaLabelUppercase={hero.metaLabelUppercase}
            metaLabelDelayMs={hero.metaLabelDelayMs}
            title={hero.title}
            titleClassName={hero.titleClassName}
            subtitle={hero.subtitle}
            subtitleClassName={hero.subtitleClassName}
            className={hero.className}
            animate={animateHero}
            animateMetaLabel={animateHeroMetaLabel}
          />
          {children}
        </div>

        <RouteReveal
          variant="fade-in"
          duration={routeReveal.durationMs}
          threshold={routeReveal.threshold}
          className="mt-auto"
        >
          <SecondaryFooter legalDisclaimerLine={footerLegalDisclaimerLine} />
        </RouteReveal>
      </div>
    </div>
  );
}
