import {describe, expect, it} from "vitest";
import sitemap from "./sitemap";
import {appRouteFiles, appRouteLastModified} from "@/lib/config/site-routes";

describe("sitemap", () => {
  it("publishes every configured app route with absolute URLs", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(Object.keys(appRouteFiles).length);

    for (const route of Object.keys(appRouteFiles)) {
      expect(urls).toContain(`https://simonesiega.com${route}`);
    }
  });

  it("uses checked-in route metadata for last modified dates", () => {
    const entries = sitemap();

    for (const entry of entries) {
      const route = entry.url.replace("https://simonesiega.com", "");

      expect(entry.lastModified).toBe(
        appRouteLastModified[route as keyof typeof appRouteLastModified]
      );
    }
  });
});
