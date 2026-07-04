"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaGithub, FaLinkedinIn} from "react-icons/fa6";
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
import {beginRouteNavigationScrollMode} from "@/components/behavior/scroll/instant-scroll-reset";
import {animationTimings} from "@/lib/animation/animation-timings";
import {montserrat} from "@/lib/fonts";
import type {HeaderLink} from "@/lib/config/app-config";

type HeaderProps = {
  homeHref: string;
  ownerName: string;
  navItems: readonly HeaderLink[];
  navAriaLabel: string;
  githubUrl: string;
  linkedinUrl: string;
  socialLabels: {github: string; linkedin: string};
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
  const labelRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const [indicatorMotion, setIndicatorMotion] = useState<"none" | "spawn" | "slide">("none");
  const [brandBounceActive, setBrandBounceActive] = useState(false);

  const resolveActiveNavHref = useCallback(
    (path: string) => {
      const exactMatch = navItems.find((item) => item.href === path);

      if (exactMatch) {
        return exactMatch.href;
      }

      const parentMatch = navItems
        .filter((item) => path.startsWith(`${item.href}/`))
        .sort((left, right) => right.href.length - left.href.length)[0];

      return parentMatch?.href ?? null;
    },
    [navItems]
  );

  const activeNavHref = useMemo(
    () => resolveActiveNavHref(pathname),
    [pathname, resolveActiveNavHref]
  );
  const previousActiveNavHrefRef = useRef<string | null>(activeNavHref);

  const measureIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeEl = activeNavHref ? labelRefs.current.get(activeNavHref) : null;

    if (!container || !activeEl) {
      return null;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    return {
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    };
  }, [activeNavHref]);

  useLayoutEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const previousActiveNavHref = previousActiveNavHrefRef.current;
      const nextIndicator = measureIndicator();

      if (!activeNavHref || !nextIndicator) {
        setIndicatorMotion("none");
        setIndicator(null);
        previousActiveNavHrefRef.current = activeNavHref;
        return;
      }

      if (!previousActiveNavHref) {
        setIndicatorMotion("spawn");
      } else if (previousActiveNavHref !== activeNavHref) {
        setIndicatorMotion("slide");
      } else {
        setIndicatorMotion("none");
      }

      setIndicator(nextIndicator);
      previousActiveNavHrefRef.current = activeNavHref;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeNavHref, measureIndicator]);

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
        behavior: window.matchMedia(animationTimings.scrollRevealDefaults.reducedMotionQuery)
          .matches
          ? "auto"
          : "smooth",
      });
      setBrandBounceActive(false);
      window.requestAnimationFrame(() => {
        setBrandBounceActive(true);
      });
    },
    [homeHref, pathname]
  );

  const handleNavItemClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (href !== pathname) {
        beginRouteNavigationScrollMode();
      }
    },
    [pathname]
  );

  return (
    <header
      className={`${montserrat.className} flex h-[5.5rem] w-full items-center justify-between gap-4 border-b border-[var(--header-border-color)] bg-[var(--header-overlay-bg)] px-4 backdrop-blur-md transition-[background-color,border-color] duration-[var(--theme-transition-duration)] ease-[var(--theme-transition-easing)] sm:h-[4.5rem] sm:gap-12 sm:px-0`}
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

      <nav aria-label={navAriaLabel} className="ml-auto">
        <div className="flex items-center gap-3 min-[390px]:gap-4 sm:gap-6">
          <div
            ref={containerRef}
            className="relative flex items-center gap-3 min-[390px]:gap-4 sm:gap-6"
          >
            {navItems.map((item) => {
              const isActive = activeNavHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  onClick={(event) => {
                    handleNavItemClick(event, item.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-lg font-medium no-underline transition-colors duration-300 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)] sm:text-xl ${
                    isActive
                      ? "text-[var(--ui-fg)]"
                      : "text-[var(--header-item-color)] hover:text-[var(--header-item-hover-color)] focus-visible:text-[var(--header-item-hover-color)]"
                  }`}
                >
                  <span
                    ref={(el: HTMLSpanElement | null) => {
                      if (el) {
                        labelRefs.current.set(item.href, el);
                        return;
                      }

                      labelRefs.current.delete(item.href);
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <svg
              aria-hidden={true}
              className={`pointer-events-none absolute -bottom-1 left-0 h-px overflow-visible ${
                indicatorMotion === "slide"
                  ? "transition-[transform,width,opacity] duration-320 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : ""
              } origin-left will-change-transform`}
              width={Math.max(indicator?.width ?? 0, 1)}
              height="1"
              viewBox={`0 0 ${Math.max(indicator?.width ?? 0, 1)} 1`}
              opacity={indicator ? 1 : 0}
              transform={`translate(${indicator?.left ?? 0} 0)`}
            >
              <rect
                width="100%"
                height="1"
                className={`fill-[var(--ui-fg)] ${
                  indicatorMotion === "spawn" ? "header-nav-indicator-spawn" : ""
                }`}
              />
            </svg>
          </div>

          <div className="hidden items-center gap-4 min-[390px]:flex sm:gap-6">
            <SocialIconLink href={githubUrl} label={socialLabels.github}>
              <FaGithub className="h-6 w-6" />
            </SocialIconLink>

            <SocialIconLink href={linkedinUrl} label={socialLabels.linkedin}>
              <FaLinkedinIn className="h-6 w-6" />
            </SocialIconLink>
          </div>
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

function SocialIconLink({href, label, children}: SocialIconLinkProps) {
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
