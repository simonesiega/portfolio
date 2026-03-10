import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";

const normalizedSiteUrl = getSiteOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${normalizedSiteUrl}/sitemap.xml`,
    host: normalizedSiteUrl,
  };
}
