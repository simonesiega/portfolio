"use client";

import type {ComponentProps} from "react";
import {usePathname} from "next/navigation";
import {ScrollReveal} from "@/components/animation/scroll-reveal";

type RouteRevealProps = ComponentProps<typeof ScrollReveal>;

export function RouteReveal(props: RouteRevealProps) {
  const pathname = usePathname();

  return <ScrollReveal key={pathname} {...props} />;
}
