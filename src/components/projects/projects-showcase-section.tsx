import Link from "next/link";
import {FiGithub, FiMail} from "react-icons/fi";
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
    <section aria-label={projectsAriaLabel} className="pt-3 pb-14 sm:pt-4">
      <ul className="space-y-4 sm:space-y-3">
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
              <article className="group relative rounded-xl border-2 border-[var(--project-card-border)] bg-[var(--project-card-bg)] px-4 pt-2 pb-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--project-card-hover-border)] hover:bg-[var(--project-card-hover-bg)] sm:px-5 sm:pt-2.5 sm:pb-2.5">
                <Link
                  href={getProjectCaseStudyHref(project.slug)}
                  scroll={false}
                  aria-label={`${openCaseStudyLabel} ${project.title}`}
                  className="absolute inset-0 z-10 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
                />
                <header className="flex flex-wrap items-center gap-2">
                  <h2
                    className={`${montserrat.className} text-lg font-bold tracking-tight sm:text-xl`}
                  >
                    {project.title}
                  </h2>

                  <div className="relative z-20 ml-auto flex items-center gap-1.5">
                    <a
                      href={getProjectInfoMailHref(project.title, mailSubjectPrefix, contactEmail)}
                      aria-label={`${mailAriaLabelPrefix} ${project.title}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[color-mix(in_srgb,var(--header-item-color)_68%,white)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
                    >
                      <FiMail className="h-3 w-3" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${githubAriaLabelPrefix} ${project.title} ${githubAriaLabelSuffix}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[color-mix(in_srgb,var(--header-item-color)_68%,white)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
                    >
                      <FiGithub className="h-3 w-3" />
                    </a>
                  </div>
                </header>

                <p className="mt-1.5 text-[0.74rem] tracking-wide text-[var(--header-item-color)] sm:text-[0.82rem]">
                  <span>{statusLabel}: </span>
                  <span
                    aria-hidden="true"
                    className={`relative -top-px mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${getStatusDotClassName(project.status)}`}
                  />
                  <span>{project.status}</span>
                  <span className="mx-2 text-[var(--header-item-color)]/50">|</span>
                  <span>{project.developmentPeriod}</span>
                </p>

                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--ui-fg-muted)] sm:mt-2.5 sm:text-[0.95rem]">
                  {project.keyPhrase}
                </p>

                <ul
                  className="mt-1.5 mb-0.5 flex flex-wrap gap-1.5"
                  aria-label={technologiesAriaLabel}
                >
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="inline-flex items-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-2 py-0.5 text-[0.68rem] text-[var(--card-tag-color)]"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
