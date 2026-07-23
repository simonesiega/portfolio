"use client";

import {useRef, useEffect, type CSSProperties, type ReactNode} from "react";
import {animationTimings, toMs} from "@/lib/animation/animation-timings";

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

type ScrollRevealStyle = CSSProperties & {
  "--sr-delay": string;
  "--sr-duration": string;
};

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

    let hasScrolled = false;
    const handleScroll = () => {
      hasScrolled = true;
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, {passive: true});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (initialViewportDelay !== undefined && !hasScrolled) {
            el.style.setProperty("--sr-delay", toMs(initialViewportDelay));
          }

          el.classList.add("scroll-reveal--visible");
          observer.unobserve(el);
          return;
        }
      },
      {threshold, rootMargin: scrollRevealDefaults.rootMargin}
    );

    observer.observe(el);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [
    initialViewportDelay,
    threshold,
    scrollRevealDefaults.reducedMotionQuery,
    scrollRevealDefaults.rootMargin,
  ]);

  const style: ScrollRevealStyle = {
    "--sr-delay": toMs(delay),
    "--sr-duration": toMs(duration),
  };

  return (
    <div ref={ref} style={style} className={`scroll-reveal scroll-reveal--${variant} ${className}`}>
      {children}
    </div>
  );
}
