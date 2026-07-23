import {expect, test} from "@playwright/test";
import {
  getProjectCaseStudyRoute,
  projectContentLinksHeading,
  projectFixtures,
} from "./helpers/projects-fixtures";

test("project navigation resets scroll before rendering the case study", async ({page}) => {
  await page.setViewportSize({width: 375, height: 400});
  await page.goto("/projects");

  const caseStudyLink = page.getByRole("link", {name: /Open case study CFG Parser/i});
  await caseStudyLink.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await caseStudyLink.click();
  await expect(page).toHaveURL(getProjectCaseStudyRoute("cfg-parser"));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByRole("heading", {name: "CFG Parser", level: 1})).toBeVisible();
});

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
