"use client";

import {
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";

type Variant = "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";

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
  duration = 700,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
  once = true,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.classList.add("scroll-reveal--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal--visible");
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

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
