"use client";

import Link from "next/link";
import type {ComponentProps, MouseEvent} from "react";
import {usePathname} from "next/navigation";
import {beginRouteNavigationScrollMode} from "@/components/behavior/scroll/instant-scroll-reset";

type InstantRouteLinkProps = ComponentProps<typeof Link>;

export function InstantRouteLink({href, onClick, ...props}: InstantRouteLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

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

    const nextHref = typeof href === "string" ? href : href.pathname;

    if (nextHref && nextHref !== pathname) {
      beginRouteNavigationScrollMode();
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
