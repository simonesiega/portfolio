import {expect, test} from "@playwright/test";
import {appRoutes} from "./helpers/projects-fixtures";

test("keyboard users can skip repeated navigation", async ({page}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", {name: "Skip to content"});
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test.describe("app routes smoke", () => {
  for (const route of appRoutes) {
    test(`${route} renders a main landmark`, async ({page}) => {
      await page.goto(route);
      await expect(page.getByRole("main")).toBeVisible();
    });
  }
});
