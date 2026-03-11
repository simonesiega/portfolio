import { appConfig } from "@/lib/config/app-config";

const {
  metadata: { socialPreview },
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

export const socialPreviewText = {
  ownerName: owner.name,
  domain: socialPreview.domain,
  role: socialPreview.role,
  description: socialPreview.description,
  supportingLine: socialPreview.supportingLine,
  highlights: socialPreview.highlights,
  footerLabel: socialPreview.footerLabel,
} as const;
