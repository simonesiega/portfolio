import {describe, expect, it} from "vitest";
import sitemap from "./sitemap";
import {appRouteFiles, appRouteLastModified} from "@/lib/config/site-routes";
import {getSiteOrigin} from "@/lib/site-url";

describe("sitemap", () => {
  it("publishes every configured app route with absolute URLs", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(Object.keys(appRouteFiles).length);

    const siteOrigin = getSiteOrigin();

    for (const route of Object.keys(appRouteFiles)) {
      expect(urls).toContain(`${siteOrigin}${route}`);
    }
  });

  it("uses checked-in route metadata for last modified dates", () => {
    const entries = sitemap();
    const siteOrigin = getSiteOrigin();

    for (const entry of entries) {
      const route = entry.url.replace(siteOrigin, "");

      expect(entry.lastModified).toBe(
        appRouteLastModified[route as keyof typeof appRouteLastModified]
      );
    }
  });
});
