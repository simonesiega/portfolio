import {describe, expect, it} from "vitest";
import sitemap from "./sitemap";
import {appRoutes} from "@/lib/config/site-routes";
import {getSiteOrigin} from "@/lib/site-url";

describe("sitemap", () => {
  it("publishes every configured app route exactly once", () => {
    const siteOrigin = getSiteOrigin();

    expect(sitemap()).toEqual(appRoutes.map((route) => ({url: `${siteOrigin}${route}`})));
  });
});
