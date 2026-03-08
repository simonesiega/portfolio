import type { MetadataRoute } from "next";

const defaultSiteUrl = "https://simonesiega.com";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? defaultSiteUrl;
const baseUrl = new URL(siteUrl).origin;
const indexedRoutes = ["/", "/projects", "/work"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexedRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
