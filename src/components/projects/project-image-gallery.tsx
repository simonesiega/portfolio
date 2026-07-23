"use client";

import Image from "next/image";
import {useState} from "react";
import type {ProjectCaseStudyGalleryItem} from "@/lib/config/text/projects";

type ProjectImageGalleryProps = {
  images: readonly ProjectCaseStudyGalleryItem[];
  imageClassName: string;
  width: number;
  height: number;
};

export function ProjectImageGallery({
  images,
  imageClassName,
  width,
  height,
}: ProjectImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];

  if (!selectedImage) {
    return null;
  }

  const selectedImageClassName = `${imageClassName} ${
    selectedImage.renderingMode === "dark-source" ? "project-diagram-image--dark-source" : ""
  }`.trim();
  const selectedImageElement = (
    <Image
      src={selectedImage.src}
      alt={selectedImage.alt}
      width={width}
      height={height}
      sizes="(min-width: 48rem) 44rem, calc(100vw - 5rem)"
      preload={selectedIndex === 0}
      className={selectedImageClassName}
    />
  );

  return (
    <figure className="max-w-3xl space-y-2 pt-1">
      <div className="w-full overflow-hidden rounded-xl">
        {selectedImage.href ? (
          <a
            href={selectedImage.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${selectedImage.alt}`}
            className="group block h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
          >
            {selectedImageElement}
          </a>
        ) : (
          selectedImageElement
        )}
      </div>

      {images.length > 1 ? (
        <div
          role="group"
          className="grid max-w-md grid-cols-4 gap-2 sm:grid-cols-6"
          aria-label="Project image previews"
        >
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;
            const imageDescription = image.thumbnailDescription || image.caption || image.alt;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Show image ${index + 1}: ${imageDescription}`}
                aria-pressed={isSelected}
                className={`overflow-hidden rounded-lg border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ui-fg)] ${
                  isSelected
                    ? "border-[var(--ui-fg)] opacity-100"
                    : "border-[var(--card-border)] opacity-62 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={240}
                  height={135}
                  sizes="96px"
                  className="aspect-video h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}

      {selectedImage.caption ? (
        <figcaption className="text-xs leading-relaxed text-[color-mix(in_srgb,var(--ui-fg-muted)_68%,transparent)] sm:text-[0.82rem]">
          {selectedImage.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
