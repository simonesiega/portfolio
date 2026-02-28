import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { ReactNode } from "react";
import { montserrat } from "@/lib/fonts";
import type { HeaderLink } from "@/lib/site-config";

type SiteHeaderProps = {
  ownerName: string;
  navItems: readonly HeaderLink[];
  navAriaLabel: string;
  githubUrl: string;
  linkedinUrl: string;
  socialLabels: { github: string; linkedin: string };
};

export function SiteHeader({
  ownerName,
  navItems,
  navAriaLabel,
  githubUrl,
  linkedinUrl,
  socialLabels,
}: SiteHeaderProps) {
  return (
    <header
      className={`${montserrat.className} sticky top-0 z-40 flex w-full items-center justify-between gap-8 border-b border-[var(--header-border-color)] bg-[var(--header-overlay-bg)] py-6 backdrop-blur-md sm:gap-12 sm:py-7`}
    >
      <Link
        href="/"
        className="text-lg font-medium text-[var(--ui-fg)] transition-opacity duration-300 hover:opacity-70 sm:text-xl"
      >
        {ownerName}
      </Link>

      <nav aria-label={navAriaLabel} className="ml-6 sm:ml-10">
        <ul className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavTextLink href={item.href} label={item.label} />
            </li>
          ))}

          <li>
            <SocialIconLink href={githubUrl} label={socialLabels.github}>
              <FaGithub className="h-6 w-6" />
            </SocialIconLink>
          </li>

          <li>
            <SocialIconLink href={linkedinUrl} label={socialLabels.linkedin}>
              <FaLinkedinIn className="h-6 w-6" />
            </SocialIconLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

type NavTextLinkProps = {
  href: string;
  label: string;
};

function NavTextLink({ href, label }: NavTextLinkProps) {
  return (
    <Link
      href={href}
      className="group relative text-lg font-medium text-[var(--header-item-color)] transition-colors duration-300 hover:text-[var(--header-item-hover-color)] focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none sm:text-xl"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--header-item-color)] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

type SocialIconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

function SocialIconLink({ href, label, children }: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none"
    >
      {children}
    </a>
  );
}
