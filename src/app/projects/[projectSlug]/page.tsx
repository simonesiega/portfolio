import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ViewTransition} from "react";
import {FiArrowUpRight} from "react-icons/fi";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {ProjectImageGallery} from "@/components/projects/project-image-gallery";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {animationTimings} from "@/lib/animation/animation-timings";
import {mediaConfig} from "@/lib/config/media";
import {
  getProjectBySlug,
  getProjectCaseStudyDiagramThemeClass,
  getProjectCaseStudySeo,
  projectsText,
} from "@/lib/config/text/projects";
import {geistSans} from "@/lib/fonts";
import {createContentPageMetadata} from "@/lib/metadata";
import {PROJECT_DETAIL_SHARE} from "@/lib/view-transition";

type ProjectCaseStudyPageProps = {
  params: Promise<{
    projectSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsText.projects.map((project) => ({projectSlug: project.slug}));
}

export async function generateMetadata({params}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const {projectSlug} = await params;
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    return createContentPageMetadata({
      route: "/projects",
      title: projectsText.seo.caseStudyFallbackTitle,
      description: projectsText.seo.caseStudyFallbackDescription,
    });
  }

  const seo = getProjectCaseStudySeo(project.slug);

  return createContentPageMetadata({
    route: `/projects/${project.slug}`,
    title: seo.title,
    description: seo.description,
  });
}

export default async function ProjectCaseStudyPage({params}: ProjectCaseStudyPageProps) {
  const {projectSlug} = await params;
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    notFound();
  }

  const {routeReveal} = animationTimings;
  const {projectCaseStudy} = animationTimings;
  const {caseStudyGallery} = mediaConfig.projects;
  const CaseStudyContent = project.caseStudy.Content;
  const diagramThemeClass = getProjectCaseStudyDiagramThemeClass(project.slug);
  const diagramImageClassName = ["project-diagram-image", "h-full", "w-full", "object-contain"];
  const githubUrl = project.githubUrl.trim();
  const getContentRevealDelayMs = (index: number) =>
    projectCaseStudy.content.delayMs + index * projectCaseStudy.content.stepDelayMs;
  const getContentInitialViewportDelayMs = (index: number) =>
    projectCaseStudy.content.initialViewportDelayMs + index * projectCaseStudy.content.stepDelayMs;

  if (diagramThemeClass) {
    diagramImageClassName.push(diagramThemeClass);
  }

  return (
    <SecondaryPageLayout
      hero={{
        sectionId: `${project.slug}-case-study-heading`,
        metaLabel: `${project.caseStudy.readTimeMinutes} ${projectsText.caseStudyPage.minReadSuffix}`,
        metaLabelClassName: "opacity-80",
        metaLabelUppercase: false,
        metaLabelDelayMs: projectCaseStudy.metaLabel.delayMs,
        title: (
          <ViewTransition
            name={`project-title-${project.slug}`}
            default="none"
            share={PROJECT_DETAIL_SHARE}
          >
            <span className="inline-block">{project.title}</span>
          </ViewTransition>
        ),
        titleClassName: "text-2xl sm:text-[2.25rem]",
        subtitle: (
          <ViewTransition
            name={`project-description-${project.slug}`}
            default="none"
            share={PROJECT_DETAIL_SHARE}
          >
            <span className="inline-block">{project.keyPhrase}</span>
          </ViewTransition>
        ),
        subtitleClassName:
          "max-w-[31rem] text-[0.98rem] text-[var(--ui-fg-muted)] sm:text-[1.08rem]",
        className: "-mt-3 mx-auto w-full max-w-[44rem] sm:-mt-4",
      }}
      routeRevealDurationMs={routeReveal.durationMs}
      routeRevealThreshold={routeReveal.threshold}
      compactHero
      animateHero={false}
      animateHeroMetaLabel
    >
      <article className="mx-auto w-full max-w-[44rem] space-y-8 pt-4 pb-24 sm:space-y-10 sm:pt-5">
        <ScrollReveal
          variant="fade-up"
          delay={getContentRevealDelayMs(0)}
          initialViewportDelay={getContentInitialViewportDelayMs(0)}
          duration={projectCaseStudy.content.durationMs}
          threshold={projectCaseStudy.content.threshold}
        >
          <section
            aria-label={projectsText.caseStudyPage.projectSummaryAriaLabel}
            className="space-y-3"
          >
            <ul className={`${geistSans.className} space-y-1.5 text-[0.84rem] sm:text-[0.92rem]`}>
              {project.caseStudy.quickFacts.map((fact) => (
                <li
                  key={fact.label}
                  className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] items-start gap-x-3"
                >
                  <span className="text-[color-mix(in_srgb,var(--ui-fg-muted)_48%,transparent)]">
                    {fact.label}
                  </span>
                  <span className="text-[color-mix(in_srgb,var(--ui-fg-muted)_68%,transparent)]">
                    {fact.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 pt-0.5">
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${geistSans.className} group inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-[var(--ui-fg)] transition-colors duration-300 hover:text-[var(--header-item-hover-color)]`}
                >
                  {projectsText.caseStudyPage.githubLabel}
                  <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
              {project.demoUrls?.map((demo) => (
                <a
                  key={demo.href}
                  href={demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${geistSans.className} group inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-[var(--ui-fg)] transition-colors duration-300 hover:text-[var(--header-item-hover-color)]`}
                >
                  {demo.label}
                  <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {project.caseStudy.gallery?.length ? (
          <ScrollReveal
            variant="fade-up"
            delay={getContentRevealDelayMs(1)}
            initialViewportDelay={getContentInitialViewportDelayMs(1)}
            duration={projectCaseStudy.content.durationMs}
            threshold={projectCaseStudy.content.threshold}
          >
            <ProjectImageGallery
              images={project.caseStudy.gallery}
              imageClassName={diagramImageClassName.join(" ")}
              width={caseStudyGallery.width}
              height={caseStudyGallery.height}
            />
          </ScrollReveal>
        ) : null}

        <div className="project-case-study-mdx space-y-8 sm:space-y-10 [&_h2+p]:mt-2">
          <CaseStudyContent />
        </div>
      </article>
    </SecondaryPageLayout>
  );
}
