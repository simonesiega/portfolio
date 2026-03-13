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
    if (previousPathRef.current !== pathname) {
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
