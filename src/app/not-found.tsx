import Link from "next/link";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {animationTimings} from "@/lib/animation/animation-timings";
import {systemText} from "@/lib/config/text/system";
import {montserrat} from "@/lib/fonts";
import {pageColumnClassName, pageContentClassName, pageFrameClassName} from "@/lib/layout-classes";

export default function NotFoundPage() {
  const {routeReveal, projectsShowcaseList} = animationTimings;
  const {notFoundPage} = systemText;
  const {actions} = notFoundPage.body;

  return (
    <div className="relative overflow-x-clip">
      <div className={`relative z-10 ${pageFrameClassName}`}>
        <RouteReveal
          variant="fade-up"
          delay={projectsShowcaseList.item.delayMs}
          duration={projectsShowcaseList.item.durationMs}
          threshold={projectsShowcaseList.item.threshold}
          className="my-auto w-full"
        >
          <section aria-labelledby={notFoundPage.hero.sectionId} className={pageContentClassName}>
            <div className={`${pageColumnClassName} space-y-5 sm:space-y-6`}>
              <p
                className={`${montserrat.className} text-xs font-semibold tracking-[0.18em] text-[var(--header-item-color)]`}
              >
                {notFoundPage.hero.eyebrow}
              </p>

              <h1
                id={notFoundPage.hero.sectionId}
                className={`${montserrat.className} text-[clamp(1.9rem,8vw,3rem)] leading-tight font-bold tracking-[-0.03em] text-[var(--ui-fg)] sm:text-[3.25rem]`}
              >
                {notFoundPage.hero.title}
              </h1>

              <p
                className={`${montserrat.className} max-w-[31rem] text-[0.94rem] leading-relaxed text-[var(--header-item-color)] sm:text-[1rem]`}
              >
                {notFoundPage.hero.subtitle}
              </p>

              <nav
                aria-label={notFoundPage.body.navigationAriaLabel}
                className={`${montserrat.className} flex items-center gap-2 pt-2 text-[0.92rem] leading-relaxed font-semibold text-[var(--header-item-color)] sm:text-[0.96rem]`}
              >
                <Link
                  href={actions.backHomeHref}
                  scroll={false}
                  className="underline-offset-[3px] transition-colors duration-300 hover:text-[var(--header-item-hover-color)] hover:underline focus-visible:text-[var(--header-item-hover-color)] focus-visible:underline focus-visible:outline-none"
                >
                  {actions.backHomeLabel}
                </Link>

                <span aria-hidden={true} className="text-[var(--header-item-color)]/55">
                  ·
                </span>

                <Link
                  href={actions.openProjectsHref}
                  scroll={false}
                  className="underline-offset-[3px] transition-colors duration-300 hover:text-[var(--header-item-hover-color)] hover:underline focus-visible:text-[var(--header-item-hover-color)] focus-visible:underline focus-visible:outline-none"
                >
                  {actions.openProjectsLabel}
                </Link>

                <span aria-hidden={true} className="text-[var(--header-item-color)]/55">
                  ·
                </span>

                <Link
                  href={actions.openWorkHref}
                  scroll={false}
                  className="underline-offset-[3px] transition-colors duration-300 hover:text-[var(--header-item-hover-color)] hover:underline focus-visible:text-[var(--header-item-hover-color)] focus-visible:underline focus-visible:outline-none"
                >
                  {actions.openWorkLabel}
                </Link>
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
