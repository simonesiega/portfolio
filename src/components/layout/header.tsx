"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { animationTimings } from "@/lib/animation/animation-timings";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const previousPathRef = useRef(pathname);
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const [indicatorMotion, setIndicatorMotion] = useState<"none" | "spawn" | "slide">("none");
  const [brandBounceActive, setBrandBounceActive] = useState(false);

  const navHrefs = useMemo<Set<string>>(
    () => new Set(navItems.map((item) => item.href)),
    [navItems],
  );

  const measureIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeEl = itemRefs.current.get(pathname);

    if (!container || !activeEl) {
      return null;
    }

    return {
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const previousPath = previousPathRef.current;
      const currentIsNav = navHrefs.has(pathname);
      const previousIsNav = navHrefs.has(previousPath);
      const nextIndicator = measureIndicator();

      if (!currentIsNav || !nextIndicator) {
        setIndicatorMotion("none");
        setIndicator(null);
        previousPathRef.current = pathname;
        return;
      }

      if (!previousIsNav) {
        setIndicatorMotion("spawn");
      } else if (previousPath !== pathname) {
        setIndicatorMotion("slide");
      } else {
        setIndicatorMotion("none");
      }

      setIndicator(nextIndicator);
      previousPathRef.current = pathname;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [measureIndicator, navHrefs, pathname]);

  useEffect(() => {
    const handleResize = () => {
      window.requestAnimationFrame(() => {
        const nextIndicator = measureIndicator();
        if (nextIndicator) {
          setIndicator(nextIndicator);
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [measureIndicator]);

  useEffect(() => {
    if (!brandBounceActive) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setBrandBounceActive(false);
    }, 460);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [brandBounceActive]);

  const handleOwnerClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (pathname !== homeHref) {
        return;
      }

      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          animationTimings.scrollRevealDefaults.reducedMotionQuery,
        ).matches
          ? "auto"
          : "smooth",
      });
      setBrandBounceActive(false);
      window.requestAnimationFrame(() => {
        setBrandBounceActive(true);
      });
    },
    [homeHref, pathname],
  );

  return (
    <header
      className={`${montserrat.className} flex h-24 w-full items-center justify-between gap-8 border-b border-[var(--header-border-color)] bg-[var(--header-overlay-bg)] px-4 sm:h-28 sm:gap-12 sm:px-0 backdrop-blur-md transition-[background-color,border-color] duration-[var(--theme-transition-duration)] ease-[var(--theme-transition-easing)]`}
    >
      <Link
        href={homeHref}
        onClick={handleOwnerClick}
        className={`text-lg font-medium text-[var(--ui-fg)] no-underline transition-opacity duration-300 hover:opacity-70 sm:text-xl ${
          brandBounceActive ? "header-owner-repulse" : ""
        }`}
      >
        <span className="inline-block">{ownerName}</span>
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
                    if (el) {
                      itemRefs.current.set(item.href, el);
                      return;
                    }

                    itemRefs.current.delete(item.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-lg font-medium no-underline transition-colors duration-300 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)] sm:text-xl ${
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
              className={`pointer-events-none absolute -bottom-1 h-px ${
                indicatorMotion === "slide"
                  ? "transition-[transform,opacity] duration-320 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : ""
              } left-0 w-px origin-left will-change-transform`}
              style={{
                transform: `translate3d(${indicator?.left ?? 0}px, 0, 0) scaleX(${Math.max(
                  indicator?.width ?? 0,
                  1,
                )})`,
                opacity: indicator ? 1 : 0,
              }}
            >
              <span
                className={`block h-full w-full bg-[var(--ui-fg)] ${
                  indicatorMotion === "spawn" ? "header-nav-indicator-spawn" : ""
                }`}
              />
            </span>
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
      className="inline-flex items-center justify-center rounded-sm text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
    >
      {children}
    </a>
  );
}
