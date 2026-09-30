import {expect, test} from "@playwright/test";
import {appConfig} from "../src/lib/config/app-config";
import {getProjectRoutes} from "./helpers/sitemap";

for (const blockedOperation of ["read", "write"] as const) {
  test(`system theme works across navigation when storage ${blockedOperation}s are blocked`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(
      ({operation, key}) => {
        if (operation === "read") {
          Object.defineProperty(window, "localStorage", {
            get() {
              throw new DOMException("Storage is blocked", "SecurityError");
            },
          });
        } else {
          localStorage.setItem(key, "dark");
          Storage.prototype.setItem = () => {
            throw new DOMException("Storage quota exceeded", "QuotaExceededError");
          };
        }
      },
      {operation: blockedOperation, key: appConfig.theme.storageKey}
    );
    await page.emulateMedia({colorScheme: "light", reducedMotion: "reduce"});
    await page.goto("/");
    const systemButton = page.getByRole("button", {name: /use system color theme/i});
    await systemButton.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.evaluate((key) => {
      window.dispatchEvent(
        new StorageEvent("storage", {key, newValue: "light", storageArea: sessionStorage})
      );
    }, appConfig.theme.storageKey);
    await page.emulateMedia({colorScheme: "dark"});
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page
      .getByRole("navigation", {name: "Primary navigation"})
      .getByRole("link", {name: "projects", exact: true})
      .click();
    await expect(page).toHaveURL("/projects");
    await expect(systemButton).toHaveAttribute("aria-pressed", "true");
    await page.emulateMedia({colorScheme: "light"});
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(errors).toEqual([]);
  });
}

test("theme selection and storage removal synchronize between tabs", async ({page, context}) => {
  await page.emulateMedia({colorScheme: "light", reducedMotion: "reduce"});
  await page.goto("/");
  await page.getByRole("button", {name: /use system color theme/i}).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const otherTab = await context.newPage();
  await otherTab.goto("/work");
  await otherTab.evaluate((key) => localStorage.setItem(key, "dark"), appConfig.theme.storageKey);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", {name: /use system color theme/i})).toHaveAttribute(
    "aria-pressed",
    "false"
  );
  await otherTab.evaluate((key) => localStorage.setItem(key, "light"), appConfig.theme.storageKey);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await otherTab.evaluate(() => localStorage.clear());
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await otherTab.close();
});

test("saved theme and content remain usable when application JavaScript fails to load", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, "light"), appConfig.theme.storageKey);
  await page.route("**/_next/static/**/*.js", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator(".scroll-reveal").first()).toHaveCSS("opacity", "1");
  expect(
    await page
      .locator(".scroll-reveal")
      .evaluateAll((elements) =>
        elements.every((element) => getComputedStyle(element).opacity === "1")
      )
  ).toBe(true);
});

test("long case-study code blocks are keyboard-scrollable on narrow screens", async ({
  page,
  request,
}) => {
  await page.setViewportSize({width: 320, height: 720});
  await page.emulateMedia({reducedMotion: "reduce"});
  let overflowingBlocks = 0;
  for (const route of await getProjectRoutes(request)) {
    await page.goto(route);
    for (const block of await page.locator("pre").all()) {
      if (!(await block.evaluate((element) => element.scrollWidth > element.clientWidth))) continue;
      overflowingBlocks += 1;
      await expect(block).toHaveCSS("overflow-x", "auto");
      await block.focus();
      await expect(block).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => block.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    }
  }
  expect(overflowingBlocks).toBeGreaterThan(0);
});
