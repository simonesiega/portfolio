import {expect, test} from "@playwright/test";
import {appConfig} from "../src/lib/config/app-config";
import {getAppRoutes} from "./helpers/sitemap";

const themeStorageKey = appConfig.theme.storageKey;

test("theme preference persists after reload", async ({page}) => {
  await page.goto("/");

  const themeControls = page.getByRole("group", {
    name: /theme controls/i,
  });
  await expect(themeControls).toBeVisible();

  await expect(
    page.getByRole("button", {
      name: /use system color theme/i,
    })
  ).toHaveAttribute("aria-pressed", "false");

  const toggleThemeButton = page.getByRole("button", {
    name: /toggle color theme/i,
  });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const currentTheme = await page.locator("html").getAttribute("data-theme");

    if (currentTheme === "light") {
      break;
    }

    await toggleThemeButton.click();
  }

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.reload();

  await expect.poll(async () => page.locator("html").getAttribute("data-theme")).toBe("light");
});

test("every sitemap route resolves the system light theme", async ({page, request}) => {
  const appRoutes = await getAppRoutes(request);

  await page.addInitScript((storageKey) => {
    window.localStorage.setItem(storageKey, "system");
  }, themeStorageKey);
  await page.emulateMedia({colorScheme: "light"});

  for (const route of appRoutes) {
    await test.step(route, async () => {
      await page.goto(route);

      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(
        "rgb(255, 255, 255)"
      );
    });
  }
});

test("every sitemap route resolves the system dark theme", async ({page, request}) => {
  const appRoutes = await getAppRoutes(request);

  await page.addInitScript((storageKey) => {
    window.localStorage.setItem(storageKey, "system");
  }, themeStorageKey);
  await page.emulateMedia({colorScheme: "dark"});

  for (const route of appRoutes) {
    await test.step(route, async () => {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(
        "rgb(0, 0, 0)"
      );
    });
  }
});
