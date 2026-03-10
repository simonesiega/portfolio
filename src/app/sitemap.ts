import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";

const baseUrl = getSiteOrigin();
const indexedRoutes = ["/", "/projects", "/work"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexedRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
