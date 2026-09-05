import {describe, expect, it} from "vitest";
import {appConfig} from "@/lib/config/app-config";
import {
  createContentPageMetadata,
  sharedOpenGraph,
  sharedTwitter,
  socialPreviewContentType,
  socialPreviewImageAlt,
  socialPreviewImageSize,
} from "./metadata";

describe("metadata helpers", () => {
  it("defines one complete shared social preview", () => {
    const expectedImage = {
      url: "/opengraph-image",
      ...socialPreviewImageSize,
      type: socialPreviewContentType,
      alt: socialPreviewImageAlt,
    };

    expect(sharedOpenGraph).toEqual({
      type: "website",
      locale: appConfig.metadata.locale,
      siteName: appConfig.owner.name,
      images: [expectedImage],
    });
    expect(sharedTwitter).toEqual({
      card: "summary_large_image",
      site: appConfig.social.xHandle,
      creator: appConfig.social.xHandle,
      images: [expectedImage],
    });
  });

  it("builds canonical, OpenGraph, and Twitter metadata for content pages", () => {
    const metadata = createContentPageMetadata({
      route: "/projects/example-project",
      title: "Example project case study",
      description: "Selected project work.",
    });
    const expectedSocialTitle = `Example project case study | ${appConfig.owner.name}`;

    expect(metadata).toEqual({
      title: "Example project case study",
      description: "Selected project work.",
      alternates: {canonical: "/projects/example-project"},
      openGraph: {
        ...sharedOpenGraph,
        url: "/projects/example-project",
        title: expectedSocialTitle,
        description: "Selected project work.",
      },
      twitter: {
        ...sharedTwitter,
        title: expectedSocialTitle,
        description: "Selected project work.",
      },
    });
  });
});
