import Link from "next/link";
import { Montserrat } from "next/font/google";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { ReactNode } from "react";

type SiteHeaderProps = {
  ownerName: string;
  githubUrl: string;
  linkedinUrl: string;
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const NAV_ITEMS = [
  { href: "/projects", label: "projects" },
  { href: "/work", label: "work" },
] as const;

export function SiteHeader({
  ownerName,
  githubUrl,
  linkedinUrl,
}: SiteHeaderProps) {
  return (
    <header
      className={`${montserrat.className} flex w-full items-center justify-between gap-8 border-b border-white/20 pt-8 pb-4 sm:gap-12 sm:pt-10 sm:pb-5`}
    >
      <Link
        href="/"
        className="text-lg font-semibold tracking-[0.18em] text-white transition-opacity duration-300 hover:opacity-70 sm:text-xl"
      >
        {ownerName}
      </Link>

      <nav aria-label="Primary navigation" className="ml-6 sm:ml-10">
        <ul className="flex items-center gap-4 sm:gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavTextLink href={item.href} label={item.label} />
            </li>
          ))}

          <li>
            <SocialIconLink href={githubUrl} label="github">
              <FaGithub className="h-6 w-6" />
            </SocialIconLink>
          </li>

          <li>
            <SocialIconLink href={linkedinUrl} label="linkedin">
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
      className="group relative text-lg font-medium tracking-[0.14em] text-white transition-colors duration-300 hover:text-white/80 focus-visible:text-white/80 focus-visible:outline-none sm:text-xl"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
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
      className="inline-flex items-center justify-center text-white transition duration-300 hover:scale-110 hover:text-zinc-300 focus-visible:scale-110 focus-visible:text-zinc-300 focus-visible:outline-none"
    >
      {children}
    </a>
  );
}
