"use client";

import Image from "next/image";
import {useEffect, useRef, type CSSProperties} from "react";
import {animationTimings} from "@/lib/animation/animation-timings";
import {mediaConfig} from "@/lib/config/media";
import type {HomeIntroAboutImage} from "@/lib/config/text/home";

interface AboutInterestImagesProps {
  images: readonly HomeIntroAboutImage[];
  startDelayMs: number;
}

const mobileQuery = "(max-width: 429px)";

export function AboutInterestImages({images, startDelayMs}: AboutInterestImagesProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const {aboutImages} = animationTimings.homeIntro;
  const {scrollRevealDefaults} = animationTimings;
  const {aboutImage} = mediaConfig.home;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      animationTimings.scrollRevealDefaults.reducedMotionQuery
    ).matches;
    const items = itemRefs.current.filter(Boolean);

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      items.forEach((item) => item?.classList.add("about-interest-reveal--visible"));
      return;
    }

    const mobileMedia = window.matchMedia(mobileQuery);
    const observers: IntersectionObserver[] = [];

    const revealItem = (item: Element) => {
      item.classList.add("about-interest-reveal--visible");
    };

    const setupObservers = () => {
      observers.splice(0).forEach((observer) => observer.disconnect());

      if (mobileMedia.matches) {
        items.forEach((item) => {
          if (!item) return;

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;

              revealItem(entry.target);
              observer.unobserve(entry.target);
            },
            {threshold: aboutImages.threshold, rootMargin: scrollRevealDefaults.rootMargin}
          );

          observer.observe(item);
          observers.push(observer);
        });

        return;
      }

      const grid = gridRef.current;
      if (!grid) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          items.forEach((item) => item?.classList.add("about-interest-reveal--visible"));
          observer.unobserve(entry.target);
        },
        {threshold: aboutImages.threshold, rootMargin: scrollRevealDefaults.rootMargin}
      );

      observer.observe(grid);
      observers.push(observer);
    };

    setupObservers();
    mobileMedia.addEventListener("change", setupObservers);

    return () => {
      mobileMedia.removeEventListener("change", setupObservers);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [aboutImages.threshold, scrollRevealDefaults.rootMargin]);

  return (
    <div ref={gridRef} className="mt-4 grid grid-cols-1 gap-4 min-[430px]:grid-cols-3">
      {images.map((image, index) => (
        <figure
          key={image.label}
          ref={(element) => {
            itemRefs.current[index] = element;
          }}
          className="about-interest-reveal"
          style={
            {
              "--about-image-delay": `${startDelayMs + index * aboutImages.stepDelayMs}ms`,
              "--about-image-duration": `${aboutImages.durationMs}ms`,
            } as CSSProperties
          }
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={aboutImage.width}
            height={aboutImage.height}
            loading={aboutImage.eagerFirstImage && index === 0 ? "eager" : "lazy"}
            className="about-interest-image aspect-[9/11] w-full rounded-md object-cover"
          />
          <figcaption className="mt-2 text-[0.68rem] font-medium tracking-[0.04em] text-[var(--header-item-color)]/72">
            {image.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
