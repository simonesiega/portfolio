import {expect, test} from "@playwright/test";
import {
  allProjectsHaveContentLinks,
  getProjectCaseStudyRoute,
  projectContentLinksHeading,
  projectsWithContentLinks,
} from "./helpers/projects-fixtures";

test.describe("project case study content links", () => {
  test("every project defines content links", () => {
    expect(projectsWithContentLinks.length).toBeGreaterThan(0);
    expect(allProjectsHaveContentLinks).toBe(true);
  });

  for (const {project, contentLinks} of projectsWithContentLinks) {
    test(`${project.slug} renders all configured content links`, async ({page}) => {
      await page.goto(getProjectCaseStudyRoute(project.slug));

      await expect(page.getByRole("heading", {name: projectContentLinksHeading})).toBeVisible();

      for (const link of contentLinks) {
        const anchor = page.getByRole("link", {name: link.label});
        await expect(anchor).toHaveAttribute("href", link.href);
      }
    });
  }
});
