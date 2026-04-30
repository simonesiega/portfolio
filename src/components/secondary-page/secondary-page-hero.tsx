import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {animationTimings} from "@/lib/animation/animation-timings";
import {montserrat} from "@/lib/fonts";

type SecondaryPageHeroProps = {
  sectionId: string;
  eyebrow: string;
  eyebrowClassName?: string;
  eyebrowUppercase?: boolean;
  title: string;
  subtitle?: string;
  compact?: boolean;
};

export function SecondaryPageHero({
  sectionId,
  eyebrow,
  eyebrowClassName,
  eyebrowUppercase = true,
  title,
  subtitle,
  compact = false,
}: SecondaryPageHeroProps) {
  const {secondaryPageHero} = animationTimings;

  return (
    <section
      aria-labelledby={sectionId}
      className={`max-w-3xl ${compact ? "space-y-0 pt-5 pb-4 sm:pt-7 sm:pb-5" : "space-y-5 pt-10 pb-10 sm:pt-12 sm:pb-12"}`}
    >
      <ScrollReveal variant="fade-in" duration={secondaryPageHero.eyebrow.durationMs}>
        <p
          className={`${montserrat.className} text-xs font-semibold tracking-[0.18em] text-[var(--header-item-color)] ${eyebrowUppercase ? "uppercase" : "normal-case"} ${eyebrowClassName ?? ""}`}
        >
          {eyebrow}
        </p>
      </ScrollReveal>

      <ScrollReveal
        variant="fade-up"
        delay={secondaryPageHero.title.delayMs}
        duration={secondaryPageHero.title.durationMs}
      >
        <h1
          id={sectionId}
          className={`${montserrat.className} font-extrabold tracking-tight ${compact ? "text-xl sm:text-3xl" : "text-4xl sm:text-6xl"}`}
        >
          {title}
        </h1>
      </ScrollReveal>

      {subtitle ? (
        <ScrollReveal
          variant="fade-up"
          delay={secondaryPageHero.subtitle.delayMs}
          duration={secondaryPageHero.subtitle.durationMs}
        >
          <p
            className={`${montserrat.className} max-w-3xl font-medium tracking-tight ${compact ? "text-xs text-[var(--header-item-color)]/80 sm:text-sm" : "text-xl text-[var(--ui-fg-muted)] sm:text-2xl"}`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      ) : null}
    </section>
  );
}
