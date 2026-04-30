import type {ReactNode} from "react";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {SecondaryPageHero} from "@/components/secondary-page/secondary-page-hero";

type SecondaryPageLayoutProps = {
  hero: {
    sectionId: string;
    eyebrow: string;
    eyebrowClassName?: string;
    eyebrowUppercase?: boolean;
    title: string;
    subtitle?: string;
  };
  routeRevealDurationMs: number;
  routeRevealThreshold: number;
  footerLegalDisclaimerLine?: string;
  compactHero?: boolean;
  children?: ReactNode;
};

export function SecondaryPageLayout({
  hero,
  routeRevealDurationMs,
  routeRevealThreshold,
  footerLegalDisclaimerLine,
  compactHero = false,
  children,
}: SecondaryPageLayoutProps) {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto flex min-h-[calc(100svh-var(--app-header-height,6rem))] min-h-[calc(100vh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <div className="mx-auto w-full max-w-[60rem] px-6">
          <SecondaryPageHero
            sectionId={hero.sectionId}
            eyebrow={hero.eyebrow}
            eyebrowClassName={hero.eyebrowClassName}
            eyebrowUppercase={hero.eyebrowUppercase}
            title={hero.title}
            subtitle={hero.subtitle}
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
