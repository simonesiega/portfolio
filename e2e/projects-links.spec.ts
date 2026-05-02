import {expect, test} from "@playwright/test";
import {
  allProjectsHaveLinksSection,
  getProjectCaseStudyRoute,
  projectsWithLinksSections,
} from "./helpers/projects-fixtures";

test.describe("project case study links", () => {
  test("every project defines a links section", () => {
    expect(projectsWithLinksSections.length).toBeGreaterThan(0);
    expect(allProjectsHaveLinksSection).toBe(true);
  });

  for (const {project, linksSection} of projectsWithLinksSections) {
    test(`${project.slug} renders all configured links`, async ({page}) => {
      await page.goto(getProjectCaseStudyRoute(project.slug));

      await expect(page.getByRole("heading", {name: linksSection.heading})).toBeVisible();

      for (const link of linksSection.links) {
        const anchor = page.getByRole("link", {name: link.description});
        await expect(anchor).toHaveAttribute("href", link.url);
      }
    });
  }
});
