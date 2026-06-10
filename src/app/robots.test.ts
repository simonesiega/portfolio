import {describe, expect, it} from "vitest";
import robots from "./robots";
import {getSiteOrigin} from "@/lib/site-url";

describe("robots metadata", () => {
  it("publishes crawl rules with host and sitemap URLs", () => {
    const siteOrigin = getSiteOrigin();

    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${siteOrigin}/sitemap.xml`,
      host: siteOrigin,
    });
  });
});
