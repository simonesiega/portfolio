import Image from "next/image";
import {FiArrowUpRight} from "react-icons/fi";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {montserrat} from "@/lib/fonts";
import type {WorkPageExperience} from "@/lib/config/text/work";

type WorkExperienceItemProps = {
  experience: WorkPageExperience;
  revealDelayMs: number;
  revealDurationMs: number;
  revealThreshold: number;
  technologiesAriaLabel: string;
};

function getCompanyInitials(company: string) {
  const words = company.trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function WorkExperienceItem({
  experience,
  revealDelayMs,
  revealDurationMs,
  revealThreshold,
  technologiesAriaLabel,
}: WorkExperienceItemProps) {
  return (
    <li className="group relative py-4 pl-7 sm:py-5 sm:pl-9">
      <span
        aria-hidden="true"
        className="absolute top-16 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[var(--header-item-color)]/45 bg-[var(--ui-bg)] transition-colors duration-300 group-hover:border-[var(--ui-fg)]/80 group-hover:bg-[var(--ui-fg)]/80"
      />

      <ScrollReveal
        variant="fade-up"
        delay={revealDelayMs}
        duration={revealDurationMs}
        threshold={revealThreshold}
      >
        <article className="-mx-1 rounded-xl border border-transparent px-1 py-3 transition-colors duration-300 hover:bg-[var(--work-item-hover-bg)] sm:px-2">
          <header className="sm:flex sm:items-start sm:justify-between sm:gap-6">
            <div className="flex min-w-0 items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden">
                {experience.logoSrc ? (
                  <Image
                    src={experience.logoSrc}
                    alt={experience.logoAlt}
                    width={52}
                    height={52}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span
                    className={`${montserrat.className} text-[0.7rem] font-semibold tracking-[0.08em] text-[var(--header-item-color)]`}
                  >
                    {getCompanyInitials(experience.company)}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h2
                  className={`${montserrat.className} min-w-0 text-[1.1rem] font-bold tracking-tight text-[var(--ui-fg)] sm:text-lg`}
                >
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/company-link relative inline-flex items-baseline gap-1 rounded-sm pb-0.5 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]"
                    >
                      <span>{experience.company}</span>
                      <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/company-link:translate-x-0.5 group-hover/company-link:-translate-y-0.5 group-focus-visible/company-link:translate-x-0.5 group-focus-visible/company-link:-translate-y-0.5" />
                      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/company-link:scale-x-100 group-focus-visible/company-link:scale-x-100" />
                    </a>
                  ) : (
                    experience.company
                  )}
                </h2>

                <p
                  className={`${montserrat.className} mt-1 min-w-0 text-[0.86rem] font-semibold tracking-tight text-[var(--header-item-color)] sm:text-sm`}
                >
                  {experience.role}
                  <span className="text-[var(--header-item-color)]/60">
                    {" "}
                    · {experience.companyType}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-2.5 text-left sm:mt-0 sm:shrink-0 sm:text-right">
              <p className="text-[0.98rem] text-[var(--ui-fg-muted)] sm:text-[0.95rem]">
                {experience.dateRange}
              </p>

              <p className="mt-1 text-[0.98rem] tracking-wide text-[var(--header-item-color)] sm:text-[0.95rem]">
                {experience.location}
              </p>
            </div>
          </header>

          <p className="mt-3.5 max-w-2xl text-[0.88rem] leading-relaxed text-[var(--ui-fg-muted)] sm:text-sm">
            {experience.description}
          </p>

          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={technologiesAriaLabel}>
            {experience.technologies.map((technology) => (
              <li
                key={technology}
                className="inline-flex items-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-2 py-0.5 text-[0.82rem] text-[var(--card-tag-color)]"
              >
                {technology}
              </li>
            ))}
          </ul>
        </article>
      </ScrollReveal>
    </li>
  );
}
