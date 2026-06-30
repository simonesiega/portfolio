"use client";

import {useLayoutEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {
  beginRouteNavigationScrollMode,
  consumeSkipNextRouteScrollReset,
  resetScrollTopInstant,
  restoreSmoothScrollMode,
} from "@/components/behavior/scroll/instant-scroll-reset";

export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    beginRouteNavigationScrollMode();
    window.requestAnimationFrame(() => {
      resetScrollTopInstant();
      window.requestAnimationFrame(() => {
        restoreSmoothScrollMode();
      });
    });
  }, []);

  useLayoutEffect(() => {
    if (previousPathRef.current !== pathname) {
      if (consumeSkipNextRouteScrollReset()) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            restoreSmoothScrollMode();
          });
        });
        previousPathRef.current = pathname;
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
    }
  }, [pathname]);

  return null;
}
