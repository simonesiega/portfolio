import type {CSSProperties} from "react";
import Link from "next/link";
import type {IconType} from "react-icons";
import {FiDownload, FiMail, FiServer, FiTerminal} from "react-icons/fi";
import {SiOpenai, SiPython, SiRust, SiPostgresql} from "react-icons/si";
import {ParticleNetwork} from "@/components/animation/particle-network";
import {animationTimings, toMs} from "@/lib/animation/animation-timings";
import {appConfig} from "@/lib/config/app-config";
import {montserrat} from "@/lib/fonts";
import type {HomeHero, HomeSkillIconKey} from "@/lib/config/text/home";

type HomeHeroSectionProps = {
  hero: HomeHero;
  contactSectionId: string;
};

const {landingReveal} = animationTimings;

const skillIcons: Record<HomeSkillIconKey, IconType> = {
  openai: SiOpenai,
  server: FiServer,
  terminal: FiTerminal,
  python: SiPython,
  postgresql: SiPostgresql,
  rust: SiRust,
};

const landingRevealContainerStyle = {
  "--landing-reveal-duration": toMs(landingReveal.durationMs),
} as CSSProperties;

function getLandingRevealStyle(delayMs: number): CSSProperties {
  return {animationDelay: toMs(delayMs)};
}

export function HomeHeroSection({hero, contactSectionId}: HomeHeroSectionProps) {
  const emailHref = `mailto:${appConfig.contact.email}`;

  return (
    <section className="relative flex min-h-[calc(100svh-var(--app-header-height,6rem))] min-h-[calc(100vh-var(--app-header-height,6rem))] items-center justify-center pb-0">
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
          className={`${montserrat.className} landing-reveal text-[2.15rem] font-extrabold tracking-tight max-[405px]:text-[1.8rem] sm:text-6xl`}
          style={getLandingRevealStyle(landingReveal.delaysMs.heading)}
        >
          {hero.heading}
        </h1>

        <p
          className={`${montserrat.className} landing-reveal mt-4 text-xl font-semibold tracking-tight text-[var(--ui-fg-muted)] max-[405px]:mt-2 sm:text-2xl`}
          style={getLandingRevealStyle(landingReveal.delaysMs.tagline)}
        >
          {hero.tagline}
        </p>
        <div
          className="landing-reveal mt-3 flex flex-wrap items-center gap-3"
          style={getLandingRevealStyle(landingReveal.delaysMs.tagline)}
        >
          <p className="leading-none sm:leading-none">{hero.locationLine}</p>

          <div className="flex items-center gap-2 self-center">
            <a
              href={emailHref}
              aria-label={`Email ${appConfig.contact.email}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--header-item-color)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--card-hover-border)] hover:text-[var(--ui-fg)] focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--ui-fg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
            >
              <FiMail className="h-4 w-4" />
            </a>

            <button
              type="button"
              aria-label="Download CV"
              disabled
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-bg)]/75 text-[var(--header-item-color)]/65 backdrop-blur-sm focus-visible:border-[var(--card-hover-border)] focus-visible:text-[var(--header-item-color)]/65 focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
            >
              <FiDownload className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p
          className="landing-reveal mt-6 max-w-2xl text-[var(--bio-text-color)] sm:text-lg"
          style={getLandingRevealStyle(landingReveal.delaysMs.bio)}
        >
          <span className="font-light">
            {hero.educationLine.map((segment) =>
              "href" in segment ? (
                <a
                  key={`${segment.text}-${segment.href}`}
                  href={segment.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-current underline-offset-2 transition-colors duration-300 hover:text-[var(--ui-fg)] focus-visible:text-[var(--ui-fg)] focus-visible:outline-none"
                >
                  {segment.text}
                </a>
              ) : (
                <span key={segment.text}>{segment.text}</span>
              )
            )}
          </span>
          <span aria-hidden="true" className="block h-[4px]" />
          <span>{hero.bio}</span>
        </p>

        <div className="mt-8">
          <div
            className="landing-reveal flex max-w-3xl flex-wrap gap-2.5"
            style={getLandingRevealStyle(landingReveal.delaysMs.skills)}
          >
            {hero.skills.map(({label, iconKey, color}) => {
              const Icon = skillIcons[iconKey];
              return (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--header-item-color)]/20 bg-[var(--ui-bg)]/60 px-4 py-1.5 text-sm font-medium text-[var(--bio-text-color)] backdrop-blur-sm"
                >
                  <span style={{color}} className="flex shrink-0">
                    <Icon className="h-4 w-4" />
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
            <p
              className={`${montserrat.className} mb-3 text-xs font-semibold tracking-[0.14em] text-[var(--header-item-color)]/85 sm:text-sm`}
            >
              {hero.statusLine}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`#${contactSectionId}`}
                className={`${montserrat.className} inline-flex items-center justify-center rounded-full bg-[var(--cta-bg)] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[var(--cta-fg)] transition duration-300 hover:scale-[1.02] hover:opacity-90 sm:text-base`}
              >
                {hero.primaryCtaLabel}
              </a>

              <Link
                href={hero.secondaryCtaHref}
                className={`${montserrat.className} inline-flex items-center justify-center rounded-full border border-[var(--header-item-color)]/45 bg-transparent px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[var(--ui-fg)] transition duration-300 hover:scale-[1.02] hover:border-[var(--header-item-hover-color)] hover:text-[var(--header-item-hover-color)] sm:text-base`}
              >
                {hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
