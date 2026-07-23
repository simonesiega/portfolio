"use client";

import {useLayoutEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {
  beginRouteNavigationScrollMode,
  resetScrollTopInstant,
  restoreSmoothScrollMode,
} from "@/components/behavior/scroll/instant-scroll-reset";

export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);

  useLayoutEffect(() => {
    let previousScrollRestoration: ScrollRestoration | null = null;

    if ("scrollRestoration" in window.history) {
      previousScrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
    }

    beginRouteNavigationScrollMode();
    window.requestAnimationFrame(() => {
      resetScrollTopInstant();
      window.requestAnimationFrame(() => {
        restoreSmoothScrollMode();
      });
    });

    return () => {
      if (previousScrollRestoration && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (previousPathRef.current === pathname) {
      return;
    }

    beginRouteNavigationScrollMode();
    resetScrollTopInstant();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        restoreSmoothScrollMode();
      });
    });
    previousPathRef.current = pathname;
  }, [pathname]);

  return null;
}
