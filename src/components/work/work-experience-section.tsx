import Image from "next/image";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {mediaConfig} from "@/lib/config/media";
import type {WorkPageExperience} from "@/lib/config/text/work";

const {work: workMedia} = mediaConfig;

type WorkExperienceCardProps = {
  experience: WorkPageExperience;
  revealDelayMs: number;
  revealDurationMs: number;
  revealThreshold: number;
  tagsAriaLabel: string;
};

export function WorkExperienceCard({
  experience,
  revealDelayMs,
  revealDurationMs,
  revealThreshold,
  tagsAriaLabel,
}: WorkExperienceCardProps) {
  const imageSrc = experience.imageSrc?.trim();
  const imageCaption = experience.imageCaption?.trim();

  return (
    <li>
      <ScrollReveal
        variant="fade-up"
        delay={revealDelayMs}
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

            <div className="min-w-0 flex-1">
              <h2 className="text-[0.98rem] leading-relaxed font-semibold text-[var(--ui-fg)] sm:text-[1.02rem]">
                {experience.company}
              </h2>

              <div className="mt-1 grid gap-y-0.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-4">
                <p className="text-[0.9rem] leading-relaxed text-[var(--header-item-color)] sm:text-[0.94rem]">
                  {experience.role}
                </p>

                <p className="text-[0.82rem] font-medium tracking-[0.035em] text-[var(--header-item-color)]/72 sm:text-right sm:text-[0.86rem]">
                  {experience.dateRange}
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

            {imageSrc || imageCaption ? (
              <figure className="mt-7">
                {imageSrc ? (
                  <div className="relative min-h-[15rem] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[color-mix(in_srgb,var(--ui-fg)_4%,transparent)] shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:min-h-[18rem]">
                    <Image
                      src={imageSrc}
                      alt={experience.imageAlt}
                      fill
                      quality={workMedia.showcaseImage.quality}
                      unoptimized={workMedia.showcaseImage.unoptimized}
                      sizes={workMedia.showcaseImage.sizes}
                      className="object-cover"
                      style={{
                        objectPosition: experience.imagePosition,
                        transform: `scale(${experience.imageZoom})`,
                      }}
                    />
                  </div>
                ) : null}
                {imageCaption ? (
                  <figcaption className="mt-2 text-left text-[0.68rem] leading-relaxed font-medium tracking-[0.04em] text-[var(--header-item-color)]/72">
                    {imageCaption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </div>
        </article>
      </ScrollReveal>
    </li>
  );
}
