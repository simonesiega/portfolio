import Image from "next/image";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { montserrat } from "@/lib/fonts";
import type { WorkPageExperience } from "@/lib/config/text/work";

type WorkExperienceItemProps = {
  experience: WorkPageExperience;
  showDivider: boolean;
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
  showDivider,
  revealDelayMs,
  revealDurationMs,
  revealThreshold,
  technologiesAriaLabel,
}: WorkExperienceItemProps) {
  return (
    <li className="group relative py-8 sm:py-9 pl-8 sm:pl-10">
      {showDivider && (
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent"
        />
      )}

      <span
        aria-hidden="true"
        className="absolute top-20 left-0 h-3 w-3 -translate-x-1/2 rounded-full border border-[var(--header-item-color)]/45 bg-[var(--ui-bg)] transition-colors duration-300 group-hover:border-[var(--ui-fg)]/80 group-hover:bg-[var(--ui-fg)]/80"
      />

      <ScrollReveal
        variant="fade-up"
        delay={revealDelayMs}
        duration={revealDurationMs}
        threshold={revealThreshold}
      >
        <article className="-mx-2 rounded-2xl border border-transparent px-2 py-4 transition-colors duration-300 hover:bg-[var(--work-item-hover-bg)]">
          <header className="sm:flex sm:items-start sm:justify-between sm:gap-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden">
                {experience.logoSrc ? (
                  <Image
                    src={experience.logoSrc}
                    alt={experience.logoAlt}
                    width={62}
                    height={62}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span
                    className={`${montserrat.className} text-xs font-semibold tracking-[0.08em] text-[var(--header-item-color)]`}
                  >
                    {getCompanyInitials(experience.company)}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h2
                  className={`${montserrat.className} min-w-0 text-xl font-bold tracking-tight text-[var(--ui-fg)] sm:text-2xl`}
                >
                  {experience.company}
                </h2>

                <p
                  className={`${montserrat.className} mt-1.5 min-w-0 text-sm font-semibold tracking-tight text-[var(--header-item-color)] sm:text-base`}
                >
                  {experience.role}
                  <span> · {experience.companyType}</span>
                </p>
              </div>
            </div>

            <div className="mt-3 text-left sm:mt-0 sm:shrink-0 sm:text-right">
              <p className="text-sm text-[var(--ui-fg-muted)] sm:text-base">
                {experience.dateRange}
              </p>

              <p className="mt-1 text-xs tracking-wide text-[var(--header-item-color)] sm:text-sm">
                {experience.location}
              </p>
            </div>
          </header>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--ui-fg-muted)] sm:text-base">
            {experience.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2" aria-label={technologiesAriaLabel}>
            {experience.technologies.map((technology) => (
              <span
                key={technology}
                className="inline-flex items-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-2.5 py-1 text-[0.82rem] text-[var(--card-tag-color)]"
              >
                {technology}
              </span>
            ))}
          </div>
        </article>
      </ScrollReveal>
    </li>
  );
}
