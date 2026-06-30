import {ViewTransition} from "react";
import {InstantRouteLink} from "@/components/behavior/scroll/instant-route-link";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {animationTimings} from "@/lib/animation/animation-timings";
import {appConfig} from "@/lib/config/app-config";
import {montserrat} from "@/lib/fonts";
import {getProjectCaseStudyHref, type ProjectsPageProject} from "@/lib/config/text/projects";
import {pageColumnClassName} from "@/lib/layout-classes";
import {PROJECT_DETAIL_SHARE, PROJECT_DETAIL_TRANSITION_TYPE} from "@/lib/view-transition";

type ProjectsShowcaseSectionProps = {
  projects: readonly ProjectsPageProject[];
  projectsAriaLabel: string;
  openCaseStudyLabel: string;
  mailSubjectPrefix: string;
  mailAriaLabelPrefix: string;
  githubAriaLabelPrefix: string;
  githubAriaLabelSuffix: string;
  githubLinkLabel: string;
  askLinkLabel: string;
  pinnedLabel: string;
};

function getProjectInfoMailHref(
  projectTitle: string,
  mailSubjectPrefix: string,
  contactEmail: string
) {
  const subject = encodeURIComponent(`${mailSubjectPrefix} - ${projectTitle}`);
  return `mailto:${contactEmail}?subject=${subject}`;
}

export function ProjectsShowcaseSection({
  projects,
  projectsAriaLabel,
  openCaseStudyLabel,
  mailSubjectPrefix,
  mailAriaLabelPrefix,
  githubAriaLabelPrefix,
  githubAriaLabelSuffix,
  githubLinkLabel,
  askLinkLabel,
  pinnedLabel,
}: ProjectsShowcaseSectionProps) {
  const {projectsShowcaseList} = animationTimings;
  const contactEmail = appConfig.contact.email;

  return (
    <section aria-label={projectsAriaLabel} className={`${pageColumnClassName} pt-5 pb-20 sm:pt-7`}>
      <ul className="space-y-7 sm:space-y-8">
        {projects.map((project, index) => {
          const githubUrl = project.githubUrl.trim();
          const revealDelay =
            projectsShowcaseList.item.delayMs + (index % 2) * projectsShowcaseList.item.stepDelayMs;
          const initialViewportDelay =
            projectsShowcaseList.item.delayMs + index * projectsShowcaseList.item.stepDelayMs;

          return (
            <li key={project.id}>
              <ScrollReveal
                variant="fade-up"
                delay={revealDelay}
                initialViewportDelay={initialViewportDelay}
                duration={projectsShowcaseList.item.durationMs}
                threshold={projectsShowcaseList.item.threshold}
              >
                <article className="project-showcase-item group relative pl-5 sm:pl-6">
                  <span
                    aria-hidden={true}
                    className="project-showcase-item-line absolute top-1 bottom-1 left-0 block w-px"
                  />
                  <header className="grid max-w-[34rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 gap-y-2 text-[0.98rem] leading-relaxed sm:text-[1.02rem]">
                    <div className="min-w-0">
                      <h2 className="min-w-0">
                        <InstantRouteLink
                          href={getProjectCaseStudyHref(project.slug)}
                          transitionTypes={[PROJECT_DETAIL_TRANSITION_TYPE]}
                          aria-label={`${openCaseStudyLabel} ${project.title}`}
                          className="rounded-sm font-semibold text-[var(--ui-fg)] transition-colors duration-300 hover:text-[#2563eb] focus-visible:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]"
                        >
                          <ViewTransition
                            name={`project-title-${project.slug}`}
                            default="none"
                            share={PROJECT_DETAIL_SHARE}
                          >
                            <span className="inline-block">{project.title}</span>
                          </ViewTransition>
                        </InstantRouteLink>
                      </h2>
                    </div>

                    <div
                      className={`${montserrat.className} flex shrink-0 items-center justify-end gap-2 text-[0.92rem] leading-relaxed font-semibold text-[var(--header-item-color)] sm:text-[0.96rem]`}
                    >
                      {project.pinned ? (
                        <>
                          <span className="rounded-sm transition-colors duration-300 group-focus-within:text-[var(--ui-fg)] group-hover:text-[var(--ui-fg)]">
                            {pinnedLabel}
                          </span>

                          <span aria-hidden={true} className="text-[var(--header-item-color)]/55">
                            ·
                          </span>
                        </>
                      ) : null}

                      {githubUrl ? (
                        <>
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${githubAriaLabelPrefix} ${project.title} ${githubAriaLabelSuffix}`}
                            className="underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
                          >
                            {githubLinkLabel}
                          </a>

                          <span aria-hidden={true} className="text-[var(--header-item-color)]/55">
                            ·
                          </span>
                        </>
                      ) : null}

                      <a
                        href={getProjectInfoMailHref(
                          project.title,
                          mailSubjectPrefix,
                          contactEmail
                        )}
                        aria-label={`${mailAriaLabelPrefix} ${project.title}`}
                        className="underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
                      >
                        {askLinkLabel}
                      </a>

                      <span aria-hidden={true} className="text-[var(--header-item-color)]/55">
                        ·
                      </span>

                      <p>{project.developmentPeriod}</p>
                    </div>
                  </header>

                  <p className="mt-2 max-w-[31rem] text-[0.9rem] leading-relaxed text-[var(--header-item-color)] sm:text-[0.94rem]">
                    <ViewTransition
                      name={`project-description-${project.slug}`}
                      default="none"
                      share={PROJECT_DETAIL_SHARE}
                    >
                      <span className="inline-block">{project.keyPhrase}</span>
                    </ViewTransition>
                  </p>
                </article>
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
