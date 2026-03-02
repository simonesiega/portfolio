import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiOpenai,
  SiOracle,
  SiPython,
  SiReact,
  SiRust,
  SiFlutter,
  SiPostgresql,
  SiTypescript,
  SiDocker,
} from "react-icons/si";
import { ParticleNetwork } from "@/components/animation/particle-network";
import { animationTimings, toMs } from "@/lib/animation/animation-timings";
import { montserrat } from "@/lib/fonts";
import type { HomeHero } from "@/lib/config/text/home";

type HomeHeroSectionProps = {
  hero: HomeHero;
  contactSectionId: string;
};

const { landingReveal } = animationTimings;

const skillIcons: Record<string, IconType> = {
  openai: SiOpenai,
  oracle: SiOracle,
  python: SiPython,
  react: SiReact,
  typescript: SiTypescript,
  postgresql: SiPostgresql,
  rust: SiRust,
  flutter: SiFlutter,
  docker: SiDocker,
};

const landingRevealContainerStyle = {
  "--landing-reveal-duration": toMs(landingReveal.durationMs),
} as CSSProperties;

function getLandingRevealStyle(delayMs: number): CSSProperties {
  return { animationDelay: toMs(delayMs) };
}

export function HomeHeroSection({ hero, contactSectionId }: HomeHeroSectionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-110px)] min-h-[calc(100svh-110px)] items-center justify-center pb-0">
      <ParticleNetwork className="pointer-events-none absolute top-0 bottom-[-20%] left-1/2 w-screen -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_0%,black_76%,transparent_100%)]" />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 38% 50%, var(--ui-bg) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-4xl translate-x-2 sm:translate-x-4"
        style={landingRevealContainerStyle}
      >
        <h1
          className={`${montserrat.className} landing-reveal text-4xl font-extrabold tracking-tight sm:text-6xl`}
          style={getLandingRevealStyle(landingReveal.delaysMs.heading)}
        >
          {hero.heading}
        </h1>

        <p
          className={`${montserrat.className} landing-reveal mt-4 text-xl font-semibold tracking-tight text-[var(--ui-fg-muted)] sm:text-2xl`}
          style={getLandingRevealStyle(landingReveal.delaysMs.tagline)}
        >
          {hero.tagline}
        </p>
        <p
          className="landing-reveal mt-1.5 text-sm tracking-wide text-[var(--header-item-color)] sm:text-base"
          style={getLandingRevealStyle(landingReveal.delaysMs.tagline)}
        >
          {hero.locationLine}
        </p>

        <p
          className="landing-reveal mt-6 max-w-2xl text-[var(--bio-text-color)] sm:text-lg"
          style={getLandingRevealStyle(landingReveal.delaysMs.bio)}
        >
          {hero.bio}
        </p>

        <div className="mt-8">
          <div
            className="landing-reveal flex max-w-3xl flex-wrap gap-2.5"
            style={getLandingRevealStyle(landingReveal.delaysMs.skills)}
          >
            {hero.skills.map(({ label, iconKey, color }) => {
              const Icon = skillIcons[iconKey];
              return (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--header-item-color)]/20 bg-[var(--ui-bg)]/60 px-4 py-1.5 text-sm font-medium text-[var(--bio-text-color)] backdrop-blur-sm"
                >
                  <span style={{ color }} className="flex shrink-0">
                    {Icon && <Icon className="h-4 w-4" />}
                  </span>
                  {label}
                </span>
              );
            })}
          </div>

          <div
            className="landing-reveal mt-8"
            style={getLandingRevealStyle(landingReveal.delaysMs.cta)}
          >
            <p className={`${montserrat.className} mb-3 text-xs font-semibold tracking-[0.14em] text-[var(--header-item-color)]/85 sm:text-sm`}>
              {hero.statusLine}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`#${contactSectionId}`}
                className={`${montserrat.className} inline-flex items-center justify-center rounded-full bg-[var(--cta-bg)] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[var(--cta-fg)] transition duration-300 hover:scale-[1.02] hover:opacity-90 sm:text-base`}
              >
                {hero.primaryCtaLabel}
              </a>

              <a
                href={hero.secondaryCtaHref}
                className={`${montserrat.className} inline-flex items-center justify-center rounded-full border border-[var(--header-item-color)]/45 bg-transparent px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[var(--ui-fg)] transition duration-300 hover:scale-[1.02] hover:border-[var(--header-item-hover-color)] hover:text-[var(--header-item-hover-color)] sm:text-base`}
              >
                {hero.secondaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
