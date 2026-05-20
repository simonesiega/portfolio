import type {Metadata} from "next";
import Image from "next/image";
import type {IconType} from "react-icons";
import {FiArrowUpRight} from "react-icons/fi";
import {FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter} from "react-icons/fa6";
import {InstantRouteLink} from "@/components/behavior/scroll/instant-route-link";
import {RouteReveal} from "@/components/animation/route-reveal";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {PrimaryFooter} from "@/components/home/primary-footer";
import {animationTimings} from "@/lib/animation/animation-timings";
import {mediaConfig} from "@/lib/config/media";
import {homeText, type HomeIntroSocialIconKey} from "@/lib/config/text/home";
import {montserrat} from "@/lib/fonts";

const {homeIntro, routeReveal} = animationTimings;
const {intro} = homeText;
const {home: homeMedia} = mediaConfig;

const socialIcons: Record<HomeIntroSocialIconKey, IconType> = {
  x: FaXTwitter,
  instagram: FaInstagram,
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--app-header-height,6rem))] min-h-[calc(100vh-var(--app-header-height,6rem))] w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <div className="mx-auto flex min-h-full w-full max-w-[60rem] flex-1 flex-col px-6">
          <section className="w-full max-w-[34rem] pt-10 pb-24 sm:pt-8 sm:pb-28 lg:ml-[15%] lg:pt-10 xl:ml-[18%]">
            <RouteReveal
              variant="fade-up"
              delay={homeIntro.hero.image.delayMs}
              duration={homeIntro.hero.image.durationMs}
              threshold={homeIntro.hero.image.threshold}
            >
              <Image
                src={intro.profileImage.src}
                alt={intro.profileImage.alt}
                width={homeMedia.profileImage.width}
                height={homeMedia.profileImage.height}
                priority={homeMedia.profileImage.priority}
                className="h-[60px] w-[60px] rounded-full object-cover"
              />
            </RouteReveal>

            <RouteReveal
              variant="fade-up"
              delay={homeIntro.hero.name.delayMs}
              duration={homeIntro.hero.name.durationMs}
              threshold={homeIntro.hero.name.threshold}
            >
              <h1
                className={`${montserrat.className} mt-6 text-[1.55rem] leading-tight font-bold tracking-[-0.02em] text-[var(--ui-fg)]`}
              >
                {intro.name}
              </h1>
            </RouteReveal>

            <RouteReveal
              variant="fade-up"
              delay={homeIntro.hero.bio.delayMs}
              duration={homeIntro.hero.bio.durationMs}
              threshold={homeIntro.hero.bio.threshold}
            >
              <p className="mt-5 max-w-[33rem] text-[1.26rem] leading-[1.18] font-semibold tracking-[-0.005em] text-[color-mix(in_srgb,var(--header-item-color)_82%,#6f7f95)] sm:text-[1.36rem]">
                {intro.bioLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </RouteReveal>

            <RouteReveal
              variant="fade-up"
              delay={homeIntro.hero.social.delayMs}
              duration={homeIntro.hero.social.durationMs}
              threshold={homeIntro.hero.social.threshold}
            >
              <div className="mt-8 flex items-center gap-8 text-[1.45rem] text-[color-mix(in_srgb,var(--header-item-color)_86%,#6f7f95)]">
                {intro.socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className="transition-colors hover:text-[var(--header-item-hover-color)] focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none"
                    >
                      <Icon aria-hidden={true} />
                    </a>
                  );
                })}
              </div>
            </RouteReveal>

            <ScrollReveal
              variant="fade-up"
              delay={homeIntro.section.delayMs}
              initialViewportDelay={homeIntro.section.initialViewportDelayMs}
              duration={homeIntro.section.durationMs}
              threshold={homeIntro.section.threshold}
              className="mt-18 sm:mt-20"
            >
              <div className="flex items-center gap-5">
                <h2
                  className={`${montserrat.className} text-[0.76rem] font-bold tracking-[0.14em] text-[var(--header-item-color)]/72`}
                >
                  {intro.education.label}
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                {intro.education.items.map((item) => (
                  <p key={item.school} className="text-[0.98rem] leading-relaxed sm:text-[1.02rem]">
                    <a
                      href={item.href}
                      className="group/school-link relative inline-flex items-baseline gap-1 rounded-sm pb-0.5 font-semibold text-[var(--ui-fg)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]"
                    >
                      <span>{item.school}</span>
                      <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/school-link:translate-x-0.5 group-hover/school-link:-translate-y-0.5 group-focus-visible/school-link:translate-x-0.5 group-focus-visible/school-link:-translate-y-0.5" />
                      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/school-link:scale-x-100 group-focus-visible/school-link:scale-x-100" />
                    </a>
                    <span className="text-[var(--header-item-color)]">
                      {" "}
                      &nbsp;—&nbsp; {item.description}
                    </span>
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant="fade-up"
              delay={homeIntro.section.delayMs}
              initialViewportDelay={homeIntro.section.initialViewportDelayMs}
              duration={homeIntro.section.durationMs}
              threshold={homeIntro.section.threshold}
              className="mt-16 sm:mt-18"
            >
              <InstantRouteLink
                href={intro.projects.seeAllHref}
                className={`${montserrat.className} inline-flex text-[0.76rem] font-bold tracking-[0.14em] text-[var(--header-item-color)]/72 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none`}
              >
                {intro.projects.linkLabel}
              </InstantRouteLink>

              <div className="mt-5 space-y-3">
                {intro.projects.items.map((item) => (
                  <p key={item.title} className="text-[0.98rem] leading-relaxed sm:text-[1.02rem]">
                    <InstantRouteLink
                      href={item.href}
                      className="rounded-sm font-semibold text-[var(--ui-fg)] transition-colors duration-300 hover:text-[#2563eb] focus-visible:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)]"
                    >
                      {item.title}
                    </InstantRouteLink>
                    <span className="text-[var(--header-item-color)]">
                      {" "}
                      &nbsp;—&nbsp; {item.description}
                    </span>
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant="fade-up"
              delay={homeIntro.section.delayMs}
              initialViewportDelay={homeIntro.section.initialViewportDelayMs}
              duration={homeIntro.section.durationMs}
              threshold={homeIntro.section.threshold}
              className="mt-16 sm:mt-18"
            >
              <InstantRouteLink
                href={intro.works.seeAllHref}
                className={`${montserrat.className} inline-flex text-[0.76rem] font-bold tracking-[0.14em] text-[var(--header-item-color)]/72 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none`}
              >
                {intro.works.linkLabel}
              </InstantRouteLink>

              <div className="mt-5 space-y-3">
                {intro.works.items.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-x-4 gap-y-1 text-[0.98rem] leading-relaxed sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:text-[1.02rem]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={homeMedia.workLogo.width}
                        height={homeMedia.workLogo.height}
                        className="h-[22px] w-[22px] shrink-0 rounded-full object-cover"
                      />
                      <p className="min-w-0">
                        <span className="font-semibold text-[var(--ui-fg)]">{item.title}</span>
                        <span className="text-[var(--header-item-color)]">
                          {" "}
                          &nbsp;—&nbsp; {item.description}
                        </span>
                      </p>
                    </div>
                    <p className="pl-[34px] text-[0.92rem] font-semibold text-[var(--header-item-color)] sm:pl-0 sm:text-right sm:text-[0.96rem]">
                      {item.dateRange}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant="fade-up"
              delay={homeIntro.section.delayMs}
              initialViewportDelay={homeIntro.section.initialViewportDelayMs}
              duration={homeIntro.section.durationMs}
              threshold={homeIntro.section.threshold}
              className="mt-16 sm:mt-18"
            >
              <h2
                className={`${montserrat.className} text-[0.76rem] font-bold tracking-[0.14em] text-[var(--header-item-color)]/72`}
              >
                {intro.about.label}
              </h2>

              <p className="mt-2.5 max-w-full text-[0.9rem] leading-relaxed text-[var(--header-item-color)] sm:text-[0.94rem]">
                {intro.about.description}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 min-[430px]:grid-cols-3">
                {intro.about.images.map((image, index) => (
                  <ScrollReveal
                    key={image.label}
                    variant="fade-up"
                    duration={homeIntro.section.durationMs}
                    threshold={homeIntro.aboutImages.threshold}
                  >
                    <figure>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={homeMedia.aboutImage.width}
                        height={homeMedia.aboutImage.height}
                        loading={
                          homeMedia.aboutImage.eagerFirstImage && index === 0 ? "eager" : "lazy"
                        }
                        className="about-interest-image aspect-[9/11] w-full rounded-md object-cover"
                      />
                      <figcaption className="mt-2 text-[0.68rem] font-medium tracking-[0.04em] text-[var(--header-item-color)]/72">
                        {image.label}
                      </figcaption>
                    </figure>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal
                variant="fade-up"
                delay={homeIntro.aboutClosingLine.delayMs}
                duration={homeIntro.section.durationMs}
                threshold={homeIntro.aboutClosingLine.threshold}
                className="mt-4"
              >
                <p className="text-[0.78rem] leading-relaxed text-[var(--header-item-color)]/78 sm:text-[0.82rem]">
                  {intro.about.closingLine}
                </p>
              </ScrollReveal>
            </ScrollReveal>
          </section>

          <div className="flex-1" />
          <RouteReveal
            variant="fade-in"
            duration={routeReveal.durationMs}
            threshold={routeReveal.threshold}
          >
            <PrimaryFooter />
          </RouteReveal>
        </div>
      </div>
    </div>
  );
}
