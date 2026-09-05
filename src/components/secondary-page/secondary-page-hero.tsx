import type {ReactNode} from "react";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {animationTimings} from "@/lib/animation/animation-timings";
import {montserrat} from "@/lib/fonts";

export type SecondaryPageHeroProps = {
  sectionId: string;
  metaLabel?: string;
  metaLabelClassName?: string;
  metaLabelUppercase?: boolean;
  metaLabelDelayMs?: number;
  title: ReactNode;
  titleClassName?: string;
  subtitle?: ReactNode;
  subtitleClassName?: string;
  className?: string;
  animate?: boolean;
  animateMetaLabel?: boolean;
};

export function SecondaryPageHero({
  sectionId,
  metaLabel = "",
  metaLabelClassName,
  metaLabelUppercase = true,
  metaLabelDelayMs,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  className,
  animate = true,
  animateMetaLabel = animate,
}: SecondaryPageHeroProps) {
  const {secondaryPageHero} = animationTimings;

  const metaLabelContent = metaLabel ? (
    <p
      className={`${montserrat.className} text-xs font-semibold tracking-[0.18em] text-[var(--header-item-color)] ${metaLabelUppercase ? "uppercase" : "normal-case"} ${metaLabelClassName ?? ""}`}
    >
      {metaLabel}
    </p>
  ) : null;

  const titleContent = (
    <h1
      id={sectionId}
      className={`${montserrat.className} text-xl font-extrabold tracking-tight sm:text-3xl ${titleClassName ?? ""}`}
    >
      {title}
    </h1>
  );

  const subtitleContent = subtitle ? (
    <p
      className={`${montserrat.className} max-w-3xl text-xs font-medium tracking-tight text-[var(--header-item-color)]/80 sm:text-sm ${subtitleClassName ?? ""}`}
    >
      {subtitle}
    </p>
  ) : null;

  return (
    <section
      aria-labelledby={sectionId}
      className={`max-w-3xl space-y-0 pt-5 pb-4 sm:pt-7 sm:pb-5 ${className ?? ""}`}
    >
      {metaLabelContent && animateMetaLabel ? (
        <ScrollReveal
          variant="fade-down"
          delay={metaLabelDelayMs}
          duration={secondaryPageHero.metaLabel.durationMs}
        >
          {metaLabelContent}
        </ScrollReveal>
      ) : (
        metaLabelContent
      )}

      {animate ? (
        <ScrollReveal
          variant="fade-up"
          delay={secondaryPageHero.title.delayMs}
          duration={secondaryPageHero.title.durationMs}
        >
          {titleContent}
        </ScrollReveal>
      ) : (
        titleContent
      )}

      {subtitleContent && animate ? (
        <ScrollReveal
          variant="fade-up"
          delay={secondaryPageHero.subtitle.delayMs}
          duration={secondaryPageHero.subtitle.durationMs}
          className="pt-1 sm:pt-1.5"
        >
          {subtitleContent}
        </ScrollReveal>
      ) : subtitleContent ? (
        <div className="pt-1 sm:pt-1.5">{subtitleContent}</div>
      ) : null}
    </section>
  );
}
