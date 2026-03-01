import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { montserrat } from "@/lib/fonts";
import type { HomeContactSection } from "@/lib/config/text/home";

type ContactSectionProps = {
  contactSection: HomeContactSection;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  socialLabels: {
    github: string;
    linkedin: string;
  };
};

export function ContactSection({
  contactSection,
  email,
  githubUrl,
  linkedinUrl,
  socialLabels,
}: ContactSectionProps) {
  return (
    <section id={contactSection.id} className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal variant="fade-up" duration={800}>
          <p className={`${montserrat.className} text-lg font-semibold tracking-tight text-[var(--header-item-color)] sm:text-xl`}>
            {contactSection.eyebrow}
          </p>
          <h2 className={`${montserrat.className} mt-2 text-3xl font-extrabold sm:text-5xl`}>
            {contactSection.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={120} duration={800}>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--header-item-color)] sm:text-lg">
            {contactSection.description}
          </p>

          <p className="mx-auto mt-8 max-w-md text-xs text-[var(--header-item-color)] sm:text-sm">
            {contactSection.statusLine}
          </p>
          <p className="mx-auto mt-1 max-w-md text-xs text-[var(--header-item-color)]/70 sm:text-sm">
            {contactSection.responseTime}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={240} duration={800}>
          <a
            href={`mailto:${email}`}
            className="mt-3 inline-flex text-lg font-medium text-[var(--ui-fg)] underline underline-offset-8 transition-colors hover:text-[var(--header-item-hover-color)] sm:text-xl"
          >
            {email}
          </a>

          <div className="mt-8 flex items-center justify-center gap-7">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLabels.github}
              className="inline-flex items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)]"
            >
              <FaGithub className="h-6 w-6" />
            </a>

            <span className="text-[var(--header-item-color)]" aria-hidden="true">.</span>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLabels.linkedin}
              className="inline-flex items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)]"
            >
              <FaLinkedinIn className="h-6 w-6" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
