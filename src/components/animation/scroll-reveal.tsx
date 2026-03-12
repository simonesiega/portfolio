"use client";

import {useRef, useEffect, type ReactNode, type CSSProperties} from "react";
import {animationTimings} from "@/lib/animation/animation-timings";

type Variant = "fade-up" | "fade-in" | "scale-up";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  once?: boolean;
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = animationTimings.scrollRevealDefaults.durationMs,
  threshold = animationTimings.scrollRevealDefaults.threshold,
  className = "",
  as: Tag = "div",
  once = true,
  style,
}: ScrollRevealProps) {
  const {scrollRevealDefaults} = animationTimings;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(scrollRevealDefaults.reducedMotionQuery).matches;
    if (prefersReduced) {
      el.classList.add("scroll-reveal--visible");
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("scroll-reveal--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal--visible");
          if (once) observer.unobserve(el);
          return;
        }

        if (!once) {
          el.classList.remove("scroll-reveal--visible");
        }
      },
      {threshold, rootMargin: scrollRevealDefaults.rootMargin}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, scrollRevealDefaults.reducedMotionQuery, scrollRevealDefaults.rootMargin]);

  const combinedStyle: CSSProperties = {
    ...style,
    "--sr-delay": `${delay}ms`,
    "--sr-duration": `${duration}ms`,
  } as CSSProperties;

  const Element = Tag as React.ElementType;

  return (
    <Element
      ref={ref}
      className={`scroll-reveal scroll-reveal--${variant} ${className}`}
      style={combinedStyle}
    >
      {children}
    </Element>
  );
}
