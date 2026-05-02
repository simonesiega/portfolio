import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {FiArrowLeft, FiArrowUpRight} from "react-icons/fi";
import {RouteReveal} from "@/components/animation/route-reveal";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {animationTimings} from "@/lib/animation/animation-timings";
import {
  getProjectBySlug,
  getProjectCaseStudyDiagramSrc,
  getProjectCaseStudyDiagramThemeClass,
  getProjectCaseStudySeo,
  isProjectCaseStudyContentSection,
  isProjectCaseStudyLinksSection,
  projectsText,
} from "@/lib/config/text/projects";
import {montserrat} from "@/lib/fonts";
import {createContentPageMetadata} from "@/lib/metadata";

type ProjectCaseStudyPageProps = {
  params: Promise<{
    projectSlug: string;
  }>;
};

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
  const caseStudySections = project.caseStudy.sections;
  const linksSection = caseStudySections.find(isProjectCaseStudyLinksSection);
  const contentSections = caseStudySections.filter(isProjectCaseStudyContentSection);
  const diagramThemeClass = getProjectCaseStudyDiagramThemeClass(project.slug);
  const diagramImageClassName = ["project-diagram-image", "h-auto", "w-full", "rounded-xl"];

  if (diagramThemeClass) {
    diagramImageClassName.push(diagramThemeClass);
  }

  return (
    <SecondaryPageLayout
      beforeHero={
        <RouteReveal
          variant="fade-up"
          delay={60}
          duration={animationTimings.projectsShowcaseList.item.durationMs}
          threshold={0}
        >
          <Link
            href="/projects"
            scroll={false}
            className={`${montserrat.className} group inline-flex items-center gap-1.5 pt-3 text-sm font-semibold tracking-[0.04em] text-[var(--header-item-color)] transition-all duration-300 hover:text-[var(--ui-fg)] sm:pt-4`}
          >
            <FiArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {projectsText.caseStudyPage.backToProjectsLabel}
          </Link>
        </RouteReveal>
      }
      hero={{
        sectionId: `${project.slug}-case-study-heading`,
        eyebrow: `${projectsText.caseStudyPage.eyebrow} · ${project.caseStudy.readTimeMinutes} ${projectsText.caseStudyPage.minReadSuffix.toUpperCase()}`,
        eyebrowClassName: "opacity-80",
        eyebrowUppercase: false,
        eyebrowDelayMs: 160,
        title: project.title,
        titleClassName: "text-2xl sm:text-[2.25rem]",
        titleDelayMs: 260,
        subtitle: project.caseStudy.summary,
        subtitleClassName: "text-[0.98rem] text-[var(--ui-fg-muted)] sm:text-[1.08rem]",
        subtitleDelayMs: 360,
      }}
      routeRevealDurationMs={routeReveal.durationMs}
      routeRevealThreshold={routeReveal.threshold}
      compactHero
    >
      <RouteReveal
        variant="fade-up"
        delay={
          animationTimings.projectsShowcaseList.item.delayMs +
          animationTimings.projectsShowcaseList.item.stepDelayMs
        }
        duration={animationTimings.projectsShowcaseList.item.durationMs}
        threshold={0}
        className="pb-24"
      >
        <article className="space-y-8 pt-4 sm:space-y-10 sm:pt-5">
          <section aria-label="Project summary" className="space-y-4">
            <ul className="space-y-2 text-sm sm:text-base">
              {project.caseStudy.quickFacts.map((fact) => (
                <li
                  key={fact.label}
                  className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)] items-start gap-x-4"
                >
                  <span className="text-[var(--header-item-color)]/70">{fact.label}</span>
                  <span className="text-[color-mix(in_srgb,var(--header-item-color)_88%,var(--ui-fg))]">
                    {fact.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${montserrat.className} group inline-flex items-center gap-1.5 text-sm font-semibold tracking-[0.04em] text-[var(--ui-fg)] transition-colors duration-300 hover:text-[var(--header-item-hover-color)]`}
              >
                {projectsText.caseStudyPage.githubLabel}
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${montserrat.className} group inline-flex items-center gap-1.5 text-sm font-semibold tracking-[0.04em] text-[var(--ui-fg)] transition-colors duration-300 hover:text-[var(--header-item-hover-color)]`}
                >
                  {projectsText.caseStudyPage.demoLabel}
                  <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
            </div>
          </section>

          {contentSections.map((section) => (
            <section key={section.id} aria-label={section.heading} className="space-y-1.5">
              <h2
                className={`${montserrat.className} text-[1.22rem] font-bold tracking-tight sm:text-[1.45rem]`}
              >
                {section.heading}
              </h2>
              <p
                className={`${montserrat.className} max-w-3xl text-[0.92rem] leading-relaxed whitespace-pre-line text-[var(--ui-fg-muted)] sm:text-[0.98rem]`}
              >
                {section.content}
              </p>
              {section.points?.length ? (
                <ul
                  className={`${montserrat.className} list-disc space-y-2.5 pl-5 text-[0.92rem] text-[var(--ui-fg-muted)] marker:text-[var(--header-item-color)] sm:text-[0.98rem]`}
                >
                  {section.points.map((point) => (
                    <li key={point} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.id === "architecture" ? (
                <figure className="space-y-2">
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={getProjectCaseStudyDiagramSrc(project.slug)}
                      alt={project.caseStudy.diagramAlt}
                      width={1600}
                      height={900}
                      className={diagramImageClassName.join(" ")}
                      priority
                    />
                  </div>
                  <figcaption className="text-xs text-[var(--header-item-color)]/80 sm:text-sm">
                    {project.caseStudy.diagramCaption}
                  </figcaption>
                </figure>
              ) : null}
            </section>
          ))}

          <section aria-label={linksSection?.heading ?? "Links"} className="space-y-1.5">
            <h2
              className={`${montserrat.className} text-[1.22rem] font-bold tracking-tight sm:text-[1.45rem]`}
            >
              {linksSection?.heading ?? "Links"}
            </h2>
            <p
              className={`${montserrat.className} max-w-3xl text-[0.92rem] leading-relaxed text-[var(--ui-fg-muted)] sm:text-[0.98rem]`}
            >
              {linksSection?.content}
            </p>
            {linksSection?.links.length ? (
              <ul className="space-y-4">
                {linksSection.links.map((link) => (
                  <li key={link.url} className="space-y-1.5">
                    <p className="text-[0.92rem] text-[var(--ui-fg)] sm:text-[0.98rem]">
                      {link.title}
                    </p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-block text-[0.88rem] text-[var(--header-item-color)] transition-colors duration-300 hover:text-[var(--header-item-hover-color)] sm:text-[0.94rem]"
                    >
                      <span className="inline-flex items-center gap-1">
                        {link.description}
                        <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        </article>
      </RouteReveal>
    </SecondaryPageLayout>
  );
}
