import Image from "next/image";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {mediaConfig} from "@/lib/config/media";
import type {WorkPageExperience} from "@/lib/config/text/work";

const {work: workMedia} = mediaConfig;

type WorkExperienceCardProps = {
  experience: WorkPageExperience;
  revealDelayMs: number;
  revealInitialViewportDelayMs?: number;
  revealDurationMs: number;
  revealThreshold: number;
  tagsAriaLabel: string;
};

export function WorkExperienceCard({
  experience,
  revealDelayMs,
  revealInitialViewportDelayMs,
  revealDurationMs,
  revealThreshold,
  tagsAriaLabel,
}: WorkExperienceCardProps) {
  return (
    <li>
      <ScrollReveal
        variant="fade-up"
        delay={revealDelayMs}
        initialViewportDelay={revealInitialViewportDelayMs}
        duration={revealDurationMs}
        threshold={revealThreshold}
      >
        <article>
          <header className="flex items-start gap-3.5">
            {experience.logoSrc ? (
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--card-border)] bg-[color-mix(in_srgb,var(--ui-fg)_4%,transparent)]">
                <Image
                  src={experience.logoSrc}
                  alt={experience.logoAlt}
                  width={workMedia.logo.width}
                  height={workMedia.logo.height}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            <div className="grid min-w-0 flex-1 gap-y-0.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-4">
              <h2 className="text-[1.04rem] leading-relaxed font-semibold text-[var(--ui-fg)] sm:text-[1.1rem]">
                {experience.company}
              </h2>

              <p className="text-[0.88rem] leading-relaxed font-medium text-[var(--header-item-color)] sm:text-right sm:text-[0.94rem]">
                {experience.dateRange}
              </p>

              <div className="mt-0.5 grid gap-y-0.5 sm:col-span-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-4">
                <p className="text-[0.86rem] leading-relaxed text-[var(--header-item-color)]/78 sm:text-[0.9rem]">
                  {experience.role}
                </p>

                <p className="text-[0.86rem] leading-relaxed text-[var(--header-item-color)]/78 sm:text-right sm:text-[0.9rem]">
                  {experience.location}
                </p>
              </div>
            </div>
          </header>

          <div>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--header-item-color)] sm:text-[0.94rem]">
              {experience.description}
            </p>

            <ul
              className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.76rem] leading-relaxed font-medium text-[var(--header-item-color)]/82 sm:text-[0.8rem]"
              aria-label={tagsAriaLabel}
            >
              {experience.tags.map((tag, index) => (
                <li
                  key={`${experience.id}-${tag.label}`}
                  className="inline-flex items-center gap-x-2"
                >
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  {tag.href ? (
                    <a
                      href={tag.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-[var(--ui-fg)] underline-offset-4 transition-colors duration-300 hover:underline focus-visible:underline focus-visible:outline-none"
                    >
                      {tag.label}
                    </a>
                  ) : (
                    <span>{tag.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </ScrollReveal>
    </li>
  );
}
