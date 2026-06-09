import type {MetadataRoute} from "next";
import {appRouteLastModified} from "@/lib/config/site-routes";
import {getSiteOrigin} from "@/lib/site-url";

const baseUrl = getSiteOrigin();

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(appRouteLastModified).map(([route, lastModified]) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
