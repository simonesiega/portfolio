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

    let restoreFrameId = 0;
    beginRouteNavigationScrollMode();
    const resetFrameId = window.requestAnimationFrame(() => {
      resetScrollTopInstant();
      restoreFrameId = window.requestAnimationFrame(restoreSmoothScrollMode);
    });

    return () => {
      window.cancelAnimationFrame(resetFrameId);
      window.cancelAnimationFrame(restoreFrameId);

      if (previousScrollRestoration && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (previousPathRef.current === pathname) {
      return;
    }

    let restoreFrameId = 0;
    beginRouteNavigationScrollMode();
    resetScrollTopInstant();
    const settleFrameId = window.requestAnimationFrame(() => {
      restoreFrameId = window.requestAnimationFrame(restoreSmoothScrollMode);
    });
    previousPathRef.current = pathname;

    return () => {
      window.cancelAnimationFrame(settleFrameId);
      window.cancelAnimationFrame(restoreFrameId);
    };
  }, [pathname]);

  return null;
}
