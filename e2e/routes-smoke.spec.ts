import {expect, test} from "@playwright/test";
import {appRoutes} from "./helpers/projects-fixtures";

test.describe("app routes smoke", () => {
  for (const route of appRoutes) {
    test(`${route} renders a main landmark`, async ({page}) => {
      await page.goto(route);
      await expect(page.getByRole("main")).toBeVisible();
    });
  }
});
