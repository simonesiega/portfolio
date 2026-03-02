"use client";

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
import type { HeaderLink } from "@/lib/config/app-config";

type HeaderProps = {
  homeHref: string;
  ownerName: string;
  navItems: readonly HeaderLink[];
  navAriaLabel: string;
  githubUrl: string;
  linkedinUrl: string;
  socialLabels: { github: string; linkedin: string };
};

export function Header({
  homeHref,
  ownerName,
  navItems,
  navAriaLabel,
  githubUrl,
  linkedinUrl,
  socialLabels,
}: HeaderProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

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
    const frameId = window.requestAnimationFrame(updateIndicator);

    const handleResize = () => {
      window.requestAnimationFrame(updateIndicator);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateIndicator]);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) {
      return;
    }

    const syncHeaderHeight = () => {
      const height = Math.ceil(headerEl.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--app-header-height", `${height}px`);
    };

    syncHeaderHeight();

    const resizeObserver = new ResizeObserver(syncHeaderHeight);
    resizeObserver.observe(headerEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${montserrat.className} flex w-full items-center justify-between gap-8 border-b border-[var(--header-border-color)] bg-[var(--header-overlay-bg)] py-6 backdrop-blur-md sm:gap-12 sm:py-7`}
    >
      <a
        href={homeHref}
        className="text-lg font-medium text-[var(--ui-fg)] transition-opacity duration-300 hover:opacity-70 sm:text-xl"
      >
        {ownerName}
      </a>

      <nav aria-label={navAriaLabel} className="ml-6 sm:ml-10">
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            ref={containerRef}
            className="relative flex items-center gap-4 sm:gap-6"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
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
                </a>
              );
            })}

            <span
              className="pointer-events-none absolute -bottom-1 h-px bg-[var(--ui-fg)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
