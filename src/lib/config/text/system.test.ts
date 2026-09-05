import {describe, expect, it} from "vitest";
import {appRoutes} from "@/lib/config/site-routes";
import {systemText} from "./system";

describe("system text model", () => {
  it("keeps every system page and recovery action complete", () => {
    const sectionIds = new Set<string>();

    for (const [pageName, page] of Object.entries(systemText)) {
      for (const [key, value] of Object.entries(page.hero)) {
        expect(value.trim().length, `${pageName}.hero.${key}`).toBeGreaterThan(0);
      }

      expect(
        sectionIds.has(page.hero.sectionId),
        `Duplicate system-page section id: ${page.hero.sectionId}`
      ).toBe(false);
      sectionIds.add(page.hero.sectionId);
      expect(page.body.navigationAriaLabel.trim().length).toBeGreaterThan(0);

      for (const [key, value] of Object.entries(page.body.actions)) {
        expect(value.trim().length, `${pageName}.body.actions.${key}`).toBeGreaterThan(0);

        if (key.endsWith("Href")) {
          expect(value, `${pageName}.body.actions.${key}`).toMatch(/^\/(?!\/)/);
          expect(appRoutes, `${pageName}.body.actions.${key}`).toContain(value);
        }
      }
    }
  });
});
