import {describe, expect, it} from "vitest";
import {appRoutes} from "./site-routes";
import {appConfig} from "./app-config";

describe("application config", () => {
  it("keeps identity and metadata copy complete", () => {
    expect(appConfig.owner.name.trim().length).toBeGreaterThan(0);
    expect(appConfig.metadata.language).toMatch(/^[a-z]{2}(?:-[A-Z]{2})?$/);
    expect(appConfig.metadata.locale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    expect(appConfig.metadata.title.default).toContain(appConfig.owner.name);
    expect(appConfig.metadata.title.template).toContain("%s");
    expect(appConfig.metadata.description.trim().length).toBeGreaterThan(0);

    for (const value of Object.values(appConfig.metadata.socialPreview)) {
      if (typeof value === "string") {
        expect(value.trim().length).toBeGreaterThan(0);
      } else {
        expect(value.length).toBeGreaterThan(0);
        value.forEach((item) => expect(item.trim().length).toBeGreaterThan(0));
      }
    }
  });

  it("keeps navigation, social, contact, and theme settings valid", () => {
    const navigationHrefs = [
      appConfig.navigation.homeHref,
      ...appConfig.navigation.headerLinks.map((item) => item.href),
    ];

    expect(new Set(navigationHrefs).size).toBe(navigationHrefs.length);
    navigationHrefs.forEach((href) => {
      expect(href).toMatch(/^\/(?!\/)/);
      expect(appRoutes).toContain(href);
    });
    appConfig.navigation.headerLinks.forEach((item) =>
      expect(item.label.trim().length).toBeGreaterThan(0)
    );

    for (const [key, value] of Object.entries(appConfig.social)) {
      if (key.endsWith("Url")) {
        const url = new URL(value as string);
        expect(url.protocol, key).toBe("https:");
        expect(url.username, key).toBe("");
        expect(url.password, key).toBe("");
      }
    }

    expect(appConfig.social.xHandle).toMatch(/^@[A-Za-z0-9_]{1,15}$/);
    Object.values(appConfig.social.labels).forEach((label) =>
      expect(label.trim().length).toBeGreaterThan(0)
    );
    expect(appConfig.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(appConfig.contact.availabilityLine.trim().length).toBeGreaterThan(0);
    expect(appConfig.theme.attributeName).toMatch(/^data-[a-z0-9-]+$/);
    expect(appConfig.theme.storageKey.trim().length).toBeGreaterThan(0);
    Object.values(appConfig.theme.labels).forEach((label) =>
      expect(label.trim().length).toBeGreaterThan(0)
    );
  });
});
