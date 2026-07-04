"use client";

import {useRef, useEffect, type ReactNode} from "react";
import {animationTimings} from "@/lib/animation/animation-timings";

type Variant = "fade-up" | "fade-down" | "fade-in";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  initialViewportDelay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

function getTimingClass(prefix: "sr-delay" | "sr-duration", value: number) {
  return `${prefix}-${value}`;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  initialViewportDelay,
  duration = animationTimings.scrollRevealDefaults.durationMs,
  threshold = animationTimings.scrollRevealDefaults.threshold,
  className = "",
}: ScrollRevealProps) {
  const {scrollRevealDefaults} = animationTimings;
  const ref = useRef<HTMLDivElement>(null);

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

    const initialScrollY = window.scrollY;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (initialViewportDelay !== undefined && window.scrollY === initialScrollY) {
            el.classList.remove(getTimingClass("sr-delay", delay));
            el.classList.add(getTimingClass("sr-delay", initialViewportDelay));
          }

          el.classList.add("scroll-reveal--visible");
          observer.unobserve(el);
          return;
        }
      },
      {threshold, rootMargin: scrollRevealDefaults.rootMargin}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [
    initialViewportDelay,
    delay,
    threshold,
    scrollRevealDefaults.reducedMotionQuery,
    scrollRevealDefaults.rootMargin,
  ]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${variant} ${getTimingClass("sr-delay", delay)} ${getTimingClass("sr-duration", duration)} ${className}`}
    >
      {children}
    </div>
  );
}
