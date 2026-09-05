import type {MetadataRoute} from "next";
import {appRoutes} from "@/lib/config/site-routes";
import {getSiteOrigin} from "@/lib/site-url";

const baseUrl = getSiteOrigin();

export default function sitemap(): MetadataRoute.Sitemap {
  return appRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));
}
