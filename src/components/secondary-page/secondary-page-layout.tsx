import type {ReactNode} from "react";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {SecondaryPageHero} from "@/components/secondary-page/secondary-page-hero";

type SecondaryPageLayoutProps = {
  hero: {
    sectionId: string;
    metaLabel?: string;
    metaLabelClassName?: string;
    metaLabelUppercase?: boolean;
    metaLabelDelayMs?: number;
    title: string;
    titleClassName?: string;
    titleDelayMs?: number;
    subtitle?: string;
    subtitleClassName?: string;
    subtitleDelayMs?: number;
    className?: string;
  };
  routeRevealDurationMs: number;
  routeRevealThreshold: number;
  footerLegalDisclaimerLine?: string;
  compactHero?: boolean;
  beforeHero?: ReactNode;
  children?: ReactNode;
};

export function SecondaryPageLayout({
  hero,
  routeRevealDurationMs,
  routeRevealThreshold,
  footerLegalDisclaimerLine,
  compactHero = false,
  beforeHero,
  children,
}: SecondaryPageLayoutProps) {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto flex min-h-[calc(100svh-var(--app-header-height,6rem))] min-h-[calc(100vh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <div className="mx-auto w-full max-w-[60rem] px-6">
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
