import { SiteHeader } from "@/components/site-header";
import { ParticleNetwork } from "@/components/particle-network";
import { ThemeToggle } from "@/components/theme-toggle";
import { animationTimings, toMs } from "@/lib/animation-timings";
import { montserrat } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import type { CSSProperties } from "react";
import { FaGithub, FaLinkedinIn, FaRegCopyright } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
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

const { owner, navigation, social, contact, home } = siteConfig;
const { landingReveal } = animationTimings;
const contactEmailHref = `mailto:${contact.email}`;

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

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--ui-bg)] text-[var(--ui-fg)]">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8">
        <SiteHeader
          ownerName={owner.name}
          navItems={navigation.headerLinks}
          navAriaLabel={navigation.ariaLabel}
          githubUrl={social.githubUrl}
          linkedinUrl={social.linkedinUrl}
          socialLabels={social.labels}
        />

        <section className="relative flex min-h-[calc(100vh-110px)] items-center justify-center">
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
              {home.hero.heading}
            </h1>

            <p
              className={`${montserrat.className} landing-reveal mt-4 text-xl font-semibold tracking-tight text-[var(--ui-fg-muted)] sm:text-2xl`}
              style={getLandingRevealStyle(landingReveal.delaysMs.location)}
            >
              {home.hero.tagline}
            </p>
            <p
              className="landing-reveal mt-1.5 text-sm tracking-wide text-[var(--header-item-color)] sm:text-base"
              style={getLandingRevealStyle(landingReveal.delaysMs.location)}
            >
              {home.hero.locationLine}
            </p>

            <div
              className="landing-reveal mt-6 max-w-2xl space-y-4 text-[var(--bio-text-color)] sm:text-lg"
              style={getLandingRevealStyle(landingReveal.delaysMs.bio)}
            >
              {home.hero.bioLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div
              className="landing-reveal mt-6"
              style={getLandingRevealStyle(landingReveal.delaysMs.featuredProject)}
            >
              <a
                href={home.hero.featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${home.hero.featuredProject.ariaLabelPrefix} ${home.hero.featuredProject.title}`}
                className="group inline-flex items-center gap-2 text-sm transition duration-300 hover:text-[var(--header-item-hover-color)]"
              >
                <span className="font-medium uppercase tracking-[0.1em] text-[var(--ui-fg-muted)]">
                  {home.hero.featuredProject.label}
                </span>
                <span className="text-[var(--header-item-color)]/40">—</span>
                <span className={`${montserrat.className} font-bold text-[var(--ui-fg)]`}>
                  {home.hero.featuredProject.title}
                </span>
                <FiArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
              <p className="mt-1 text-sm text-[var(--header-item-color)]">
                {home.hero.featuredProject.description}
              </p>
            </div>

            <div className="mt-10">
              <h3
                className={`${montserrat.className} landing-reveal text-2xl font-bold sm:text-3xl`}
                style={getLandingRevealStyle(landingReveal.delaysMs.skillsTitle)}
              >
                {home.hero.topSkillsTitle}
              </h3>
              <div
                className="landing-reveal mt-4 flex max-w-3xl flex-wrap gap-2.5"
                style={getLandingRevealStyle(landingReveal.delaysMs.skillsText)}
              >
                {home.hero.skills.map(({ label, iconKey, color }) => {
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
                  {home.hero.statusLine}
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href={`#${home.contactSection.id}`}
                    className={`${montserrat.className} inline-flex items-center justify-center rounded-full bg-[var(--cta-bg)] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[var(--cta-fg)] transition duration-300 hover:scale-[1.02] hover:opacity-90 sm:text-base`}
                  >
                    {home.hero.primaryCtaLabel}
                  </a>

                  <a
                    href={home.hero.secondaryCtaHref}
                    className={`${montserrat.className} inline-flex items-center justify-center rounded-full border border-[var(--header-item-color)]/45 bg-transparent px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[var(--ui-fg)] transition duration-300 hover:scale-[1.02] hover:border-[var(--header-item-hover-color)] hover:text-[var(--header-item-hover-color)] sm:text-base`}
                  >
                    {home.hero.secondaryCtaLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id={home.contactSection.id}
          className="relative flex min-h-screen items-center justify-center"
        >
          <div className="w-full max-w-3xl text-center">
            <h2 className={`${montserrat.className} text-3xl font-extrabold sm:text-5xl`}>
              {home.contactSection.title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--header-item-color)] sm:text-lg">
              {home.contactSection.description}
            </p>
                  
            <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--header-item-color)] sm:text-lg">
              {home.contactSection.statusLine}
            </p>

            <a
              href={contactEmailHref}
              className="mt-8 inline-flex text-lg font-medium text-[var(--ui-fg)] underline underline-offset-8 transition-colors hover:text-[var(--header-item-hover-color)] sm:text-xl"
            >
              {contact.email}
            </a>

            <div className="mt-8 flex items-center justify-center gap-7">
              <a
                href={social.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.labels.github}
                className="inline-flex items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)]"
              >
                <FaGithub className="h-6 w-6" />
              </a>

              <span className="text-[var(--header-item-color)]" aria-hidden="true">·</span>

              <a
                href={social.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.labels.linkedin}
                className="inline-flex items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)]"
              >
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 sm:bottom-12">
            <div className="flex items-center gap-2">
              <FaRegCopyright className="h-4 w-4 text-[var(--header-item-color)]" />
              <span className={`${montserrat.className} text-sm tracking-[0.14em] text-[var(--header-item-color)]`}>
                {home.contactSection.copyrightLabel}
              </span>
            </div>
            <p className={`${montserrat.className} mt-2 text-xs font-medium tracking-[0.16em] text-[var(--header-item-color)] sm:text-sm`}>
              {home.contactSection.tagline}
            </p>
          </div>

          <div className="absolute right-0 bottom-8 sm:bottom-10">
            <ThemeToggle />
          </div>
        </section>

      </div>
    </main>
  );
}
