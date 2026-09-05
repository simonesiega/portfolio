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
    const prefersReduced = window.matchMedia(scrollRevealDefaults.reducedMotionQuery).matches;
    const items = itemRefs.current.flatMap((item, index) => (item ? [{item, index}] : []));

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      items.forEach(({item}) => item.classList.add("about-interest-reveal--visible"));
      return;
    }

    let hasScrolled = false;
    let scrollFrameId = 0;
    const mobileMedia = window.matchMedia(mobileQuery);
    const observers: IntersectionObserver[] = [];

    const revealItem = (item: HTMLElement, index: number) => {
      if (item.classList.contains("about-interest-reveal--visible")) {
        return;
      }

      if (hasScrolled) {
        item.style.setProperty(
          "--about-image-delay",
          toMs(delayMs + index * aboutImages.stepDelayMs)
        );
      }

      item.classList.add("about-interest-reveal--visible");

      if (
        items.every(({item: candidate}) =>
          candidate.classList.contains("about-interest-reveal--visible")
        )
      ) {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    function handleScroll() {
      hasScrolled = true;
      if (scrollFrameId !== 0) {
        return;
      }

      scrollFrameId = window.requestAnimationFrame(() => {
        scrollFrameId = 0;

        // IntersectionObserver can miss items skipped during a fast scroll.
        items.forEach(({item, index}) => {
          if (item.getBoundingClientRect().top < 0) {
            revealItem(item, index);
          }
        });
      });
    }

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
      window.cancelAnimationFrame(scrollFrameId);
      mobileMedia.removeEventListener("change", setupObservers);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [aboutImages, delayMs, scrollRevealDefaults]);

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
