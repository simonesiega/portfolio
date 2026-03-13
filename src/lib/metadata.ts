import type {Metadata} from "next";
import {appConfig} from "@/lib/config/app-config";
import type {ContentPageRoute} from "@/lib/config/site-routes";

const {
  metadata: {socialPreview},
  owner,
} = appConfig;

export const socialPreviewImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${owner.name} portfolio preview`,
};

export const socialPreviewImageSize = {
  width: socialPreviewImage.width,
  height: socialPreviewImage.height,
};

export const socialPreviewContentType = "image/png";

export const sharedOpenGraph = {
  images: [socialPreviewImage],
};

export const sharedTwitter = {
  card: "summary_large_image",
  images: [socialPreviewImage.url],
};

type ContentPageMetadataInput = {
  route: ContentPageRoute;
  title: string;
  description: string;
};

export function createContentPageMetadata({
  route,
  title,
  description,
}: ContentPageMetadataInput): Metadata {
  const pageTitle = `${title} | ${owner.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: route,
    },
    openGraph: {
      ...sharedOpenGraph,
      url: route,
      title: pageTitle,
      description,
    },
    twitter: {
      ...sharedTwitter,
      title: pageTitle,
      description,
    },
  };
}

export const socialPreviewText = {
  ownerName: owner.name,
  domain: socialPreview.domain,
  role: socialPreview.role,
  description: socialPreview.description,
  supportingLine: socialPreview.supportingLine,
  highlights: socialPreview.highlights,
  footerLabel: socialPreview.footerLabel,
} as const;
