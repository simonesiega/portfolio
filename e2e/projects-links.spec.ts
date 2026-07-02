import {expect, test} from "@playwright/test";
import {
  getProjectCaseStudyRoute,
  projectContentLinksHeading,
  projectFixtures,
} from "./helpers/projects-fixtures";

test.describe("project case study content links", () => {
  for (const project of projectFixtures) {
    test(`${project.slug} renders content links`, async ({page}) => {
      await page.goto(getProjectCaseStudyRoute(project.slug));

      const heading = page.getByRole("heading", {name: projectContentLinksHeading});
      await expect(heading).toBeVisible();

      await expect(page.locator("section", {has: heading}).getByRole("link").first()).toBeVisible();
    });
  }
});
