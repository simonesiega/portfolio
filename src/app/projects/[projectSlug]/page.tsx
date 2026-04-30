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
      hero={{
        sectionId: `${project.slug}-case-study-heading`,
        eyebrow: `${projectsText.caseStudyPage.eyebrow.toLowerCase()} - ${project.caseStudy.readTimeMinutes} ${projectsText.caseStudyPage.minReadSuffix.toLowerCase()}`,
        eyebrowClassName: "opacity-80",
        eyebrowUppercase: false,
        title: project.title,
      }}
      routeRevealDurationMs={routeReveal.durationMs}
      routeRevealThreshold={routeReveal.threshold}
    >
      <RouteReveal
        variant="fade-up"
        delay={animationTimings.projectsShowcaseList.item.delayMs}
        duration={animationTimings.projectsShowcaseList.item.durationMs}
        threshold={0}
      >
        <Link
          href="/projects"
          scroll={false}
          className={`${montserrat.className} group inline-flex items-center gap-1.5 text-sm font-semibold tracking-[0.04em] text-[var(--header-item-color)] transition-all duration-300 hover:text-[var(--ui-fg)]`}
        >
          <FiArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          {projectsText.caseStudyPage.backToProjectsLabel}
        </Link>
      </RouteReveal>

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
        <article className="space-y-10 pt-6 sm:space-y-12 sm:pt-8">
          <section aria-label="Project summary" className="space-y-4">
            <p className="text-base leading-relaxed text-[var(--ui-fg-muted)] sm:text-lg">
              {project.caseStudy.summary}
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--header-item-color)] sm:text-base">
              {project.caseStudy.quickFacts.map((fact) => (
                <li key={fact.label}>
                  <span>{fact.label}: </span>
                  <span>{fact.value}</span>
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
            <section key={section.id} aria-label={section.heading} className="space-y-4">
              <h2
                className={`${montserrat.className} text-2xl font-bold tracking-tight sm:text-3xl`}
              >
                {section.heading}
              </h2>
              <p className="max-w-3xl text-base leading-relaxed whitespace-pre-line text-[var(--ui-fg-muted)] sm:text-lg">
                {section.content}
              </p>
              {section.points?.length ? (
                <ul className="list-disc space-y-2.5 pl-5 text-[var(--ui-fg-muted)] marker:text-[var(--header-item-color)]">
                  {section.points.map((point) => (
                    <li key={point} className="leading-relaxed sm:text-[1.03rem]">
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.id === "architecture" ? (
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
              ) : null}
            </section>
          ))}

          <section aria-label={linksSection?.heading ?? "Links"} className="space-y-4">
            <h2 className={`${montserrat.className} text-2xl font-bold tracking-tight sm:text-3xl`}>
              {linksSection?.heading ?? "Links"}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--ui-fg-muted)] sm:text-lg">
              {linksSection?.content}
            </p>
            {linksSection?.links.length ? (
              <ul className="space-y-2 text-[var(--ui-fg)]">
                {linksSection.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 font-medium text-[var(--ui-fg)] transition-colors duration-300 hover:text-[var(--header-item-hover-color)]"
                    >
                      {link.label}
                      <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
