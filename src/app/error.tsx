"use client";

import Link from "next/link";
import {FiArrowUpRight, FiGithub, FiLinkedin, FiMail} from "react-icons/fi";
import {ParticleNetwork} from "@/components/animation/particle-network";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryFooter} from "@/components/secondary-page/secondary-footer";
import {animationTimings} from "@/lib/animation/animation-timings";
import {appConfig} from "@/lib/config/app-config";
import {systemText} from "@/lib/config/text/system";
import {montserrat} from "@/lib/fonts";

type ErrorPageProps = {
  error: Error & {digest?: string};
  reset: () => void;
};

export default function ErrorPage({error, reset}: ErrorPageProps) {
  const {routeReveal, projectsShowcaseList} = animationTimings;
  const {errorPage} = systemText;
  const {social, contact} = appConfig;
  const referenceValue = error.digest ?? errorPage.body.diagnosticsFallbackValue;

  return (
    <div className="relative overflow-x-clip">
      <ParticleNetwork
        className="pointer-events-none absolute inset-0 hidden opacity-20 xl:block"
        motionScale={0}
        disablePointer
        staticMode
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--app-header-height,6rem))] min-h-[calc(100vh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <RouteReveal
          variant="fade-up"
          delay={projectsShowcaseList.item.delayMs}
          duration={projectsShowcaseList.item.durationMs}
          threshold={projectsShowcaseList.item.threshold}
          className="my-auto w-full"
        >
          <section
            aria-labelledby={errorPage.hero.sectionId}
            className="mx-auto w-full max-w-[60rem] px-6"
          >
            <div className="max-w-2xl space-y-6 sm:space-y-7">
              <p
                className={`${montserrat.className} text-xs font-semibold tracking-[0.18em] text-[var(--header-item-color)] uppercase`}
              >
                {errorPage.hero.eyebrow}
              </p>

              <h1
                id={errorPage.hero.sectionId}
                className={`${montserrat.className} text-4xl font-extrabold tracking-tight sm:text-6xl`}
              >
                {errorPage.hero.title}
              </h1>

              <p
                className={`${montserrat.className} max-w-3xl text-xl font-semibold tracking-tight text-[var(--ui-fg-muted)] sm:text-2xl`}
              >
                {errorPage.hero.subtitle}
              </p>

              <p className="max-w-3xl text-base leading-relaxed text-[var(--ui-fg-muted)] sm:text-lg">
                {errorPage.body.description}
              </p>

              <p className="text-sm text-[var(--header-item-color)] sm:text-base">
                <span className={`${montserrat.className} font-semibold tracking-[0.04em]`}>
                  {errorPage.body.diagnosticsLabel}:
                </span>{" "}
                <code className="font-mono text-[var(--ui-fg-muted)]">{referenceValue}</code>
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 sm:gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className={`${montserrat.className} group inline-flex items-center justify-center gap-1.5 rounded-md border border-[var(--card-border)] bg-transparent px-4.5 py-2 text-sm font-semibold tracking-[0.08em] text-[var(--ui-fg)] transition-all duration-300 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-bg)] hover:text-[var(--header-item-hover-color)] focus-visible:border-[var(--card-hover-border)] focus-visible:bg-[var(--card-bg)] focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]`}
                >
                  <span className="relative inline-block after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                    {errorPage.body.actions.retryLabel}
                  </span>
                  <FiArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
                </button>

                <Link
                  href={errorPage.body.actions.backHomeHref}
                  scroll={false}
                  className={`${montserrat.className} group inline-flex items-center justify-center gap-1.5 rounded-md border border-[var(--card-border)] bg-transparent px-4.5 py-2 text-sm font-semibold tracking-[0.08em] text-[var(--ui-fg)] transition-all duration-300 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-bg)] hover:text-[var(--header-item-hover-color)] focus-visible:border-[var(--card-hover-border)] focus-visible:bg-[var(--card-bg)] focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]`}
                >
                  <span className="relative inline-block after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                    {errorPage.body.actions.backHomeLabel}
                  </span>
                  <FiArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
                </Link>

                <Link
                  href={errorPage.body.actions.openProjectsHref}
                  scroll={false}
                  className={`${montserrat.className} group inline-flex items-center justify-center gap-1.5 rounded-md border border-[var(--card-border)] bg-transparent px-4.5 py-2 text-sm font-semibold tracking-[0.08em] text-[var(--ui-fg)] transition-all duration-300 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-bg)] hover:text-[var(--header-item-hover-color)] focus-visible:border-[var(--card-hover-border)] focus-visible:bg-[var(--card-bg)] focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]`}
                >
                  <span className="relative inline-block after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                    {errorPage.body.actions.openProjectsLabel}
                  </span>
                  <FiArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
                </Link>

                <Link
                  href={errorPage.body.actions.openWorkHref}
                  scroll={false}
                  className={`${montserrat.className} group inline-flex items-center justify-center gap-1.5 rounded-md border border-[var(--card-border)] bg-transparent px-4.5 py-2 text-sm font-semibold tracking-[0.08em] text-[var(--ui-fg)] transition-all duration-300 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-bg)] hover:text-[var(--header-item-hover-color)] focus-visible:border-[var(--card-hover-border)] focus-visible:bg-[var(--card-bg)] focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]`}
                >
                  <span className="relative inline-block after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                    {errorPage.body.actions.openWorkLabel}
                  </span>
                  <FiArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
                </Link>
              </div>

              <div className="flex items-center gap-2 pt-3 sm:pt-4">
                <a
                  href={social.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.labels.github}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--header-item-color)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
                >
                  <FiGithub className="h-3.5 w-3.5" />
                </a>

                <a
                  href={social.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.labels.linkedin}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--header-item-color)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
                >
                  <FiLinkedin className="h-3.5 w-3.5" />
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  aria-label={`Email ${contact.email}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--header-item-color)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
                >
                  <FiMail className="h-3.5 w-3.5" />
                </a>
              </div>
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
