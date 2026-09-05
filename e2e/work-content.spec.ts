import {expect, test} from "@playwright/test";
import {workText} from "../src/lib/config/text/work";

test("work page renders every configured experience", async ({page}) => {
  await page.goto("/work");

  const experienceItems = page.locator("main ol > li");
  await expect(experienceItems).toHaveCount(workText.experiences.length);

  for (const experience of workText.experiences) {
    await test.step(experience.id, async () => {
      const heading = page.getByRole("heading", {name: experience.company, level: 2});
      const article = page.locator("article", {has: heading});

      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      await expect(article).toContainText(experience.role);
      await expect(article).toContainText(experience.dateRange);
    });
  }
});
