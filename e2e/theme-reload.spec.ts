import {expect, test} from "@playwright/test";
import {appRoutes, themeStorageKey} from "./helpers/projects-fixtures";

test("theme preference persists after reload", async ({page}) => {
  await page.goto("/");

  const themeRadiogroup = page.getByRole("radiogroup", {
    name: /theme preference selector/i,
  });
  await expect(themeRadiogroup).toBeVisible();

  await expect(
    page.getByRole("radio", {
      name: /use system color theme/i,
    })
  ).toHaveAttribute("aria-checked", "false");
  await expect(
    page.getByRole("radio", {
      name: /toggle color theme/i,
    })
  ).toHaveAttribute("aria-checked", "true");

  const toggleThemeButton = page.getByRole("radio", {
    name: /toggle color theme/i,
  });

  await toggleThemeButton.click();
  await expect.poll(async () => page.locator("html").getAttribute("data-theme")).toBe("light");

  await page.reload();

  await expect.poll(async () => page.locator("html").getAttribute("data-theme")).toBe("light");
});

test.describe("theme initialization", () => {
  for (const route of appRoutes) {
    test(`${route} resolves system light before hydration`, async ({page}) => {
      await page.addInitScript((storageKey) => {
        window.localStorage.setItem(storageKey, "system");
      }, themeStorageKey);

      await page.emulateMedia({colorScheme: "light"});
      await page.goto(route);

      await expect.poll(async () => page.locator("html").getAttribute("data-theme")).toBe("light");
    });

    test(`${route} resolves system dark before hydration`, async ({page}) => {
      await page.addInitScript((storageKey) => {
        window.localStorage.setItem(storageKey, "system");
      }, themeStorageKey);

      await page.emulateMedia({colorScheme: "dark"});
      await page.goto(route);

      await expect.poll(async () => page.locator("html").getAttribute("data-theme")).toBe("dark");
    });
  }
});
