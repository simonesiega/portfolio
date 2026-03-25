import Link from "next/link";
import {FiArrowUpRight, FiGithub, FiMail} from "react-icons/fi";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {animationTimings} from "@/lib/animation/animation-timings";
import {appConfig} from "@/lib/config/app-config";
import {montserrat} from "@/lib/fonts";
import {getProjectCaseStudyHref, type ProjectsPageProject} from "@/lib/config/text/projects";

type ProjectsShowcaseSectionProps = {
  projects: readonly ProjectsPageProject[];
  projectsAriaLabel: string;
  technologiesAriaLabel: string;
  openCaseStudyLabel: string;
  statusLabel: string;
  mailSubjectPrefix: string;
  mailAriaLabelPrefix: string;
  githubAriaLabelPrefix: string;
  githubAriaLabelSuffix: string;
};

function getProjectInfoMailHref(
  projectTitle: string,
  mailSubjectPrefix: string,
  contactEmail: string
) {
  const subject = encodeURIComponent(`${mailSubjectPrefix} - ${projectTitle}`);
  return `mailto:${contactEmail}?subject=${subject}`;
}

function getStatusDotClassName(status: string) {
  const normalizedStatus = status.trim().toLowerCase();

  if (normalizedStatus === "completed" || normalizedStatus === "finished") {
    return "bg-emerald-500";
  }

  if (normalizedStatus === "in progress") {
    return "bg-orange-400";
  }

  return "bg-[var(--header-item-color)]";
}

export function ProjectsShowcaseSection({
  projects,
  projectsAriaLabel,
  technologiesAriaLabel,
  openCaseStudyLabel,
  statusLabel,
  mailSubjectPrefix,
  mailAriaLabelPrefix,
  githubAriaLabelPrefix,
  githubAriaLabelSuffix,
}: ProjectsShowcaseSectionProps) {
  const {projectsShowcaseList} = animationTimings;
  const contactEmail = appConfig.contact.email;

  return (
    <section aria-label={projectsAriaLabel} className="pb-24 sm:pb-24">
      <ul className="space-y-8 sm:space-y-6">
        {projects.map((project, index) => (
          <li key={project.id}>
            <ScrollReveal
              variant="fade-up"
              delay={
                projectsShowcaseList.item.delayMs + index * projectsShowcaseList.item.stepDelayMs
              }
              duration={projectsShowcaseList.item.durationMs}
              threshold={projectsShowcaseList.item.threshold}
            >
              <article className="group rounded-2xl border-2 border-[var(--project-card-border)] bg-[var(--project-card-bg)] p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--project-card-hover-border)] hover:bg-[var(--project-card-hover-bg)] sm:p-8">
                <header className="flex flex-wrap items-center gap-2.5">
                  <h2
                    className={`${montserrat.className} text-2xl font-bold tracking-tight sm:text-3xl`}
                  >
                    {project.title}
                  </h2>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={getProjectInfoMailHref(project.title, mailSubjectPrefix, contactEmail)}
                      aria-label={`${mailAriaLabelPrefix} ${project.title}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--header-item-color)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
                    >
                      <FiMail className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${githubAriaLabelPrefix} ${project.title} ${githubAriaLabelSuffix}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--header-item-color)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
                    >
                      <FiGithub className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </header>

                <p className="mt-2 text-sm tracking-wide text-[var(--header-item-color)] sm:text-base">
                  <span>{statusLabel}: </span>
                  <span
                    aria-hidden="true"
                    className={`relative -top-px mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${getStatusDotClassName(project.status)}`}
                  />
                  <span>{project.status}</span>
                  <span className="mx-2 text-[var(--header-item-color)]/50">|</span>
                  <span>{project.developmentPeriod}</span>
                </p>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--ui-fg-muted)] sm:text-lg">
                  {project.keyPhrase}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2" aria-label={technologiesAriaLabel}>
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="inline-flex items-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-2 py-0.5 text-[0.82rem] text-[var(--card-tag-color)]"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>

                <Link
                  href={getProjectCaseStudyHref(project.slug)}
                  scroll={false}
                  className={`${montserrat.className} group/case-study mt-5 inline-flex items-center gap-1 rounded-sm text-sm font-semibold tracking-[0.04em] text-[var(--ui-fg)] transition-all duration-300 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]`}
                >
                  <span className="relative inline-block after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:content-[''] group-hover/case-study:after:scale-x-100 group-focus-visible/case-study:after:scale-x-100">
                    {openCaseStudyLabel}
                  </span>
                  <FiArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/case-study:translate-x-0.5 group-hover/case-study:-translate-y-0.5 group-focus-visible/case-study:translate-x-0.5 group-focus-visible/case-study:-translate-y-0.5" />
                </Link>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
