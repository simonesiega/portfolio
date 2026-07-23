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
    let scrollFrameId = 0;
    let revealFrameId = 0;
    let revealed = false;

    const reveal = () => {
      if (revealed) return;

      revealed = true;
      el.classList.add("scroll-reveal--visible");
      window.removeEventListener("scroll", handleScroll);
      observer.unobserve(el);
    };

    const scheduleReveal = () => {
      if (revealed || revealFrameId !== 0) return;

      // Commit the hidden state before revealing. This preserves transitions
      // when hydration and a fast scroll happen within the same paint cycle.
      revealFrameId = window.requestAnimationFrame(() => {
        revealFrameId = window.requestAnimationFrame(() => {
          revealFrameId = 0;
          reveal();
        });
      });
    };

    const handleScroll = () => {
      hasScrolled = true;
      if (scrollFrameId !== 0) return;

      scrollFrameId = window.requestAnimationFrame(() => {
        scrollFrameId = 0;

        // IntersectionObserver can miss an element that crosses the viewport
        // between two frames during a fast scroll. Reveal anything already passed.
        if (el.getBoundingClientRect().top < 0) {
          scheduleReveal();
        }
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        if (initialViewportDelay !== undefined && !hasScrolled) {
          el.style.setProperty("--sr-delay", toMs(initialViewportDelay));
        }

        scheduleReveal();
      },
      {threshold, rootMargin: scrollRevealDefaults.rootMargin}
    );

    window.addEventListener("scroll", handleScroll, {passive: true});
    observer.observe(el);

    if (el.getBoundingClientRect().top < 0) {
      hasScrolled = true;
      scheduleReveal();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(scrollFrameId);
      window.cancelAnimationFrame(revealFrameId);
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
