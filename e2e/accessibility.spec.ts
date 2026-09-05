import AxeBuilder from "@axe-core/playwright";
import {expect, test} from "@playwright/test";
import {appConfig} from "../src/lib/config/app-config";
import {getAppRoutes} from "./helpers/sitemap";

const colorSchemes = ["light", "dark"] as const;

test("every sitemap route has no automated WCAG A or AA violations", async ({page, request}) => {
  const appRoutes = await getAppRoutes(request);

  await page.addInitScript((storageKey) => {
    window.localStorage.setItem(storageKey, "system");
  }, appConfig.theme.storageKey);

  for (const colorScheme of colorSchemes) {
    await page.emulateMedia({colorScheme, reducedMotion: "reduce"});

    for (const route of appRoutes) {
      await test.step(`${colorScheme}: ${route}`, async () => {
        await page.goto(route);

        const {violations} = await new AxeBuilder({page})
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();

        expect(violations).toEqual([]);
      });
    }
  }
});
