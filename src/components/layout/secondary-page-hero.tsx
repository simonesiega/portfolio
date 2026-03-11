import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {animationTimings} from "@/lib/animation/animation-timings";
import {montserrat} from "@/lib/fonts";

type SecondaryPageHeroProps = {
  sectionId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SecondaryPageHero({sectionId, eyebrow, title, subtitle}: SecondaryPageHeroProps) {
  const {secondaryPageHero} = animationTimings;

  return (
    <section
      aria-labelledby={sectionId}
      className="max-w-3xl space-y-5 pt-10 pb-10 sm:pt-12 sm:pb-12"
    >
      <ScrollReveal variant="fade-in" duration={secondaryPageHero.eyebrow.durationMs}>
        <p
          className={`${montserrat.className} text-xs font-semibold tracking-[0.18em] text-[var(--header-item-color)] uppercase`}
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
          className={`${montserrat.className} text-4xl font-extrabold tracking-tight sm:text-6xl`}
        >
          {title}
        </h1>
      </ScrollReveal>

      <ScrollReveal
        variant="fade-up"
        delay={secondaryPageHero.subtitle.delayMs}
        duration={secondaryPageHero.subtitle.durationMs}
      >
        <p
          className={`${montserrat.className} max-w-3xl text-xl font-semibold tracking-tight text-[var(--ui-fg-muted)] sm:text-2xl`}
        >
          {subtitle}
        </p>
      </ScrollReveal>
    </section>
  );
}
