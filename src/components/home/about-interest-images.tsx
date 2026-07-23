"use client";

import Image from "next/image";
import {useEffect, useRef, type CSSProperties} from "react";
import {animationTimings, toMs} from "@/lib/animation/animation-timings";
import {mediaConfig} from "@/lib/config/media";
import type {HomeIntroAboutImage} from "@/lib/config/text/home";

interface AboutInterestImagesProps {
  images: readonly HomeIntroAboutImage[];
  delayMs: number;
  initialViewportDelayMs: number;
}

const mobileQuery = "(max-width: 429px)";

type AboutImageRevealStyle = CSSProperties & {
  "--about-image-delay": string;
  "--about-image-duration": string;
};

export function AboutInterestImages({
  images,
  delayMs,
  initialViewportDelayMs,
}: AboutInterestImagesProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const {aboutImages} = animationTimings.homeIntro;
  const {scrollRevealDefaults} = animationTimings;
  const {aboutImage} = mediaConfig.home;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      animationTimings.scrollRevealDefaults.reducedMotionQuery
    ).matches;
    const items = itemRefs.current.flatMap((item, index) => (item ? [{item, index}] : []));

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      items.forEach(({item}) => item.classList.add("about-interest-reveal--visible"));
      return;
    }

    let hasScrolled = false;
    const handleScroll = () => {
      hasScrolled = true;
      window.removeEventListener("scroll", handleScroll);
    };
    const mobileMedia = window.matchMedia(mobileQuery);
    const observers: IntersectionObserver[] = [];

    const revealItem = (item: HTMLElement, index: number) => {
      if (hasScrolled) {
        item.style.setProperty(
          "--about-image-delay",
          toMs(delayMs + index * aboutImages.stepDelayMs)
        );
      }

      item.classList.add("about-interest-reveal--visible");
    };

    const setupObservers = () => {
      observers.splice(0).forEach((observer) => observer.disconnect());

      if (mobileMedia.matches) {
        items.forEach(({item, index}) => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) return;

              revealItem(item, index);
              observer.unobserve(item);
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
          if (!entry?.isIntersecting) return;

          items.forEach(({item, index}) => revealItem(item, index));
          observer.unobserve(grid);
        },
        {threshold: aboutImages.threshold, rootMargin: scrollRevealDefaults.rootMargin}
      );

      observer.observe(grid);
      observers.push(observer);
    };

    setupObservers();
    window.addEventListener("scroll", handleScroll, {passive: true});
    mobileMedia.addEventListener("change", setupObservers);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileMedia.removeEventListener("change", setupObservers);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [aboutImages.stepDelayMs, aboutImages.threshold, delayMs, scrollRevealDefaults.rootMargin]);

  return (
    <div ref={gridRef} className="mt-4 grid grid-cols-1 gap-4 min-[430px]:grid-cols-3">
      {images.map((image, index) => {
        const style: AboutImageRevealStyle = {
          "--about-image-delay": toMs(initialViewportDelayMs + index * aboutImages.stepDelayMs),
          "--about-image-duration": toMs(aboutImages.durationMs),
        };

        return (
          <figure
            key={image.label}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            style={style}
            className="about-interest-reveal"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={aboutImage.width}
              height={aboutImage.height}
              sizes="(max-width: 429px) calc(100vw - 5.75rem), 180px"
              loading={aboutImage.eagerFirstImage && index === 0 ? "eager" : "lazy"}
              className="about-interest-image aspect-[9/11] w-full rounded-md object-cover"
            />
            <figcaption className="mt-2 text-[0.68rem] font-medium tracking-[0.04em] text-[var(--header-item-color)]/82">
              {image.label}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
