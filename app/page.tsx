import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { montserrat } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaRegCopyright } from "react-icons/fa6";

const { owner, navigation, social, contact, home } = siteConfig;
const contactEmailHref = `mailto:${contact.email}`;

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--ui-bg)] text-[var(--ui-fg)]">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8">
        <SiteHeader
          ownerName={owner.name}
          navItems={navigation.headerLinks}
          githubUrl={social.githubUrl}
          linkedinUrl={social.linkedinUrl}
        />

        <section className="flex min-h-[calc(100vh-110px)] items-center justify-center">
          <div className="w-full max-w-4xl translate-x-2 sm:translate-x-4">
            <div className="flex items-center gap-5 sm:gap-7">
              <Image
                src={owner.profileImage.src}
                alt={owner.profileImage.alt}
                width={96}
                height={96}
                priority
                className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
              />

              <div className={montserrat.className}>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                  {home.hero.heading}
                </h1>
                <p className="mt-2 text-base text-[var(--header-item-color)] sm:text-lg">
                  {home.hero.locationLine}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-[var(--header-item-color)] sm:text-lg">
              {home.hero.bioLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-10">
              <h2 className={`${montserrat.className} text-2xl font-bold sm:text-3xl`}>
                {home.hero.topSkillsTitle}
              </h2>
              <p className="mt-3 max-w-3xl text-[var(--header-item-color)] sm:text-lg">
                {home.hero.topSkillsText}
              </p>

              <a
                href={`#${home.contactSection.id}`}
                className={`${montserrat.className} mt-8 inline-flex items-center justify-center rounded-full bg-[var(--cta-bg)] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[var(--cta-fg)] transition duration-300 hover:scale-[1.02] hover:opacity-90 sm:text-base`}
              >
                {home.hero.ctaLabel}
              </a>
            </div>
          </div>
        </section>

        <section
          id={home.contactSection.id}
          className="relative flex min-h-screen items-center justify-center"
        >
          <div className="w-full max-w-3xl text-center">
            <h3 className={`${montserrat.className} text-3xl font-extrabold sm:text-5xl`}>
              {home.contactSection.title}
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--header-item-color)] sm:text-lg">
              {home.contactSection.description}
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
                aria-label="GitHub"
                className="inline-flex items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)]"
              >
                <FaGithub className="h-6 w-6" />
              </a>

              <span className="text-[var(--header-item-color)]">·</span>

              <a
                href={social.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
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
