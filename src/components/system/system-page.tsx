import Link from "next/link";
import {Fragment, type ReactNode} from "react";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {animationTimings} from "@/lib/animation/animation-timings";
import {montserrat} from "@/lib/fonts";
import {pageColumnClassName, pageContentClassName, pageFrameClassName} from "@/lib/layout-classes";

type SystemPageContent = {
  hero: {
    sectionId: string;
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  body: {
    navigationAriaLabel: string;
    actions: {
      backHomeLabel: string;
      backHomeHref: string;
      openProjectsLabel: string;
      openProjectsHref: string;
      openWorkLabel: string;
      openWorkHref: string;
    };
  };
};

type SystemPageProps = {
  content: SystemPageContent;
  leadingAction?: ReactNode;
};

export const systemPageActionClassName =
  "underline-offset-[3px] transition-colors duration-300 hover:text-[var(--header-item-hover-color)] hover:underline focus-visible:text-[var(--header-item-hover-color)] focus-visible:underline focus-visible:outline-none";

export function SystemPage({content, leadingAction}: SystemPageProps) {
  const {routeReveal, secondaryPageItem} = animationTimings;
  const {hero, body} = content;
  const {actions} = body;
  const hasLeadingAction = leadingAction !== undefined && leadingAction !== null;
  const links = [
    {label: actions.backHomeLabel, href: actions.backHomeHref},
    {label: actions.openProjectsLabel, href: actions.openProjectsHref},
    {label: actions.openWorkLabel, href: actions.openWorkHref},
  ];

  return (
    <div className="relative overflow-x-clip">
      <div className={`relative z-10 ${pageFrameClassName}`}>
        <RouteReveal
          variant="fade-up"
          delay={secondaryPageItem.delayMs}
          duration={secondaryPageItem.durationMs}
          threshold={secondaryPageItem.threshold}
          className="my-auto w-full"
        >
          <section aria-labelledby={hero.sectionId} className={pageContentClassName}>
            <div className={`${pageColumnClassName} space-y-5 sm:space-y-6`}>
              <p
                className={`${montserrat.className} text-xs font-semibold tracking-[0.18em] text-[var(--header-item-color)]`}
              >
                {hero.eyebrow}
              </p>

              <h1
                id={hero.sectionId}
                className={`${montserrat.className} text-[clamp(1.9rem,8vw,3rem)] leading-tight font-bold tracking-[-0.03em] text-[var(--ui-fg)] sm:text-[3.25rem]`}
              >
                {hero.title}
              </h1>

              <p
                className={`${montserrat.className} max-w-[31rem] text-[0.94rem] leading-relaxed text-[var(--header-item-color)] sm:text-[1rem]`}
              >
                {hero.subtitle}
              </p>

              <nav
                aria-label={body.navigationAriaLabel}
                className={`${montserrat.className} flex items-center gap-2 pt-2 text-[0.92rem] leading-relaxed font-semibold text-[var(--header-item-color)] sm:text-[0.96rem]`}
              >
                {leadingAction}
                {links.map((link, index) => (
                  <Fragment key={link.href}>
                    {hasLeadingAction || index > 0 ? (
                      <span aria-hidden={true} className="text-[var(--header-item-color)]/55">
                        ·
                      </span>
                    ) : null}
                    <Link href={link.href} scroll={false} className={systemPageActionClassName}>
                      {link.label}
                    </Link>
                  </Fragment>
                ))}
              </nav>
            </div>
          </section>
        </RouteReveal>

        <RouteReveal
          variant="fade-in"
          duration={routeReveal.durationMs}
          threshold={routeReveal.threshold}
          className="mt-auto"
        >
          <SecondaryFooter />
        </RouteReveal>
      </div>
    </div>
  );
}
