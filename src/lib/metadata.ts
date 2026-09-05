import type {Metadata} from "next";
import {appConfig} from "@/lib/config/app-config";
import type {ContentPageRoute} from "@/lib/config/site-routes";

const {
  metadata: {locale, socialPreview},
  owner,
  social,
} = appConfig;

export const socialPreviewContentType = "image/png";
export const socialPreviewImageAlt = `${owner.name} portfolio preview`;

const socialPreviewImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: socialPreviewContentType,
  alt: socialPreviewImageAlt,
};

export const socialPreviewImageSize = {
  width: socialPreviewImage.width,
  height: socialPreviewImage.height,
};

export const sharedOpenGraph = {
  type: "website",
  locale,
  siteName: owner.name,
  images: [socialPreviewImage],
} satisfies Metadata["openGraph"];

export const sharedTwitter = {
  card: "summary_large_image",
  site: social.xHandle,
  creator: social.xHandle,
  images: [socialPreviewImage],
} satisfies Metadata["twitter"];

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
