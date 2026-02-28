"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { montserrat } from "@/lib/fonts";
import type { HeaderLink } from "@/lib/config/site-config";

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
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const [animated, setAnimated] = useState(false);

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeEl = itemRefs.current.get(pathname);

    if (!container || !activeEl) {
      setIndicator(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    setIndicator({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
    });
  }, [pathname]);

  useEffect(() => {
    updateIndicator();

    const timer = setTimeout(() => {
      updateIndicator();
      setAnimated(true);
    }, 60);

    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

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
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            ref={containerRef}
            className="relative flex items-center gap-4 sm:gap-6"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el: HTMLAnchorElement | null) => {
                    if (el) itemRefs.current.set(item.href, el);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-lg font-medium transition-colors duration-300 focus-visible:outline-none sm:text-xl ${
                    isActive
                      ? "text-[var(--ui-fg)]"
                      : "text-[var(--header-item-color)] hover:text-[var(--header-item-hover-color)] focus-visible:text-[var(--header-item-hover-color)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span
              className={`pointer-events-none absolute -bottom-1 h-px bg-[var(--ui-fg)] ${
                animated
                  ? "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : ""
              }`}
              style={{
                left: indicator?.left ?? 0,
                width: indicator?.width ?? 0,
                opacity: indicator ? 1 : 0,
              }}
            />
          </div>

          <SocialIconLink href={githubUrl} label={socialLabels.github}>
            <FaGithub className="h-6 w-6" />
          </SocialIconLink>

          <SocialIconLink href={linkedinUrl} label={socialLabels.linkedin}>
            <FaLinkedinIn className="h-6 w-6" />
          </SocialIconLink>
        </div>
      </nav>
    </header>
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
