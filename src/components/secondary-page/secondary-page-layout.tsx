import type {ReactNode} from "react";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {SecondaryPageHero} from "@/components/secondary-page/secondary-page-hero";
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
    titleDelayMs?: number;
    subtitle?: ReactNode;
    subtitleClassName?: string;
    subtitleDelayMs?: number;
    className?: string;
  };
  routeRevealDurationMs: number;
  routeRevealThreshold: number;
  footerLegalDisclaimerLine?: string;
  compactHero?: boolean;
  animateHero?: boolean;
  animateHeroMetaLabel?: boolean;
  beforeHero?: ReactNode;
  children?: ReactNode;
};

export function SecondaryPageLayout({
  hero,
  routeRevealDurationMs,
  routeRevealThreshold,
  footerLegalDisclaimerLine,
  compactHero = false,
  animateHero = true,
  animateHeroMetaLabel = animateHero,
  beforeHero,
  children,
}: SecondaryPageLayoutProps) {
  return (
    <div className="overflow-x-clip">
      <div className={pageFrameClassName}>
        <div className={pageContentClassName}>
          {beforeHero}
          <SecondaryPageHero
            sectionId={hero.sectionId}
            metaLabel={hero.metaLabel}
            metaLabelClassName={hero.metaLabelClassName}
            metaLabelUppercase={hero.metaLabelUppercase}
            metaLabelDelayMs={hero.metaLabelDelayMs}
            title={hero.title}
            titleClassName={hero.titleClassName}
            titleDelayMs={hero.titleDelayMs}
            subtitle={hero.subtitle}
            subtitleClassName={hero.subtitleClassName}
            subtitleDelayMs={hero.subtitleDelayMs}
            className={hero.className}
            compact={compactHero}
            animate={animateHero}
            animateMetaLabel={animateHeroMetaLabel}
          />
          {children}
        </div>

        <RouteReveal
          variant="fade-in"
          duration={routeRevealDurationMs}
          threshold={routeRevealThreshold}
          className="mt-auto"
        >
          <SecondaryFooter legalDisclaimerLine={footerLegalDisclaimerLine} />
        </RouteReveal>
      </div>
    </div>
  );
}
