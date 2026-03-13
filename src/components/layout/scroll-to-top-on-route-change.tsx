"use client";

import {useLayoutEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {instantScrollReset} from "@/lib/instant-scroll-reset";

export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathRef.current !== pathname) {
      instantScrollReset();
      previousPathRef.current = pathname;
    }
  }, [pathname]);

  return null;
}
