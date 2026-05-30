import {describe, expect, it} from "vitest";
import sitemap from "./sitemap";
import {appRouteFiles} from "@/lib/config/site-routes";

describe("sitemap", () => {
  it("publishes every configured app route with absolute URLs", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(Object.keys(appRouteFiles).length);

    for (const route of Object.keys(appRouteFiles)) {
      expect(urls).toContain(`https://simonesiega.com${route}`);
    }
  });
});
