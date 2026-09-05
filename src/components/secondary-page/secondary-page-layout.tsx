import type {ReactNode} from "react";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {
  SecondaryPageHero,
  type SecondaryPageHeroProps,
} from "@/components/secondary-page/secondary-page-hero";
import {animationTimings} from "@/lib/animation/animation-timings";
import {pageContentClassName, pageFrameClassName} from "@/lib/layout-classes";

type SecondaryPageLayoutProps = {
  hero: Omit<SecondaryPageHeroProps, "animate" | "animateMetaLabel">;
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
            {...hero}
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
