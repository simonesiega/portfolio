import { SiteHeader } from "@/components/site-header";
import { ParticleNetwork } from "@/components/particle-network";
import { ScrollReveal } from "@/components/scroll-reveal";
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

        <section className="relative flex min-h-[calc(100vh-110px)] items-center justify-center pb-0">
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
              style={getLandingRevealStyle(landingReveal.delaysMs.tagline)}
            >
              {home.hero.tagline}
            </p>
            <p
              className="landing-reveal mt-1.5 text-sm tracking-wide text-[var(--header-item-color)] sm:text-base"
              style={getLandingRevealStyle(landingReveal.delaysMs.tagline)}
            >
              {home.hero.locationLine}
            </p>

            <p
              className="landing-reveal mt-4 max-w-2xl text-[var(--bio-text-color)] sm:text-lg"
              style={getLandingRevealStyle(landingReveal.delaysMs.bio)}
            >
              {home.hero.bio}
            </p>

            <div className="mt-8">
              <div
                className="landing-reveal flex max-w-3xl flex-wrap gap-2.5"
                style={getLandingRevealStyle(landingReveal.delaysMs.skills)}
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

        {/* ── Currently building ── */}
        <section
          id={home.currentlyBuilding.id}
          className="pt-6 sm:pt-8"
        >
          <div className="mx-auto max-w-4xl">
            <ScrollReveal variant="fade-up">
              <h2
                className={`${montserrat.className} text-2xl font-extrabold tracking-tight sm:text-4xl`}
              >
                {home.currentlyBuilding.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--header-item-color)] sm:text-base">
                {home.currentlyBuilding.subtitle}
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {home.currentlyBuilding.projects.map((project, i) => (
                <ScrollReveal
                  key={project.title}
                  variant="scale-up"
                  delay={i * 150}
                  duration={800}
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.ariaLabel}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-sm transition duration-300 hover:border-[var(--card-hover-border)] hover:scale-[1.01]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3
                          className={`${montserrat.className} text-lg font-bold sm:text-xl`}
                        >
                          {project.title}
                        </h3>
                        <FiArrowUpRight className="h-4 w-4 shrink-0 text-[var(--header-item-color)] opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--header-item-color)] sm:text-base">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--card-tag-bg)] px-3 py-1 text-xs font-medium text-[var(--card-tag-color)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <ScrollReveal variant="fade-in" duration={600}>
          <div className="mx-auto max-w-4xl pt-8 sm:pt-12">
            <hr className="border-[var(--card-border)]" />
          </div>
        </ScrollReveal>

        {/* ── Contact ── */}
        <section
          id={home.contactSection.id}
          className="py-16 sm:py-20"
        >
          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal variant="fade-up" duration={800}>
              <p className={`${montserrat.className} text-lg font-semibold tracking-tight text-[var(--header-item-color)] sm:text-xl`}>
                {home.contactSection.eyebrow}
              </p>
              <h2 className={`${montserrat.className} mt-2 text-3xl font-extrabold sm:text-5xl`}>
                {home.contactSection.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={120} duration={800}>
              <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--header-item-color)] sm:text-lg">
                {home.contactSection.description}
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--header-item-color)] sm:text-lg">
                {home.contactSection.statusLine}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={240} duration={800}>
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
            </ScrollReveal>
          </div>
        </section>

        {/* ── Footer ── */}
        <ScrollReveal variant="fade-in" delay={0} duration={1000} threshold={0.05}>
          <footer className="flex items-end justify-between pb-10 sm:pb-12">
            <div>
              <div className="flex items-center gap-2">
                <FaRegCopyright className="h-4 w-4 text-[var(--header-item-color)]" />
                <span className={`${montserrat.className} text-sm tracking-[0.14em] text-[var(--header-item-color)]`}>
                  {new Date().getFullYear()} {home.contactSection.copyrightName}
                </span>
              </div>
              <p className={`${montserrat.className} mt-2 text-xs font-medium tracking-[0.16em] text-[var(--header-item-color)] sm:text-sm`}>
                {home.contactSection.tagline}
              </p>
            </div>

            <ThemeToggle />
          </footer>
        </ScrollReveal>

      </div>
    </main>
  );
}
