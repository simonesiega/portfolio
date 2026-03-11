import { appConfig } from "@/lib/config/app-config";

const { metadata, owner } = appConfig;

export const socialPreviewImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${owner.name} portfolio preview`,
};

export const sharedOpenGraph = {
  images: [socialPreviewImage],
};

export const sharedTwitter = {
  card: "summary_large_image",
  images: [socialPreviewImage.url],
};

export const socialPreviewText = {
  description: metadata.socialPreview.description,
  ownerName: owner.name,
  role: metadata.socialPreview.role,
  supportingLine: metadata.socialPreview.supportingLine,
  highlights: metadata.socialPreview.highlights,
  domain: metadata.socialPreview.domain,
} as const;
